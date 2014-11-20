---
layout: post
title: TSM Invalid file handle passed
---

If TSM client job failed with and error of **"Invalid file handle passed"**. Here is a quick solution.

Stop the TSM Client Scheduler service.

	net stop "TSM Client Scheduler"

Delete (or rename) the `adsm.sys` directory. It will be recreated by TSM.

![adsm-sys](/content/images/adsm-sys.png)

Restart the TSM Client Scheduler service.

	net start "TSM Client Scheduler"

Rerun the backup job.
