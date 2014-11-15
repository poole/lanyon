---
layout: post
title: Solarized colors on Gnome terminal
---

[Solarized](http://ethanschoonover.com/solarized) is a beautiful color palette. The palette was designed for readability and comes with both light and dark options.

> Solarized is a sixteen color palette (eight monotones, eight accent colors) designed for use with terminal and gui applications. It has several unique properties. I designed this color scheme with both precise CIELAB lightness relationships and a refined set of hues based on fixed color wheel relationships. It has been tested extensively in real world use on color calibrated displays (as well as uncalibrated/intentionally miscalibrated displays) and in a variety of lighting conditions.

![solarized-palette](/content/images/solarized-palette.png)

Install git-core on Ubuntu/Deb. Adjust according to your distribution installer.

	$ sudo apt-get install git-core
	$ git clone https://github.com/sigurdga/gnome-terminal-colors-solarized.git

Change directory into the downloaded Solarized directory

	$ cd gnome-terminal-colors-solarized

Run one of the following scripts for either the dark or light color theme.

	$ ./set_dark.sh
	$ ./set_light.sh

There are [Solarized](http://ethanschoonover.com/solarized) color palettes available for terminals, editors, IDEs etc. Easy to set up and beautiful to look at. I highly recommend checking it out.
