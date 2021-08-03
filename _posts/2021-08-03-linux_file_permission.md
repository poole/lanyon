---
layout: post
title: linux file permission (chown)
date : 03 Aug 2021
category : linux
comments : true
---
`#linux, #file, #permission, #chmod, #chown  
`

## 1. 문제 상황
<p> : linux에서 사용자 계정과 root 계정을 혼용해서 사용하다보면, 'permission error가 뜨는 경우가 종종 있다. 이때는 타 계정도 해당 폴더 및 파일에 접근하여 필요한 작업을 진행할 수 있도록 파일 권한을 변경해주어야 한다.
.</p>

## 2. linux 파일 권한 읽기
 : 우선 파일 및 폴더의 권한을 읽는 방법 부터 샅펴보자. `ls -all`명령어를 사용하면 아래와 같이 파일들의 권한과 정보를 확인 할 수 있다.
<center>  
<img src = '/assets/linux/file_permission.png' width = '80%'>
</center>

<center>

"drwxr-xr-x 13 root tand 4096 4 3 0066"
이 정보를 하나씩 확인하면, 아래와 같다.

<img src = '/assets/linux/linux_file_permission_2.png' width = '80%'>
</center>

#### * file type
  - `d`' : dir
  - `-` : 일반파일

#### * permission 종류
  - `r`(읽기): 파일의 읽기 권한 (4)
  - `w`(쓰기): 파일의 쓰기 권한 (2)
  - `x`(실행): 파일의 실행 권한 (1)

## 3. chmod : linux 파일 권한 변경하기   
<center>

 `chmod (옵션) [변경할 권한 값] [변경할 파일]`

</center>
 : 파일 소유자는 `chmod` 명령어를 사용해, 그룹 또는 사용자 전체에게 해당 파일의 권한을 변경해 줄 수 있다.
권한값을 지정할 때, 권한을 계산하는 방식은 각 권한에 따른 수치를 더하는 방식이다.
이때 파일이 디렉토리인 경우, -R (대문자) 옵션을 사용해 하위 폴더까지 권한을 변경하면 된다.
#### * 수행할 연산
  - `+` : 권한 추가
  - `-` : 권한 제거
  - `=` : 권한 부여(지정) -> 기존의 권한 속성이 사라짐

#### * 사용자
  - `u` : user, 소유자
  - `g` : group, 그룹
  - `o` : other, 일반 사용자
  - `a` : all, 모든 사용자

### (1) 권한값을 이용해, 모든 사용자의 권한을 각각 지정하는 경우
```sh
# ex) 소유자 : rwx, 그룹 : r-x, 전체사용자 : r--
chmod 751 test.txt
# ex) 소유자 : rwx, 그룹 : r-x, 전체사용자 : r--, 하위 디렉터리 폴더 모두 변경시
chmod -R 751 file_nm
```

### (2) 권한을 변경할 사용자를 지정하여 권한을 각각 지정하는 경우
```sh
# ex) 그룹에게 쓰기 기능을 추가
chmod -R g+w directory_nm
# ex) 모든 사용자에게 읽기,쓰기 권한을 부여
chmod -R a=rw directory_nm
```


## 4. chown : linux 파일 소유권을 변경
 : `chmod`는 권한을 변경했다면, `chown`은 파일 및 디렉토리의 <strong>소유권</strong>을 바꾸는 명령어다.
<center>

`chown (옵션) [변경할 유저명 또는 그룹명] [변경할 파일]`

</center>

```sh
# ex_1) test.txt 파일에 대해 소유자를 user1로 바꾼다.
chown user_1 test.txt

# ex_2) test.txt 파일에 대해 그룹명을 members1로 바꾼다.
chown :members1 test.txt

# test.txt 파일에 대해 소유자 및 그룹명을 root로 바꾼다.
chown root test.txt

# test.txt 파일에 대해 소유자는 user1, 그룹명은 user2로 바꾼다.
chown user1:user2 test.txt
```



#### Refernce
[1] [리눅스 권한(permisson) 설정(chmod,chown)(1)](https://velog.io/@wmc1415/%EB%A6%AC%EB%88%85%EC%8A%A4-%EA%B6%8C%ED%95%9Cpermisson-%EC%84%A4%EC%A0%95chmodchown1)

[2] [linux 파일, 폴더 권한 변경](https://itworld.gmax8.com/25)
