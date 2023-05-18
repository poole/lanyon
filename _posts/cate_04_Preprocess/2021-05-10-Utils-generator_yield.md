---
layout: post
title: (Utils) generator & yield
date : 10 May 2021
category : Preprocess
comments : true
---
# 1. why use generator?
### (1) Memory issue
: for-loop는 , 돌아야하는 list전체를 메모리에 올려놓은 상태로 작업을 시작하게된다. 때문에 list의 크기가 큰 경우, 차지하는 메모리가 커진다.
 반면, generator는 값을 한꺼번에 메모리에 적재 하지 않고, next() 메소드를 통해 차례로 값에 접근할 때마다 메모리에 적재한다.

```python
import sys
sys.getsizeof( [i for i in xrange(100) if i % 2] )    # list
# 536
sys.getsizeof( [i for i in xrange(1000) if i % 2] )
# 4280

sys.getsizeof( (i for i in xrange(100) if i % 2) )    # generator
# 80
sys.getsizeof( (i for i in xrange(1000) if i % 2) )
# 80
```

### (2) Lazy evaluation : 계산 결과 값이 필요할 때까지 계산을 늦추는 효과
: 아래 예제를 보면, 일반 list는 list 내부 함수를 먼저 실행하여 값들을 모두 대기시켜놓은 후 for문을 통해 하나씩 추출한다. 때문에 리스트 내부의 함수 연산이 오래걸린다면, for문 자체의 실행이 늦춰진다.
```python
# list 생성
list = [sleep_func(x) for x in xrange(3)]
for i in list:
  print i

# <결과>
# sleep... # (1) list : 내부 [sleep_func(x) for x in xrange(5)] 함수 먼저 실행
# sleep...
# sleep...
# 0  # (2) list : 이후 for loop 실행
# 1
# 2
```
반면, generator는 for문이 수행 될 때마다 추출해야하는 값의 연산을 그때 그때 진행하기에 수행 시간이 긴 연산을 필요한 시점까지 늦출 수 있다는 특징이 있다.
```python
# generator 생성

gen = (sleep_func(x) for x in xrange(3))
for i in gen:
  print i

# <결과>
# sleep... # (1-1) generator 추출할 첫번째 값의 함수 실행
# 0        # (1-2) 이후 for loop 진행
# sleep... # (2-1) generator 추출할 두번째 값의 함수 실행
# 1        # (2-2) 이후 for loop 진행
# sleep...
# 2
```
<center>
따라서, 크기가 크거나 for문에 들어갈 list의 연산이 복잡할 경우에 generor를 사용하면, 메모리 및 속도 측면에서 효율적으로 활용할 수 있다. </center>


# 2. How to use generator?
### (1) 함수로 생성
: generator를 생성하는 방법은 2가지가 있다.   
첫번째는 <u>for loop를 통해 값을 하나씩 반환하는 일반 함수를 생성하되</u>, 반횐하는 함수를 `return` 대신 <strong>`yield` </strong>를 사용하는 방법이다.
```python
#  data
df = pd.DataFrame(
  key_id : ['a','b','c'],
  value : [1,2,3]
  )

# make generator
def gen(df_tmp) :
  for idx in df_tmp['key_id'] :
    yield idx
idx_gen = gen(df_tmp)

# use generator by 'next'
while True :
  try :
    next(idx_gen)
  except StopIteration :
    break
```


### (2) Generator expression
두번째는 <u>generator expression</u>를 사용하는 방법이다.
```Python
# make generator by generator expression
idx_gen = ( i for i in df_tmp.index )

# use generator by 'next'
next(idx_gen)
```


# 3. What is generator?
시간이 좀 있다면, generator가 어떻게 작동하는지도 자세히 살펴보자.
generator는 iterator 를 생성해 주는 function으로 `next()` 메소드를 사용해, 데이터에 순차적으로 접근가능한 'object'다. generator자체를 만드는데 있어서는 return 대신 yield라는 구문을 사용한다는 점을 제외하면 일반 함수와 큰 차이점이 없다.

그렇다면, `yield`와 일반 함수의 `return`의 차이점을 살펴보자
 - `return` : 함수 사용이 종료되면, 결과값을 호출하여 반환(return)후 함수 자체를 종료한다.(즉, 함수가 완전히 모두 실행 후 종료)
 - `yield` :
  (1) 특정함수(주로 generator함수)가 `yield`를 만나게 되면,
  (2) 그 기점에서 함수를 잠시 <strong>정지</strong> 후 반환값을 `next()`를 호출한 쪽으로 전달한다.
  (3) 이후 함수는 종료되지 않고, <strong>유지</strong>된 상태로 남아있게 된다.

아래 예시를 살펴보자.
```python
def generator(n) :
  i = 0
  while i < n :
    yield i
    i += 1

for x in generator(5) :
  print(x)

# <결과>
# 0
# 1
# 2
# 3
# 4

# (1) for 문이 실행되며, 먼저 generator 함수가 호출된다.
# (2) generator 함수는 일반 함수와 동일한 절차로 실행된다.
# (3) 실행 중 while문 안에서 yield 를 만나게 된다. 그러면 return 과 비슷하게 함수를 호출했던 구문으로 반환하게 된다. 여기서는 첫번재 i 값인 0 을 반환하게 된다. 하지만 반환 하였다고 generator 함수가 종료되는 것이 아니라 그대로 유지한 상태이다.
# (4) x 값에는 yield 에서 전달 된 0 값이 저장된 후 print 된다. 그 후 for 문에 의해 다시 generator 함수가 호출된다.
# (5) 이때는 generator 함수가 처음부터 시작되는게 아니라 yield 이후 구문부터 시작되게 된다. 따라서 i += 1 구문이 실행되고 i 값은 1로 증가한다.
# (6) 아직 while 문 내부이기 때문에 yield 구문을 만나 i 값인 1이 전달 된다.
# (7) x 값은 1을 전달 받고 print 된다. (이후 반복)
```

# 4. Usage
## 1) list_sum
: generator와 dictionary 자료구조를 사용해 시간을 단축한 예제다.
무수히 많은 리스트가 존재하고, 해당 원소들의 개수를 모두 더해서 카운트해야하는 문제에서 많은 리스트를 제너레이트로 변환하고,
원소들을 dictionary형태의 key값으로 지정하여 개수를 카운트하였다.
```python
def generate_list_sum(target_idx) :
    """
     : [a,b,c] + [a,b,f] = {a : 2, b = 2, c = 1, f = 1}
    """
    gen_list = (i for i in target_idx)
    dict_counter = {}
    while True :
        try :
            l = next(gen_list)
            for k in l :
                try :
                    dict_counter[k] += 1
                except :
                    dict_counter[k] = 0
        except StopIteration :
            break
    return dict_counter
```









#### Reference
[1] [python generator(제너레이터) 란 무엇인가](https://bluese05.tistory.com/56)  
