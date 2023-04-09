---
layout: post
title: [python-utils] lambda / map / filter / reduce
date : 07 Mar 2023
category : Preprocess
comments : true
---

## 1. lambda
  - 익명 함수 : 객체를 만들지 않기에, 메모리를 할당하지 않고 다음줄로 넘어가면 힙(heap)메모리 영역에서 증발
  - 일반 함수 : 함수는 객체를 만들고, 재사용을 위해 함수 이름(메모리)를 할당

  > **[Formula]**  
  > `lambda x, y, ... : [인수를 활용한 표현식]]`  

****
```python
## Ex_1)
lambda_sum = lambda a, b : a+b
lambda_sum(10,20)
# > 30
```

## 2. map
  - 게으른 연산을 진행하는 map iterator 객체로 리턴. 
  - generate와 유사하게 값을 next로 다음 iterator를 실행히며, generate는 list의 다음 값만 추출해준다면, map은 다음 값을 활용한 연산을 진행

  > **[Formula]**  
  > `map(function, iterable)`  
  > - function : Return 값이 `True` or `Flase` 둘중 하나인 함수
  > - iterable : iterable 객체

```python
# input
lst = [1,2,3]
## Ex_1) map with labmda 
list(map(lambda x+1 : lst))
# > [2,3,4]

## Ex_2) map with function 
def func(x) :
    return x + 10
list(map(func(x), lst))
# > [11, 12, 13]

## Ex_2) 3항 연산자 (if else, else, else, ...)
li = [-3, -2, 0, 6, 8]
list(map(lambda x : 'positive' if x > 0 else ('negative' if x < 0 else 0) , li))
# > ['음수', '음수', 0, '양수', '양수']
```

**※ [게으른 연산]** <br>
  : 속도 자체는 더 느리지만, 한번에 list를 모두 메모리에 올리지 않고 실행에 필요한 다음 값만 메모리에 올리기에, 연산량이 많을 때 메모리 부하를 줄일 수 있음.
  - next() 메소드로 데이터를 순차적으로 호출 가능한 object
  - 마지막 데이터까지 불러오면, StopIteration exception 발생
  - 일반 `iterable`한 객체(ex. 리스트)를 `iterator`로 변환하려면, `iter()` 함수 사용

  ```python
  x = [1,2,3] 
  print(type(x)) # list ('iterable')
  y = iter(x)
  print(type(y)) # list ('iterator')
  next(y) # 1
  next(y) # 2
  next(y) # 3
  next(y) # Error : StopIteration
  ```



## 3. filter
  - iterable 객체에서, **함수의 리턴값이 참**인 값만 반환
  - 따라서 함수의 return값은 
  
  > **[Formula]**  
  > `filter(function, iterable)`  
  > - function : Return 값이 `True` or `Flase` 둘중 하나인 함수
  > - iterable : iterable 객체

```python
# input
li = [-2, -3, 5, 6]

## Ex_1) filter with labmda 
list(filter(lambda x: x > 0, li))
# > [5, 6]

## Ex_2) filter with function 
def func(x) :
    return x > 0
list(filter(func, li))
# > [5, 6]
```


## 4. reduce
  - 여러 개의 데이터를 주로, **누적**집계 하기위해 사용
  > **[Formula]**  
  > `reduce(function, iterable)`  
  > - function : 누적자  
  > - iterable : 루프를 돌면서 하나씩 가져오는 값(첫번째값이 초기값)  
  > - initializer(=None) : 초기값, (if initializer ==None, iterable contains only one item, the first item is returned.

```python
from functools import reduce
# input
users = [
  {'mail': 'gregorythomas@gmail.com', 'sex': 'M', 'age': 73},
  {'mail': 'hintoncynthia@hotmail.com', 'sex': 'F', 'age': 29},
  {'mail': 'wwagner@gmail.com', 'sex': 'M', 'age': 51},
  {'mail': 'daniel79@gmail.com', 'sex': 'F', 'age': 32},
  {'mail': 'ujackson@gmail.com', 'sex': 'F', 'age': 42}
  ]

## Ex_1_1) No initialize 
reduce(lambda x, y : x + y['age'], users)
# {'mail': 'gregorythomas@gmail.com', 'sex': 'M', 'age': 73} + 73 # Error
# -> 리스트의 첫번째 값을 초기값으로 사용했기에 `dict` + `int`가 되면셔 Error 발생
## Ex_1_2) With initialize
reduce(lambda x, y : x + y['age'], users, 0)
# 0 + 73
# 73 + 29
# 73 + 29 + 51

## Ex_2) 
reduce(lambda x, y : x + [y['mail']], users, []) 
# [] + ['gregorythomas@gmail.com']
# ['gregorythomas@gmail.com'] + ['hintoncynthia@hotmail.com']
# ['gregorythomas@gmail.com', 'hintoncynthia@hotmail.com'] + ['wwagner@gmail.com']

```

#### Reference
[1] [T강의노트 03. 파이썬 lambda, map, filter, reduce, dic - 초보몽키의 개발공부로그](https://wayhome25.github.io/cs/2017/04/03/cs-03/)  
[2] [파이썬 reduce 함수 사용법 - daleseo님](https://www.daleseo.com/python-functools-reduce/)  
