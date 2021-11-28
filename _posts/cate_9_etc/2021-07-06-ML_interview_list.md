---
layout: post
title: ML interview
date : 06 July 2021
category : 9_etc
comments : true
---

[TAN.D 면접 질문 및 공부 LIST]

■ 인과관계와 상관관계의 차이 [O] : https://namu.wiki/w/%EC%83%81%EA%B4%80%EA%B4%80%EA%B3%84%EC%99%80%20%EC%9D%B8%EA%B3%BC%EA%B4%80%EA%B3%84#toc
 	: 인과관계는 변수간 선후관계가 명확해야 한다.  ex) 아이스크림 판매량, 익사사망자, "기온"
 	+ 상관관계 : 둘 이상의 변수가 양/음의 방향으로 함께 움직인다면 상관관계가 있다고 할 수 있음
 	+ 인과관계 : 상관관계는 곧바로 인과관계로 이어지지 않는다.


■ CORR 상관관계가 부재할 경우 pca 사용여부에 대한 고민[●]
	 : Correation값이 낮을 시 굳이 PCA를 사용할 필요 없다
 	+ PCA의 불필요한 분산을 줄이고 주요 분산축(가장 큰 분산축)만 남겨놓기에 그 결과에 있어서 '주성분 변수간는 서로 상관관계가 전혀없다'
 	+ 따라서 Correalation의 결과 변수간 상관관계가 없다면, PCA를 실시해서 찾은 축들도 크게 의미 없는 축일 수 밖에 없다


■ Corr 제거 후 Tree사용의 부적합성...? [●]
	+ Corr 존재할 때 Regression 모델 사용시 : 회귀 계수 불안정(변수 독립성X)
 	+ Corr 존재할 때 Tree 모델 사용시
	: 분류에 중요 변수가 결정트리의 분리 조건에 나타나지 않게 되는 문제 발생(계수 불안정성으로 모델에 중요변수 미포함)
	: So 분류 정확도 감소


■ 일변량(단변량) / 이변량 / 다변량이란?
	 + 단변량 분석
		: 종속변수가 1개 ex) T-test, ANOVA, LinearRegression
	 + 이변량 분석
		: 독립변수만 2개 ex) 상관분석
	 + 다변량 분석
		: 종속변수가 2개이상(비지도) ex) 요인분석, 군집분석, 정준상관분석, 다차원척도법 등


■ Outlier detection시 독립변수가 1개일때와 2개 이상일때 방법적 차이[●]
※ https://lsjsj92.tistory.com/556
 	+ 독립변수가 많을 때 1: 1대응으로 outlier를 제거한다면, 너무 많은 데이터 손실을 발생함
 	+ 따라서 Corr을 통해 종속변수에 영향을 크게 미칠 것으로 예상되는 변수에 한하여 Outlier진행


■ (추가) 변량에 따른 Outlier detection 방법[O]
※ https://m.blog.naver.com/PostView.nhn?blogId=jinwon_hong&logNo=140160660331&proxyReferer=https%3A%2F%2Fwww.google.com%2F
	+ 일변량 : 표준점수(Z-score)를 기준으로 제거, 이때 회기분석을 single으로 multi linear regression 진행 후
	+ 이변량 : 산포도를 이용하여 독립변수와 종속변수의 관계성을 테스트하여 특정 신뢰구간에 포함되는 지 확인
	+ 다변량 : 마할로노비스 D^2값을 이용해 D^2/df가 2.5~4이상인 표본


■ Sigmoid를 어떻게 비전공자에게 coeff 를 활용해서 설명 할 수  있는가 [▲]
※ http://hleecaster.com/ml-logistic-regression-concept/
	- logistic도 결국은 선형회귀와 마찬가지로 변수에 계수(coefficient)를 곱하고 절편(intercept)을 더해서 예측 값을 찾고자 한다
	- 다만, logistic은 마지막 결과값에 예측치 대신, log-odds라는 걸 계산해주는 과정이 추가됨.
	- log-odds 계산 및 sigmoid함수를 활용한 확률값 계산 : sigmoid(log-odd)
		1) odd = 사건이 발생할 확률을 발생하지 하지 않을 확률로 나눈 값
		- log-odd = log(odd)를 취한 값
	- 이렇게 구한 logodd를 sigmoid함수에 넣으면 1/1+e^-z 0과1사이의 확률값으로 변환됨


■ Accuracy만 보는 것의 단점 --> 블로그 그래프 반드시 확인 할 것 [●]
※ https://nittaku.tistory.com/297
	- 희박한 가능성으로 발생할 상황에 대해서는 제대로 평가할 수 없음(Unbalanced data!)
	- So 모든 임계치에 대해서 정확도를 평가함으로써 희박한 가능성에 따른 낮은 확률의 정확도도 포함 할 수 있게 됨
 	- 임계치 0 : TN가 모두 FP이 되고, TN = 0이되면서 1-TNR가 1이됨 => ROC 커브 우측 종점
	- 임계치 1 : TP가 모두 FN가 되고, TN = 1이 되면서 1-TNR가 0이됨 => ROC커브 좌측 시작점


※ 1종오류와 2종오류
	Type I error : False Positive: 실제 Negative인 정답을 Positive라고 예측 (False)
	Type II error : False Negative: 실제 Positive인 정답을 Negative라고 예측 (False)


■ xgboost의 약한 모델?이라 하는 것이 linear인가 logistic인가?[●]
	: 여러개의 이진 노드!!! 트리모델이기에 당연히 logistic!!
	- 약한 Logistic모델(편향이 큰 모델)로 분류 후 오분류에 가중치를 주어 다음 모델을 생성하는 작업을 반복
	- 추후 만들어진 모델들을 결합하여 하나의 모델 구축


■ CNN을 설명하시오 [▲]
※ http://taewan.kim/post/cnn/
 	- ① CNN의 필요성 : 기존 Regression에서는 변수간 독립성이 반드시 확보되어야함
	- ② 그러나 이미지 데이터의 경우, 어쩔수 없이 주변값들이 서로 영향을 받을 수 밖에 없음
	- ③ 주변의 Correlation을 고려하여 이미지의 특징을 추출(by 필터) --이때 어떤 필터를 주는지에 따라 특징을 추출한 결과값이 달라짐
   	- ④ 여러개의 필터를 거쳐 나온 결과 채널을 다시 새로운 input값으로 사용해가며 CNN structure 구축
	- ⑤ 최종 3차원 필터를 1차원으로 펴서 input값으로 분류 진행 "fully connected"

+ PCA를 진행해서 주성분을 찾지 못했거나 성능을 개선하지 못했다면, 역으로 왜 주성분을 찾지 못하였는지 거꾸로 생각해보자
+ PCA를 test데이터가 많아서 적용했다했면, 차라리 train과 test를 합쳐서 진행해볼 생각 해보자

- 파이썬 모듈화 프로젝트 진행 경험
