---
layout: post
title: Git 버전관리의 본질
date : 22 Aug 2021
category : Git
comments : true
---
`#git, #생활코딩, #본질
`

## 1. git 설치
 [git 설치사이트 : www.git-scm.com](www.git-scm.com)


## 2. git 저장소 관리
```sh
# 1) 프로젝트 파일 생성 및 폴더로 진입
mkdir git_prj
cd git_prj

# 2) 현재 디렉토리를 git의 버전 저장소로 만
## 해당 폴더 내에 `.git` 이라는 디렉토리가 함께 생성되며, 해당 폴더 내에 git 관리 정보가 들어있음.
git init
```


## 3. 관리할 파일 생성
```sh
# 1) 파일 생성 및 수정
vim f1.txt

# 2) git에게 위 파일을 관리하라고 명령 (최초 생성 & 추후 수정할 때 마다)
git add f1.txt

# 3) git이 관리하는 파일 확인하기
git status
```


## 4. GIT 버전관리
```sh
# 1) Git에 내 정보 등록하기(최초 1회)
git config --global user.name [git에 가입한 아이디]
git config --global user.email [git에 가입한 이메일]

# 2) 버전 저장 하기 : "Commit"
git commit  -m '버전 내용 작성'

# 3) 버전 기록 확인하기
git log
```


## 5. GIT Stage Area
### 1) 왜 commit 전에 add를 해야 하는가
- 파일의 버전관리에 있어서 '선택적 파일 관리'를 가능하게 해줌
- 협업 과정에서 여러파일을 관리하다 보면, 버전관리에 포함되어야 할 파일과 그렇지 않은 파일이 나뉠 수 있음. (stage에 올릴 파일들을 선택할 수 있음.)

<center>

< local(개인PC) --> `git add` -->  Stage(=commit 대기 상태) -> git_repository >

</center>


## 6. GIT 변경사항 확인하기(log / diff)
```sh
# 1) 로그에서 출력되는 버전간의 차이점 확인하기
git log -p

# 2) 특정 버전간의 차이점을 비교할 때
## (1) commit 아이디 확인하기
## : git log시 commit : 'commit id' 값 확인
## (2) 버전간 차이점 확인하기
git diff 'commit_id_1' 'commit_id_2'

# 3) git add하기 전과  git add 후의 파일 내용 비교
git diff
```

## 7. Reset : 과거로 돌아가기
- 1) reset : 이전 버전 id로 돌아가기
- 2) revert : 버전 id의 커밋을 취소한 내용을 새로운 버전으로 만들기..?

```sh
# 1) reset
## : 최신 commit 대신, 과거 시점의 특정 커밋을 가장 최신 상태로 되돌리기
## reset은 git_repository에 공유하기 전단계의 파일들일 것!!
git reset --hard 'commit_id_1'  # commit_id_2 --> commit_id_1

# 2) revert
git revert 'commit_id_1'
```


#### Reference
[1] [[생활코딩 : 지옥에서 온 git] 버전관리의 본질](https://opentutorials.org/course/2708/15242)  
