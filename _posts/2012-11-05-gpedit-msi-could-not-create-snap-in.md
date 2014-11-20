---
layout: post
title: gpedit.msi could not create snap-in
permalink: gpedit-msi-could-not-create-snap-in
redirect_from: "2012-11-05-gpedit-msi-could-not-create-snap-in/"
tags:
- windows
- gpedit
---

When opening `gpedit.msc` you receive the following error:

MMC could not create the snap-in. The snap-in might not have been installed correctly.

![gpedit-msc-error](/content/images/gpedit-msc-error.png)

Verify that **"%SystemRoot%\System32\Wbem"** is in the PATH environment variable.

	echo %PATH%

Add the environment variable if it is missing and rerun gpedit.msc.
