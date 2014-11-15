---
layout: post
title: Tail files with Powershell
---

For those note aware of the [GNU Tail](http://www.gnu.org/s/coreutils/manual/html_node/tail-invocation.html) utility, it will print the last n lines of text from a file. It is an invaluable tool for monitoring log files.

Since Windows does not have an equivalent command this is quite useful.
Using the Powershell `Get-Content` cmdlet will print the contents of a file. The `-wait` parameter will print additional lines as they are added.

	Get-Content filename -wait

**Be aware that this is slow on large files.**
