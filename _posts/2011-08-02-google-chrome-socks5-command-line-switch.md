---
layout: post
title: Chrome socks5 command line switch
---

In Windows the Chrome browser uses your system wide proxy settings. This can be a problem if you have a need to run different browsers and/or applications. An example would be running a Secure Shell proxy to get through a content filtering firewall.

To get around the Chrome system wide proxy settings, use a command line switch. Open or create a shortcut to [Chrome](http://www.google.com/chrome/)/[Chromium](http://www.chromium.org/Home)

![chrome-socks5-cmd](/content/images/2014/Aug/chrome-socks5-proxy-command-line-switch.jpg)

    --proxy-server="socks5://127.0.0.1:8080"

Replace 127.0.0.1 with your proxy address and 8080 with your proxy port.
