---
layout: post
title: GTM 사용방법
date : 08 Nov 2021
category : GA_GTM
comments : true
---

`#googleTagManager, #DataLayer
`<br>

※ GTM 스터디를 위한 요약 문서입니다.

## 1. DataLayer
 : GA "페이지뷰 추적"을 목표로 GTM을 활용하는 예시

#### 1) GTM 주요 3요소
  - 태그 : 변수와 트리거가 실행될 때 명령
    - Ex) '회원가입'버튼 클릭시 GA로 보내라
  - 트리거 : 행동
    - Ex) '회원가입'버튼 클릭
  - 변수 : 트리거를 동작하는 변할 수 있는 값(조건)
    - Ex) 클릭하는 버튼명

<center>
  <strong>------------[작업 순서]------------</strong>
</center>

  1) 변수 생성 (기본 제공 & 사용자 정의 변수) <br>
  2) 트리거 생성<br>
  3) 태그 생성<br>
  4) 제출 & 게시<br>
  5) 작동 확인<br>
      1) 미리보기(디버거)로 확인<br>
      2) 애널리틱스 실시간 보고서 확인(스피어)<br>
      3) 태그 어시스턴트로 확인


#### 1) 변수 생성
  - 상황에 따라 다른값을 가질 수 있음
  - 트리거의 실행조건을 정의하거나 태그의 동적인 정보를 전달


<center>
트리거의 실행 조건이 아래와 같을 <br>

 <img src = '/assets/gtm/gtm_3_1.png' width = '80%'>
</center>


















#### Reference
[1] [구글 태그 관리자 설치 및 사용법](https://marketology.co.kr/all-category/tag-manager/%EA%B5%AC%EA%B8%80-%ED%83%9C%EA%B7%B8-%EA%B4%80%EB%A6%AC%EC%9E%90-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EB%B2%95/)

[2] [GTM사용하기](https://medium.com/@cute3681/3-ga-tag-manager-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-2cb6b27e4e61)

[3] [지원되는 태그](https://support.google.com/tagmanager/answer/6106924?hl=ko&ref_topic=3002579)
