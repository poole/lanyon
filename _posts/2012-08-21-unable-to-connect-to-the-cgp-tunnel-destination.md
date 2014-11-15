---
layout: post
title: Citrix - Unable to connect to the CGP tunnel destination
---

Citrix users are receiving an error on login.

![citrix-error](/content/images/2014/Aug/citrix-error.png)

The Citrix server is reporting a number of Event ID: 118 errors.

![event-id-118](/content/images/2014/Aug/event-id-118.png)

Open the Terminal Services Manager and check for disconnected listeners. In my case the ICA Listener was down (disconnected). Resetting the listener resolved the issue.
