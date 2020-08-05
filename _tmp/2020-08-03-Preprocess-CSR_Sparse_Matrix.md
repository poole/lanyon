---
layout: post
title: CSR_Sparse_Matrix
date : 25 Jul 2020
category : DataHandling
comments : true
---

: 추천 시스템, 자연어처리등을 하다보면 모든 아이템 또는 각 워드를 컬럼으로 사용해야하는 One-Hot-Encoding을 종종하게 됩니다. 그러나 이때 너무 많은 아이템 또는 단어가 컬럼 변환되며 이과정에서 대부분의 value는 0으로 이루어져 메모리만 크게 차지하는 희소 행렬을 자주 마주하게 됩니다. 이를 해결하기 위해 Sparse matrix의 종류중 하나인 CSR Matrix를 사용할 수 있으나, 문제는 인덱스만으로 이루어져있는 Sparse Matrix 특성상 종종 기존의 matrix에 적용하던 함수를 그대로 사용하면 에러가 발생하는 문제가 있어 이를 다시 어떻게 풀어가며 활용할지 CSR Matrix의 원리와 사용법을 살펴보고자 합니다.

## 1. CSR Matrix(Compressed Sparse Row) Concept
 : CSR Matrix는 단어 그대로, row별로 데이터를 압축하여 값이 존재하는 row별 column값을 출력합니다.

id|A|B|C|D|
---|---|---|---|---|
정형돈|1|3|0|0|
유재석|0|5|0|2|
노홍철|0|0|2|0|

위와 같은 행렬이 존재한다고 할때, sparse matrix의 결과는 아래와 같습니다.
```python
print(csr)
(0, 0)	1
(0, 1)	3
(1, 1)	5
(1, 4)	2
(2, 2)	2
```
이때 4번째 줄을 해석하는 방법은 1번째 row의 4번째 컬럼에 2이라는 값이 있다고 해석하면 됩니다.   


### 1) CSR Matrix 생성하기-1
 : 우선 이미 sparse한 형태의 matrix를 갖고 있다면, 이를 CSR Matrix로 변환하는 것은 `csr_matrix()`함수를 사용해 쉽게 csr_matrix를 생성할 수 있습니다.
```python
import numpy as np
from scipy.sparse import csr_matrix

x = [[1, 0, 0, 3, 0, 0],
     [0, 0, 2, 0, 5, 0],
     [0, 0, 0, 0, 1, 2],
     [2, 3, 0, 0, 0, 4]]
x = np.asarray(x)
csr = csr_matrix(x)
```
```python
csr
# <4x6 sparse matrix of type '<class 'numpy.longlong'>'
# 	with 9 stored elements in Compressed Sparse Row format>

print(csr)
# (0, 0)	1
# (0, 3)	3
# (1, 2)	2
# (1, 4)	5
# (2, 4)	1
# (2, 5)	2
# (3, 0)	2
# (3, 1)	3
# (3, 5)	4
```

### 2) CSR Matrix 생성하기-2
 : 그러나 이미 희소행렬 자체가 너무 크다면, 이를 array 형태로 생성하는 것 조차 불가능한 경우가 있습니다. 즉 One-Hot-Encoding 자체가 메모리 이슈로 인해 진행되지 않는 상황입니다.
 이 경우, OHE과정에서 `sparse_output = ture`옵션을 활용해 OHE output matrix를 csr sprase matrix로 생성할 수 있습니다.
 (특정 row가 2개 이상의 value를 갖고 있는 multi label의 상황을 가정하여 진행하였습니다.)
 ```python
 import pandas as pd
df = pd.DataFrame({'id' : [1,2,3,4,5],
                   'value' : [['a','b'],
                              ['b','f'],
                              ['c'],
                              ['a', 'c', 'e'],
                              ['e','f']]})
 ```
<center>  
<img src = '/assets/df_sample_1.png' width = '20%'>  <br><br>
<img src = '/assets/df_sample_2.png' width = '40%'>
</center>

 ```python
 from scipy import sparse
 from sklearn.preprocessing import OneHotEncoder, MultiLabelBinarizer

 ## 1) INSTANTIATE
 enc = MultiLabelBinarizer(sparse_output=True)

 ## 2) FIT & Transform
 df_mat = enc.fit_transform(df.value) # label이 들어가는 value를 input으로 fit_transform 시켜줄 것

print(df_mat)
 # (0, 0)	1
 # (0, 1)	1
 # (1, 1)	1
 # (1, 4)	1
 # (2, 2)	1
 # (3, 0)	1
 # (3, 2)	1
 # (3, 3)	1
 # (4, 4)	1
 # (4, 3)	1
 ```


 ## 2. CSR Matrix indexing
 csr_matrix는 data, indices, indptr 세가지 구성요소를 갖고있습니다.
  - `data` : matrix내에 있는 모든 0이 아닌 value값
  - `indices` : value가 위치한 columnd의 index
  - `indptr` : indptr은 위 indices를 기준으로, 각 row내 value의 indices 시작점과 끝점을 알려준다.
<center><img src = '/assets/csr_matrix_indptr.png' width = '40%'></center>  




```python
# 1) data
df_mat.data
# array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])

# 2) indices
df_mat.indices
# array([0, 1, 1, 4, 2, 0, 2, 3, 4, 3], dtype=int32)

# 3) indptr
df_mat.indptr
# array([ 0,  2,  4,  5,  8, 10], dtype=int32)
```
<center>  
<img src = '/assets/df_sample_2.png' width = '40%'>
</center>

위와 같이 생성한 행렬의 indices값을 토대로 0~2번째까지 값은 첫번째 row, 5~8번째 값은 row는 4번째 row에 속하는 값임을 알 수 있다.








#### Refernce
[1] https://lovit.github.io/nlp/machine%20learning/2018/04/09/sparse_mtarix_handling/  
[2] https://bkshin.tistory.com/entry/NLP-7-%ED%9D%AC%EC%86%8C-%ED%96%89%EB%A0%AC-Sparse-Matrix-COO-%ED%98%95%EC%8B%9D-CSR-%ED%98%95%EC%8B%9D  
