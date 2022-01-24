---
layout: post
title: Nan vs None
date : 18 Mar 2021
category : Preprocess
comments : true
---
: 무심코 Nan과 None을 동일한 존재로 생각하고 있었다.
그러다, 분명 모든 결측치를 제거하였는데, 아래와 같은 에러가 뜨는 것을 확인하였다.
```
Value too large for dtype('float64') sklearn.preprocessing .StandardScaler()
```
문제의 원인은 무한대 값이 포함되어 있는 것이었으나, 이 과정에서 무한대가 Nan으로도 표현될 수 있다는 글을 보고 두 표기의 차이점을 확인해보고자 한다.

## 1. None
##### `None` = `NULL`
: 타 프로그램의 Null값으로, 즉 아무것도 없는 데이터를 의미한다.
```python
# None 확인 방법
a = None

import pandas as pd
pd.isnull(a)
```


## 2. NaN
##### `NaN` = `Not A Number`
: 반면 `NaN`은 표현되지 않은 <b>부동소수점 값</b>으로, Python에서는 `float`타입이 됨.
```python
# nan 확인 방법
b = float('Nan')

import math
math.isnan(b)
```


#### Refernce
[1] [(python)None, NaN에 대해서](https://purplechip.tistory.com/5)
[2] [Value too large for dtype('float64') sklearn.preprocessing .StandardScaler()](https://stackoverflow.com/questions/45886312/value-too-large-for-dtypefloat64-sklearn-preprocessing-standardscaler)
