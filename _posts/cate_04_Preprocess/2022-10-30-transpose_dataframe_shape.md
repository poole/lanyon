---
layout: post
title: Transpose DataFrame Shape (wide <-> long)
date : 30 Oct 2022
category : Preprocess
comments : true
---
 : 일상적인 데이터는 주로 각 피쳐를 column으로 가져가지만, 시각화를 필요로하는 경우엔 각 피쳐값을 하나에 컬럼에 모아, 다시 새로운 변수로 할당해주는 형태인 long-form 형태의 데이터 변환이 필요하다. 이때 주로 사용하는 함수들이 상황에 따라 매번 햇갈려 정리가 필요했다. 해당 자료는 "rfriend" 내용을 정리하였다.


## 1. Long to Wide (pivoting)
### (1) pivot
 : `pd.pivot`함수도 있으나, 기능이 유사하고 더 범용적인 `pivot_table`함수만 정리
<center>  
<img src = '/assets/prep/221030_transpose_dataframe/transpose_wide_long_1.png' width = '80%'>
</center>

```Python
pd.pivot_table(df, index=, columns=, values=)
```
  - index
    : wide 형태 데이터에서, 인덱스 역할을 할 컬럼
  - columns
    : N개의 Column을 생성하기 위한, 정보를 가져올 Column
    (2개 이상의 Column을 지정할 경우, 멀티 컬럼 형태의 WideFormData생성)
  - values
    : Column에서 지정한 필드에 상응하는 값이 존재하는 Column
  - margins
    : True로 설정시, 행과 열을 기준으로 합계(All, row sum, column sum)를 같이 제시



## 2. Wide to Long (melt)
 : 주어진 WideFormData를 아래로 길게 녹여내듯 LongForm으로 변환

<center>  
 <img src = '/assets/prep/221030_transpose_dataframe/transpose_wide_long_2.png' width = '80%'>
</center>

 ```Python
 pd.melt(data, id_vars=['id1', 'id2', ...])
 ```
 - id_vars
   : longform 데이터의 인덱스 개념이 될 컬럼(column 레벨이며, index레벨이 아님.)
 - var_name
   : (default : None) Category or Group과 같이 값의 구분자가 될 필드명
 - value_name
   : (default : value) value값 column명



## 3. Stack <-> Unstack
 : 앞서 pivot과 melt함수는, transpose를 위해 기준이 되는 column들을 인자로 지정해주었던 반면, Stack & Unstack 함수는 어떤 데이터를 주어주던 필요한 형태로 변환하는 목적에 충실한 느낌이다.

 - Stack : wide to <b>"long"</b>
 - Unstack : long to <b>"wide"</b>

<center>  
 <img src = '/assets/prep/221030_transpose_dataframe/transpose_wide_long_3.png' width = '80%'>
</center>

#### (1) Stack
```Python
 pd.DataFrame.stack(level=-1, dropna=True)
```
```Python
data_wide
# [output]
#   cust_id	prod_cd	grade	pch_amt
# 0	c1	p1	A	30
# 1	c1	p2	A	10
# 2	c1	p3	A	0
# 3	c2	p1	A	40
# 4	c2	p2	A	15

data_wide.set_index(['cust_id', 'prod_cd']).\
 stack(level = -1).to_frame().head(10)
# [output]
#                           0
# cust_id	prod_cd		
# c1	p1	grade	    A
#               pch_amt	    30
#       p2	grade	    A
#               pch_amt	    10
#       p3	grade	    A
#               pch_amt	    0
# c2	p1	grade	    A
#               pch_amt	    40
#       p2	grade	    A
#               pch_amt	    15
```

#### (2) UnStack
```Python
 pd.DataFrame.stack(level=-1, dropna=True)
```
```Python
data_long
# [output]
#               0
# 0	grade	A
#       pch_amt	30
# 1	grade	A
#       pch_amt	10
# 2	grade	A
#       pch_amt	0
# 3	grade	A
#       pch_amt	40
# 4	grade	A
#       pch_amt	15


data_long.unstack()
#      grade	pch_amt
# 0	A	30
# 1	A	10
# 2	A	0
# 3	A	40
# 4	A	15

```

#### Reference
[1] [데이터 재구조화_1 : pivot & pivot_table](https://rfriend.tistory.com/275)  
[2] [데이터 재구조화_2 : melt](https://rfriend.tistory.com/278?category=675917)  
[2] [데이터 재구조화_3 : stack & unstack](https://rfriend.tistory.com/276)  
