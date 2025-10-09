---
layout: post
title: Relation & Causality
date : 28 Dec 2020
category : Statistics
comments : true
---

```
  [KEY WORD]
  #상관관계, #PearsonCorrelation,
  #관계강도, #Spearman,
  #자기상관, #autocorrelation,
  #인과관계, #GrangerCausality
```



## Pearson 상관관계
### 1) 변수 사이의 '선형' 관계 조사(pearson)
: 두 계량형 변수 사이의 선형 관계의 <strong>강도</strong>와 <strong>방향</strong>을 확인

## Spearman & Kendall 단조 상관관계
### 1) 선형관계와 단조관계 차이
: 앞선 pearson의 상관관계는 선형관계만을 표현 할 수 있을 뿐, 두 변수간의 관계가 곡선일 경우 Pearson의 상관관계는 이를 표현하지 못하게 되므로 관계성만을 표현해주는 Spearman 또는 Kendall의 단조관계 필요.

### 2) Spearman & Kendall
 - 변수값 대신 순위로 바꿔서 용하는 상관계수(학교 등급, 졸업 학위)
 - 비모수 검정
 - Spearman : 데이터 내 편차와 애러에 민감하며, 일반적으로 켄달의 상관계수보다 높은 값을 가짐.
 - Kendall : 샘플 사이즈가 적거나, 데이터의 동률이 많을 때 유용


<center>

<img src = '/assets/statistics/relation_causality/corr_causality_1.png' width = '80%'>  

선형관계라면 단조관계이지만,  
단조관계라고 선형관계는 아니다.

</center>



## 자기상관(autocorrelation) + 자기 회귀
### 1) 자기상관(autocorrelation)
: 시간 또는 공간적으로 연속된 일련의 관측치들간에 존재하는 상관관계로, 현재의 상태가 과거와 미래의 상태에 밀접한 연관을 지니는 경우.

### 2) 자기회귀(autoregression)
: 회귀분석에서 시계열의 관측값이 선행된 관측값에 의존하여 상관관계를 보일 때, 즉 관측값이 선행관측값들의 회귀관계를 갖는 현상을 자기회귀 (autoregression)이라 한다.
자기 회귀 현상이 발생하면, OLS방식에 의하여 추정된 회귀계수가 비록 불편성(편향이 발생하지 않은)을 만족할지라도 최적합치일 수 없다. 또한 자기회귀가 발생하는 경우, 일반적으로 t값과 f값 및 $R^2$값이 실제보다 증가하는 경향이 있음.

 [자기상관(autocorrelation)](https://m.blog.naver.com/PostView.nhn?blogId=nlboman&logNo=23353211&proxyReferer=https:%2F%2Fwww.google.com%2F)





# 인과 관계
 : A와 B사이의 '원인' - '결과' 분석을 하고 싶다면, '회귀분석' 또는 'GrangerCausality' 분석 진행



#### Reference
[1] [자기상관(autocorrelation)](https://m.blog.naver.com/PostView.nhn?blogId=nlboman&logNo=23353211&proxyReferer=https:%2F%2Fwww.google.com%2F)  
[2] [상관관계 분석(correlation analysis)](https://m.blog.naver.com/istech7/50153047118)  
[3] [공분산과 상관관계(covariance_correlation)](http://elearning.kocw.net/contents4/document/lec/2013/konkuk/leegiseong/3.pdf)  
[4] [인과관계_elearning(GrangerCausality)](http://elearning.kocw.net/contents4/document/lec/2013/Konkuk/Leegiseong/10.pdf)  
