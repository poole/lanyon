---
layout: post
title: Secret Santa
---

Last December, my friend was in charge of setting up a Secret Santa game for his small office. At the time, I was just starting to learn Python. I was working through the lessons on Codecademy, and this presented a great opportunity to try out what I was learning. In the spirit of blogging, I'll share the code here.

For those uninitiated, this is Secret Santa: You have a group of people. Every person is anonymously assigned someone else in the group to give a present to. On a designated date, presumably around Christmas, everyone gets together to open their gifts from their mystery benefactors. Antics ensue. 

The process pretty much begs to be automated, especially because everything has to be anonymous. What my friend did involved manually rolling a die and writing down name pairs on a piece of paper - definitely not great. Based on the rules of the game, I created a few parameters that the ideal program would meet:

* Everyone is assigned a Santa.
* Nobody is assigned to themselves.
* Nobody is assigned into closed-loop pairs (i.e. in a group of 5 people, Joe and Moe gift to each other).
* Assignments are done randomly.

Here is the final program:

{% gist 715ad628816beb921b01 %}

Now that the summer is over and December is a mere three months away, I'd like to revisit my program and turn it into something functional. It would be great to create a GUI and have Secret Santa assignments be emailed automatically. Stay tuned for more!