---
layout: post
title: (venv) pyenv를 활용한 다양한 버전의 python 
date : 10 April 2023
category : Linux_Env
comments : true
---
### 배경 상황
`pyenv`는 프로젝트별로, 서로 다른 Python 버전을 필요로하는 경우, 디렉토리별로 서로 다른 가상환경을 구축하여 각기다른 python 버전을 지정하여 사용할 수 있게 만들어준다.


## 1. pyenv 설치하기 (ubuntu)
#### 1) 종속성 설치
 - pyenv를 설치하기전 OS에 맞는 종속성이 필요함.
```sh
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev
# > libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev 
# >libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python-openssl
```

#### 2) pyenv-installer 설치
```sh
curl https://pyenv.run | bash
```
 : 정상 설치가 완료되면, `~/.pyenv` 폴더가 생성된다.

#### 3) shell 실행시 pyenv 실행을 위한 설정 추가
 : 설치가 완료되면, `pyenv`가 shell 실행되기 위해서, `~/.bashrc` or `~/.bash_profile` 파일의 가장 하단에 아래 문구를 추가한다.

```sh
export PATH="${HOME}/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

#### 4) 쉘 재실행
 : 변경된 설정을 저장해주기 위한, 쉘 재실행
```sh
exec "$SHELL"
```

## 2. pyenv를 활용한 파이썬 버전별로 설치하기 
#### 1) 설치 가능한 파이썬 버전 확인
```sh
pyenv install --list | grep " 3\.[678]" # 3.6 ~3.7 사이의 버전만 살펴보기
pyenv install --list #  모든 phthon 버전 확인하기
```
#### 2) pyenv를 활용한 파이썬 설치 & 삭제
```sh
## 1) python 설치
pyenv install 3.6.9  

## 2) python 설치 여부 확인
ls ~/.pyenv/versions/   

## 3) python 설치 여부 확인 (2가지 방법중 1가지 선택)
rm -rf ~/.pyenv/versions/3.6.9   
pyenv uninstall 3.6.9  
```

## 3. pyenv로 사용한 파이썬 지정하기 (⭐️⭐️⭐️)
#### 1) 설치 가능한 파이썬 버전 확인
```sh
pyenv versions # 
#   system    
#   2.7.9
#   3.6.9
# * 3.6.9
```






#### Reference
[1] [01) pyenv와 가상환경](https://wikidocs.net/10936)
[2] [pyenv란? pyenv 사용하기](https://scshim.tistory.com/602)
[3] [[python] pyenv? virtualenv?](https://velog.io/@ryu_log/pyenv-virtualenv)