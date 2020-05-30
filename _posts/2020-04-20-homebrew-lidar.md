---
layout: post
title: Homebrew LiDAR
---

## Introduction

Self-driving cars, robots, and mapping vehicles often use LiDAR scanners (Light Detection and Ranging) in order to quickly and accurately map their surroundings. On a basic level, a LiDAR scanner repeatedly shoots out laser beams in various directions, measuring the time interval between when each beam is sent and when it returns to the scanner after reflecting off of an object. Since the speed of said laser beam is just the speed of light (traveling in air), the distance it traveled from the scanner to the object and back again can be calculated. By repeating this process in various different directions, a point-cloud can be constructed, mapping the spacial representation of the scanner's surroundings.


![img](/public/images/2020-04-20-homebrew-lidar/Berkely Hallway Scan.jpg)
<div class="caption" markdown="1">
*An example point-cloud scan of an office hallway.[^fn1]*
</div>
**DISCLAIMER:** In practice, this process is much more complicated. LiDAR rangefinding units need to account for pulse frequencies, energy levels, diffusion, and many other effects to calculate accurate and repeatable distance values. [^fn2] However, this basic understanding is more than sufficient for the scope of this project.



## Hardware

![Scanner](/public/images/2020-04-20-homebrew-lidar/Scanner.jpg)
<div class="caption" markdown="1">
*The scanner.*
</div>


![Controller](/public/images/2020-04-20-homebrew-lidar/Controller.jpg)
<div class="caption" markdown="1">
*The (messy) controller.*
</div>

