---
layout: post
title: (Utils) DateTime
date : 08 Sep 2020
category : Preprocess
comments : true
---

 : 로그 데이터를 다루다보면, 사용자가 언제 접속하는지, 얼마나 또는 얼마만에 접속하는지 등 시간에 관한 변수를 생성해야 하는 경우가 많다. 그러나 앱/사이트 별로 수집되는 time 변수의 format이 매번 다른 경우가 많기에 이를 핸들링해야하는 상황이 자주 생기게 되기에, time변수를 핸들링하는 방법들에게 대해서 정리해보고자 한다.

## 1. Change format : [String/int] to DateTime
 : datetime 또는 strptime 함수를 사용하여, 인자로 해당 String의 format을 넣어주면 datetime으로 바꿀 수 있다.
```python
from datetime import *

# 1) datetime
date_time_str = "20120213"
date_time_obj = datetime(year=int(date_time_str[0:4]),
                         month=int(date_time_str[4:6]),
                         day=int(date_time_str[6:8]))
print(type(date_time_obj)) # <class 'datetime.datetime'>


# 2) strptime function
## yyyymmdd -> datetime
date_time_str = "20120213"
date_time_obj = datetime.strptime(date_time_str, '%Y%m%d')

## yy/mm/dd -> datetime
date_time_str = '18/09/24'
date_time_obj = datetime.strptime(date_time_str, '%y/%m/%d')
print(type(date_time_obj)) # <class 'datetime.datetime'>

## yy.mm.dd -> datetime
date_time_str = '18.09.24'
date_time_obj = datetime.strptime(date_time_str, '%y.%m.%d')
print(type(date_time_obj)) # <class 'datetime.datetime'>

## yyyy.mm.dd str -> datetime
## : 4글자 형태의 연도는 %Y 대문자로 format 지정
date_time_str = '2018.09.24'
date_time_obj = datetime.strptime(date_time_str, '%Y.%m.%d')
print(date_time_obj) # 2018-09-24 00:00:00
```



## 2. Calculate dateTime
:datetime type은 timedelta 함수를 활용해 날짜를 변경할 수 있다.
```python
date_time_obj = datetime.strptime('18.09.24', '%y.%m.%d')
date_time_obj = date_time_obj - timedelta(days=10)
print(date_time_obj)
date_time_obj = date_time_obj + timedelta(minutes=80)
print(date_time_obj)

# 2018-09-14 00:00:00
# 2018-09-14 01:20:00
```



## 3. Get Y/M/D H/M/S Weekday
 :datetime type에서 원하는 날짜 정보만을 출력하는 방법
```python
# datetime
date_time_str = "20120213 180930"
date_time_obj = datetime.strptime(date_time_str, '%Y%m%d %H%M%S')

# Date : Y/M/D
print('Date : {}'.format(date_time_obj.date()))
print('Year : {}'.format(date_time_obj.year))
print('Month : {}'.format(date_time_obj.month))
print('Day : {}'.format(date_time_obj.day))
# Date : 2012-02-13
# Year : 2012
# Month : 2
# Day : 13

# Time : H/M/S
print('Time : {}'.format(date_time_obj.time()))
print('Hour : {}'.format(date_time_obj.hour))
print('Minute : {}'.format(date_time_obj.minute))
print('Second : {}'.format(date_time_obj.second))
# Time : 18:09:30
# Hour : 18
# Minute : 9
# Second : 30

# weekday
print('Weekday : {}'.format(date_time_obj.weekday()))
print('Weekday by string: {}'.format(date_time_obj.strftime('%A')))
# Weekday : 0
# Weekday by string: Monday
```


## 4. ISO format
 : date 객체의 정보를 'YYYY-MM-DD' 형태의 문자열로 반환하며,
  월을 12개월의 월이 아닌, 누적 주의 수로 표현 가능하다.

```python
date_time_now = datetime.now()
print('ISO format : {}'.format(date_time_now.isoformat())) # iso format을 사용하면, 월요일을 1부터 시작한 값으로 반환해준다
print('ISO Weekday : {}'.format(date_time_now.isoweekday())) #
print('ISO calender : {}'.format(date_time_now.isocalendar())) # (YYYY, num_week, weekday)

# ISO format : 2020-09-20T19:02:11.213896
# ISO Weekday : 7
# ISO calender : (2020, 38, 7)
```

## 5. Apply dateTime type to Columns
 : 컬럼에 dateTime type을 적용하는 방법을 살펴보자
```python
# 1) column type to 'datetime65[ns]' (시,분,초)
## "20120213" -> 2012-02-13 00-00-00
df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')

# 2) column type to 'date'(날짜)
## "20120213" -> 2012-02-13
df['date'] = pd.to_datetime(df['date'], format='%Y%m%d').dt.date
```

#### Reference
[1]https://www.programiz.com/python-programming/datetime/strftime  
[2] https://devanix.tistory.com/306  
