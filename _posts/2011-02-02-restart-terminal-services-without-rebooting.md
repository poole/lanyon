---
layout: post
title: Restart Terminal Services without rebooting
---

<h3>Restart Terminal Services Without Rebooting</h3>
Microsoft Windows 2003 and lower does not allow you start or stop the Terminal Services service. However if you can't schedule a server reboot there is an alternative.

Download the <a href="http://technet.microsoft.com/en-us/sysinternals">Sysinternals</a> tool <a href="http://technet.microsoft.com/en-us/sysinternals/bb896653">Process Explorer</a>

Using Process Explorer locate the `svchost.exe -k termsvcs` process. There will be a number of running svchost.exe processes. Hover your mouse over them to identify the correct one. Once you find it, right click and kill it. The Terminal Services service will now be stopped.
<img class="size-large wp-image-2015 aligncenter" title="sysinternals-process-explorerer" src="http://www.misctechmusings.com/wp-content/uploads/2011/02/sysinternals-process-explorerer.jpg" alt="" width="608" height="83" />
Restart the service (no longer greyed out) and your good to go.
