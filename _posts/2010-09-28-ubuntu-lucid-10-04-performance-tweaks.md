---
layout: post
title: Ubuntu Lucid performance tweaks
---

I use these setting on a laptop with a Core 2 Duo and 4 GB of ram. It might seem like overkill to tweak this system. However since it is a work machine at any time I am running Lotus Notes, VirtualBox, OpenOffice, Chrome, etc. Should you have a system with limited resources I would recommend Xubuntu for a light full featured DE. For something a step up from CLI and very light try any of the open|flux|blackbox window managers.

Looking to get a bit more performance from your Ubuntu desktop (laptop)? Here are a few tweaks I currently use.

***Swappiness:***

We all know what a bottleneck swap can be. This setting will force your system to keep more data in cache. The applications/data in cache will feel be more responsive as they are not unloaded to disk/swap. Experiment and find what works best for you.

Swap file is controlled by a variable called “swappiness” and higher the number, greater the tendency to go to the disk.

* swappiness can have a value of between 0 and 100
* swappiness=0 tells the kernel to avoid swapping processes out of physical memory for as long as possible
* swappiness=100 tells the kernel to aggressively swap processes out of physical memory and move them to swap cache

Identify your current system swappiness and vfs_cache_pressue settings by using the commands below.

swappiness

	$ sudo cat /proc/sys/vm/swappiness

cache_pressure

	$ sudo cat /proc/sys/vm/vfs_cache_pressure

Ubuntu's default ***swappiness*** value is 60, ***vfs_cache_pressure*** value is 100.

Now change your swappiness to 10  and cache_pressure to 50.

	$ sudo sysctl -w vm.swappiness=10
 	$ sudo sysctl -w vm.vfs_cache_pressure=50

The changes above using ***sysctl*** are for testing, they will be reset on reboot. When you are comfortable making the settings persistent they will need to be added to the `/etc/sysctl.conf` file.

	$ sudo vim /etc/sysctl.conf

Add the following to the end of the file.

	# swap/ram tweaks
	vm.swappiness=10
	vm.vfs_cache_pressure=50

Additional reading: [Ubuntu Community Documentation: SwapFaq](https://help.ubuntu.com/community/SwapFaq).

***CPU Scaling:***

$CPU_THRESHOLD setting is the point that your system will increase/decrease the processor frequency. In the example below we will set this value to 40. When your CPU sampled load rate exceeds 40% the CPU frequency will scale. Adjust as needed.

To change the CPU threshold you will need to add the following command into your `/etc/init.d/ondemand` script.

```console
for CPU_THRESHOLD in /sys/devices/system/cpu/cpu*/cpufreq/ondemand/up_threshold
	do
		[ -f $CPU_THRESHOLD ] || continue
		echo -n 40 &amp;gt; $CPU_THRESHOLD
	done
```



Open `/etc/init.d/ondemand` and add the code above into the $CPUFREQ for loop.

	$ sudo vim /etc/init.d/ondemand

It should looks like this when added.

```console
for CPUFREQ in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
	do
		[ -f $CPUFREQ ] || continue
		echo -n ondemand &amp;gt; $CPUFREQ
		for CPU_THRESHOLD in /sys/devices/system/cpu/cpu*/cpufreq/ondemand/up_threshold
		do
			[ -f $CPU_THRESHOLD ] || continue
			echo -n 40 &amp;gt; $CPU_THRESHOLD
		done
	done
```

Some people recommend changing the $CPUFREQ from ondemand to performance. Doing so will set your processor to full speed. This option is not recommended for a laptop as it will drain your battery and might cause heat issues. For a standard desktop it might be worth testing out.

***apt-fast:***

This script reminds me of powerpill for [Archlinux](http://www.archlinux.org). Powerpill is a wrapper for Arch's package management tool <a href="http://wiki.archlinux.org/index.php/Pacman">pacman</a>. As you might have guessed apt-fast is a wrapper for apt-get. Apt-fast uses Alex download accelerator as opposed to apt/aptitude's use of wget. Axel is available in the standard repositories and is required for the script to function.

Download apt-fast [here](http://www.mattparnell.com/linux/apt-fast)

Save the script and make it executable.


	$ sudo chmod +x /usr/local/bin/apt-fast

Use the script as you would apt.

Download atp-fast from [http://www.mattparnell.com/linux/apt-fast](http://www.mattparnell.com/linux/apt-fast)

***/etc/hosts:***

There was a bug in previous version of Gnome that caused a performance problem when the hostname was missing from the /etc/hosts file. It is easy enough to address and will not cause any issues.

Edit `/etc/hosts` and add your hostname to the loopback address. Replace myserver.mydomain.com myserver with your actual hsotname.

	127.0.0.1 myserver.mydomain.com myserver localhost

Note: These settings are not recommend for use on server systems.
