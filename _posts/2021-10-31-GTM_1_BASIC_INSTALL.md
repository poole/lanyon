---
layout: post
title: GTM 개념 및 설치
date : 31 Oct 2021
category : GA
comments : true
---

`#googleTagManager
`
※ GTM 스터디를 위한 마케톨로지 가이드 요약 문서입니다.

## 1. 구글 태그 관리자(GTM)란?
 : 구글 + 태그 + 관리자 '구글에서 만든 태그를 (효율적으로) 관리해 주는 툴'

#### 1) 태그(Tag)
  - 태그 : 광고나 로그분석 프로그램을 실행시키는 짧은 자바스크립트 코드(= 스니펫)로 html 문서ㅔ 추가되어 코드내에 지정된 작업이 실행됨.

<center>
 <img src = '/assets/gtm/gtm_1_1.png' width = '80%'>

"GTM을 사용해 위 코드 대신, GTM의 코드가 설치되고,  
 기능과 설정을 GTM에서 쉽게 관리가능"
</center>

## 2.태그 관리자 장점
#### 1) html문서 편집 필요 X
 : 대시보드에 값을 입력하는 방식으로 작성하기에, html 문서를 편집할 위험성이 낮음.

#### 2) 태그 관리자 코드가 여러 코드를 대신함
 : GA, 카카오광고, 페이스북 등 여러 서비스의 추적 기능을 활성화 할 수 있음.
  <center>
   <img src = '/assets/gtm/gtm_1_2.png' width = '80%'>
  </center>

#### 3) 트리거를 이용해 복잡한 기능 구현 가능
 : 이벤트가 전달 복잡한 조건문을 마케터가 설정가능
<center>
 <img src = '/assets/gtm/gtm_1_3.png' width = '60%'>
</center>


## 2. GTM 설치 방법
#### 1) GTM 컨테이너 스니펫(태그)
: GTM의 추적을 가능하게 해주는, 웹페이지상의 짧은 스크립트 코드
<center>
 <img src = '/assets/gtm/gtm_2_1.png' width = '80%'>
</center>

#### 2) [컨테이너 스니펫] 스크립트 발급받기
  - step_1 : 구글 계정 준비
    - GA or Google Ads 에 사용한 메일 주소 추천)
  - step_2 : 컨테이너 생성  
    - 계정을 회사 / 컨테이너를 웹(앱) 단위로 관리 추천
  <center>
   <img src = '/assets/gtm/gtm_2_2.png' width = '80%'>
  </center>

  - step_3 : 컨테이너 클릭시 스니펫(태그 : 추적 코드) 출력!   
  <center>
   <img src = '/assets/gtm/gtm_2_3.png' width = '80%'>
  </center>

  - step_4 : 설치가이드에 따라 코드를 복사 & 웹페이지 상의 html 상단에 추가 <br>
    - 대부분의 웹사이트 및 쇼핑몰 솔류션에서 웹페이지 상단 부분을 별도의 헤더 파일로 관리함. <br>
    - 워드프레서, 카페24, 고도몰 등 헤더 파일이 따로 있고, 그안에 <head> 태그가 있는 경우, 해당 파일에만 코드 추가시 모든 페이지에 적용됨.
    <center>
     <img src = '/assets/gtm/gtm_2_4.png' width = '70%'>
    </center>


#### Refernce
[1] [GTM관리자란 무엇이고 왜 사용하는가 - 마케톨로지](https://marketology.co.kr/all-category/tag-manager/%ea%b5%ac%ea%b8%80-%ed%83%9c%ea%b7%b8-%ea%b4%80%eb%a6%ac%ec%9e%90%eb%9e%80-%eb%ac%b4%ec%97%87%ec%9d%b4%ea%b3%a0-%ec%99%9c-%ec%82%ac%ec%9a%a9%ed%95%98%eb%8a%94%ea%b0%80/)  

[2] [구글 태그 관리자 설치 및 사용법 - 마케톨로지](https://marketology.co.kr/all-category/tag-manager/%EA%B5%AC%EA%B8%80-%ED%83%9C%EA%B7%B8-%EA%B4%80%EB%A6%AC%EC%9E%90-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EB%B2%95/)
