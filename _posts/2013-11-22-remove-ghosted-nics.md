---
layout: post
title: Remove Ghosted nics
---

Found a great script for removing ghosted (hidden) NICS on [Frank Peter's blog](http://www.out-web.net").

Using the Microsoft `devcon.exe` tool the script compares the output of `find` and `findall`. If the matching device count is not equal the additional device is removed.


* **find** - Find devices that match the specific hardware or instance ID.
* **findall** - Find devices including those that are not present.


The Device Console Utilitu (DevCon) is available from [support.microsoft.com](http://support.microsoft.com/kb/311272) however this version is outdated. An up to date version can be acquired from the [Windows Driver Kit](http://www.microsoft.com/en-us/download/details.aspx?id=11800).

Detailed instructions on how to extract DevCon can be found on [technet.microsoft.com](http://social.technet.microsoft.com/wiki/contents/articles/182.how-to-obtain-the-current-version-of-device-console-utility-devcon-exe.aspx).

> * Download Windows Driver Kit. See “Links” section for dowonload [sic] location of the most recent version of WDK.
* Extract or mount ISO.
* To obtain DevCon.exe you need either to:
	* install WDK:
    	* -execute KitSetup.exe and follow on-screen instructions.
	* or perform Administrative Installation of `“setuptools_<Platform>fre”` Microsoft Software Installer (MSI) package:
	* execute the following command:
	* `"%SystemRoot%\System32\msiexec.exe" /a "<path to WDK>\setuptools_<Platform>fre.msi" targetdir="<Desired Path>"`
* for example, assuming that:
	*you need DevCon.exe for x64 (aka AMD64 aka EM64T) platform,
	* you mounted WDK ISO as drive D:,
    * you want to find DevCon.exe under your Temporary directory;
* you should execute:
	* `"%SystemRoot%\System32\msiexec.exe" /a "D:\WDK\setuptools_x64fre.msi" targetdir="%temp%"`

Keep in mind that you should have a *working* local administrator account and password. Should networking break its the only way back into the server.

```
@ECHO OFF

devcon.exe findall =net >%TEMP%\%~n0-findall.tmp
devcon.exe find =net >%TEMP%\%~n0-find.tmp

FOR /F %%i IN ('find.exe "matching device" ^<%TEMP%\%~n0-findall.tmp') DO SET findall=%%i
FOR /F %%i IN ('find.exe "matching device" ^<%TEMP%\%~n0-find.tmp') DO SET find=%%i

IF %findall% EQU %find% (
    ECHO Nothing to do.
    GOTO :End
)

FOR /F "TOKENS=1,2 DELIMS=:" %%i IN ('find.exe /V "matching device" ^<%TEMP%\%~n0-findall.tmp') DO (
    find.exe "%%i" <%TEMP%\%~n0-find.tmp >NUL || (
        ECHO Remove "%%j"
        devcon.exe remove "@%%i"
    )
)

:End
DEL %TEMP%\%~n0-*.tmp
```
