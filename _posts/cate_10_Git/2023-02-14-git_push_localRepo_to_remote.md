---
layout: post
title: local repository를 remote repository로 push하기
date : 14 Feb 2023
category : Git
comments : true
---

`#git, #github, #branch , #push
`

local 디렉토리를 git remote repository로 push하기.


## 1. (remote) git 서버에 repository 생성하기
 : 일반적인 repository를 생성하되, 'README.md' 파일을 성성하지 말 것.
- 생성시, 자동으로 'main' 브랜치가 생성되며, 이후 local에서 업로드한 dev 브랜치와 remote main 브랜치간 연결이 되어있지 않아 pull request가 생성되지 않는 아래와 같은 상황이 발생.

<center>

`
There isn't anything to compare
main and mybranch are entirely different commit histories.
`

</center> 


---

## 2. local main ->  remote main repository git 연동(push)
 : 
```sh
## 1) local repository git 추적 시작
git init
## 2) git add & commit 
git add README.md
git commit -m "first commit"
## 3) local branch의 이름을 main으로 변경 (중요!!!)
git branch -M main
## 4) 원격 저장소 연결
git remote add origin {remote}
## 5) local 저장소를 원격 origin/main 브랜치로 업로드
git push -u origin main
```

## 3. dev branch 생성 하기

```sh
## 1) (local) branch 생성 : master branch에서 develop 이라는 새로운 branch를 만들고 갈아탄다.
$ git checkout -b dev

## 2) branch 확인 및 변경 (서버에서 만든 branch가 보이지 않을 땐, pull로 업데이트)
$ git branch # local
$ git branch -r # remote 저장소의 branch 확인
$ git branch -a # local & remote branch 모두 확인

## 3) (원격) dev branch 생성(push)
$ git push -u origin dev # push할 원격 dev branch를 명시.
```

## 4. dev -> main 으로 pull request 보내기
```sh
## 1) dev branch 이동
$ git checkout dev

## 2) 코드 작업
$ vi README.md # 'text 추가'

## 3) git add & commit 
git add README.md
git commit -m "first commit"

## 4) (원격) dev branch 생성(push)
$ git push -u origin dev # push할 원격 dev branch를 명시.
```

위 작업 이후, git 사이트로 이동해보면, 정상적으로 pull reqeust가 가능




#### Reference

[1] [connect_local_folder_to_git_repository](https://stackoverflow.com/questions/36132956/how-to-connect-local-folder-to-git-repository-and-start-making-changes-on-branch)  
[2] [pull_request 안될때, A_brnach and B_brnach are entirely different commit histories](https://gobae.tistory.com/137)  
[3] [기본 local 폴더 git 업로드 방법](https://huzz.tistory.com/34)