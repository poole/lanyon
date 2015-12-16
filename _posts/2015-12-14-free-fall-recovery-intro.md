---
layout: post
title: Free-fall recovery
---

An account of my internship at [LIS](http://lis.epfl.ch/). You can find most of the code
on [Github](https://github.com/lis-epfl/MAVRIC_Library/tree/throw-recovery).

## Motivation

The [RPG](http://rpg.ifi.uzh.ch/aggressive_flight.html) group from ETHZ published a paper titled *Automatic
Re-Initialization and Failure Recovery for Aggressive Flight with a Monocular
Vision-Based Quadrotor* [^1]. Their method would allow for the quadcopter to recover
from an arbitrary initial position, orientation and acceleration, which would be
useful as an emergency recovery method or as a fun way to launch your quad
by just throwing it in the air.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pGU1s6Y55JI" frameborder="0" allowfullscreen></iframe>{: .center-image}
<br>
The main attraction of this method was that it did not rely on any external
sensing (for state estimation) or computation, leaving the quadcopter to carry
all of the computational load, allowing full autonomy and setting independence
(no need to map your surroundings beforehand).
This also means it can be used indoors as well as outdoors. Many of the current
methods used for automatic recovery rely on advanced positional tracking, most
commonly with infra-red sensors in a confined environment, like [Optitrack](http://www.optitrack.com) for example.

We set out to implement a variation of their method, adapted to the [MAVRIC](https://github.com/lis-epfl/MAVRIC_Library) platform.
Their are several major differences in our work, most notably the fact that we have
not implemented optical tracking for position locking, the last stabilization stage.

## Implementation outline

The entire process is governed by a state machine that controls the transitions
between stabilization states based on given predicates or thresholds. This state
machine does have some specificities : it is organized somewhat as a cascade, where
once a task is considered accomplished, it does not end all together. During the next
steps, the previous stabilization mechanisms are still in effect. For example,
once we have stabilized our vertical velocity, we do not want our quad to fall like
a rock if our new goal is to stabilize our horizontal velocity.

![Figure 1-1]({{site.url}}/assets/modules.svg "Figure 1-1"){: .center-image }
<center><strong>Figure 1 : Stabilization phases</strong></center>

The module structure is shown above. Let's go through it quickly. Some of these
will be described more in detail in following posts.

### Launch detection
First of all, we need to find out if our quad has been thrown or it is falling. To do that, we use
the fact that an object in free-fall will feel no acceleration as it reaches the
apex of its trajectory. In the real world, sensors are noisy, outside forces do
apply (one problematic one is the centrifugal force : if the quad starts rotating
around its own axis, it will feel an extra acceleration on top of that caused by gravity), so we
can't rely on a 0-valued instantaneous measurement form the accelerometers. We will define
a threshold under which we can assume the object is falling. Also, we will be looking
at a mean value over a given number of samples to make sure we're actually seeing
what we want to see and not just noise : this is called a [moving average](https://en.wikipedia.org/wiki/Moving_average).

![Figure 2-1]({{site.url}}/assets/sma_pres_big.png "Figure 2-1"){: .center-image }
<center><strong>Figure 2 : Acceleration measured over time (in ms)</strong></center>

As you will notice in the above the figure, there is a large peak when the quad is thrown,
then a drop as we reach free-fall, but we are still far from reaching a zero-value.
Once the threshold is crossed, we can start off the second phase : attitude control.

### Attitude control

To define where a quadcopter is in space, you need your regular *x*, *y*, *z* coordinates
(or whatever coordinate system you chose). You now need to figure out how to express
your quad's orientation in space. For that, three angles are used : *yaw*, *pitch* and *roll*.

![Figure 3-1]({{site.url}}/assets/attitude.jpg "Figure 3-1"){: .center-image }
<center><strong>Figure 3 : A quad with an attitude</strong></center>

The first stabilization we need to accomplish is to get the quad back upright :
we need roll and pitch angles to be 0 so we can be horizontal with respect to
the ground level.

### Vertical velocity

Now that we're parallel to the ground, we need to avoid hitting it head on. Just
by adding some thrust to the rotors, we can keep the quad from hitting the ground.
The target vertical speed would ideally be *0 m/s*, but we can start the next phase
even with a small vertical velocity (upwards or downwards) and the remainder of the
error will be canceled out during the next phases of our stabilization (remember the
cascade nature of our state machine).

### Height control

Once we know we're not shooting for the ground, we have to get a sense of where we
are in space, particularly (and most urgently) our height. If we took too much time
to stabilize our vertical speed we might be very close to the floor. We can decide
arbitrarily how high we want to go, let's settle for *2m*.

Now how does our quad find out where it is ? Well it has to sense it, using ... sensors.
Yeah, I know pretty boring ellipsis ... The interesting part is that it doesn't use
only one sensor but rather a subtle mix of different information from different sensors called
MSF, or [Multi-Sensor Fusion](https://en.wikipedia.org/wiki/Sensor_fusion).
This technique is used throughout our project and is an easy way to have the most
accurate estimate possible, essential to have a functional control algorithm. For
the altitude we will use a combination of a sonar [^2], our GPS and a barometer [^3].

### Horizontal velocity

Okay, so we've avoided hitting the ground but what if there are obstacles on our
way ? We have to avoid drifting along once we've reached a desired altitude. The
same methods are used for this step as the vertical velocity, except this time we
can use the fact that our quadcopter has four rotors (it's in the name !). By
combining different speeds on a combination of these motors we can move in different
directions : that's how a quad is so agile. For example, putting more thrust on
the back propellers will incline the drone forward and make it move. We can use this
effect to our advantage in this step : if we're drifting "back", we just have to
force it to move forwards, cancelling the previous movement !

![Figure 4-1]({{site.url}}/assets/quadrotor_movement.jpg "Figure 4-1"){: .center-image }
<center><strong>Figure 4 : How does a quadcopter get around ?</strong></center>

### Position locking

Finally we've arrived at the last stabilization step. After setting the drone upright,
cancelling its original momentum in the vertical and horizontal planes and sticking
to a defined altitude we can now set its final resting place. We can assign the quad
to a given position and it will just sit there. Isn't magic ? Okay, admittedly it's
not that easy. As we mentioned we do not have ground truth (ie an absolute "true"
value for its actual position), we can only estimate where it actually is. So minimizing
errors is essential, but we can't cancel them all together : reality is messy. We
can try our best to stick to our position, once again playing with a combination
of thrusts to counteract any drift that may appear.


## Preliminary results

So, after all this, does it actually work ? Yeah ! We've been able to reproduce
the stabilization behavior described in the publication. Our implementation is
cross-platform so it can in theory be used anywhere our library runs. It needs
minimal configuration, and can be manually enabled or disabled from a remote control
switch.

<iframe width="560" height="315" src="https://youtube.com/embed/2tp7x3Xg5Hk" frameborder="0" allowfullscreen></iframe>{: .center-image}
<br>
Trying to define how fast it is can be a tricky question, because some steps
strongly depend on the initial conditions, especially for height control. Here's
a little recap of the average time it takes to complete each step, based on tests
carried out on our platform.

|         Step        |    Time    |
|:-------------------:|:----------:|
|   Launch detection  |   350 ms   |
|   Attitude control  |   675 ms   |
|  Vertical velocity  | 200-800 ms |
|    Height control   |      -     |
| Horizontal velocity | 800-1500ms |

One of the major drawbacks of our method is the use of a GPS, which restricts its
usage to outdoor configurations. Nevertheless it is not a technical limitation to
add an optical tracking method to the algorithm, for example with a [PX4Flow](https://pixhawk.org/modules/px4flow) sensor
or a simple laser motion sensor, like the ADNS 9800 [^4] which is used in computer
mice. They use a very interesting method called [optical flow](https://en.wikipedia.org/wiki/Optical_flow). The idea is that there
is no need for an optical sensor to have a high resolution or a acute knowledge
of what it's looking at. Instead, we compute a difference between two successive
images, from which we can deduce a movement vector which tells us in what direction
and how fast we are moving.

![Figure 5-1]({{site.url}}/assets/optical_flow.png "Figure 5-1"){: .center-image }
<center><strong>Figure 5 : Optical flow method</strong></center>

## Wrapping up

This is the first of a series of posts about this project, a high level introduction
to what the work accomplished was all about. I hope you stay tuned for some more
technical insight on how it actually works, but as you can already see, the elegance
of control theory allows for some impressive results using only very simple concepts.

Cheers !

---

[^1]: IEEE International Conference on Robotics and Automation (ICRA), Seattle, 2015, [Link](http://rpg.ifi.uzh.ch/docs/ICRA15_Faessler.pdf)
[^2]: Reference : MB1242 I2CXL Sonar, [Datasheet](http://www.maxbotix.com/documents/I2CXL-MaxSonar-EZ_Datasheet.pdf)
[^3]: Reference : BMP085 Barometer, [Datasheet](https://www.adafruit.com/datasheets/BMP085_DataSheet_Rev.1.0_01July2008.pdf)
[^4]: Reference : ADNS 9800 HD Optical Flow Sensor, [Datasheet](http://www.pixart.com.tw/upload/ADNS-9800%20DS_S_V1.0_20130514144352.pdf)
