---
layout: post
title: Adding values ​​in two lists
date : 30 Oct 2020
category : Preprocess
comments : true
---

## Q Adding values in two lists
 : 두개의 리스트 내부에 있는 값들을 더하는 너무 간단한 문제이다.
 그러나 생각보다 코드가 길어져서 골머리를 앓다가, `zip`을 사용하니 허무하게도 쉽게 문제가 해결되었다.

## zip
 : `zip`은 동일한 개수로 이루어진 자료형을 묶어 주는 역할을 한다.

```Python
list_A = [1,2,3,4]
list_B = ['a', 'b', 'c', 'd']

list(zip(Number,name))
# [(1,'a'),(2,'b'),(3,'c'),(4,'d')]

# make dict using zip
dic
for key, value in zip(list_A, list_B) :
  dic[key] = value
print(dic)
# {1:'a', 2:'b', 3:'c', 4:'d'}

```
이렇게, 2개의 객체에서 순서대로 값을 하나씩 빼서 묶어주므로,
zip을 사용하면, 2개의 리스트의 각 원소별로 더할 수 있다!


## Adding values in two lists using 'zip'
zip을 사용한 리스트내 원소간 합 코드는 아래와 같다.
```Python
list_1 = [1,3,5,7]
list_2 = [10,20,30,40]

[x + y for x, y in zip(list_1, list_2)]

#  [11, 23, 35, 47]
```

# ETC
## dict.items() : Get keys & Values from dictionary
 :  키(Key) & 값(Value) 쌍을 리턴
```python
dict_tmp = {"철수": 90, "민수": 85, "영희": 80}
# dict_items([('민수', 85), ('영희', 80), ('철수', 90)])
```

## enumerate(list) : Get Index & Value from list
:  리스트내 인덱스(Index) & 값(Value) 쌍을 리턴.
```python
lst_tmp = ['a', 'b', 'c']
for idx, value in enumerate(lst_tmp)
  print(idx, value)
# 0,'a'
# 1,'b'
# 2,'c'
```



#### Refernce
[1] [Python zip 내장함수](https://medium.com/@hckcksrl/python-zip-%EB%82%B4%EC%9E%A5%ED%95%A8%EC%88%98-95ad2997990)
[2] [Add SUM of values of two LISTS into new LIST](https://stackoverflow.com/questions/14050824/add-sum-of-values-of-two-lists-into-new-list)
