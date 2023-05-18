---
layout: post
title: (Prep) np.where()&np.Select()
date : 20 Oct 2020
category : Preprocess
comments : true
---

## 1. np.where()
 : 특정 조건에 따라 행별로 연산을 다르게 하고 싶을 때, 특정 컬럼의 값을 조건으로하여 연산하기.


```python
# np.where(조건문, True일 때 값, False일 때 값 )
np.where(condition,
         value if condition is true,
         value if condition is false)
```

### simple test code



```python
import pandas as pd
import numpy as np

"""
col_1 == 1일때, col_3 = col_1 * col_2
col_1 == 0일때, col_3 = col_2
"""

df_tmp = pd.DataFrame({'col_1' : [0,1,1,0],
                       'col_2' : [2,4,3,2],
                       'col_3' : [1,2,4,2]})

# using np.where
df_tmp['col_3'] = np.where(df_tmp['col_1'] == 1,
                           (df_tmp['col_1'] * df_tmp['col_2']) ,
                           (df_tmp['col_1']))
df_tmp
```

## 2. np.select()
: 복잡한 또는 다수의 조건을 활용해, 판다스 컬럼 생성하기 (More Complicated Conditions using np.select())

```python
import numpy as np
import random


# make sample data
df = pd.DataFrame({'col_1' : [random.randrange(1, 11) for i in range(10)],
                   'col_2' : [random.randrange(1, 11) for i in range(10)],
                   'col_3' : [random.randrange(1, 11) for i in range(10)]})

# create a list of our conditions
conditions = [
    (df['col_1'] <= 3),
    (df['col_1'] > 3) & (df['col_1'] <= 7),
    (df['col_1'] > 7)
    ]

# create a list of the values we want to assign for each condition
values = [(df['col_1'] * df['col_2']),
          (df['col_1'] / df['col_2']),
          df['col_3']]

# create a new column and use np.select to assign values to it using our lists as arguments
df['col_4'] = np.select(conditions, values)
df.head()
```


#### Reference
[1] [Adding a Pandas Column with a True/False Condition Using np.where()](https://www.dataquest.io/blog/tutorial-add-column-pandas-dataframe-based-on-if-else-condition)
