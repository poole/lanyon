---
layout: post
title: BOINC Linux GPU
---

As of version 7.0.40 [BOINC](http://boinc.berkeley.edu/) has the ability to split GPU tasks across multiple work units.

![boinc_manager_gpu_tasks](/content/images/boinc_manager_gpu_tasks.png)

>*Preliminary Change Log 7.0.39 --> 7.0.40:*
>
>client: add "client app configuration" feature; see&nbsp;[](http://boinc.berkeley.edu/trac/wiki/ClientAppConfig)
>This lets users do the following:
>1) limit the number of concurrent jobs of a given app (e.g. for WCG apps that are I/O-intensive)
>2) Specify the CPU and GPU usage parameters of GPU versions of a given app.

BOINC development versions are found here:
[http://boinc.berkeley.edu/download_all.php](http://boinc.berkeley.edu/download_all.php)

Create a new file named `app_config.xml` in the project directory to make use of the new options.
Details are found under [ClientAppConfig](http://boinc.berkeley.edu/trac/wiki/ClientAppConfig) of the BOINC wiki.

On Ubuntu the project directory is found:
`/var/lib/boinc-client/projects/ProjectName`

```
<app_config>
   <app>
      <name>hcc1</name>
      <max_concurrent>4</max_concurrent>
      <gpu_versions>
          <gpu_usage>.25</gpu_usage>
          <cpu_usage>1</cpu_usage>
      </gpu_versions>
   </app>
</app_config>
```

* **name:** Short name of the project. Project short names are found in the `client_state.xml` file.
* **max\_concurrent:** This specifies the maximum number of tasks the app can run at a time. Set this to the number of total HCC1 tasks your computer will be doing at a time.
* **gpu\_usage:** This specifies the % use of the GPU per task. Set this according to how many tasks you want to run per GPU.

	**Tasks per GPU = gpu_usage**
* **cpu\_usage:** This specifies the % use of CPU threads per GPU task. The default value is 1, but if you want to run more GPU tasks than you have CPU cores edit it accordingly.

	**Total CPU Threads / Total GPU Task = cpu_usage**
