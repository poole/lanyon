---
layout: post
title: NaverNews_Crawler : tab 화면 전환
date : 22 Oct 2020
category : 07_Crawler
comments : true
---

# naver & wikipedia crawler

## switch window ...@ㅁ@
: 네이버 뉴스 및 위키피디아를 사용해, 특정 배우의 filmo graphy와, 학력, 나이 등의 기본 정보를 스크랩핑해야 하는 상황이 생겼다.  

프로세스는 해당 배우의 이름(query)을 검색한 후, **'더보기'** 버튼을 클릭해서, 세부 내용을 가져오는 어렵지 않은 과정이었다.  

문제는 셀레니움 패키지를 사용해 **'더보기'** 버튼을 클릭할 시, 새로운 창이 뜨게 되는데, 새롭게 생겨난 창을 Driver가 잡지 못하면서 해당 페이지의 정보를 가져오지 못하게 된다.   

이렇게 새로운 탭이 생성되는 경우, `driver.switch_to.window(driver.window_handles[0])` 코드를 사용해, 탭의 위치를 지정해주어야 한다.

```python
# sample code
naver_url = str(basic_url + '&query=' + actor)
driver = webdriver.Chrome('./chromedriver')

driver.get(naver_url)
more_btn = driver.find_element_by_xpath('//*[@id="people_info_z"]/div[3]/a')
more_btn.click()

driver.switch_to.window(driver.window_handles[0])
```


```python
# full code
from bs4 import BeautifulSoup
from selenium import webdriver
from datetime import datetime, timedelta, date
import requests
import pandas as pd
import re
from math import *
import time
import wikipediaapi

actor_list = ['이민정','배수지', '박은빈', '공유']

listForDF = []
for actor in actor_list :
    # final filmo dict
    filmo_dict = {}

    # 1) get basic info from 'wikipedia'
    page_py = wiki.page(actor)
    if page_py.exists() == True :
        # (1) age
        try :
            actor_summary = page_py.summary
            regex = re.compile(r'\d+년\b')
            birth = regex.search(actor_summary)[0]
            age = int(now.year - int(re.findall(r'\d+', birth)[0]) + 1)
        except :
            age = None

        # education
        try :
            education = page_py.section_by_title('학력')
            education = education.text.split('\n')[-1]
        except :
            education = None

    else :
        print("Page - Exists: %s" % page_py.exists(), "Pass education & age")
        education = None
        age = None
        pass

    # 2) get filmo info from naver ------------------
    # url setting & Chrome driver
    naver_url = str(basic_url + '&query=' + actor)
    driver = webdriver.Chrome('./chromedriver')
    driver.get(naver_url)
    try :
        more_btn = driver.find_element_by_xpath('//*[@id="people_info_z"]/div[3]/a')
    except :
        # person with the same name
        driver.close()
        naver_url = str(basic_url + '&query=' + actor + ' 탤런트')
        driver = webdriver.Chrome('./chromedriver')
        driver.get(naver_url)
        more_btn = driver.find_element_by_xpath('//*[@id="people_info_z"]/div[3]/a')



    ## * get age & education from naver(if necessary)
    if age == None :
        try :
            age_element = driver.find_element_by_css_selector('#people_info_z > div.cont_noline > div > dl > dd:nth-child(3) > span')
            if bool(re.match("\d+년 \d+월 \d+일", age_element.text)) :
                birth = age_element.text
                age = int(now.year - int(re.findall(r'\d+', birth)[0]) + 1)
                print('{}\'s age from naver :'.format(actor) , age_element.text)
        except :
            age = None

    if education == None :
        try :
            education_element = driver.find_element_by_css_selector('#people_info_z > div.cont_noline > div > dl > dd:nth-child(9) > a')
            if '학교' in education_element.text :
                education = education_element.text
                print('{}\'s education from naver : '.format(actor), education_element.text)
        except :
            education = None

    filmo_dict['actor'] = actor
    filmo_dict['age'] = age
    filmo_dict['education'] = education

    # 3) click more information for 'filmo'
    more_btn.click()

    # 4) switch window...! (important!)
    driver.switch_to.window(driver.window_handles[-1])

    # 5-2) get filmo info
    ## (2) genre setting
    for genre in ['drama', 'movie'] :
        if genre == 'drama' :
            UI_code = str(76) # drama code : 76
        else :
            UI_code = str(78) # movie code : 78
        locate = '#listUI_'+ UI_code +' > li > span > a' # '#listUI_78 > li > span > a' #영화

        ## (5-2) get info
        filmo_list = []
        elements = driver.find_elements_by_css_selector(locate)
        for element in elements :
            filmo_list.append(element.text)

        ## (5-3) click next page & get info
        page = True
        while page == True :
            try :
                # next page click
                driver.find_element_by_xpath('//*[@id="pagination_'+UI_code+'"]/span[4]/a').click()
                time.sleep(1)

                # get title
                elements = driver.find_elements_by_css_selector(locate)
                for element in elements :
                    filmo_list.append(element.text)
            except :
                page = False
#                 print('no more page')

        # make dict
        filmo_dict[genre] = filmo_list

    # make list for DataFrame
    listForDF.append(filmo_dict)
    driver.close() # tab_2
    driver.switch_to.window(driver.window_handles[0])
    driver.close() # tab_1
df_fin = pd.DataFrame(listForDF)

```
