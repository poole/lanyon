---
layout: post
title: gpedit.msi could not create snap-in
---

When opening `gpedit.msc` you receive the following error:

MMC could not create the snap-in. The snap-in might not have been installed correctly.

![gpedit-msc-error](/content/images/2014/Aug/gpedit-msc-error.png)

Verify that **"%SystemRoot%\System32\Wbem"** is in the PATH environment variable.

	echo %PATH%

Add the environment variable if it is missing and rerun gpedit.msc.
