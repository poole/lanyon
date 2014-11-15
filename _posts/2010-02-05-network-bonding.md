---
layout: post
title: Network Bonding
---

Details on setting up network bonding. This is going to be used as a Snort sensor on a passive network tap.

Install ifenslave

	$ sudo apt-get install ifenslave

Create the file `/etc/modprobe.d/bonding.conf` with the following:

	alias bond0 bonding
	options bonding mode=0 miimon=100

A note about promiscuous mode regarding the bonding mode:

> Promiscuous mode

> When running network monitoring tools, e.g., tcpdump, it is
common to enable promiscuous mode on the device, so that all traffic
is seen (instead of seeing only traffic destined for the local host).
The bonding driver handles promiscuous mode changes to the bonding
master device (e.g., bond0), and propagates the setting to the slave
devices.

> For the balance-rr, balance-xor, broadcast, and 802.3ad modes,
the promiscuous mode setting is propagated to all slaves.

> For the active-backup, balance-tlb and balance-alb modes, the
promiscuous mode setting is propagated only to the active slave.

Time to load the module:

	$ sudo modprobe bonding

Add the new interface into your `/etc/network/interfaces` file:

	auto bond0
	iface bond0 inet manual
	slaves eth2 eth3
	up ifconfig $IFACE 0.0.0.0 up
	up ip link set $IFACE promisc on
	down ip link set $IFACE promisc off
	down ifconfig $IFACE down

Restart networking to bring up the new interface:

	$ sudo /etc/init.d/networking restart

Connect to your passive ethernet tap and verify with tcpdump

	$ sudo tcpdump -i bond0
