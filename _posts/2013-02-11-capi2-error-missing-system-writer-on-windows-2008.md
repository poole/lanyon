---
layout: post
title: CAPI2 error - Missing System Writer on Windows 2008
---

System Writer is missing from the output of `vssadmin list writers`. The Application Event log is showing Event ID 513 source CAPI2.

Had a hell of a time resolving this issue. Most of the sources point to a permissions issue. However the security log remains error free.
The script below is combines a couple suggested fixes. One of the fixed is from the Microsoft KB article [2009272](http://support.microsoft.com/kb/2009272). Other items were found in various forums.

Either run the script as is or break it down in parts to show the exact issue. Be sure to restart the cryptographic service if not running the script in its entirety.

```
::  Reset Reg and Dir ACLs

Takeown /f "%windir%\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files" /a

icacls "%windir%\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files" /grant "NT AUTHORITY\SYSTEM:(RX)"
icacls "%windir%\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files"  /grant "NT Service\trustedinstaller:(F)"
icacls "%windir%\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files"   /grant "BUILTIN\Users:(RX)"
icacls "%windir%\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files" /grant "Administratoren:(RX)"

Takeown /f %windir%\System32\DriverStore /a

icacls %windir%\System32\DriverStore /grant "NT AUTHORITY\SYSTEM:(RX)"
icacls %windir%\System32\DriverStore /grant "NT Service\trustedinstaller:(F)"
icacls %windir%\System32\DriverStore /grant "BUILTIN\Users:(RX)"
icacls %windir%\System32\DriverStore /grant "Administratoren:(RX)"

Regini Registry\Machine\System\CurrentControlSet\services [1 5 7 11 14 17 21]
Regini Registry\Machine\Software\Microsoft\WBEM\CIMOM [1 5 7 11 14 17 21]


:: System state backup failed w/ The system writer is not found in the backup
:: kb2009272
:: vssadmin list writers = "System Writer" missing

Takeown /f %windir%\winsxs\temp\PendingRenames /a

icacls %windir%\winsxs\temp\PendingRenames /grant "NT AUTHORITY\SYSTEM:(RX)"
icacls %windir%\winsxs\temp\PendingRenames /grant "NT Service\trustedinstaller:(F)"
icacls %windir%\winsxs\temp\PendingRenames /grant BUILTIN\Users:(RX)

Takeown /f %windir%\winsxs\filemaps\* /a

icacls %windir%\winsxs\filemaps\*.* /grant "NT AUTHORITY\SYSTEM:(RX)"
icacls %windir%\winsxs\filemaps\*.* /grant "NT Service\trustedinstaller:(F)"
icacls %windir%\winsxs\filemaps\*.* /grant BUILTIN\Users:(RX)


:: Restart the Cryptographic Services

net stop cryptsvc
net start cryptsvc
```
