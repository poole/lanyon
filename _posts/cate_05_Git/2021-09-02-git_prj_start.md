---
layout: post
title: git 프로젝트 시작하기
date : 02 Sep 2021
category : 05_git
comments : true
---

`#git, #gitlab, #github, #branch  
`

github(or gitlab)을 사용하여, 프로젝트를 시작할때 절차별 사항들을 정리해보자.

## 1. git 서버에 프로젝트 생성하기
: git 프로젝트 생성방법은 아래 링크에 소개되어있는 절차대로 진행하면 쉽게 생성할 수 있다.(간단하기에 링크없이도 진행할 수 있다) <br>
 - [git lab 프로젝트 생성하기](https://goldsony.tistory.com/138)
<br>

## 2. git config
git에 생성한 repository를 다운받기 전,
실행하고자 하는 local pc에 내가 어떤 git 계정인지 세팅해주어야 한다.
(git 계정이 private인 경우, 서버에도 해당 계정을 초대/등록해주어야 함.)

```sh
# 1) git global config 정보 확인
git config --list

# 2) git global user.name & email 세팅
git config --global user.name "git 회원가입 시 입력한 이름"  
git config --global user.email "git 회원가입 이메일 주소"
```
<br>



## 3. 로컬 pc에 git서버 clone
내가 누구인지 설정해주었다면, remote서버내 저장되어 있는 repository를 복사해오자.
```sh
$ git clone "git 주소" # 이때 git 주소는 repository에서 copy.
```
<br>


## 4. 프로젝트 관리하기(매번 할 작업)
```sh
## 0) pull : remote 서버내 변경 사항 불러오기
$ git pull

## 1) add : 변경 내역 알리기
$ git add test.py # 특정 파일만 알림
$ git add . # 모든 변경 내역 알림

## 2) commit : 로컬 저장소에 변경 내역을 저장
$ git commit -m "이 버전의 변경 내역에 대한 설명"
$ git commit -am "이 버전의 변경 내역에 대한 설명" # add + commit

## 3) push : remote 서버에 변경 내역 올리기
$ git push -u origin master
$ git push # -u 옵션을 이용하면 다음 push때 이전 히스토리를 기억하고 반영
```
<br>


## 5. Branch 전략
 Refernce : [git branch & commend](https://www.holaxprogramming.com/2018/11/01/git-commands/)

Git 작업시 주요 브랜치는 master(main)와 develop 이며, 이외에도 기능별 브랜치가 존재하지만 지금 나는 이 두개도 벅차다..ㅎ
<center>
<img src = '/assets/git_study/git_branch.png' width = '60%'>
</center>

작업 순서는 아래와 같이 생각하면 된다.  
<br>
@ <b>[작업 시작]</b>
1. `git checkout dev` : git master branch --> dev branch 변경
    (HEAD가 dev 브랜치를 바라보며 변경사항을 저장)
2. [branch : dev] 파일 생성 및 분석 작업 진행
3. [branch : dev] `add, commit, push`

@ <b>[dev에서 작업이 끝나고 "배포할" 코드를 master로 merge할 경우]</b>
1. `git checkout master` git dev branch --> master branch 변경
    (HEAD가 master 브랜치를 바라보며 변경사항을 저장)
2. [branch : master] `git merge "dev"` : dev branch를 merge
3. [branch : master] `gut push` : 최종 배포할(merge된) 코드를 git에 업로드

###### + branch 주요 commend

```sh
## 1) branch 생성 : master branch에서 develop 이라는 새로운 branch를 만들고 갈아탄다.
$ git checkout -b dev

## 2) branch 확인 및 변경 (서버에서 만든 branch가 보이지 않을 땐, pull로 업데이트)
$ git branch # local
$ git branch -r # remote 저장소의 branch 확인
$ git branch -a # local & remote branch 모두 확인
$ git checkout "dev" # master branch로 이동

## 3) 특정 branch(dev)에 push
$ git push # 이미 dev branch에 있다면, 그냥 Push 해도됨.
$ git push -u origin dev # main에 있다면, push할 branch를 명시해줌.

## 4) master branch에 merge
$ git checkout master # master branch로 이동
$ git merge "dev" # merge 하고자 하는 branch명을 써주면 master로 merge 끝!
```



#### Refernce
[1] [git lab 프로젝트 생성하기](https://goldsony.tistory.com/138)  
[2] [git branch & commend](https://www.holaxprogramming.com/2018/11/01/git-commands/)  
[3] [branch Merge하기](https://backlog.com/git-tutorial/kr/stepup/stepup2_4.html)
