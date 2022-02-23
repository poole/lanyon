---
layout: post
title: [AWS] EC2(or Local) -> S3로 파일 전송하기
date : 24 Feb 2022
category : cloud
comments : true
---

: 타인 계정의 AWS S3로 파일을 자동으로 전달해야하는 업무가 생겨났다. 일반적으로는 동일 계정의 EC2에서 S3로 파일을 전송하는 레퍼런스가 많이 있으나, 나의 로컬 서버(linux)에서 타인 계정의 S3로 접근해야하는 상황이기에, 필요한 과정을 스텝별로 정리해보며 진행해보자.

---



# 1. Linux instence에서 AWS CLI(Command Line Interface) 설치하기  

 - AWSCLI를 설치하는 리눅스 명령어 : `$sudo apt-get install awscli` <br>
 그러나 위 명령어를 바로 입력하면 `E: Unable to locate package awscli`라는 에러가 발생한다. 지정된 상위 폴더가 부재하여 발생하는 에러로 추측된다. 따라서 아래와 같은 순서로 CLI를 설치해주자.


## CLI 설치 Step
```bash
# 1) 경로 폴더 생성  -- 이 과정이 없을시 위 에러가 발생
$  mkdir awscliv2 # 폴더 생성 (v2로 진행 권장)
$  cd awscliv2    # 폴더 이동

# 2) 설치 링크 실행 및 파일 output지정
$  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
$  unzip awscliv2.zip # 압축 해제
$  sudo ./aws/install # cli 설치
```

> [AWS CLI 설치 AWS 공식 가이드 링크(영문)](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)  


---

# 2. IAM(Identity and Access Management) 설정하기
 : CLI 설치가 완료됐다면, 목표 S3 계정에 접근하기 위한 IAM 설정해야한다. 여기에서는 파일을 전달할 A계정과 S3를 소유하고 있는 B가 각각 해야하는 작업이 다르기에 구분하여 세팅 절차를 살펴보자.

## 1) [A계정] IAM 세팅
### (1) [A계정] 관리자 IAM 계정
 : 우선 AWS는 모든 권한을 갖는 루트사용자와 일부 권한만을 갖는 IAM사용자로 나뉜다. 그리고 IAM사용자에서도 IAM 계정을 생성할 관리자와 특정 목적별 IAM 계정으로 구분되어야 하는데, 만약 관리자용 IAM 사용자가 없다면 아래 포스팅을 따라 '관리자용 IAM계정'을 먼저 만들자.

> [TH : IAM 사용자 생성 방법](/_posts/cate_15_cloud/2022-02-24-aws_file_send_to_s3.md)  
[AWS 공식 가이드 : IAM 사용자 생성 방법](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/id_users_create.html)  
[나도 한 번 만들어 보자's 블로그 : AWS IAM 사용자 만들기](https://ukayzm.github.io/aws-create-iam-user/)


### (2) [A계정] S3에 파일을 전송할 목적의 IAM 계정
 : 관리자 IAM계정이 생성되었다면, 해당 계정으로 로그인 후 아래 절차대로 IAM

 - <b>Step 1 : A 계정 로그인 (관리자 IAM)  </b>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_1.png' width = '100%'>

 - <b>Step 2 : 검색창에 IAM 검색 및 상단 IAM 클릭 </b>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_2.png' width = '100%'>

 - <b>Step 3 : 좌측 'users' 탭 클릭 및 권한을 부여할 계정 선택</b>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_3.png' width = '100%'>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_4.png' width = '100%'>

 - <b>Step 4 : `Add inline policy` 버튼 클릭 및 `Json`탭 이동 </b>
 <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_5.png' width = '100%'>
 <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_6.png' width = '100%'>

 - <b>Step 5 : 정책 추가 코드 삽입 및 타겟 S3 ARN 입력 </b>
 <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_7.png' width = '100%'>
 ```
 {
     "Version": "2012-10-17",
     "Statement": [
         {
             "Effect": "Allow",
             "Action": [
                 "s3:PutObject",
                 "s3:PutObjectAcl"      
             ],
             "Resource": [
                 "arn:aws:s3:::DOC-EXAMPLE-BUCKET",  # target s3 bucket ARN
                 "arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"
             ]
         }
     ]
 }
 ```

 - <b>Step 6 : 코드로 새롭게 추가한 정책명 입력 및 생성 </b>
  <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_8.png' width = '100%'>







## 2) [B계정] IAM 세팅
### (1) [A계정] 관리자 IAM 계정
### 2) 접근 권한을 부여할 IAM 계정 생성
 IAM 계정이 생성되었다면, 이제 해당 계정에 권한을 부여하고, 접근 권한을 준 S3버킷에도 접근 권한을 설정해주어야 한다.

> $\star$ A계정 : 접근을 희망하는 계정  (나)
$\star$ B계정 : S3를 소유한 계정    (타인)






> [타계정(B)에게 내 계정(A)의 S3 접근 권한 부여하는 방법(youtube)](https://www.youtube.com/watch?v=OhupTkhPoZM)  
> [타계정(B)에게 내 계정(A)의 S3 접근 권한 부여하는 방법(docs)](https://aws.amazon.com/ko/premiumsupport/knowledge-center/s3-cross-account-upload-access/)


 * IAM은 AWS 리소스에 대한 액세스를 안전하게 제어하는 서비스로, 자세한 설명은 아래 링크를 참조하자.
 [AWS : 루트 사용자 vs IAM 사용자](https://wonit.tistory.com/348)


 ---




#### Reference
[1] [AWS : 인스턴스에서 S3 접근, AWS CLI](https://www.youtube.com/watch?v=OhupTkhPoZM)  
[2] [AWS : 인스턴스에서 S3 접근, AWS CLI](https://cjsal95.tistory.com/28)  
[3] [AWS : CLI 설치 AWS 공식 가이드 링크(영문)](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)  
