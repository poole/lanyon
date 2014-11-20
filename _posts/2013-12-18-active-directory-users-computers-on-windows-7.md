---
layout: post
title: Active directory Users and Computers on Windows 7
---

Download the [Remote Server Administration Tools for Windows 7](http://www.microsoft.com/en-us/download/details.aspx?id=7887).

Note: Windows 7 Professional or better.

Install the software then run the follow commands to enable the AD Users & Computer snapin.

```
dism /online /enable-feature /featurename:RemoteServerAdministrationTools
dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles
dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles-AD
dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles-AD-DS
dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles-AD-DS-SnapIns
```

I received an error when trying to install the snapin directly.

```
c:\>dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles-AD-DS-SnapIns

Deployment Image Servicing and Management tool
Version: 6.1.7600.16385

Image Version: 6.1.7601.17514

Enabling feature(s)
[==========================100.0%========================= ]

Error: 50

The operation completed but RemoteServerAdministrationTools-Roles-AD-DS-SnapIns feature was not enabled.
Ensure that the following parent feature(s) are enabled first. If they are already enabled, refer to the log file for further diagnostics.
RemoteServerAdministrationTools-Roles-AD-DS, RemoteServerAdministrationTools-Roles-AD, RemoteServerAdministrationTools-Roles, RemoteServerAdministrationTools
```
Per the error message, install one component at a time.

```
c:\>dism /online /enable-feature /featurename:RemoteServerAdministrationTools

Deployment Image Servicing and Management tool
Version: 6.1.7600.16385

Image Version: 6.1.7601.17514

Enabling feature(s)
[==========================100.0%========================= ]
The operation completed successfully.


c:\admin\dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles

Deployment Image Servicing and Management tool
Version: 6.1.7600.16385

Image Version: 6.1.7601.17514

Enabling feature(s)
[==========================100.0%========================= ]
The operation completed successfully.

c:\>dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles-AD

Deployment Image Servicing and Management tool
Version: 6.1.7600.16385

Image Version: 6.1.7601.17514

Enabling feature(s)
[==========================100.0%========================= ]
The operation completed successfully.

c:\>dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles-AD-DS

Deployment Image Servicing and Management tool
Version: 6.1.7600.16385

Image Version: 6.1.7601.17514

Enabling feature(s)
[==========================100.0%========================= ]
The operation completed successfully.

c:\>dism /online /enable-feature /featurename:RemoteServerAdministrationTools-Roles-AD-DS-SnapIns

Deployment Image Servicing and Management tool
Version: 6.1.7600.16385

Image Version: 6.1.7601.17514

Enabling feature(s)
[==========================100.0%==========================]
The operation completed successfully.

```
