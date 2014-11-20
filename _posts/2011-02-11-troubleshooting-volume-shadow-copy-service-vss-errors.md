---
layout: post
title: Identification and resolution of Volume Shadow Copy Service errors
---

### Identification and resolution of Volume Shadow Copy Service errors.

Identify the problem writers using vssadmin

***vssadmin syntax:***

<pre><code class="dos">vssadmin list {shadows [/set= [shadow copy set GUID]] | writers | providers}
vssadmin delete shadows /for=<ForVolumeSpec> [/oldest | /all | /shadow=<ShadowID>] [/quiet]`</pre>

Let's start off by checking the state of the VSS Writers

```bat
C:\vssadmin list writers

vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool (C) Copyright 2001 Microsoft Corp.

Writer name: 'System Writer'
Writer Id: {e8132975-6f93-4464-a53e-1050253ae220}
Writer Instance Id: {449e12cf-6b8f-4d75-a821-bc869d6612c4}
State: [1] Failed
Last error: No error

Writer name: 'SqlServerWriter'
Writer Id: {a65faa63-5ea8-4ebc-9dbd-a0c4db26912a}
Writer Instance Id: {de3b2861-77f6-43f8-8619-64dc9ea2fbcf}
State: [1] Stable
Last error: No error

Writer name: 'MSDEWriter'
Writer Id: {f8544ac1-0611-4fa5-b04b-f7ee00b03277}
Writer Instance Id: {9036fdfa-05ef-4f7d-9c2f-84fa2f06560a}
State: [1] Stable
Last error: No error

Writer name: 'WMI Writer'
Writer Id: {a6ad56c2-b509-4e6c-bb19-49d8f43532f0}
Writer Instance Id: {f9f92826-a3d4-486c-ade3-a4201deb8ad2}
State: [7] Failed
Last error: No error
```

The output above is showing the System and WMI writers in a Failed state.

Most issues with VSS can be resolved by a server reboot. Rebooting the server is not often a viable option in a production environment where uptime is an issue. Let's take a look at some of our other options.

Identify the services associated with the failed writers. Search the registry for the Writer Id and/or Google it.

I have identified the failed writers as:
System Writer is the Cryptographic service.
WMI Writer is the Windows Management Instrumentation service.

Restart both services and recheck the output of ***vssadmin list writers***

```bat
C:\vssadmin list writers

vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool (C) Copyright 2001 Microsoft Corp.

Writer name: 'System Writer'
Writer Id: {e8132975-6f93-4464-a53e-1050253ae220}
Writer Instance Id: {449e12cf-6b8f-4d75-a821-bc869d6612c4}
State: [1] Stable
Last error: No error

Writer name: 'SqlServerWriter'
Writer Id: {a65faa63-5ea8-4ebc-9dbd-a0c4db26912a}
Writer Instance Id: {de3b2861-77f6-43f8-8619-64dc9ea2fbcf}
State: [1] Stable
Last error: No error

Writer name: 'MSDEWriter'
Writer Id: {f8544ac1-0611-4fa5-b04b-f7ee00b03277}
Writer Instance Id: {9036fdfa-05ef-4f7d-9c2f-84fa2f06560a}
State: [1] Stable
Last error: No error

Writer name: 'WMI Writer'
Writer Id: {a6ad56c2-b509-4e6c-bb19-49d8f43532f0}
Writer Instance Id: {f9f92826-a3d4-486c-ade3-a4201deb8ad2}
State: [7] Stable
Last error: No error
```

As you can see above the VSS issues have been resolved by restarting the associated services.

Other VSS errors might not be as straight forward. Let's looks at some additional options:

Clean up any dead VSS snapshots. Some defect systems accumulate hundreds of VSS snapshots that persist in the system and cause Windows to become unresponsive.

    vssadmin delete shadows /all

Restart the services: COM+ System Application Service, Distributed Transaction Coordinator Service, and Volume Shadow Copy Service

Rerun ***vssadmin list writers*** and check the output.

Additionally recommended by Microsoft: create a batch file to start/stop the VSS services and reregister the DLLs.

32bit
```bat
cd /d %windir%\system32
net stop vss
net stop swprv
regsvr32 ole32.dll
regsvr32 vss_ps.dll
Vssvc /Register
regsvr32 /i swprv.dll
regsvr32 /i eventcls.dll
regsvr32 es.dll
regsvr32 stdprov.dll
regsvr32 vssui.dll
regsvr32 msxml.dll
regsvr32 msxml3.dll
regsvr32 msxml4.dll
regsvr32 Vssapi.dll
regsvr32 Vssui.dll
net start vss
net start swprv
```

64bit
```bat
net stop vss
net stop swprv
regsvr32.exe /i %windir%\system32\eventcls.dll
regsvr32.exe /i %windir%\system32\swprv.dll
regsvr32.exe %windir%\system32\vssui.dll
regsvr32.exe %windir%\SysWOW64\vss_ps.dll
regsvr32.exe %windir%\SysWOW64\msxml.dll
regsvr32.exe %windir%\SysWOW64\msxml2.dll
regsvr32.exe %windir%\SysWOW64\msxml3.dll
regsvr32.exe %windir%\SysWOW64\msxml4.dll
regsvr32.exe %windir%\SysWOW64\ole32.dll
regsvr32.exe %windir%\SysWOW64\oleaut32.dll
regsvr32.exe %windir%\SysWOW64\es.dll
regsvr32.exe %windir%\SysWOW64\comsvcs.dll
vssvc /register
net start swprv
net start vss
```
