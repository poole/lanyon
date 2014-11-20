---
layout: post
title: Using Winsat to test hard drive performance
---

The Windows Assessment Tool (WinSAT) is included Microsoft Vista and Windows 7. This tool can perform performance tests including CPU, memory, disk and video.

```
winsat disk -drive c

Windows System Assessment Tool
> Running: Feature Enumeration ''
> Run Time 00:00:00.00
> Running: Storage Assessment '-drive c -seq -read'
> Run Time 00:00:05.48
> Running: Storage Assessment '-drive c -ran -read'
> Run Time 00:00:06.99
> Running: Storage Assessment '-drive c -scen 2009'
> Run Time 00:01:13.62
> Running: Storage Assessment '-drive c -seq -write'
> Run Time 00:00:36.26
> Running: Storage Assessment '-drive c -flush -seq'
> Run Time 00:00:05.94
> Running: Storage Assessment '-drive c -flush -ran'
> Run Time 00:00:12.18
> Running: Storage Assessment '-drive c -hybrid -ran -read -ransize 4096'
NV Cache not present.
> Run Time 00:00:00.02
> Running: Storage Assessment '-drive c -hybrid -ran -read -ransize 16384'
NV Cache not present.
> Run Time 00:00:00.01
> Disk  Sequential 64.0 Read                   111.23 MB/s          6.7
> Disk  Random 16.0 Read                       2.43 MB/s          4.4
> Responsiveness: Average IO Rate              3.57 ms/IO          6.0
> Responsiveness: Grouped IOs                  9.67 units          7.2
> Responsiveness: Long IOs                     8.72 units          7.5
> Responsiveness: Overall                      84.37 units          6.9
> Responsiveness: PenaltyFactor                0.0
> Disk  Sequential 64.0 Write                  116.12 MB/s          6.8
> Average Read Time with Sequential Writes     6.720 ms          5.4
> Latency: 95th Percentile                     30.732 ms          3.4
> Latency: Maximum                             56.218 ms          7.8
> Average Read Time with Random Writes         15.075 ms          3.4
> Total Run Time 00:02:22.10
```
