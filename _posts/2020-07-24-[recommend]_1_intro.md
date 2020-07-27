---
layout: post
title : [Recommend] 1_Intro
date : 24 Jul 2020
category : DS_Study
---

# 1. 추천 알고리즘 종류
: 우선 추천 알고리즘의 종류부터 살표보자.
추천 알고리즘은 2가지 정도의 큰 범주를 갖고 있다.(Deep Learning을 활용한 방식이 최근 핫하지만, 여기선 기초적인 추천시스템 내용의 정리를 위해 배제하였다.)

**1) Contents Based Filtering**
 :유저 및 아이템의 정보를 기반해 추천
**2) Collaborative Filtering**
  : 실제 행동을 기반으로 추천하는 모델로, 컨텐츠 베이스보다 높은 성능을 보인다.
  그러나 행동 데이터가 축적되기전에는 정확도가 떨어진다는 "cold-start" 문제를 갖고 있다.
  - **최근접 이웃 기반(nearest neighbor based collaborative filtering)**
  - **잠재요인 협업 필터링 (latent factor based collaborative filtering) - SVD**

  ---
#### 데이터 종류
*Explict Data*
 - 평점등 선호와 비선호가 명확하게 구분
 - 아직 평점을 매기지 않은 데이터는 활용불가  

*Impolicit Data*
 - 선호와 비선호 구분없이 행동의 빈도수만 기록
 - 모든 데이터를 사용하여 분석 가능
  ---

# 2. Contents Based Filtering
<center> <img src = '/assets/ContentsBased.png' width="70%"></center>  

 : 장르값들을 기반으로 비슷한 영화를 묶고, 관람한 영화와 유사한 영화를 추천.


# 3. Collaborative Filtering

## 3-1. Neighborhood CF Model
: 주어진 평점 데이터를 가지고 서로 비슷한 유저 혹은 아이템 찾기 
 - pearson correlation : 1에 가까울 수록 유사한 선호 
 - ‘User-oriented Neighborhood’ &   ‘Item-oriendted Negiborhood’
 - 양/음의 관계를 계산하기에 선호와 비선호가 구분되어 있는 Explicit Dataset에 적합


## 3-2. latent factor based CF Model(feat.SVD) - 잠재요인 협업 필터링
 : 잠재요인을 기준으로 '사용자 정보 행렬'과 '아이템 정보 행렬'을 생성하고 둘을 내적하여 예측값을 생성하는 방법
  - U('사용자-잠재요인') &  Sigma(잠재요인) & vT('아이템-잠재요인')
   ![스크린샷 2020-07-24 오후 8.13.00](/assets/스크린샷%202020-07-24%20오후%208.13.00.png)











#### Refernce
[1] https://dc7303.github.io/python/2019/08/06/python-memory/
