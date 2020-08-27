---
layout: post
title: RMSE & MAE
date : 26 Aug 2020
category : ML_Preprocess
comments : true
---

:

## 1. RMSE

## 2. MAE
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






#### Refernce
[1]
