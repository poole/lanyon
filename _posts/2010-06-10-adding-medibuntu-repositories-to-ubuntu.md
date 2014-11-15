---
layout: post
title: Medibuntu Repositories
---

> Medibuntu (Multimedia, Entertainment & Distractions In Ubuntu) is a repository of >packages that cannot be included into the Ubuntu distribution for legal reasons >copyright, license, patent, etc).

> Some of these packages include the libdvdcss package from VideoLAN and the external >binary codecs package (commonly known as w32codecs) used by MPlayer and xine.

The following one line command will add Medibuntu repositories to the sources.list, install the Medibuntu GPG key and resynchronize the package index:

	$ sudo wget --output-document=/etc/apt/sources.list.d/medibuntu.list http://www.medibuntu.org/sources.list.d/$(lsb_release -cs).list && sudo apt-get --quiet update && sudo apt-get --yes --quiet --allow-unauthenticated install medibuntu-keyring && sudo apt-get --quiet update

Additional resources:
[http://www.medibuntu.org](http://www.medibuntu.org/index.php)

[http://help.ubuntu.com/community/Medibuntu](http://help.ubuntu.com/community/Medibuntu)
