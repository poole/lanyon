---
layout: post
title: Warning failed to load theme
tags: linux gnome repair
---

While recklessly installing/testing some new themes I broke my GUI.
Nothing seemed to be working right. After rebooting the box I was sitting at a blank screen. A quick check of `ps -aux` showed Gnome and Xorg running. What gives?

Fired up `journalctl` and saw a bunch of these listed.
Yep that looks like a place I might have screwed up.

	gnome-session[7460]: Window manager warning: Failed to load theme "Adwaita": Failed to find a valid file for theme Adwaita
	gnome-session[7460]: Window manager warning: Failed to load theme "Simple": Failed to find a valid file for theme Simple
	gnome-session[7460]: Window manager warning: Failed to load theme "ThinIce": Failed to find a valid file for theme ThinIce
	gnome-session[7460]: Window manager warning: Failed to load theme "Zukitre": Failed to find a valid file for theme Zukitre
	gnome-session[7460]: Window manager warning: Failed to load theme "Default": Failed to find a valid file for theme Default
	gnome-session[7460]: Window manager warning: Failed to load theme "Emacs": Failed to find a valid file for theme Emacs
	gnome-session[7460]: Window manager warning: Failed to load theme "Redmond": Failed to find a valid file for theme Redmond
	gnome-session[7460]: Window manager warning: Failed to load theme "Moka": Failed to find a valid file for theme Moka
	gnome-session[7460]: Window manager warning: Failed to load theme "Numix": Failed to find a valid file for theme Numix
	gnome-session[7460]: Window manager warning: Failed to load theme "Zukitwo": Failed to find a valid file for theme Zukitwo

I quick Google search found a recommendation to reinstall the gnome-themes-standard package.

	$ sudo pacman -Sy gnome-themes-standard

The package spit out a couple warnings..

	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/backgrounds/
			  filesystem: 766  package: 755
	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/metacity-1/
			  filesystem: 766  package: 755
	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/gtk-3.0/
			  filesystem: 766  package: 755
	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/gtk-2.0/
			  filesystem: 766  package: 755
	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/gtk-2.0/Arrows/
			  filesystem: 766  package: 755
	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/gtk-2.0/Buttons/
			  filesystem: 766  package: 755
	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/gtk-2.0/Check-Radio/
			  filesystem: 766  package: 755
	pacman[7583]: warning: directory permissions differ on /usr/share/themes/Adwaita/gtk-2.0/Entry/
			  filesystem: 766  package: 755

ok.. someone fat fingered the permissions.

	$ sudo chmod -R 755 /usr/share/themes
	$ sudo systemctl restart display-manager

Everything is back to normal.. The take away is use **~/.themes** or be more careful. :)
