---
layout: post
title: "Preliminary Thoughts on Software Design - Part I"
date: 2013-02-26 02:47
comments: true
external-url:
categories: Software
---

I see the word *design* being loosely used almost every day. People say a particular framework has a good or bad design. They discuss "*architectural design*" [^1]. They even pay thousands for an expert to design their innovative software solution.

But, what exactly *is* design? What makes the difference between *good* and *bad* design? How do we *measure* it? Why is it a key factor in the development of sophisticated computer systems?

The Webster’s dictionary defines it as the act of (i) "*working out the form of something*", (ii) "*sketching a plan for something*", (iii) "*creating something in the mind*", or (iv) "*doing something for a specific role or purpose or effect*". And it also seems that Software Engineering has also been faced with the task of sketching, planning, and creating suitable products for specific purposes.

{: .sidenote}
  ![software-forces](http://skyservers.org/~bytter/software-forces.png)
  **Figure 1.** Here, _time_ refers to the amount of time available to complete a project, _cost_ refers to the budgeted amount available, and _scope_ refers the project’s domain limit and detail. Each force mutually influences (either positively or negatively) every other. Consequently, _quality_ is regarded as a result function of how the other forces are balanced.

But Software Engineering, aspiring to become a quantitative science, goes beyond mere sketches. Software solutions drafted during the *design* of a software artifact *do* consider *forces* such as (i) the experience of the team, (ii) the available budget, (iii) technical constraints, etc. In fact, software projects were historically recognized as having four major forces through which any particular balance (or imbalance) of them directly influences the viability of a specific solution, as seen in the left.

But even taking into consideration these four major forces, the ever increasing complexity (both inherent and accidental) of building and managing software artifacts are pushing the limits of creation beyond the ability of a single entity. And similarly to every other areas of engineering, it is not uncommon for a single problem to have multiple ways to be coped with.

So how does an engineer choose the *best design* for a specific function?

As knowledge grows in a specific area, solutions are captured and documented by experts in books, research papers, concrete implementations, web pages, and a myriad of other types of communication media.

While we may intuitively think that *any growth in the body of knowledge implies better design choices*, it seems that the way (and the amount) this knowledge is being captured raises an important issue per-se. As pointed out by Schwartz [^2], the overabundance of choice that our modern society has poses a cause for psychological distress, where the *information overflow ultimately results on an over-simplification of criteria*.

Actually, preceding Schwartz in four decades, Christopher Alexander claimed [^3] that most information on any specific body of knowledge is "*hard to handle, widespread, diffuse, unorganized, and ever-changing*". Moreover, this "*amount of information is increasingly growing beyond the reach of single designers*". He concluded that "*although a specific solution should reflect all the known facts relevant to a specific design (...) the average designer scans whatever information he happens on and introduces it randomly*". [^4]

Design, as an *intentional act of choice*, is *constantly overwhelmed by the sheer quantity of available information*. So, in the end, how does an engineer *actually* chooses the *best design* for *any* specific function?


[^1]: Whatever that is...
[^2]: ["*The Paradox of Choice: Why More is Less*"](http://www.amazon.com/Paradox-Choice-Why-More-Less/dp/0060005696)
[^3]: ["*Notes on the Synthesis of Form*"](http://www.amazon.com/Notes-Synthesis-Form-Harvard-Paperbacks/dp/0674627512)
[^4]: I don't know about you, but realizing that most design choices are akin to a random walk isn't very flattering to our profession.
