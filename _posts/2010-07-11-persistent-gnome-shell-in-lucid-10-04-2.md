---
layout: post
title: Persistent Gnome shell in Lucid
---

> GNOME Shell is the defining technology of the GNOME 3 desktop user experience. It provides core interface functions like switching to windows and launching applications. GNOME Shell takes advantage of the capabilities of modern graphics hardware and introduces innovative user interface concepts to provide a delightful and easy to use experience.

> Availability and Status

> The GNOME Shell is currently in active development and while many planned features are not yet implemented it is stable enough for everyday use.

> Previews of GNOME Shell should be available in most GNOME based distributions. You can follow these instructions to try out the GNOME Shell package on your distribution. If you are interested in trying out the latest features or being a part of the development of the future of GNOME please check out the instructions for building it yourself.

> A stable version of GNOME Shell will be released as an integral part of GNOME 3 in September 2010.

[http://live.gnome.org/GnomeShell](href="http://live.gnome.org/GnomeShell)

![gnomeshell](/content/images/gnomeshell.png)

![gnomeshell-tab](/content/images/gnomeshell-tab.png)

Gnome-shell is still a work in progress, however it is quite usable.

	$ sudo add-apt-repository ppa:ricotz/testing
	$ sudo apt-get update
	$ sudo apt-get install gnome-shell

	$ gnome-shell --replace

After testing if you would like to make it persistent:

	$ sudo update-alternatives --config x-window-manager

Select **"mutter"**
![gnomeshell-term](/content/images/gnomeshell-term.png)

	$ sudo cp /usr/share/applications/gnome-shell.desktop /etc/xdg/autostart

The gnome-shell is now the default interface. Enjoy
### UPDATE: (07/12/2010)
The most recent update of Gnome-shell has a dependency of GTK+ 3.0 and will not work.
> With the GNOME Shell 2.31.5 release, this GNOME 3.0 desktop shell is dependent upon GTK+ 3.0. GNOME Shell will no longer work with the GTK+ 2.x library. Other changes since the previous GNOME Shell release include various bug and build fixes. Lastly, Mutter 2.31.5 has also picked up support for building against GTK+ 3.0.
via <a href="http://www.phoronix.com/scan.php?page=news_item&amp;px=ODQwOA">Phoronox</a>

### UPDATE: (07/15/2010)
Per <a href="https://launchpad.net/~ricotz/+archive/testing">Rico Tzschichholz</a>

> ## WARNING

> There are issues with the gobject-introspection update which is causing much trouble.

> PLEASE EXECUTE THE FOLLOWING TO REVERT ALL PACKAGES TO THEIR DEFAULT!!!

	$ sudo apt-get install ppa-purge
	$ sudo ppa-purge -p testing ricotz
