---
layout: post
title: secuinside 2016 manager writeup (incomplete)
category: writeup
---

KR version

이번에는 끝까지 풀지를 못해서 ㅠㅠ flag를 얻지는 못했다.
manager 문제는 allocation simulator 역할을 하는 바이너리가 주어져있고,
힙을 조작해서 취약점을 만드는 문제이다.

분석을 해 보면, while문을 통해 16바이트짜리 쿼리를 계속 보내는 것을 알 수 있다.
|cmd len check index| (각 4바이트) 형태로 되어있고, 
check = 15
cmd = 0~5 (0 : init, 1 : write, 2 : malloc, 3 : realloc, 4 : print, 5 : free)
index = 0 ~ 9

취약점은 크게 두가지가 있다. 
1. malloc에서 길이를 구조체에 저장하는데, 실제 malloc된 크기는 4096이 아니면서 구조체에 4096을 저장할 수 있다. (buffer overwrite가능)
2. realloc에서 음수 크기가 가능하다.

두 취약점을 조합해 House-of-force 기법을 쓸 수 있다.

```c
```