The design of the physical device is mainly determined by the components on hand during quarantine. It revolves around an old PulsedLight LiDAR-Lite V1 sensor ([now produced by Garmin](https://buy.garmin.com/en-US/US/p/557294)) that provides LiDAR rangefinding capabilities, with a maximum range of 60m and accuracy within 2.5 cm.[^fn3] The device is listed as supporting a maximum measurement rate of 100Hz, but was prone to overpolling issues and crashes even when operating around 40Hz.



The LiDAR-Lite unit is actuated around the pitch and yaw axes by two mid-sized stepper motors, which in turn are driven by two Makeblock stepper motor drivers. Their microstepping capabilities are set to enable a pitch resolution of 0.225˚ / step and a yaw resolution of 0.18˚ / step.



Both the Lidar-Lite unit and the stepper motor drivers are controlled by an Arduino Uno, with a WiFi expansion shield connected to enable wireless transmission of scan data over the local network to a host computer. The entire system runs off of a 5-volt power supply, and could be powered by a standard USB power bank for outdoor scans.



## Scanning Routine

To start a scan, a Python script running on a host computer sends a command to the Arduino over WiFi, specifying the desired minimum and maximum pitch and yaw values for the scan. The Arduino then drives the stepper motors to the minimum position on each axis and begins the scan routine. The controller draws horizontal scanlines and polls the LiDAR-Lite module for distance readings after a certain number of steps - 5 steps / reading has shown to provide a suitable balance of speed and accuracy. Scanlines sweep back and forth as the pitch slowly increases until the selected scan bounds have been completely covered. During this process, distance measurements are buffered before being sent over the network to avoid bogging down the Arduino, and are sent together with their accompanying pitch and yaw values. On the host computer, the script dumps all of the recieved pitch, yaw, and distance values to a CSV file, like so:

| Pitch (in steps) | Yaw (in steps) | Distance (in cm) |
| ---------------- | -------------- | ---------------- |
| -266             | -325           | 58               |
| -266             | -320           | 58               |
| -266             | -315           | 57               |



## Post Processing

The raw pitch, yaw, and distance values received from the Arduino aren't very useful as they stand. To generate point clouds, these spherical coordinates must be converted to Cartesian coordinates. Thankfully, this is easily accomplished with some basic trigonometry as follows:

$$
\phi = \text{pitch angle from vertical (radians)}\\
\theta = \text{yaw angle (radians)}\\
d = \text{distance reading}\\

(x, y, z) = (dcos(\theta)sin(\phi), dsin(\phi)sin(\theta),dcos(\phi))
$$

After all of the readings have been converted to Cartesian coordinates, they are displayed as a 3D point cloud using [matplotlib](https://matplotlib.org/). In this example, points are color-coded based on their distance from the scanner, and correlation can clearly be seen between the photograph and the scan of the scene, even though the scan is flipped horizontally.

![Stool Point Cloud](/public/images/2020-04-20-homebrew-lidar/Stool Point Cloud.png)



![Stool Image](/public/images/2020-04-20-homebrew-lidar/Stool Image.jpg)



## Plane Detection

Point clouds may look great, but most real-world applications need to go a step further and pull out actionable information like object positions, dimensions, and the like. Plane detection can be quite useful in a variety of situations, like drawing straight representations of walls in an architectural scan or mapping the drivable area around a robot.

This project implements detection for vertical planes, but the same techniques could be generalized to account for planes in any orientation. For this step-by-step example, a scan was taken facing a corner, so two vertical planes intersected at a 90˚ angle.

![Plane Detection image](/public/images/2020-04-20-homebrew-lidar/Plane Detection image.jpg)

<div class="caption" markdown="1">
*The scene with yaw bounds overlaid.*
</div>

![Plane Detection Point Cloud](/public/images/2020-04-20-homebrew-lidar/Plane Detection Point Cloud.png)

<div class="caption" markdown="1">
*The resulting scan.*
</div>

The raw point clouds created by the scanner are quite noisy and need to be cleaned up before proceeding. This quick-and-dirty cleaning algorithm divides the area of the scan into small bounding boxes, and tallies the number of points that fall within each box.

![Region Point Count Distribution](/public/images/2020-04-20-homebrew-lidar/Region Point Count Distribution.png)

<div class="caption" markdown="1">
*The distribution of region point counts.*
</div>

By selecting a certain threshold of points and removing all of the points that fall in regions with a point count below this threshold, the point cloud is surprisingly cleaner. Only the high-density regions of the scan remain, which usually correspond to the actual surfaces in the scene, instead of noise.

The actual plane detection is done through using the Hough Transform, an absolutely wonderful piece of math that is explained quite well [here](https://www.youtube.com/watch?v=4zHbI-fFIlI). In essence, points "vote" on all of the possible planes that pass through them, and the planes with the highest number of votes are the planes that best fit the largest number of points. In this case, since only vertical planes are of interest, the data can be simplified to 2D points with the height information discarded.

![Top Down](/public/images/2020-04-20-homebrew-lidar/Top Down.png)

<div class="caption" markdown="1">
*The simplified, top-down 2D point cloud.*
</div>

The Hough Transform when run on this top-down 2D set of points returns a set of 2D lines that best fit the points. These lines represent the position and orientation of the vertical planes present in the scan.

![Top Down With Lines](/public/images/2020-04-20-homebrew-lidar/Top Down With Lines.png)

<div class="caption" markdown="1">
*The 2D point cloud with detected lines superimposed.*
</div>

The lines returned by the Hough Transform are infinitely long. To calculate bounds for the lines, the most extreme points are found that are within a certain distance of each line. In between these extreme points lie the vertical planes in the scan.

![Planes](/public/images/2020-04-20-homebrew-lidar/Planes.png)

<div class="caption" markdown="1">
*The original scan with detected planes superimposed.*
</div>

## Works Cited

[^fn1]: [http://www-video.eecs.berkeley.edu/research/indoor/](http://www-video.eecs.berkeley.edu/research/indoor/)
[^fn2]: [https://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf](https://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf)
[^fn3]: [https://cdn.sparkfun.com/datasheets/Sensors/Proximity/LIDAR-Lite-Data-Sheet.pdf](https://cdn.sparkfun.com/datasheets/Sensors/Proximity/LIDAR-Lite-Data-Sheet.pdf)
