---
layout: post
title: (Error) Global variable 호출시, referenced before assignment에러 발생
date : 24 Feb 2023
category : Preprocess
comments : true
---

# 1. 문제 상황
: 외부 함수에서 선언한 변수를, 다른 함수 내부에서 불러오기 위해 global로 해당 변수를 선언을 해주었다.
이후 다른 함수에서는 해당 변수가 문제없이 잘 불러와졌으나, 특정 함수에서만 global로 선언한 변수가 존재하지 않는 상태로 호출되었다는 "referenced before assignment" 에러가 발생하였다.

```Python
def global_func() :
  global a
  a = 10
global_func()
```

```Python
def local_func_1() :
  print(a)
local_func_1()
# 10 # 정상 

def local_func_2() :
  a += 10 
  print(a)
local_func_2()
# local variable 'a' referenced before assignment # Error 발생
```


# 2. 문제 원인
: 실제 `a`변수는 네임스페이스에 global로 존재하지만, `local_func_2` 함수의 `a += 10` 코드에서, Python은 새로운 지역변수를 할당하는 코드라고 인식하게 되면서, `a`라는 지역변수가 먼저 참조 되지 않았다고 에러를 발생시키는 것이다.
```Python
def local_func_2() :
  a += 10  #  Python은 새로운 지역변수를 a를 할당하는 코드라고 인식하기에 이 함수 내에서 지역변수로 선언된 a 변수를 탐색함.
  print(a)
local_func_2()
```

# 3. 문제 해결
: 따라서 해당 변수를 사용하고자 한다면,  

# 해당 변수에 새로운 할당이 발생하는 경우
# 기존의 글로벌 변수로 인식하는게 아니라, 내부함수에서 새로운 '로컬' 변수로 인식하게 됨
# 따라서, 글로벌 변수로 사용하고 싶다면, 해당 내부 함수에서 'global'로 선언을 해줘야함.

## 1. Long to Wide (pivoting)
### (1) pivot
 : `pd.pivot`함수도 있으나, 기능이 유사하고 더 범용적인 `pivot_table`함수만 정리
<center>  
<img src = '/assets/prep/221030_transpose_dataframe/transpose_wide_long_1.png' width = '80%'>
</center>

  - index

#### Reference
[1] [파이썬 referenced before assignment에러 이유와 해결 - 홍식의 개발 HDD님의 블로그](https://velog.io/@hongsikcho/%ED%8C%8C%EC%9D%B4%EC%8D%AC-referenced-before-assignment%EC%97%90%EB%9F%AC-%EC%9D%B4%EC%9C%A0%EC%99%80-%ED%95%B4%EA%B2%B0)  
