---
layout: post
title: Thumb drive toolkit
---

A Windows Administrator USB toolkit. The following is a collection of free and/or open source tools I like to keep on hand.
### [Portable Apps collection](http://portableapps.com)

![portable-apps](/content/images/portableapps-com-logo.png)

> PortableApps.com Suite™ is a complete collection of portable apps including a web browser, email client, office suite, calendar/scheduler, instant messaging client, antivirus, audio player, sudoku game, password manager, PDF reader, minesweeper clone, backup utility and integrated menu, all preconfigured to work portably. Just drop it on your portable device and you're ready to go.

PortableApps has a huge number of programs available. Some more useful than others. Here are the apps I like to keep in my toolkit.

* KeePass - Encrypted password database
* Chrome - Chrome browser
* Putty - Secure Shell / telnet client
* LibreOffice - OpenOffice fork
* Notepad++ - Highly usable text editor
* 7zip - File archiver with a high compression ratio.
* ClamWin - Antivirus
* FileZilla - FTP client
* InfraRecorder - CD/DVD read/write
* winMd5Sum - md5sum check and compair
* WinSCP - Secure copy client.
* Windows Error Lookup Tool

![sysinternals](/content/images/sysinternals-logo.gif)

An useful set of tools made my [Mark Russinovich](http://blogs.technet.com/markrussinovich/about.aspx) now available through Microsoft. Take some time and browse through the available tools. I find I use the Sysinternal tools almost everyday. Not sure how someone would administer Windows without them.

[Sysinternals Suite](http://technet.microsoft.com/en-us/sysinternals/bb842062)
The entire set of Sysinternals Utilities rolled up into a single download.
[PsTools](http://technet.microsoft.com/en-us/sysinternals/bb896649")
The PsTools suite includes command-line utilities for listing the processes running on local or remote computers, running processes remotely, rebooting computers, dumping event logs, and more.

Keep your Sysinternals tools up to date with using a [Portable Apps](http://portableapps.com/) compatible tool [WSCC](http://www.kls-soft.com/wscc/index.php)

![wscc](/content/images/wscc.jpg)

Found a nice batch file to keep your Sysinternals tools updated over at [SysadminGeek.com](http://www.howtogeek.com/50356/batch-script-to-auto-update-sysinternals-tools/)

```bat
@ECHO OFF

TITLE Sysinternals Updater
ECHO Sysintenals Updater
ECHO Written by: Jason Faulkner
ECHO SysadminGeek.com
ECHO.
ECHO.

SETLOCAL ENABLEDELAYEDEXPANSION

SET SysInternalsTools="%Temp%\SysInternalsTools.tmp.txt"
SET CurrentTasks="%Temp%\CurrentTasks.tmp.txt"
SET StartWhenFinished="%Temp%\StartWhenFinished.tmp.txt"

ECHO Detected directory: %~dp0
%~d0
CD %~p0
ECHO.
ECHO.

ECHO Downloading current tool list...
SET LiveShare=\\live.sysinternals.com\tools
START /MIN %LiveShare%
DIR %LiveShare% /B &amp;gt; %SysInternalsTools%
TASKLIST &amp;gt; %CurrentTasks%
ECHO ;Terminated tools &amp;gt; %StartWhenFinished%

ECHO.
ECHO Updating installed SysInternals tools
FOR /F %%A IN ('DIR /B') DO (
    FOR /F "usebackq" %%B IN (%SysInternalsTools%) DO (
        IF /I [%%A]==[%%B] (
            ECHO Updating %%A
            FOR /F "usebackq" %%C IN (%CurrentTasks%) DO (
                IF /I [%%A]==[%%C] (
                    ECHO %%C is currently running, killing process - queue restart
                    ECHO %%C &amp;gt;&amp;gt; %StartWhenFinished%
                    TASKKILL /IM %%A /T /F
                )
            )
            XCOPY %LiveShare%\%%B %%A /Y
            ECHO.
        )
    )
)

ECHO.
ECHO Resuming killed tasks
FOR /F "usebackq skip=1" %%A IN (%StartWhenFinished%) DO (
    ECHO Starting %%A
    START "Sysinternals Tool" "%%A"
)

IF EXIST %SysInternalsTools% DEL %SysInternalsTools%
IF EXIST %CurrentTasks% DEL %CurrentTasks%
IF EXIST %StartWhenFinished% DEL %StartWhenFinished%

ENDLOCAL

ECHO.
PAUSE
```

MS recently added Sysinternals Live. Description below from their site.

[Sysinternals Live](http://live.sysinternals.com/)

> Sysinternals Live is a service that enables you to execute Sysinternals tools directly from the Web without hunting for and manually downloading them. Simply enter a tool's Sysinternals Live path into Windows Explorer or a command prompt as [http://live.sysinternals.com/](http://live.sysinternals.com/) or live.sysinternals.comtools.

> You can view the entire Sysinternals Live tools directory in a browser at [http://live.sysinternals.com](http://live.sysinternals.com/).

![dban](/content/images/dban-logo.png)

### [Darik's Boot And Nuke](href="http://www.dban.org/)

> Darik's Boot and Nuke ("DBAN") is a self-contained boot disk that securely wipes the hard disks of most computers. DBAN will automatically and completely delete the contents of any hard disk that it can detect, which makes it an appropriate utility for bulk or emergency data destruction.

If you deal with server decomisions on a regular basis, this is an invaluable tool. This bootable image will allow your to perform a DOD compliant drive wipe.

Any additional tools you must have on hand?
