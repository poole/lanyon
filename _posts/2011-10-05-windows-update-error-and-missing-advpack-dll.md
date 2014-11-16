---
layout: post
title: Windows Update error - Missing advpack.dll
permalink: windows-update-error-and-missing-advpack-dll
redirect_from: "2011-10-05-windows-update-error-and-missing-advpack-dll/"
tags:
- windows
---

Ran into an issue with Microsoft Windows Update Service on two Windows 2003 servers. I use a 3rd party patch management tool that calls the Windows Update API. This issue was preventing the correct list of vulnerabilities and causing Windows Update to error out. One of the servers would report Error number: 0x8DDD0004 the other reported an ActiveX issue.

While exploring solutions I ran into the following error message when opening Add/Remove Windows Components via **appwiz.cpl**.

![sysocmgr-error](/content/images/sysocmgr-error.png)

I tried checking the backup to find when the file changed or went missing. However the backup software failed to launch. Windows Search found a copy of the file in **"%SystemRoot%\ServicePackFiles\i386"**. Copy and pasted it into **"%SystemRoot%\System32"**.

![advpack-dll](/content/images/advpack-dll-search.png)

In order to repair Windows Update I also needed to stop the bits and Windows Update service, rename the **"%SystemRoot%\SoftwareDistribution"** directory then restart the services.

{% highlight batch %}
%Windir%\system32\net.exe stop bits
%Windir%\system32\net.exe stop wuauserv

Ren %systemroot%\SoftwareDistribution *.bak
rd /s /q %windir%\SoftwareDistribution

%Windir%\system32\net.exe start bits
%Windir%\system32\net.exe start wuauserv
{% endhighlight %}

Everything works like a charm. Now to figure out what happened to my DLL.
