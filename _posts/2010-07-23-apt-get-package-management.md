---
layout: post
title: apt-get package management
---

![debian-logo](/content/images/debian-logo.png)
apt-get is the package management utility behind Debian-based Linux systems Ubuntu, Mint and Mepis.

A complete list of distributions based on Debian can be found on [Distrowatch](http://distrowatch.com/search.php?ostype=Linux&category=All&origin=All&basedon=Debian&notbasedon=None&desktop=All&architecture=All&status=Active).
### Basic Package Management:
***apt-get update***

Used to resynchronize the package index files from their sources. The indexes of available packages are fetched from the location(s) specified in /etc/apt/sources.list. For example, when using a Debian archive, this command retrieves and scans the Packages.gz files, so that information about new and updated packages is available.

<span style="color: #ff0000;">An <em>update</em> should always be performed after making changes to the source.list and before an upgrade or dist-upgrade.</span>

***apt-get upgrade***

<em>upgrade</em> is used to install the newest versions of all packages currently installed on the system from the sources enumerated in /etc/apt/sources.list. Packages currently installed with new versions available are retrieved and upgraded; under no circumstances are currently installed packages removed, or packages not already installed retrieved and installed. New versions of currently installed packages that cannot be upgraded without changing the install status of another package will be left at their current version.

An update must be performed first so that apt-get knows that new versions of packages are available.

***apt-get dist-update***

<em>dist-upgrade</em>, in addition to performing the function of upgrade, also intelligently handles changing dependencies with new versions of packages; ***apt-get*** has a "smart" conflict resolution system, and it will attempt to upgrade the most important packages at the expense of less important ones if necessary. The <em>/etc/apt/sources.list</em> file contains a list of locations from which to retrieve desired package files. See also <em>***<a style="color: #660000;" href="http://linux.die.net/man/5/apt_preferences">apt_preferences</a>***</em> for a mechanism for overriding the general settings for individual packages.

***apt-get install xxx yyy zzz***

<em>install</em> is followed by one or more packages desired for installation. Each package is a package name, not a fully qualified filename (for instance, in a Debian GNU/Linux system, libc6 would be the argument provided, not libc6_1.9.6-2.deb). All packages required by the package(s) specified for installation will also be retrieved and installed. The <em>/etc/apt/sources.list</em> file is used to locate the desired packages. If a hyphen is appended to the package name (with no intervening space), the identified package will be removed if it is installed. Similarly a plus sign can be used to designate a package to install. These latter features may be used to override decisions made by apt-get's conflict resolution system.

***apt-get remove xxx yyy zzz***

<em>remove</em> is identical to <em>install</em> except that packages are removed instead of installed. If a plus sign is appended to the package name (with no intervening space), the identified package will be installed instead of removed.

***apt-get purge xxx yyy zzz***

Remove programs xxx, yyy and zzz and delete any configuration files that they used.

***apt-get check***

<em>check</em> is a diagnostic tool; it updates the package cache and checks for broken dependencies.

***apt-get clean***

<em>clean</em> clears out the local repository of retrieved package files. It removes everything but the lock file from <em>/var/cache/apt/archives/</em> and <em>/var/cache/apt/archives/partial/</em>. When APT is used as a dselect method, clean is run automatically. Those who do not use dselect will likely want to run apt-get clean from time to time to free up disk space.

***apt-get autoclean***

Like <em>clean</em>, <em>autoclean</em> clears out the local repository of retrieved package files. The difference is that it only removes package files that can no longer be downloaded, and are largely useless. This allows a cache to be maintained over a long period without it growing out of control. The configuration option APT::Clean-Installed will prevent installed packages from being erased if it is set to off.

***apt-get autoremove***

<em>autoremove</em> is used to remove packages that were automatically installed to satisfy dependencies for some package and that are no more needed.

### Compiling Packages:
***apt-get source xxx***

source causes ***apt-get*** to fetch source packages. APT will examine the available packages to decide which source package to fetch. It will then find and download into the current directory the newest available version of that source package. Source packages are tracked separately from binary packages via deb-src type lines in the sources.list file. This probably will mean that you will not get the same source as the package you have installed or as you could install.

If either –***b, –-compile*** or ***--build*** is specified then the package will be compiled to a binary .deb using dpkg-buildpackage

If ***--download-only*** is specified then the source package will not be unpacked.Or its build dependencies?

***apt-get build-dep xxx***

<em>build-dep</em> causes apt-get to install/remove packages in an attempt to satisfy the build dependencies for a source package.

--

This information and more can me found on the apt-get man page.
