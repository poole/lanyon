---
layout: post
title: Fix Shrew Soft VPN on Ubuntu 11.04
---

After upgrading my system to Ubuntu 11.04 I was no longer able to establish a VPN connection. [Shrew Soft VPN](http://www.shrew.net/) would time out. It appears that the Reverse Path Filter was causing the issue.

Found the following solution:

Edit your network-security.conf to disable the Reverse Path Filter:

<pre>`sudo vim /etc/sysctl.d/10-network-security.conf`</pre>

Set the following items from 1 to 0:

<pre>`net.ipv4.conf.default.rp_filter=0
net.ipv4.conf.all.rp_filter=0`</pre>

Save and perform the following command.

<pre>`sudo /sbin/sysctl -p`</pre>
