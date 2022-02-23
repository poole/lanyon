---
layout: post
title: [AWS] EC2(or Local) -> S3로 파일 전송하기
date : 24 Feb 2022
category : cloud
comments : true
---

: 타인 계정의 AWS S3로 파일을 자동으로 전달해야하는 업무가 생겨났다. 일반적으로는 동일 계정의 EC2에서 S3로 파일을 전송하는 레퍼런스가 많이 있으나, 나의 로컬 서버(linux)에서 타인 계정의 S3로 접근해야하는 상황이기에, 필요한 과정을 스텝별로 정리해보며 진행해보자.

---



## 1. Linux instence에서 AWS CLI(Command Line Interface) 설치하기  

`$sudo apt-get install awscli`   
위 명령어가 AWSCLI를 설치하는 리눅스 명령어이나, 실제로 아래 명령어를 바로 입력하면 아래와 같은 에러가 발생한다.
`E: Unable to locate package awscli`
위 에러를 피하기 위해선 아래와 같은 순서로 CLI를 설치해주자.

### > CLI 설치 Step
```bash
# 1) 경로 폴더 생성  -- 이 과정이 없을시 위 에러가 발생
$  mkdir awscliv2 # 폴더 생성 (v2로 진행 권장)
$  cd awscliv2    # 폴더 이동

# 2) 설치 링크 실행 및 파일 output지정
$  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
$  unzip awscliv2.zip # 압축 해제
$  sudo ./aws/install # cli 설치
```
[AWS CLI 설치 AWS 공식 가이드 링크(영문)](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)  


---

## 2. IAM(Identity and Access Management) 설정하기
 : CLI 설치가 완료됐다면, 목표 S3 계정에 접근하기 위한 IAM 설정해야한다. 우선 AWS는 모든 권한을 갖는 루트사용자와 일부 권한만을 갖는 IAM사용자로 나뉜다.


### 1) 접근 권한을 부여할 IAM 계정 생성
 따라서 계정간 파일 이동을 위해서는, S3를 소유하고 있는 루트 사용자가 S3권한을 부여해줄 IAM사용자를 먼저 생성한 후 해당 계정에게 아래 절차대로 권한을 부여해야 한다.

[AWS 공식 가이드 : IAM 사용자 생성 방법](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/id_users_create.html)  
[나도 한 번 만들어 보자's 블로그 : AWS IAM 사용자 만들기](https://ukayzm.github.io/aws-create-iam-user/)


### 2) 접근 권한을 부여할 IAM 계정 생성
 IAM 계정이 생성되었다면, 이제 해당 계정에 권한을 부여하고, 접근 권한을 준 S3버킷에도 접근 권한을 설정해주어야 한다.

$\star$ A : 접근을 희망하는 계정  (나)
$\star$ B : S3를 소유한 계정    (타인)



  - <b>Step 1 : A 계정 로그인  </b>
    <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_1.png' width = '80%'>
    - Q : B계정이 생성한 IAM계정인지, 완전히 독립적인 ROOT 계정인지?

  - <b>Step 2 : 검색창에 IAM 검색 및 상단 IAM 클릭 </b>
    <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_1.png' width = '80%'>

  - <b>Step 3 : 좌측 'users' 탭 클릭 </b>
    <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_3.png' width = '80%'>

[타계정(B)에게 내 계정(A)의 S3 접근 권한 부여하는 방법](https://www.youtube.com/watch?v=OhupTkhPoZM)  


 * IAM은 AWS 리소스에 대한 액세스를 안전하게 제어하는 서비스로, 자세한 설명은 아래 링크를 참조하자.
 [AWS : 루트 사용자 vs IAM 사용자](https://wonit.tistory.com/348)


 ---




#### Reference
[1] [AWS : 인스턴스에서 S3 접근, AWS CLI](https://cjsal95.tistory.com/28)  
[2] [AWS : CLI 설치 AWS 공식 가이드 링크(영문)](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)  
