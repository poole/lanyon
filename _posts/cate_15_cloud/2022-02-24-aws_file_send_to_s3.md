---
layout: post
title: AWS_EC2_or_Local_S3로_파일_전송하기
date : 24 Feb 2022
category : cloud
comments : true
---

: 타인 계정의 AWS S3로 파일을 자동으로 전달해야하는 업무가 생겨났다. 일반적으로는 동일 계정의 EC2에서 S3로 파일을 전송하는 레퍼런스가 많이 있으나, 나의 로컬 서버(linux)에서 타인 계정의 S3로 접근해야하는 상황이기에, 필요한 과정을 스텝별로 정리해보며 진행해보자.

* 반면 S3 버킷을 소유한 계정에서, S3 접근 및 업로드 권한이 있는 IAM계정을 생성하여 계정 Key값(Access key값 / Secret key)을 공유해준다면,
동일 계정내에서 파일을 업로드하는 이슈가 되기에, 아래의 2.번 IAM 설정 스탭을 진행하지 않아도 된다.

---

> [계정]  
$\star$ A계정 : 접근을 희망하는 계정  (나)  
$\star$ B계정 : S3를 소유한 계정    (타인)



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

 > [타계정(B)에게 내 계정(A)의 S3 접근 권한 부여하는 방법(youtube)](https://www.youtube.com/watch?v=OhupTkhPoZM)  
 > [타계정(B)에게 내 계정(A)의 S3 접근 권한 부여하는 방법(docs)](https://aws.amazon.com/ko/premiumsupport/knowledge-center/s3-cross-account-upload-access/)

 > [계정]
 $\star$ A계정 : 접근을 희망하는 계정  (나)
 $\star$ B계정 : S3를 소유한 계정    (타인)


## 1) [A계정] IAM 세팅
### (1) 관리자 IAM 계정
 : 우선 AWS는 모든 권한을 갖는 루트사용자와 일부 권한만을 갖는 IAM사용자로 나뉜다. 그리고 IAM사용자에서도 IAM 계정을 생성할 관리자와 특정 목적별 IAM 계정으로 구분되어야 하는데, 만약 관리자용 IAM 사용자가 없다면 아래 포스팅을 따라 '관리자용 IAM계정'을 먼저 만들자.

> [TH : IAM 사용자 생성 방법](/_posts/cate_15_cloud/2022-02-24-aws_file_send_to_s3.md)  
[AWS 공식 가이드 : IAM 사용자 생성 방법](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/id_users_create.html)  
[나도 한 번 만들어 보자's 블로그 : AWS IAM 사용자 만들기](https://ukayzm.github.io/aws-create-iam-user/)


### (2) S3에 파일을 전송할 목적의 IAM 계정
 : 관리자 IAM계정이 생성되었다면, 해당 계정으로 로그인 후 아래 절차대로 IAM 계정에 권한을 부여해주자.

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


---

## 2) [B계정] 접근 권한을 부여할 S3에 정책 추가
 [A]의 IAM 계정에 정책 추가가 완료되었다면, [A]가 접근할, S3 버킷에 [A계정]에서 설정했던 정책에 대한 추가가 필요하다.


 - <b>Step 1 : [B계정] 로그인 및 S3 설정 진입 </b>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_b_1.png' width = '100%'>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_b_2.png' width = '100%'>

 - <b>Step 2 : 접근을 허용할 S3 버킷 선택 </b>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_b_3.png' width = '100%'>

 - <b>Step 3 : S3 Permission 권한 설정 </b>
   상단 `Permission` 탭 클릭
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_b_4.png' width = '100%'>
   스크롤을 내려서, 우측 `edit`클릭
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_b_5.png' width = '100%'>
   아래 policy 붙여넣으며, 이때 <b>Principal의 값으로는 계정 A에 있는 IAM 사용자의 ARN을 입력해야한다!</b>
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_b_6.png' width = '100%'>
   끝났다면 하단 `save changes`

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DelegateS3Access",
            "Effect": "Allow",
            "Principal": {"AWS": "arn:aws:iam::999999999999:user/UploadData"},  ## 계정 A에서 IAM 사용자의 Amazon 리소스 이름(ARN)
            "Action": ["s3:PutObject", "s3:PutObjectAcl"],
            "Resource": [
                "arn:aws:s3:::DOC-EXAMPLE-BUCKET",
                "arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"
            ]
        }
    ]
}
```

# 3. 서버에 IAM 사용자 등록
 : 위 단계까지 마쳤다면, 우리는 A계정과 B계정의 버킷이 연결된 상황이다. 이제 다음 작업으로 EC2 or Linux 서버내에 나의 A계정을 등록해주자.

 ## EC2 & Sever의 AWS CLI에 IAM 계정 등록 절차
 ```bash
 # 1) 경로 폴더 이동  -- 이 과정이 없을시 위 에러가 발생
 $  cd awscliv2    # 폴더 이동

 # 2) configure 등록
 $  aws configure
 > AWS Access Key ID [None]: 직접 입력
 > AWS Secret Access Key [None]: 직접 입력
 > Default region name [None]: 직접 입력 #
 > Default output format [None]: 직접 입력


 # 3) 목표 S3 버킷이 출력된다면, 성공!!
 $  aws s3 ls

 ```
   <img src = '/assets/cloud/aws/upload_file_to_s3/upload_file_to_s3_check.png' width = '100%'>


# 4. [Bash] CLI S3 접근하기
 : 여기까지 왔다면, 이제 AWS CLI를 활용하여, 목표 버킷에 접근할 수 있다. CLI를 활용하여 버킷의 접근하는 코드는 아래와 같다.

```bash
#------------------------------#
# 1) 버킷 생성
#------------------------------#
aws s3 mb s3://{new-s3-bucket}

