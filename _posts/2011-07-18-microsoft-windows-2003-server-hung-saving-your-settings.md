---
layout: post
title: Windows 2003 hung saving your settings
---

Every so often I will run into the error where a Windows 2003 server will get stuck logging off a user. The console screen will display the message "Saving your settings".

I recently run into this issue while needing to remotely reboot the server. The server in question did not have any kind of remote access card. However the server was running <a href="http://www.radmin.com/">RAdmin</a> software and I was able to get a console screen open. Both shutdown and <a href="http://technet.microsoft.com/en-us/sysinternals/bb897541">psshutdown</a> commands failed to run. Running "query session" and "query user" didn't give me any active sessions to reset.

Ultimately I used <a href="http://technet.microsoft.com/en-us/sysinternals/bb896683">pskill</a> to kill the winlogon.exe process. Once the process was killed I was able to log on via console and/or RDP.
