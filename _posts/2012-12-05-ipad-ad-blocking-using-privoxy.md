---
layout: post
title: iPad ad blocking using privoxy
---

I recently acquired an iPad 2 which I use mostly for surfing the web. I had no idea that you could not use browser extensions.

Assuming you have an extra computer running on your network. One method of blocking ads (on your home network) is to use a web proxy like [Privoxy](http://www.privoxy.org/). Privoxy has binaries for Windows, OS X, BSD and Linux.

In the example below we are going to install and setup Privoxy on Ubuntu.

	sudo apt-get install privoxy

Edit the configuration file and change the `listen-address` from 127.0.0.1 to your servers IP address. In the example below we will use 192.168.1.1.

	sudo vim /etc/privoxy/config

```
#  Example:
#
#      Suppose you are running Privoxy on a machine which has the
#      address 192.168.0.1 on your local private network (192.168.0.0)
#      and has another outside connection with a different address. You
#      want it to serve requests from inside only:
#
#        listen-address  192.168.0.1:8118
#
#      Suppose you are running Privoxy on an IPv6-capable machine and
#      you want it to listen on the IPv6 address of the loopback device:
#
#        listen-address [::1]:8118
#
listen-address 192.168.1.1:8118
#
#
#  4.2. toggle
#  ============
#
```

Restart Privoxy after editing the config file. Privoxy will now be listening on port 8118 with the default settings.

### AdblockPlus lists for Privoxy.

There is a script that will convert the AdblockPlus lists for Privoxy.
[http://andrwe.org/scripting/bash/privoxy-blocklist](http://andrwe.org/scripting/bash/privoxy-blocklist)
Development version can be found on [Github](http://github.com/Andrwe/privoxy-blocklist)

Download the script:

	wget http://andrwe.org/_export/code/scripting/bash/privoxy-blocklist

Make it executable and run:

	$ chmod +x privoxy-blocklist.sh
	$ sudo ./privoxy-blocklist.sh

Verify Privoxy is running and listening on port 8118:

	$ sudo netstat -anp | grep privoxy
	tcp        0      0 192.168.1.1:8118    0.0.0.0:*               LISTEN      15152/privoxy


### Configure the Ipad proxy settings

* Tap Settings > General > Network > WiFi.
* Modify the network settings for the SSID at the location by pressing on the blue icon with the right arrow in it.
* Select "Manual" under "HTTP Proxy".
* For the "server", type the IP address of the proxy server. For the "Port", enter your proxy server port (typically 8118 for Privoxy)

Now you up and running AD free.