#------------------------------#
# 2) 버킷 리스트 조회
#------------------------------#
aws s3 ls s3://{my-s3-bucket}
aws s3 ls s3://{my-s3-bucket}/{directory_name}/ # 폴더 내 파일 탐색

#------------------------------#
# 3) 파일 복사
#------------------------------#
### 단순 파일 복사
aws s3 cp {local_file_nm} s3://{my-s3-bucket}
### 버킷내 디렉토리를 만들어서 복사할 경우, {버킷명}/{디렉토리명}}/ 명시
#### [local -> S3]
aws s3 cp {local_file_nm} s3://{my-s3-bucket}/{directory_name}/
### [S3 -> local]
aws s3 cp s3://{my-s3-bucket}/{directory_name}/{file_name} {local_file_nm} 

#------------------------------#
# 4) 폴더 이동
#------------------------------#
aws s3 mv s3://{my-s3-bucket}/{file_name}

#------------------------------#
# 5) 파일 삭제
#------------------------------#
aws s3 rm s3://{my-s3-bucket}/{file_name}

#------------------------------#
# 6) 동기화 (recommend using sync rather than cp)
## Note this part tends to hang sometimes, so just ctrl+c and run it again. By sync, the process will resume.
#------------------------------#
# local -> S3
aws s3 sync s3://{my-s3-bucket} local_dir/
# S3 -> local
aws s3 sync local_dir/ s3://{my-s3-bucket}
```

> [EC2에서 S3 접근하기 (CLI 코드 정리)- 시나브로101블로그](https://blog.naver.com/PostView.nhn?blogId=m2seo&logNo=222051627467)

# 5. [python] S3 접근하기
 : 끝으로 파일 업로드 과정에서 파이썬 코드로 구현하여해야 하는 경우 코드를 활용하여 file을 S3 버킷으로 업로드할 수 있다.

 ```python
 import boto3

  s3_client = boto3.client('s3')
  # 파일 올리기
  s3_client.upload_file('올리고자하는파일', '나의버킷이름', '버킷에저장될이름')
  # 파일 다운받기
  s3_client.download_file('나의버킷이름', '내려받을파일', '로컬에저장될이름')
 ```
 ---




#### Reference
##### CLI 설치
[1-1] [EC2 인스턴스에서 S3 접근, AWS CLI - 홍&천 블로그](https://cjsal95.tistory.com/28)  
[1-2] [Moving Data Between S3 and EC2 Instances - github](https://github.com/churchlab/millstone/wiki/Moving-Data-Between-S3-and-EC2-Instances)  
[1-3] [AWS : CLI 설치 AWS 공식 가이드 링크(영문)](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)  

##### IAM 계정 세팅
[2-1] [AWS : 타계정(B)에게 내 계정(A)의 S3 접근 권한 부여하는 방법(youtube)](https://www.youtube.com/watch?v=OhupTkhPoZM)  
[2-2] [AWS : 타계정(B)에게 내 계정(A)의 S3 접근 권한 부여하는 방법(docs)](https://aws.amazon.com/ko/premiumsupport/knowledge-center/s3-cross-account-upload-access/)  

##### CLI로 S3 접근 코드
[3-1] [EC2에서 S3 접근하기 (CLI 코드 정리)- 시나브로101블로그](https://blog.naver.com/PostView.nhn?blogId=m2seo&logNo=222051627467)  
