---
layout: post
title: linux crontab bash setting error
date : 15 Dec 2021
category : Linux
comments : true
---

`#linux, #crontab, #bash, #shell
`

## 1. 문제 상황
: crontab을 사용하여 자동 예약을 걸어놓았는데, 위와 같은 에러가 발생함.  
 `/bin/sh: 1: [[: not found`


## 2. 문제 원인
 - 조건문 `[[]]` 는 bash 에서 사용하는 문법이나, 내가 crontab을 설정한 shell은 bash가 아닌, sh이었음.
 - error 발생시 날아온 메일을 확인해보면 `SHELL=/bin/sh` SHELL이 sh로 설정되어있음을 알 수 있음. (메일 위치 : /var/mail)

```
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
X-Cron-Env: <SHELL=/bin/sh>
X-Cron-Env: <HOME=/srv/dlab>
X-Cron-Env: <PATH=/usr/bin:/bin>
X-Cron-Env: <LOGNAME=dlab>
Message-Id: <20211215033701.8B348A60019@localhost>
Date: Wed, 15 Dec 2021 12:37:01 +0900 (KST)

/bin/sh: 1: [[: not found
```


## 3. 해결
 - 스택 오버플로우에서 제시한 방법(Add #!/bin/bash at the top of file)이 작동하지 않았음.
 - 스크립트 상단에 SHELL 옵션을 ```/bin/bash```로 설정함.
  (서버개발자분께 문의드림..)

```
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
```

 - 고의로 에러를 발생시킨 다음 crontab에서 날아온 메일에 SHELL 옵션이 bin/bash로 바뀌어있는 것을 확인 할 수 있음.

```
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
X-Cron-Env: <SHELL=/bin/bash>
X-Cron-Env: <PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin>
X-Cron-Env: <HOME=/srv/dlab>
X-Cron-Env: <LOGNAME=dlab>
```





#### Refernce
[1] [에러 문제 확인한 스택오버플로우](https://stackoverflow.com/questions/12230690/string-comparison-in-bash-not-found/17753098)
