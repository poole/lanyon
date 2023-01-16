---
layout: post
title: Error - could not be resolved Pylance
date : 10 Feb 2022
category : Linux_Env
comments : true
---
`#python, #docker, virtual_envrioment
`



---
### 1. 도커 컨테이너 접속하기


```sh
# 1) 컨테이너 리스트 출력
docker ps -a #모든 컨테이너 출력(정지 컨테이너 포함)
docker ps #실행 중인 컨테이너만 출력

# 2) 컨테이너 시작
docker start hello #hello 이름의 컨테이너 시작
docker restart hello #hello 이름의 컨테이너 재시작(재부팅)

# 3) 컨테이너 접속
docker attach hello #컨테이너에 접속(bash 쉘 접속)

#  4) 컨테이너 종료
docker stop hello #hello 이름의 컨테이너 종료

#  5) 컨테이너 삭제
docker rm hello #hello 이름의 컨테이너 삭제
docker rm -f hello #hello 이름의 컨테이너 강제삭제
```

#### Reference
[1] [도커-명령어-모음](https://yeosong1.github.io/%EB%8F%84%EC%BB%A4-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C)  
[2] [Docker : 이미지와 레이어(layer) 구조](https://hyeo-noo.tistory.com/340)  
