---
layout: post
title: NaverNews_Crawler
date : 16 Oct 2020
category : crawler
comments : true
---
# Naver News Cralwer


```python
from bs4 import BeautifulSoup
from datetime import datetime, timedelta, date
import requests
import pandas as pd
import re
import os
from math import *

def crawler(query,sort,s_date,e_date):
    query = query.replace(' ', '+')
    s_from = s_date.replace(".","")
    e_to = e_date.replace(".","")

    # find max page number
    # 1. url setting
    basic_url = "https://search.naver.com/search.naver?where=news"
    url = str(basic_url + '&query=' + query + "&sm=tab_opt&sort="+ str(sort)+
              "&nso=so%3Ar%2Cp%3Afrom" + s_from + "to" + e_to)

    # 2. get url
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    total_count = soup.find_all(attrs={'class':'title_desc all_my'})[0].get_text()
    total_count = total_count.split('/')[1].replace(',','')
    total_count = int(re.findall('\d+', total_count)[0])

#     maxpage = ceil(total_count/10)
#     maxpage_t =(int(maxpage)-1)*10+1   # 11= 2페이지 21=3페이지 31=4페이지  ...81=9페이지 , 91=10페이지, 101=11페이지
#     print('maxPage number : {}'.format(maxpage))

#     page = 1  
#     while page <= maxpage_t:
#         # 1. url setting
#         basic_url = "https://search.naver.com/search.naver?where=news"
#         url = str(basic_url + '&query=' + query + "&sm=tab_opt&sort="+ str(sort)+
#                   "&nso=so%3Ar%2Cp%3Afrom" + s_from + "to" + e_to +
#                   "%2Ca%3A&start=" + str(page))

#         # 2. get url
#         response = requests.get(url)
#         html = response.text

#         #뷰티풀소프의 인자값 지정
#         soup = BeautifulSoup(html, 'html.parser')

#         #<a>태그에서 제목과 링크주소 추출
#         atags = soup.select('._sp_each_title')
#         for atag in atags:
#             title_text.append(atag.text)     #제목
#             link_text.append(atag['href'])   #링크주소

#         #신문사 추출
#         source_lists = soup.select('._sp_each_source')
#         for source_list in source_lists:
#             source_text.append(source_list.text)    #신문사

#         #날짜 추출
#         date_lists = soup.select('.txt_inline')
#         for date_list in date_lists:
#             test=date_list.text   
#             date_cleansing(test)  #날짜 정제 함수사용

#         #본문요약본
#         contents_lists = soup.select('ul.type01 dl')
#         for contents_list in contents_lists:
#             #print('==='*40)
#             #print(contents_list)
#             contents_cleansing(contents_list) #본문요약 정제화


#         #모든 리스트 딕셔너리형태로 저장
#         result= {"date" : date_text ,
#                  "title":title_text ,
#                  "source" : source_text ,
#                  "contents": contents_text ,
#                  "link":link_text,
#                  "query" : query}
# #         print(page)

#         df = pd.DataFrame(result)  #df로 변환
#         page += 10

    return total_count#, df

```
