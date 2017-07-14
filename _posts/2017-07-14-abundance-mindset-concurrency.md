---
layout: post
title: Concurrency, an abundance mindset, and Go
---

Today, I merged
[a Pull Request](https://github.com/hunterloftis/pbr/pull/9/files)
that's so obviously the right model for my
[Go rendering engine](https://github.com/hunterloftis/pbr#pbr-a-physically-based-renderer-in-go)
that I had to sit down and figure out why I did it any other way in the first place.

It turns out I have a JavaScripter's mindset on concurrency.

In JavaScript, you have two levels of concurrency to choose from.
On a single CPU you have the single-threaded, non-blocking type,
where an event loop lets you simulate I/O concurrency.
This doesn't help with hashing passwords or processing long lists,
but you can read a file without ignoring HTTP requests.
Across CPUs you have workers (*web workers* in the browser, *cluster workers* in node).
Each worker forks its own process with all that that entails for
startup time, memory use, and inter-process communication.

This generates two habits:
First, you *always* write async code because you're sharing a single thread with the rest of the process.
Iterating over a large array can cause performance issues in a JS app.
Second, you consider concurrency in terms of single digits to map processes to CPUs.
If you spend too much time on a task, you block other functions from the event loop;
if you spin up too many processes, you create contention and waste resources.

So, when I added concurrency to
[pbr](https://github.com/hunterloftis/pbr#pbr-a-physically-based-renderer-in-go)'s API,
I forced the user to spin up a handful of goroutines that they'd monitor over channels.
It resulted in
[this monstrosity](https://github.com/hunterloftis/pbr/blob/2c876535011379b54d93c58ba72500c8e6c69771/cmd/render/render.go#L74-L94)
which will be familiar to anyone who's used
[node's cluster API](https://nodejs.org/api/cluster.html#cluster_cluster).

As I sketched out a 100-line, 2-channel "hello, world" example, I realized my mistake.
The pbr renderer could, internally, start as many goroutines as it needs to quickly render an image,
without ever exposing that to the user.
In Go, I can have as much concurrency as I want!
It isn't tied to a single thread or CPU.

Go developers approach concurrency with an abundance mindset.

So now you can render pbr's
[Hello, world scene](https://github.com/hunterloftis/pbr#hello-world)
in 15 lines and zero channels.
Underneath, it's creating goroutines for every block of *N* pixels.
But why would you care?
You just want a pretty picture.