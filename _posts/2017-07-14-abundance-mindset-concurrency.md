---
layout: post
title: Concurrency, an abundance mindset, and Go
---

I just merged a
[a Pull Request](https://github.com/hunterloftis/pbr/pull/9/files)
that's so obviously the right model for my
[Go rendering engine](https://github.com/hunterloftis/pbr#pbr-a-physically-based-renderer-in-go)
that I had to sit down and figure out why I did it any other way in the first place.
It turns out I have a JavaScripter's mindset on concurrency.

In JavaScript, you have two levels of concurrency to choose from.
On a single CPU you have the single-threaded, non-blocking type,
where an event loop lets you simulate I/O concurrency.
This doesn't help with hashing passwords or processing long lists,
but it lets you read a file without ignoring HTTP requests.
Across multiple CPUs, you have workers (*web workers* in the browser, *cluster workers* in node).
Each worker forks its own process with all that that entails for
startup time, memory use, and inter-process communication.

This generates two habits:
First, you *always* write async code, because you're sharing a single thread with the rest of the process.
Iterating over a large array can cause performance issues in a JS app.
Second, when writing for multiple CPUs, you consider concurrency in terms of single or low-double digits
to map processes to hardware.

There's nothing in JS like a [goroutine](https://tour.golang.org/concurrency/1),
a light, concurrent "thread" that can happily run with hundreds of thousands of siblings
across all the system's CPUs.
So you end up thinking of concurrency as a scarce resource:
if you spend too much time on a task, you're blocking other functions from the JS event loop;
if you spin up too many processes, you're adding CPU contention and wasting resources.

