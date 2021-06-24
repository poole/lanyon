---
layout: post
title: Nan vs None
date : 18 Jun 2021
category : env
comments : true
---
# 목표
Python을 설치하고, 프로젝트를 진행할 수 있는 가상환경을 만들기.

# 1. pyenv 설치하기
```sh
# 1) pyenv 설치
##(Mac 사용자)
brew update && brew install pyenv
brew update && brew upgrade pyenv # 최신 버전 파이썬 미지원시 -> pyenv를 업그레이드
## (Linux 사용자)
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

```sh
# 2) .bash_profile 파일에 pyenv 경로 포함 (Mac & Linux)
echo '
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
' >> ~/.bash_profile

source ~/.bash_profile
```

```sh
# 3) 최신 버전 파이썬 미지원시 -> pyenv를 업그레이드
pyenv update
```


# 2. pyenv 설치하기
```sh
# 1) 설치가능한 파이썬 버전 확인
pyenv install --list #  설치가능한 Python 항목 리스트 확인하기
pyenv install --list | grep "^\s*3\.7" # 3.7 버전 리스트만 골라서 확인하기
pyenv install --list | grep -v - # -이 들어가지 않은 버전, 즉 개발 중이 아닌 CPython만 확인
pyenv install $(pyenv install --list | grep -v - | tail -1) # 가장 최신 버전 설치시
```

```sh
# * 설치 중 문제가 발생시 Mac 유저 대처방안
# Xcode Command Line Tools 설치
xcode-select --install

# 이미 설치된 상태라면
# “xcode-select: error: command line tools are already installed,
# use "Software Update" to install updates”라고 뜸.
# 그럴 땐 당황하지 말고 아래 명령을 이어서 입력한다.

# 의존성이 있는 패키지 설치
brew install readline xz zlib sqlite3

# zlib 설정
export LDFLAGS="${LDFLAGS} -L/usr/local/opt/zlib/lib"
export CPPFLAGS="${CPPFLAGS} -I/usr/local/opt/zlib/include"
export PKG_CONFIG_PATH="${PKG_CONFIG_PATH} /usr/local/opt/zlib/lib/pkgconfig"

# 위에 써놨던 거지만... 다시 설치 시도!
pyenv install $(pyenv install --list | grep -v - | tail -1)
```
```sh
pyenv versions # 설치된 Python 버전 확인
```

# 3. 가상 환경 만들기
```sh
# 1) pip 설치하기
pip install --upgrade pip

# 2) 프로젝트 폴더 생성 및 local python 버전 지정
mkdir my-project  # 가상환경을 구축할 프로젝트 파일 생성
cd my-project     # 해당 파일로 이동
pyenv local 3.7.2 # 해당 폴더 내에서 'local'로 사용할 파이썬 버전 지정!!!!

# 3) 가상환경 생성
virtualenv venv # 해당 프로젝트에서 생성할 가상환경 생성

# 4) 가상환경 진입 & 퇴출
source venv/bin/activate # 진입 -> 앞에 (venv)라는 표식이 붙음
deactivate


매번 activate 하는 게 귀찮다면 pyenv-virtualenv를 사용하면 된다. 이렇게 하면 해당 프로젝트에 venv 폴더가 필요 없지만 pyenv의 버전으로 가상 환경이 추가된다는 점에 주의하자.
위 부분 부터 해야함... 위부분 무슨말인지 모르겠음...

```



#### Refernce
###### 1~
[1] [파이썬 버전 관리](https://alphahackerhan.tistory.com/23)
