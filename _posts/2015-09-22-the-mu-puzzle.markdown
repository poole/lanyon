---
layout: post
title: The Mu Puzzle
date: 2015-09-22 00:51
comments: true
external-url:
categories: Mathematics
---

> Imagine strings that only contains the letters `M`, `I` and `U`. Every valid string begins with an `M`. You can generate new strings by successively applying one of four rules: (1) you can add an `U` to any string that ends in an `I`; (2) you can double everything from an `M` to the end of the string; (3) any occurrence of `III` can be replaced by a single `U`; and (4) you can simply remove any occurrences of `UU`. The puzzle is thus: starting from the string `MI`, what is the sequence of rules one must apply to produce the string `MU`? [^1]

Let's first summarize the rules in a nice table, so that we can be clear about their semantics:

|   | Rule            |          Example     |
|:-:|----------------:|---------------------:|  
| 1 | `xI` → `xIU`    | `MII` → `MIIU`       |
| 2 | `Mx` → `Mxx`    | `MUI` → `MUIUI`      |
| 3 | `xIIIy` → `xUy` | `MUIIIU` → `MUUU`    |
| 4 | `xUUy` → `xy`   | `MIUUUI` → `MIUI`    |

Assume `x` and `y` denote any arbitrary (sub-)string. Let's play the game a little bit. Suppose we start with the string `MUI`:

```
MUI                     { axiom }
MUIU                    { by applying rule 1 }
MUIUUIU                 { rule 2 }
MUIUUIUUIU              { 2 }
MUIIUUIU                { 4 }
MUIIIU                  { 4 }
MUU                     { 3 }
M                       { 4 }
```

It seems we've reached a point where there's no rule we can apply (well, except rule 2, but that would not change the string `M`). Now, the puzzle asks us: what's the sequence of steps that transforms a `MI` into a `MU`?

Why a [BFS](https://en.wikipedia.org/wiki/Breadth-first_search) and not a [DFS](https://en.wikipedia.org/wiki/Depth-first_search)? Suppose you've chosen to use DFS. Now, when would a long sequence of rules be long enough that you should begin to search for alternatives?
{: .sidenote }

We can attempt to solve this problem with a program that does a [breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search), by recursively applying every rule that is applicable (*i.e.* valid) to a reached string and checking if it is equal to `MU`. We would, however, quickly reach the conclusion that the program doesn't stop after a considerable amount of time/steps.

In these situations, one might begin to wonder: "*regardless of the sequence of rules one apply, would it be possible to reach `MU` starting from a `MI`?*"

## The Unbearable Impossibility of MU

Should the reader begin to be convinced that *maybe* this puzzle doesn't have a solution, how would one proceed to mathematically prove it?

One common strategy, particularly when *loops* or *recursion* is part of the problem, is to (1) establish a *proposition* that asserts something about the underlying formal system and (2) show that if the *proposition* holds for a certain string, it would also hold for all strings that are the result of applying the rules. Such kind of *proposition* is called an [*invariant*](https://en.wikipedia.org/wiki/Invariant_(computer_science)), for obvious reasons:

> ... (an) invariant is a property, held by a class of mathematical objects, which remains unchanged when transformations of a certain type are applied to the objects.

What would be a good invariant in this case? Well, starting from `MI` one needs to get rid of the `I` and create a `U`. Creating `U`'s is straightforward due to rule 1 (or rule 3), but getting rid of `I`'s is trickier — rule 3 requires three `I`'s to get rid of them, and the only way to create more `I`'s is through the slightly chaotic rule 2, provided we start with any `I` in the first place. Getting rid of extra `U`'s is also easy due to rule 4.

Thinking backwards, one would need to reach a state where three `I`'s exist (or any multiple of 3). Starting from `MI`, that has only one `I`, can we create 3 of them (or 6, 9...)? Here's a hint to the property we were looking for: the number of `I`'s. Let's state the invariant as such:

> Regardless of what we do, **the number of `I`'s in a string is not a multiple of 3.**

`MI` has only one `I`, so the invariant holds in the beginning. If you recall [proof by induction]({% post_url 2013-02-19-all-gambozinos-are-white %}), this is the base case. Now, regardless of the string, does applying rule 1 preserve the invariant? Yes it does, particularly because it doesn't change the number of `I`'s. Same goes for rule 4.

In doubt, recall the notion of [divisor](https://en.wikipedia.org/wiki/Divisor) and note that 2 and 3 are prime numbers.
{: .sidenote }

Rule 2 doubles the number of `I`'s present in a string. However, if $n$ is not a multiple of 3, 2$n$ is still not a multiple of 3 either. Rule 3, on the other hand, reduces the number of `I`'s by 3; but similarly, if $n$ is not a multiple of 3, $n$-3 isn't either.

Hence, we are forced to accept that, **regardless the sequence of rules we try, by beginning with `MI` we would _never_ be able to reach a state where producing a `MU` is a possibility.** ∎

[^1]: I first learned about this puzzle in the amazing Douglas Hofstadter's book "[*Gödel, Escher, Bach: An Eternal Golden Braid*](https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach)", and I've been using it in the last years as a way to introduce formal proofs via invariant preservation. As always, one can find more information about this puzzle in [Wikipedia](https://en.wikipedia.org/wiki/MU_puzzle).
