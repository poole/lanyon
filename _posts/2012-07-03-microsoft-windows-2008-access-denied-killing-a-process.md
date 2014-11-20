---
layout: post
title: Windows 2008 access denied killing a process
---

There are multiple times where I have been unable to kill a process on Windows 2008 server. Generally the process is running as a domain account. Killing the process failed using an administrative prompt and/or the account the process was started with.

The process is owned by the System account. You can use the [Sysinternals](http://technet.microsoft.com/en-US/sysinternals) tool [psexec](http://technet.microsoft.com/en-us/sysinternals/bb897553) with the -s switch to run as the System account. The -i switch allows the process to interact with the desktop.

    psexec -i -s pskill someprocess.exe`

You can use `psexec` to call a CMD prompt, taskkill, etc.
