---
layout: post
title: Turn off Windows firewall using netsh
---

Usually the first step in troubleshooting communication issues is to disable the Windows firewall. Below is the netsh command.


	netsh advfirewall set allprofiles state off


Additional netsh.exe information:
[Windows Server® 2008 Network Shell (Netsh) Technical Reference](http://www.microsoft.com/download/en/details.aspx?displaylang=en&amp;id=4702)
