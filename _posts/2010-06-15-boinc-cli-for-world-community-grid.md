---
layout: post
title: BOINC cli for World Community Grid
---

### BOINC - Berkeley Open Infrastructure for Network Computing

BOINC is a distributed [grid] computing client that uses idle time on your computer. There are a number of projects that you can attach to and assist with. I will cover how to connect to the World Community Grid via CLI on Ubuntu.

[World Community Grid](http://www.worldcommunitygrid.org)

> World Community Grid's mission is to create the world's largest public computing grid to tackle projects that benefit humanity.

> Our work has developed the technical infrastructure that serves as the grid's foundation for scientific research. Our success depends upon individuals collectively contributing their unused computer time to change the world for the better.

> World Community Grid is making technology available only to public and not-for-profit organizations to use in humanitarian research that might otherwise not be completed due to the high cost of the computer infrastructure required in the absence of a public grid. As part of our commitment to advancing human welfare, all results will be in the public domain and made public to the global research community.

### Installation & Configuration

This is a description of how to run BOINC on Ubuntu without Xorg.
Install the boinc-client, boinc-manager is not required.

	$ sudo apt-get update
	$ sudo apt-get install boinc-client

You will need your &lt;account key&gt; to connect to the project. The account key can be obtained either from the command line or the World Community Grid site.

If you do not already have an account you will need to set one up before proceeding.

Account Key via boinccmd:

	$ boinccmd --lookup_account http://www.worldcommunitygrid.org <username> <password>

If everything went well you should see the following output:

	usename@computer:~$ boinccmd --lookup_account http://www.worldcommunitygrid.org username password
	status: Success
	poll status: operation in progress
	account key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

If you have an existing account or just set one up the key can be found under your profile in the [World Community Grid](http://www.worldcommunitygrid.org) site.

	$ boinccmd --host localhost --project_attach http://www.worldcommunitygrid.org account key

Everything should be up and running.

Below is a list of boinccmd options.

```
usage: boinccmd [--host hostname] [--passwd passwd] command

Commands:
--lookup_account URL email passwd
--create_account URL email passwd name
--project_attach URL auth          attach to project
--join_acct_mgr URL name passwd    attach account manager
--quit_acct_mgr                    quit current account manager
--get_state                        show entire state
--get_results                      show results
--get_simple_gui_info              show status of projects and active results
--get_file_transfers               show file transfers
--get_project_status               show status of all attached projects
--get_disk_usage                   show disk usage
--get_proxy_settings
--get_messages [ seqno ]           show messages &amp;gt; seqno
--get_message_count                show largest message seqno
--get_host_info
--version, -V                      show core client version
--result url result_name op        job operation
op = suspend | resume | abort | graphics_window | graphics_fullscreen
--project URL op                   project operation
op = reset | detach | update | suspend | resume | nomorework | allowmorework
--file_transfer URL filename op    file transfer operation
op = retry | abort
--set_run_mode mode duration       set run mode for given duration
mode = always | auto | never
--set_network_mode mode duration
--set_proxy_settings
--run_benchmarks
--read_global_prefs_override
--quit
--read_cc_config
--set_debts URL1 std1 ltd1 [URL2 std2 ltd2 ...]
--get_project_config URL
--get_project_config_poll
--network_available
--get_cc_status
```

[http://boinc.berkeley.edu/wiki/Boinccmd_tool](http://boinc.berkeley.edu/wiki/Boinccmd_tool)
