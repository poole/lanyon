---
layout: post
title: 2023-04-19-acquisition_source_mdedium_referr
date : 11 May 2023
category : DataAnalysis_Marketing
comments : true
---
외부 채널

---

## 1.획득 (Acquisition)이란
 : GA에서 획득(Acquisition)이란, **사용자들이 어떤 경로(채널/캠페인)를 통해 우리 웹사이트를 방문**하였는지를 보여주는 개념. 이를 활용하여 마케팅 활동별 성과를 측정.

---
<br>

## 2. UTM (Urchin Tracking Module)
: 유입 구분값을 살펴보기 앞서, UTM은 어느 사이트로 부터 유입되었는지를 알려주는 꼬리표로,
타겟 사이트를 외부에 공유/홍보시 사용하는 url을 의미한다. 이 utm 값을 분석하여 유입 경로를 구분할 수 있다.

<center>

<img src = '/assets/DataAnalysis_Marketing/acquistion_source/acquistion_source_1.png' width = '80%'>
<br> <이미지 출처 : 그로스클, 김신입_마케팅용어집>

</center>  

 - ex) https://taehwanyoun.git.io?utm_source=kakao&utm_medium=push&utm_campaign=fb_promotion&utm_term=promotionAE&utm_content=202305_contents
 - utm_source=kakao : 소스(soruce)  
 - utm_medium=push : 매체(medium)  
 - utm_campaign=fb_promotion : 캠페인(campagin)  
 - utm_term=promotionAE : 유입 키워드  
 - utm_content=202305_contents : 유입 컨텐츠  
  

---
<br>

## 3. 주요 용어 구분

### 1) 채널 > 매체 > 소스

|  **구분**  |  **용어**  |  **정의**  | **예시**  |
| **그룹** | **채널(channel)** | 각 매체에서 여러 소스를 포함하는 집합이나, 매체와 유사하게 구분됨  |  | 
|:-: |:-----: |:-----: |:----- |
| **범주** | **매체(medium)** | 소스의 상위 카테고리 or 사용자를 사이트로 보내는 시스템 <br>(별도의 추가 설정이 없을 경우 기본값은 none, referral, organic 3가지뿐) | - none(없음) <br> : 직접(direct) url 입력을 통해 유입되거나, 소스 부재<br><br> - referral(추천) <br> : referral url을 클릭하여 유입 <br><br> - organic(자연검색) <br> : 구글/네이버 등 무료 검색 결과 유입<br><br> - cpc(유료검색) <br> : 키워드 광고등 유료 검색을 통해 유입 <br><br> - banner/display(디스플레이) <br> : 디스플레이/배너 광고 클릭<br><br> - social(소셜) <br> : Instagram, Facebook, Kakao 등<br> | 
| **출처** | **소스(source)** | 트레픽이 유입된 위치(검색엔진, 도메인 등)  | [google.com, naver.com, blog.naver.com] | 

※ 매체와 채널 <br>
매체와 채널은 굉장히 유사한 개념으로 보임. 앞서 utm을 살펴보면, 
매체(medium)값은 수집되는 값이지만, 채널(channel)값은 따로 utm url을 통해 수집되는 것이 아닌, GA 구분을 통해 생성되는 것 같다. (개인 추측) 
아직은 두 개념이 명확히 구분되지 않아, 우선은 매체와 소스 위주로 더 정리해보려한다.
 - 매체 : 소스를 마케팅 수단으로 그룹핑한 카테고리  
 - 채널 : 수집된 소스/매체값을 그룹핑한 카테고리

## (2) 매체 구분
 - none(없음) : 직접(direct) url 입력을 통해 유입되거나, 소스 부재
 - referral(추천) : referral url을 클릭하여 유입 
 - organic(자연검색) : 구글/네이버 등 무료 검색 결과 유입
 - cpc(유료검색) : 키워드 광고등 유료 검색을 통해 유입 
 - banner/display(디스플레이) : 디스플레이/배너 광고 클릭
 - social(소셜) : Instagram, Facebook, Kakao 등

<center>

<img src = '/assets/DataAnalysis_Marketing/acquistion_source/acquistion_source_2.png' width = '80%'>
<br> <이미지 출처 : 파인데이터랩 >

</center>  





#### Reference
[1] [[GA기본] 5-2. 구글애널리틱스 표준 보고서 (Standard reports) - 분석마케팅](https://analyticsmarketing.co.kr/digital-analytics/google-analytics-basics/2318/)  
[2] [2022_디지털마케팅(30) 구글 애널리틱스(38) - 채널 분석](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hsjeong106&logNo=221690237016)  
[3] [구글애널리틱스(GA) 사용법 : 획득보고서](https://finedata.tistory.com/39) 