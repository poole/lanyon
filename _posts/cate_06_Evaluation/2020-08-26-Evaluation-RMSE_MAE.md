---
layout: post
title: RMSE & MAE
date : 28 Aug 2020
category : Evaluation
comments : true
---

: 모델의 성능을 평가하다보면, 종종 RMSE와 MSE를 함께 사용하는 경우를 볼 수 있습니다. 둘다 오차의 크기를 재기위한 방법인데, 서로 어떤 차이가 있고 함께 사용했을 때 어떤 장점이 있는지 비교해보고자 합니다.  

## 1. RMSE(Root Mean Square Error)
 : RMSE(평균 제곱근 오차)는 회귀 문제의 성능 지표로 주로 활용된다.
 $RMSE = \sqrt{ \frac{1}{m}  \sum_{i=1}^m(h(x^i) -y^i)^2}$


## 2. MAE(Mean Absolute Error)
 : 평균적인 오차의 크기를 나타내는 값으로, 이때 오차의 방향성은 고려하지 않는다.  
 $MAE = \frac{1}{m} \sum_{i=1}^m|h(x^i) -y^i|$

## 3. RMSE vs MAE
 : 얼핏 보면 두 지표 모두, 예측값과 실제값 사이의 오차의 거리를 측정하기 위한 지표로 큰 차이가 보이지 않는다. 그렇다면 굳이 두 지표를 함께 쓴느 이유는 무엇일까.  
 RMSE는 평균값을 계산하기 앞서, 오차에 제곱항을 씌워주기에 상대적으로 오차가 큰 값들을 더욱 크게 만드는 효과가 있다. 이점 때문에 모델 성능 평가에 있어서 RMSE를 사용할 시 작은 오차는 작게, 큰 오차는 크게 여길 수 있다는 특징이 있다.  

 나아가 RMSE는 항상 MAE보다 크거나 같으며, RMSE가 MAE와 같다면 모든 예측값과 실제값사이의 오차의 크기가 동일하다는 이야기가 되며,  
 MAE 대비 RMSE가 상대적으로 큰 값을 갖는다면, 이는 상당히 큰 오차값들이 존재함을 의미한다.



#### Refernce
[1] [Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE)](http://www.eumetrain.org/data/4/451/english/msg/ver_cont_var/uos3/uos3_ko1.htm)  
[2] https://mjdeeplearning.tistory.com/30
