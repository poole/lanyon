---
layout: post
title: Dynamically_create_variable
date : 19 Jan 2021
category : ML_Preprocess
comments : true
---
 : 여러개의 변수를 loop문을 활용하여 자동으로 생성하는 방법.

# 1. Dynamically create variable

## 1) globals() 함수
: `globals()`함수를 사용하여, 동적으로 변수를 생성 할 수 있다.

```python
nm_list = ['cat', 'dog', 'rat']
i = 0
for nm in nm_list :
    globals()[nm] = [x for x in range(i)]

# cat = [0]
# dog = [0,1]
# rat = [0,1,2]
```

## 2) format() 활용하기
 : 할당 과정에서 format() 함수를 사용해, 규칙성을 있는 변수 목록 생성하기
```python
nm_list = ['cat', 'dog', 'rat']

i = 0
for nm in nm_list :
    i += 1
    globals()['animal_{}'.format(nm)] = [x for x in range(i)]

# animal_cat = [0]
# animal_dog = [0,1]
# animal_rat = [0,1,2]
```



#### Refernce
[1] [변수 이름을 loop 돌려서 할당하기](http://blog.naver.com/PostView.nhn?blogId=nomadgee&logNo=220857820094&parentCategoryNo=&categoryNo=57&viewDate=&isShowPopularPosts=false&from=postView)
