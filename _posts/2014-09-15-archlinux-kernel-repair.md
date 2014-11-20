---
layout: post
title: Archlinux Kernel Repair
permalink: archlinux-kernel-repair
redirect_from: "2014-09-15-archlinux-kernel-repair/"
tags:
- linux
- archlinux
---

### So I managed to uninstall my kernel.

In an effort to get VMware Workstation running I needed to downgrade my kernel. I installed the new kernel and got everything setup. Sometime later the system reverted to the newer version.

I already had the package exclusion `IgnorePjg = linux, linux-headers` in `pacman.conf`. So I decided to purge the newer kernel 3.16 from the system. After doing so, I reinstalled the downlevel kernel 3.13. However I was not paying attention when it failed. Little did I know the `/boot/` directory was empty when I rebooted. Ouch.

Thankfully everything I needed was on the system. Just need to get into it. So I boot into the [archlinux.iso](https://www.archlinux.org/download/) and setup a `chroot` into the existing system.

### System Repair
My partion layout is as follows:

* sda1 = /boot
* sda2 = swap
* sda3 = /root

Boot into the live CD and create a new directory for the mount point. Mount the /root then /boot file systems onto the new mount point.

```console
# mkdir /mnt/arch
# mount /dev/sda3 /mnt/arch
# mount /dev/sda1 /mnt/arch/boot
```

Change directory into `/mnt/arch` and `chroot` the mounted filesystem.

```console
# cd /mnt/arch
# mount -t proc proc proc/
# mount -t sysfs sys sys/
# mount -o bind /dev dev/
# chroot . /bin/bash
[root@archiso /]#
```

Inside the `chroot` you have access to your broken system. I have the kernel and headers downloaded already. Otherwise the packages could be found in the pacman cache `/var/cache/pacman/pkg/`.

Reinstall the kernel..

	pacman -U --force linux-3.13.7-1-x86_64.pkg.tar.xz linux-headers-3.13.7-1-x86_64.pkg.tar.xz

### Verify

This time I double checked `/boot`.

```console
# ls /boot
total 23568
drwxr-xr-x 6 root root     1024 Sep 15 07:54 grub
-rw-r--r-- 1 root root 16859876 Sep 15 08:22 initramfs-linux-fallback.img
-rw-r--r-- 1 root root  3280187 Sep 15 08:22 initramfs-linux.img
drwx------ 2 root root    12288 Jan 29  2014 lost+found
-rw-r--r-- 1 root root  3979248 Mar 24 15:07 vmlinuz-linux
```
