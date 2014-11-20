---
layout: post
title: Remove ctrl-m characters on Linux
---

![ctrl-m](/content/images/ctrl-m.png)

Use `CTRL`+`V` `CTRL`+`M` to type ^M

**vi:**

	:%s/^M//g

**tr:**

	tr -d ^M < file > newfile

**sed:**

    sed 's/^M//g' file > newfile
