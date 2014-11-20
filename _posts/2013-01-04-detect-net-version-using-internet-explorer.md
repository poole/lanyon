---
layout: post
title: Detect .NET version using Internet Explorer
---

Here is a quick method of getting the .NET versions running on a system.

Past the following text into the Internet Explorer address bar.

```
javascript:alert(navigator.userAgent)
```

![useragent](/content/images/useragent.png)

***Note:*** Be aware that the userAgent response can be modified.
