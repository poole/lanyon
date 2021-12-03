---
layout: post
title: Git 협업 전략
date : 07 Oct 2021
category : 05_Git
comments : true
---

`#git, #gitlab, #github, #branch, #collaboration  
`

이전 문서에서, Git을 활용한 프로젝트 관리의 시작 단계를 살펴보았다.
그러나 실제 팀원과 동일한 코드 내에서 작업을 해야하는 환경에서는 Git을 활용하더라도 코드가 충돌하여 에러가 뜨는 경우가 자주 발생하였다.
이에, Git을 이용한 협업 전략을 살펴보자.

#### 현재 브랜치 상태
 - 최종 코드 : Master branch
 - 개발 코드 : dev branch

## Step 1. 격리된 개별 브랜치 생성하기
 : main - dev 뼈대를 두고, 각자의 브랜치 생성하하고 각자의 브랜치에서 작업을 수행
  * 이때 브랜치이름을 'feature/main', 'feature/run' 이렇게 네이밍을 항
<center>
<img src = '/assets/git_study/git_collaboration_1.png' width = '80%'>
</center>

```sh
git branch [branch_nm] #  브랜치 생성
git checkout [branch_nm]# 생성한 독립된 브랜치로 이동
```


## 2. 개별 브랜치에서 dev브랜치에 합치기 전에 검토 요청하기 (pull request)
 : 개별 브랜치에서 만든 내용을 다시 dev에 합치려고 합니다. 이때 바로 합치기 보다, dev 브랜치에 내 코드를 합칠테니 검토를 부탁한다는 요청을 보냅니다.




#### Refernce
[1] [초심자를 위한 Github 협업](https://milooy.wordpress.com/2017/06/21/working-together-with-github-tutorial/)  
