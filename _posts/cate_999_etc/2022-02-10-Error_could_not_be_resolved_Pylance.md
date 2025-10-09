---
layout: post
title: Error - could not be resolved Pylance
date : 10 Feb 2022
category : ETC
comments : true
---
`#vscode, #python, #jupyter_notebook, #Pylance
`
## 1. 문제 상황
: VScode로 파이썬을 작성하면, `Pylance`라는 패키지가 내 코드내의 에러를 미리 예상하여 확인할 수 있도록 도움을 준다.
그런데, 외부 폴더에 있는 모듈을 불러오는 과정에서 아래와 같은 경고성 에러가 발생한다.실제로는 외부 폴더의 경로를 `sys.path.append()`로 잡아주었기에 코드는 정상 작동하나, 해당 모듈을 클릭하거나, 모듈 내 함수가 미리보기로 출력되지 않는 불편함이 발생한다.

<center>

<img src = '/assets/etc/error/pylance/pylance_error_1.png' width = '80%'>

</center>


<br>
## 2. 문제 원인
 : `Pylance`는 디폴트로 내 워크스페이스의 root 경로를 포함한다. 때문에 서브 디렉토리를 경로로 추가하고 싶은 경우에는 vscode 세팅 기능을 활용하여 extraPaths를 설정해주어야 한다.

<br>
## 3. 문제 해결 방법
  (1) 세팅 화면 열기 : `ctrl(cmd)` + `,`  
  (2) 추가 경로 옵션 검색 : `python.analysis.extraPaths`검색  
  (3) 추가 경로 입력 버튼 클릭 : `Add Item`  
  (4) 추가 서브 디렉토리 경로 입력 : ex) `/home/th/subdirectory/`  

  <center>

  <img src = '/assets/etc/error/pylance/pylance_error_2.png' width = '80%'>

  </center>


#### Reference
[1] [stackoverflow - import 'module' could not be resolved Pylance](https://stackoverflow.com/questions/65252074/import-path-to-own-script-could-not-be-resolved-pylance-reportmissingimports)  
