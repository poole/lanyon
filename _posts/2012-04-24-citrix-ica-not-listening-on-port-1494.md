---
layout: post
title: Citrix ICA not listening on port 1494
---

<p>I ran into an issue with some Citrix servers in the environment. Users were getting a protocol driver error. After poking around I noticed ICA was not listening on port 1494.</p>

<p>It appears that this issues was caused by Microsoft patch <a href="http://support.microsoft.com/kb/2653956">MS12-024</a>.</p>

<blockquote>
  <p>Known issues with this security update
  After you install this security update on a Windows Server 2003 SP2-based terminal server, Remote Desktop Protocol (RDP) clients or Independent Computing Architecture (ICA) clients may be unable to connect to the terminal server. To resolve this problem, install hotfix 958476.
  MS Hotfix 958476 is available <a href="http://support.microsoft.com/kb/958476">here</a>.</p>
</blockquote>

<p>The following instructions correct the issue until the hotfix can be applied:</p>

<p>Identify that ICA is not listening on port 1494.</p>

<pre>`netstat -an | findstr 1494`</pre>

<p>Open the Terminal Services MMC</p>

<pre>`tscc.msc`</pre>

<p>Disable then Enable ICA</p>

<p>Run netstat again to verify ICA is listening on port 1494.</p>

<p>Retest the Citrix connection.</p>
