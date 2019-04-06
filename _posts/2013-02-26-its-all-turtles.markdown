---
layout: post
title: "Turtles all the way down (or up?)"
date: 2013-02-26 03:39
comments: true
external-url:
categories: Software
---

The line separating between data and model is blurred when speaking about *meta-data*, in the sense that everything is, ultimately, *data*; only its *purpose* is different. For example, the information that some particular video in our system is named *The Matrix*, and another one named *Lord of the Rings*, is called data for the purpose of using it as an information system for video renting. We could hypothetically draw a line encompassing all the objects that account for data (normally called instances) and name it the meta-level-zero ($$M_0$$) of our system.

The way we would typically model such a simple system in an object-oriented language would be to create a class named Video, along with an attribute named Title. But what may be considered the model in one context, may be seen as data in another, e.g., for the compiler. As such, this information is meta-data in the sense that it is *data about data itself*: in fact, it conveys a very crucial information, which is the data's structure (and meaning), for the purpose of specifying an executable program. Once again, we could draw a line around these things that represent information about other things — classes, properties, etc. — and call them meta-level-one ($$M_1$$), or simply model.

But, what exactly is a class, or a property? What is the meaning of calling a method, or storing a value? As the reader might have guessed, once again, there is structure behind structure itself — an infrastructure — and the collection of such things is called meta-level-two ($$M_2$$), or meta-model for short (i.e., a model that defines models), which is composed of meta-classes, class factories, and other similar artifacts.

Hence, when we talk about data (or instances) we are referring to $$M_0$$ — bare information that doesn’t provide structure. By model we are referring to $$M_1$$ — its information gives structure to data. By meta-model we are referring to $$M_2$$ — information used to define the infrastructure. And so on...

Ultimately, depending on the system’s purpose, we will reach a level which has no layer above. This "top-most" level doesn't (yet) have a name; in MOF it is called a meta-meta-model, due to being the third model layer [^1]. This building up of levels (or layers), where each one is directly accountable for providing structure and meaning to the layer below is known as the Reflective Tower, a visual metaphor that can be observed in the following figure:

![mof-hierarchy](http://skyservers.org/~bytter/mof-hierarchy.png)

**Figure 1.** The meta-class of the class class is the meta-class class. Or in other words, classes’ meta-classes are classes too.

All this would not be very useful if it did not had a purpose. I already mentioned the compiler, whose task is to read a particular kind of information (known as source code) and translate it into a set of structures and instructions (known as a program), which would later be executed by a computer — a process known as compilation. The compiler acts as a processing machine: the input goes into one side, and the outcome comes from the other. Once the compiler has done its job, it is no longer required, and so it does not observe nor interact with the final program. Should we wish to modify the final program, we would need to change the source code and handle it again to the compiler.

Now let us suppose we wanted to add a new property to a Video, like the name of its Director, or create new sub-types of videos as needed, like Documentary or TV Series, each one with different properties and relations? In other words, what if we need to adapt the program as it is running? For that, we would need both to observe and interact with our running application, modifying its structure on-the-fly (the technical term is during *run-time*). The property of systems that allow such thing to be performed is called *reflection*, i.e., the ability of a program to manipulate as data something representing the state of the program during its own execution. The two mentioned aspects of such manipulation, observation and interaction, are respectively known as *introspection*, i.e., to observe and reason about its own state, and *intercession*, i.e., to modify its own execution state (structure) or alter its own interpretation or meaning (semantics).

The technique of using programs to manipulate other programs, or the running program itself, is known as *meta-programming*, and the high-level design of such system is called a *meta-architecture*.

[^1]: Would it be the sixth, I seriously doubt anyone would apply the same prefix five times.
