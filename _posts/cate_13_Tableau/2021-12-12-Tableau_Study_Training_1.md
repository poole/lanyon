---
layout: post
title: Tableau_Study_1
date : 12 Dec 2021
category : Tableau
comments : true
---

# Tableau
`#막대차트, #간트차트, #이중축`

## 목표
: 개별 bar plot에 레이블을 다는 것은 어렵지 않으나, 아래와 같이 개별 컬럼에 2가지 형태의 서로 다른 레이블을 다는 경우, `간트차트`와 `이중축`을 사용해볼 수 있다.

<center>
<img src = '/assets/tableau/tableau_study_training_1_1.png' width = '80%'>
</center>

## 단계별 과정
##### Step_1
 : 2개 이상의 필드 추가(시즌별 & 리그별)
<center>
<img src = '/assets/tableau/tableau_study_training_1_2-1.png' width = '80%'>
</center>

##### Step_2 : 개별 그래프 & 통합 그래프 만들기
 : 열 선반에 있는 카운트를 하나 더 추가 후, 해당 그래프에서 색상에 들어있는 필터를 삭제하고  간트 차트로 변경
<center>
<img src = '/assets/tableau/tableau_study_training_1_2-2.png' width = '80%'>
</center>

##### Step_3 : 2개 그래프 합치기
 : 우측 그래프기준 '이중 축'선택, 이때 기존 그래프까지 간트차트로 바뀌기에 기존 차트는 다시 Bar그래프로 변경
<center>
<img src = '/assets/tableau/tableau_study_training_1_3-1.png' width = '80%'>

<img src = '/assets/tableau/tableau_study_training_1_3-2.png' width = '80%'>
</center>

##### Step_4 : 축 동기화
  : 하단 -> 마우스 오른쪽 -> "축 동기화" 클릭
<center>
<img src = '/assets/tableau/tableau_study_training_1_4-1.png' width = '80%'>
<img src = '/assets/tableau/tableau_study_training_1_4-2.png' width = '80%'>
<img src = '/assets/tableau/tableau_study_training_1_4-3.png' width = '80%'>
</center>

#### Reference
[1] [테블루 손흥민 시즌별 대회별 득점수 시각화 #막대차트 #간트차트 #이중축](https://www.youtube.com/watch?v=kn4e5e8XICA)  
