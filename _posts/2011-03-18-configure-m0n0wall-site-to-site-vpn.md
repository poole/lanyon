---
layout: post
title: m0n0wall site to site VPN
---

Configuring site to site VPN using two m0n0wall boxes is a snap.

There are a couple of things you will want to know ahead of time.

* The IP address or FQDN of both firewalls WAN interface.
* Internal subnet of both networks.
* The shared key (password).

Log into your firewall and head to the VPN/IPSec section. Click the + sign to get started.
Assuming you are connecting two boxes across the internet, set the **Interface** to "WAN".
The **Local subnet** should be set to "LAN subnet"
As the name implies, set the **Remote subnet** to the remote subnet in the form of "192.168.0.0" (verify the subnet in the Interfaces: LAN page of the remote firewall).
Set the **Remote gateway** to either the public IP or FQDN of the remote box.

![m0n0wall-vpn-tunnel](/content/images/m0n0wall-vpn-tunnel.jpg)

**Important:** Using the settings Local &amp; Remote subnet settings above both ends will have complete access to each others LAN. Modify these settings and/or your firewall rules accordingly.

**Negotiation mode** = aggressive
For **My identifier** choose the appropriate item from the drop down list. I am using "Domain name" in the example image. The identified should be the domain name of your local firewall.

* **Encryption algorithm** = Blowfish
* **Hash algorithm** = SHA1
* **DH key group** = 2
* **Lifetime** default 28800
* **Authentication method** = Pre-shared key
* **Pre-Shared Key** = A password you will be using on both ends.

![m0n0wall-vpn-phase1](/content/images/2014/Sep/m0n0wall-vpn-phase1.jpg)

* **Protocol** = ESP
* **Encryption algorithms** check Blowfish
* **Hash algorithms** check SHA1
* **PFS key group** = 2
* **Lifetime** default 86400

![m0n0wall-vpn-phase2](/content/images/2014/Sep/m0n0wall-vpn-phase2.jpg)

Once completed you will need to apply the same settings to the other m0n0wall system. **Remote subnet**, **Remote gateway** and My **Identifier** will need to be reversed.
