---
layout: post
title: Set recursive file or directory permission
---

Command to recursively change either file or directory permissions in Bash.

Example of changing directory permissions to 755

    sudo find . -type d -exec chmod 755 {} \;

Example of changing file permissions to 666

    sudo find . -type f -exec chmod 666 {} \;
