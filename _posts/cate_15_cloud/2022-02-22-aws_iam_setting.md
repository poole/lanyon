---
layout: post
title: [AWS] 계정 생성 및 IAM User 생성하기
date : 22 Feb 2022
category : cloud
comments : true
---

: AWS에 최초 계정을 생성하고 나면, 해당 계정은 Root 계정이 된다. 이 루트 계정은 모든 권한을 가지고 있으나, AWS는 보안 및 업무에 따른 권한 이슈로 Root계정의 사용보다는 각 목적에 맞는 권한을 갖춘 IAM User를 생성해서 사용하길 강력하게 권고하고 있다.

생성 절차별로 스텝을 따라가면 되기에, 개념과 각 스텝을 잘 설명해주신 블로그 링크를 참조하자.



## 1. 루트 사용자 vs IAM 사용자
 : 루트 사용자는 모든 권한을 갖지만, 보안이 뚫렸을 경우 모든 리소스에 큰 피해가 갈 수 있다. 때문에 IAM 계정은 목적에 맞게 권한을 계정을 분할하여 생성 및 관리하게 된다.
 [IAM 장점]
 - AWS 계정의 공유 액세스
 - 세분화된 권한
 - 무료
> [원잇님 블로그 : 루트 사용자 vs IAM 사용자](https://wonit.tistory.com/348)

## 2. 관리자 & 세부 목표 IAM User(Upload File to S3) 생성
 : AWS는 IAM User를 생성하는 역할도, 관리자 IAM User를 먼저 만들어 진행하라고 권고하기에, 관리자급 IAM 사용자 생성 및 관리자 폴더를 생성하고, 이후, 특정 세부 목표를 지닌 IAM 유저를 생성해야한다.
> [나도 한 번 만들어 보자's 블로그 : AWS IAM 사용자 만들기](https://ukayzm.github.io/aws-create-iam-user/)




#### Reference
[1] [AWS 공식 가이드 : 루트 사용자 vs IAM 사용자](https://wonit.tistory.com/348)
[2] [나도 한 번 만들어 보자's 블로그 : AWS IAM 사용자 만들기](https://ukayzm.github.io/aws-create-iam-user/)
