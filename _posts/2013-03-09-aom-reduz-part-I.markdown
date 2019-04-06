---
layout: post
title: "AOM Redux Part I - Software Crisis"
date: 2013-04-09 20:55
comments: true
external-url:
categories: Software
---

Software — and the corresponding area of software engineering — seems to be in crisis since the early days of computing science. The rapid growth in both computer power and problem complexity has been resulting in a corresponding increase in the difficulty of writing *correct*, *understandable* and *verifiable* computer programs [^2]. Such state was recognized since the NATO sponsored conference on software engineering circa 1968, where unreasonable expectations and change were underlined as major contributing factors. A few year later, Edsger Dijkstra commented this same issue during his 1972 ACM Turing Award lecture:

> The major cause of the software crisis is that the machines have become several orders of magnitude more powerful! To put it quite bluntly: as long as there were no machines, programming was no problem at all; when we had a few weak computers, programming became a mild problem, and now we have gigantic computers, programming has become an equally gigantic problem.

On the technology side, a similar concern was being shared by Alan Kay during the design of Smalltalk and the dawn of object-oriented programming and personal computers:

> ... there would be millions of personal machines and users, mostly outside of direct institutional control. Where would the applications and training come from? Why should we expect an applications programmer to anticipate the specific needs of a particular one of the millions of potential users? An extensional system seemed to be called for in which the end-users would do most of the tailoring (and even some of the direct constructions) of their tools [sic].

And yet, despite the natural reaction on creating better tools and methodologies for software development, a 1987 *godelian* exposure by Fred Brooks brings a general consensus among the software engineering community that there is no "silver bullet" — no single approach will prevent project overruns and failures in all possible cases. A conjecture somewhat disturbing in light of consecutive CHAOS reports, where the success rate of software projects was estimated to be only 16%, with challenged projects accounting for 53%, and impaired (cancelled) for 31% in 1994, and a success of 32%, 44% challenged, and 24% failed in 2009 [^1].


[^1]: Although the exact nature of these figures has been target of recent criticism, it seems that either their results are heavily biased, or even a moderate change in the accuracy of the success ratio, e.g. from 32% to 50%, would probably still render the field as *in crisis*.

[^2]: I can't stress enough that the pursuit of these properties are what entitles us to use the word *engineering* in *software engineering*.
