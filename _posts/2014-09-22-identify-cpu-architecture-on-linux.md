---
layout: post
title: Identify CPU architecture on Linux
permalink: identify-cpu-architecture-on-linux
redirect_from: "2014-09-22-identify-cpu-architecture-on-linux/"
tags:
- linux
---

Using `lscpu` is a quick and easy way to determine your CPU architecture.

64bit AMD processor example:

```
$ lscpu
Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                6
On-line CPU(s) list:   0-5
Thread(s) per core:    1
Core(s) per socket:    6
Socket(s):             1
NUMA node(s):          1
Vendor ID:             AuthenticAMD
CPU family:            16
Model:                 10
Model name:            AMD Phenom(tm) II X6 1055T Processor
Stepping:              0
CPU MHz:               800.000
CPU max MHz:           2800.0000
CPU min MHz:           800.0000
BogoMIPS:              5601.83
Virtualization:        AMD-V
L1d cache:             64K
L1i cache:             64K
L2 cache:              512K
L3 cache:              6144K
NUMA node0 CPU(s):     0-5
```

32bit Intel Pentium 4 example:

```
$ lscpu
Architecture:          i686
CPU op-mode(s):        32-bit
Byte Order:            Little Endian
CPU(s):                2
On-line CPU(s) list:   0,1
Thread(s) per core:    2
Core(s) per socket:    1
Socket(s):             1
Vendor ID:             GenuineIntel
CPU family:            15
Model:                 3
Model name:            Intel(R) Pentium(R) 4 CPU 3.40GHz
Stepping:              4
CPU MHz:               3391.668
BogoMIPS:              6786.97
L1d cache:             16K
L2 cache:              1024K
```
