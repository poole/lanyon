---
layout: post
title: Archlinux Powerpill Setup
---

### Arch Linux Powerpill Setup

Powerpill is a wrapper for Archlinux package management tool, pacman. This is a short tutorial on setting up powerpill for concurrent downloads without using the <a href="http://wiki.archlinux.org/index.php/Reflector">reflector</a>

> Powerpill is a wrapper script written by Xyne for pacman  that speeds up package retrieval by using aria2c for concurrent/segmented downloads. It determines the target packages of requested synchronization operation and then uses the mirrorlist to create a comprehensive metalink. This metalink is then piped to the download manager aria2 for package retrieval. Significant reductions in download times are often possible due to the combined effects of simultaneous and segmented downloads.

> Example: One wants to update and issues a pacman -Syu which returns a list of 20 packages that are available for update totally 200 megs. If the user downloads them via pacman, they will come down one-at-a-time. If the user downloads them via powerpill, they will come down simultaneously in many cases several times faster (depending on one's connection speed, the availability of packages on servers, and speed from server/load, etc.)

> A test of pacman vs. powerpill on one system revealed a 4x speed up in the above scenario where the pacman downloads averages 300 kB/sec and the powerpill downloads averaged 1.2 MB/sec.

Install powerpill

    $ pacman -S powerpill


To take advantage of powerpill you will need to update your mirror list. I am in the US so I will uncomment all of the local servers in `/etc/pacman.d/mirrorlist`.
The result should looks like this.

```
# United States
Server = http://archlinux.unixheads.org/$repo/os/i686
Server = ftp://mirror.cs.vt.edu/pub/ArchLinux/$repo/os/i686
Server = http://mirror.cs.vt.edu/pub/ArchLinux/$repo/os/i686
Server = ftp://mirrors.easynews.com/linux/archlinux/$repo/os/i686
Server = http://mirrors.easynews.com/linux/archlinux/$repo/os/i686
Server = ftp://ftp.archlinux.org/$repo/os/i686
Server = http://mirrors.gigenet.com/archlinux/$repo/os/i686
Server = ftp://ftp.gtlib.gatech.edu/pub/linux/distributions/archlinux/$repo/os/i686
Server = http://www.gtlib.gatech.edu/pub/linux/distributions/archlinux/$repo/os/i686
Server = ftp://mirrors.hosef.org/archlinux/$repo/os/i686
Server = http://mirrors.hosef.org/archlinux/$repo/os/i686
Server = ftp://ibiblio.org/pub/linux/distributions/archlinux/$repo/os/i686
Server = http://distro.ibiblio.org/pub/linux/distributions/archlinux/$repo/os/i686
Server = ftp://locke.suu.edu/linux/dist/archlinux/$repo/os/i686
Server = ftp://mirror.rit.edu/archlinux/$repo/os/i686
Server = http://mirror.rit.edu/archlinux/$repo/os/i686
Server = http://schlunix.org/archlinux/$repo/os/i686
Server = http://mirror.sourceshare.org/archlinux/$repo/os/i686
Server = http://archlinux.umflint.edu/$repo/os/i686
Server = http://mirror.umoss.org/archlinux/$repo/os/i686
```

Make a copy of the updated mirrorlist and run the rankmirrors script. Rankmirrors will sort your mirrorlist according to connection and opening speed.

```bash
# mv /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.org
# rankmirrors -n 0 /etc/pacman.d/mirrorlist.org > /etc/pacman.d/mirrorlist
```

Now that the mirrorlist is setup we will configure powerpill. Set the maximum number of connections in `/etc/powerpill.conf>` to equal the uncommented servers in the mirrorlist.

```bash
# cat /etc/pacman.d/mirrorlist | grep -v ^# | grep -v ^$ | wc -l
23
```


Comment out the reflector line of `powerpill.conf` and update max-concurrent-downloads=23 (number of uncommented mirrors.)

It is recommended to refresh the pacman database after changing the mirrors

    $ pacman -Syy

Time to give powerpill a run

    $ powerpill -Syu

More details can be found on Arch Linux excellent [Wiki](http://wiki.archlinux.org/index.php/Main_Page)
