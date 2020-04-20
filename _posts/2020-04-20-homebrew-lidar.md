---
layout: post
title: Homebrew LiDAR
---

## Overview

Self-driving cars, robots, and mapping vehicles often employ LiDAR scanners (Light Detection and Ranging) in order to quickly and accurately map their surroundings. On a basic level, a LiDAR scanner repeatedly shoots out laser beams in various directions, measuring the time interval between when each beam is sent and when it returns to the scanner after reflecting off of an object. Since the speed of said laser beam is just the speed of light (travelling in air), the distance it traveled from the scanner to the object and back again can be calculated as shown below. By repeating this process in various different directions, a point-cloud can be constructed, mapping the spacial representation of the scanner's surroundings.



![Distance Calculation Diagram](/Users/theo/Documents/LiDAR/Distance Calculation Diagram.png)
$$
\Delta t = t_f - t_i\\
v = \text { speed of light in air}\\
d = \frac{1}{2}v \Delta t\\
$$


![img](http://www-video.eecs.berkeley.edu/research/indoor/Cory5thCartWall.jpg)

An example point-cloud scan of an office hallway.[^fn1]

**DISCLAIMER:** In practice, this process is much more complicated. LiDAR rangefinding units need to account for pulse frequencies, energy levels, diffusion, and many other effects to calculate accurate and repeatable distance values. [^fn2] However, this basic understanding will be more than sufficient for the scope of this project.



##Hardware

![Scanner](/Users/theo/Documents/LiDAR/Scanner.jpg)

The scanner.

![Controller](/Users/theo/Documents/LiDAR/Controller.jpg)

The (messy) controller.

The design of the physical device is mainly determined by the components on hand during quarantine. It revolves around an old PulsedLight LiDAR-Lite V1 sensor ([now produced by Garmin](https://buy.garmin.com/en-US/US/p/557294)) that provides LiDAR rangefinding capabilities, with a maximum range of 60m and accuracy within 2.5 cm.[^fn3] The device is listed as supporting a maximum measurement rate of 100Hz, but was prone to overpolling issues and crashes even when operating around 40Hz.



The LiDAR-Lite unit is actuated around the pitch and yaw axes by two mid-sized stepper motors, which in turn are driven by two Makeblock stepper motor drivers. Their microstepping capabilities are set to enable a pitch resolution of 0.225˚ / step and a yaw resolution of 0.18˚ / step.



Both the Lidar-Lite unit and the stepper motor drivers are controlled by an Arduino Uno, with a WiFi expansion shield connected to enable wireless transmission of scan data over the local network to a host computer. The entire system runs off of a 5-volt power supply, and could be powered by a standard USB power bank for outdoor scans.



##Scanning Routine



## Post Processing



## Plane Detection



## Works Cited

[^fn1]: [http://www-video.eecs.berkeley.edu/research/indoor/](http://www-video.eecs.berkeley.edu/research/indoor/)
[^fn2]: https://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf
[^fn3]: https://cdn.sparkfun.com/datasheets/Sensors/Proximity/LIDAR-Lite-Data-Sheet.pdf
