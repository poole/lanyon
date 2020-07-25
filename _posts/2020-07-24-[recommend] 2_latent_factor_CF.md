---
layout: post
title: [Recommend] 2_Latent Factor CF
date : 24 Jul 2020
category : Data_Science
---

# 1. Latent Factor Based Collaborative Filtering(feat.SVD) - 잠재요인 협업 필터링
: Latent Factor Based Collaborative Filtering은 행렬 분해(Matrix Facotrization)에 기반한 알고리즘으로,
대규모 다차원 행렬을 SVD(Singular vector Decompositon)와 같은 차원 축소 방식으로 사용자 행렬과 아이템 행렬을 각각 잠재요인 기준으로 생성한 후 이를 다시 내적하여 사용자가 아직 선호를 나타내지 않은 아이템에 대해서도 선호를 예측하게 해줍니다.




## Basic Concept
#### 1. 행렬 분해
 : 행렬 분해는 주어진 사용자-아이템 행렬을 '사용자-잠재요인'행렬 , '아이템-잠재요인' 행렬로 분해합니다.
 여기서 우리가 설정하게 되는 '잠재요인'이란, '영화'를 분류하는데 있어서 액션/로맨스/코미디 등과같이 서로 다른 '장르'라고 대략적으로 생각하시면 됩니다.
 ![스크린샷 2020-07-25 오후 5.55.44](/assets/스크린샷%202020-07-25%20오후%205.55.44.png)  

 행렬 분해 결과, 총 3개의 행렬이 생성됩니다.
 - $U$(사용자-잠재요인) : 사용자별 어떤 장르(잠재요인) 선호를 갖고 있는지 분해
 - $\sum$(잠재요인)
 - $V^T$(아이템-잠재요인) : 영화별 어떤 장르(잠재요인) 성격을 갖고 있는지 분해


#### 2. 행렬 결합
  ![스크린샷 2020-07-24 오후 8.13.00](/assets/스크린샷%202020-07-24%20오후%208.13.00.png)
  앞선 분해된 행렬을 다시 내적으로 곱해주면, 초기 '사용자-아이템'과 유사한 원본행렬이 생성되면서,
  기존에 관람(평가)하지 않았던 아이템에 대해서도 점주를 매길 수 있게 됩니다.

  ![스크린샷 2020-07-25 오후 6.00.30](/assets/스크린샷%202020-07-25%20오후%206.00.30.png)
  ![스크린샷 2020-07-25 오후 6.00.46](/assets/스크린샷%202020-07-25%20오후%206.00.46.png)

<!-- <img src="/assets/스크린샷%202020-07-25%20오후%206.00.46.png" width="100%"> -->

 <!-- - $R$ : original rating data matrix (사용자 - 아이템 행렬 데이터)
 - $N_u$ : number of Users (row : 사용자)
 - $N_i$ : number of items (col : 아이템)
 ![스크린샷 2020-07-25 오후 4.29.12](/assets/스크린샷%202020-07-25%20오후%204.29.12.png)
 - $N_f$ : dimension of latent factor
 - $X$ : user latent factor matrix ($N_f$ x $N_u$)
 - $Y$ : user latent factor matrix ($N_f$ x $N_i$) -->





# 2. 구현하기









#### Refernce
[1] https://dc7303.github.io/python/2019/08/06/python-memory/
[2] https://yeomko.tistory.com/5?category=805638
