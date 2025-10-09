---
layout: post
title: (Docker) 01_Setup
date : 16 Jan 2023
category : Linux_Env
comments : true
---
`#python, #docker, virtual_envrioment
`
```
이 글은 zini님의 GitBlog "Docker(도커) 시작하기, 설치부터 배포까지" 컨텐츠를 정리한 글입니다.
```

---
### 배경 상황
: 통상 사용하려는 패키지의 버전이 서로 다를 경우, 각 분석 환경을 독립적인 가상 환경으로 구축하여 사용한다.<br>

그런데 이때 패키지의 버전이 아닌, 파이썬 자체의 버전이 낮아 패키지 사용이 불가능한 케이스가 발생했다. 서버에 설치된 파이썬을 업데이트하려했으나, 기존의 파이썬 버전도 유지해야하는 이슈가 존재했다.<br>

이에 서버내에 복수의 파이썬을 설치하여, 버전별로 바라보는 경로를 다르게 잡는 방법도 존재하나, 독립적인 경로 설정의 어려움 및 서로 다른 파이썬 버젼에 따른 패키지간 충돌이 우려되었다. 때문에 이보다는 docker를 사용하여 독립적인 컨텐이너를 구축하여, 별도의 환경을 만들어 분석을 진행하고자 하였다.


# Docker Intro


## 1) Docker : Image & Container
: 도커에서 가장 중요한 개념은 `컨테이너`와 `이미지` !!
- **이미지** : 도커 컨테이너를 구성하는 파일 시스템과 실행할 어플리케이션 설정을 하나로 합친 것으로, 컨테이너를 생성하는 템플릿 역할을 하며, 불변함.
- **컨테이너**  : 도커 이미지를 기반으로 생성되며, 파일 시스템과 어플리케이션이 구체화되어 실행되는 상태.

따라서, 동일한 이미지로 다수의 컨테이너를 생성할 수 있고 컨테이너에 변화가 생겨도 이미지에는 영향을 주지 않는다.<br>

<center>

<img src = '/assets/Linux_Env/docker_setup/docker_setup_01.png' width = '80%'>

</center>


## 2) Docker : Layer
: 도커 이미지는 컨테이너를 실행하기 위한 모든 정보를 갖고 있기에 용량이 수백 MB이다. 처음 컨테이너를 만들기 위해서 이미지를 다운로드하는 건 필요하지만, 이미지의 불변성 때문에 현재 이미지에 작은 수정사항이 생길 시 새롭게 이미지를 다운로드 받기위해 수백MB를 다시 다운로드 받는 다면 매우 비효율적일 것이다.<br>
도커는 이 문제를 해결하기 위해, 레이어(Layer)라는 개념을 사용하여, 여러개의 레이어를 하나의 파일 시스템으로 사용할 수 있게 해준다.<br>


<center>

<img src = '/assets/Linux_Env/docker_setup/docker_setup_02.png' width = '80%' alt = "Docker : 이미지와 레이어(layer) 구조" 블로그>


도커의 이미지는 압축파일과 유사한 구조를 갖지만,<br>레이어를 공유한다는 점에서는 차이점을 지닌다.

</center>



<br>  

---
# 2. Docker Setup
도커 설치는 자동 설치 스크립트를 사용하는 방법과 패키지를 직접 설치하는 방식 2가지로 나뉜다.
## 1) Docker 설치
### (1) 자동 설치 스크립트
```sh
sudo wget -qO- https://get.docker.com/ | sh
##  hello-world 이미지도 같이 설치되는데, 사용하지 않을시 삭제
sudo docker rm 'sudo docker ps -aq'
sudo docker rmi hello-world
```

### (2) 패키지 직접 설치
- Ubuntu
  ```sh
  sudo apt-get update
  sudo apt-get nistall docker.io
  sudo ln -sf /usr/bin/docker.io /usr/local/bin/docker
  ```
- CentOS7
  ```sh
  sudo yum install docker
  sudo service docker start #Docker 서비스 실행
  sudo chkconfig docker on #부팅시 자동 실행
  ```
_Mac, Windows의 경우는 도커 공식홈에서 받고 설치하면 되므로 다른 글을 참조하자._

```sh
# 도커 설치 완료 확인
sudo docker version
```

### (3) +Tip. 패키지 직접 설치
 : docker는 명령을 root 권한으로 실행해야 하기 때문에
 명령어를 쓰기 위해서는 항상 sudo를 붙여줘야 한다.
이때, 일반적으로 root로 작업하는 경우는 많지 않기에, **일반 계정을 docker group에 추가**하여 sudo를 입력하지 않고 사용 할 수 있다.

```sh
sudo usermod -aG docker ${USER}
sudo service docker restart
```

<br>
---
## 2) 도커 이미지 다운로드 & 실행
### (1) 도커 이미지 다운로드
: 도커 이미지는 1) docker_hub 공식 이미지 다운 , 2) 직접 생성, 3) 다른 사용자가 만들어둔 이미지 다운 받는 방법이 있다.
- Docker Hub에서 이미지 받기 : <b>`docker pull <이미지 이름>:<태그>`</b>
- 사용자 이미지 받기 : <b>`docker pull <username/imagename>:<tagname>`</b>

```sh
docker pull ubuntu:latest # 우분투 최신 버젼 다운로드
docker pull ubuntu:18.04 # 우분투 특정 버젼(18.04) 다운로드
docker pull python # python
```

### (2) 도커 이미지 실행  (= 컨테이너 생성)
 : <b>`docker run <옵션> <이미지 이름> <실행할 파일>`</b>
```sh
# 1) 다운로드한 이미지 목록 확인
docker image
# 2) ubuntu 이미지를 컨테이너로 생성 후 이미지 안의 /bin/bash를 실행
docker run -it --name hello ubuntu /bin/bash
# docker run [-it] [--name 별명] <ubuntu> /bin/bash
### -it 옵션을 사용하면 실행된 Bash 쉘에 입출력을 가능하게 해줌.
### --name 옵션을 사용하면 컨테이너 이름을 지정 (미지정시 자동으로 이름 부여)
#
```
### (3) 도커 컨테이너에서 나오기
 : 위 명령어에서는 bash(terminal)을 실행하는 명령어까지 입력했기에, exit으로 빠져나오면, 컨테이너가 정지 상태로 변경된다.
```sh
exit
```


<br>  

---
# 3. 나만의 이미지 생성하기(ft. Dockerfile)




#### Reference
[1] [Docker(도커) 시작하기, 설치부터 배포까지 - zini님의 git blog](https://zinirun.github.io/2020/08/15/how-to-use-docker/#1-%EB%8F%84%EC%BB%A4%EB%A5%BC-%EC%99%9C-%EC%93%B8%EA%B9%8C-%EB%AD%90%EA%B8%B8%EB%9E%98)  
[2] [Docker : 이미지와 레이어(layer) 구조](https://hyeo-noo.tistory.com/340)  
