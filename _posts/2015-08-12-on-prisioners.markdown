---
layout: post
title: Blog
date: 2015-08-12 01:28
comments: true
external-url:
categories: Blog
---

> A room has 100 boxes labelled 1 through 100. The prison has 100 prisoners also labelled 1 through 100. The number of the 100 prisoners have been placed in these boxes by the warden. The prisoners shall visit the room one by one. Each prisoner is allowed to inspect the contents of at most 50 boxes, one after the other and leave the room with no communication with other prisoners. If the prisoner discovers his own number in the boxes he inspects, he is released. The prisoners are allowed to collude before hand and devise a strategy to **maximize the chances of releasing each and every prisoner**. What is their strategy?

If you think on the naïve strategy of randomly choosing 50 boxes, then the probability that _every prisoner gets it right_ is $0.5^{100}$ or $8 × 10^{−31}$. There's a strategy, however, that can improve that probability to more than 30%! The solution to this amazing puzzle is explained below by my friend _I.M.Timóteo_ from the University of Cambridge:

## First remarks

The first idea that immediately comes to mind is that there needs to be a way of making their probabilities of success dependent on something. If they choose 50 boxes at random they are doomed with a probability of success equal to $0.5^{100}$. However, the problem assumes strictly no communication between prisoners after they enter the room meaning that experiences from one prisoner cannot be passed onto the following prisoners. Also, note that the prisoners can speak before entering but that any strategy assigning boxes to a prisoner beforehand is no different from a random assignment.

This means that we need to find a strategy that breaks the independence of the probabilities of success. This intuitively leads us to think of a strategy that guarantees the same probability of success to all the prisoners if applied by all of them, therefore making the success of a prisoner not independent of the success of another.

Given the small available information provided on this problem, there are very little ways of escaping a random assignment of boxes. In fact, the only way I can devise is to use the information of the previously opened boxes to "guide" our search.

## Key idea

The key idea is to run through the numbers we get from the boxes. That is, we open one box and then we open the box indexed by the number we just retrieved [^1]. Forgetting the limit of 50 boxes for a while, it is easy to see that we will eventually return to the first box we opened. This is called a cycle and all permutations can be seen as a set of cycles.

[^1]: Remember that the boxes are labelled.

Using the strategy described above, the first issue that arises is whether the cycle we are in contains our number or whether we are stuck in a cycle that does not. A simple way to guarantee that the cycle we are in contains our number is simply to start by the box indexed by our own number as eventually, when we finish the cycle, we will find our number (that would bring us back to the start).

Given that the number of boxes that can be inspected is limited to 50, we know that every prisoner is guaranteed to find his number if the permutation of boxes only has at most cycles of length 50.

## Solution

We will now check whether this strategy provides a probability of success greater than 30%. Always assuming the previously presented strategy, we start by noting that:

$$
P(\text{success}) = P(\text{permutation only has cycles of length at most}~50) > 0.3
$$

... which is the same as:

$$
\begin{equation}
1 - P(\text{permutation has a cycle of length}~> 50) > 0.3
\end{equation}
$$

We can only have one cycle of length greater than 50 in a permutation of length 100, so:

$$
P(k) = \frac{\binom{100}{k} \frac{k!}{k} (100 - k)!}{100!} = \frac{1}{k}
$$

... where $P(k)$ is the probability of a permutation of length 100 having a cycle of length $k, k > 50$. $\binom{100}{k}$ is choosing $k$ for the cycle from 100 possible; $k!$ is the number of ways we can arrange $k$ items in a cycle (permutations where the starting point does not matter); and $(100 − k)!$ is the number of ways we can arrange the remaining elements.

$$
P(\text{permutation has a cycle of length} > 50) = \sum_{k=51}^{100}{\frac{1}{k}} ≈ 0.68817
$$

Finally we have:

$$
1 - P(\text{permutation has a cycle of length}~> 50) > 0.3 \\
1 − 0.68817 = 0.31183 > 0.3
$$

## Final remark

Note that this merely proves that _"there’s a strategy that can improve that probability to more than 0.3"_.
A proof of optimality is not presented though it would be the actual answer to _"The prisoners are allowed to collude before hand and devise a strategy to **maximize** the chances of releasing each and every prisoner. What is their strategy?"_. A [proof of the optimality](http://www.cl.cam.ac.uk/~gw104/Locker_Puzzle.pdf) of this strategy was provided in 2006 by Eugene Curtin and Max Warshauer.

## Source code

If you want to test the strategy, here's a Scala program that simulates it:

```scala
val trials = 10
val n = 4
val k = n / 2

/* Naive
val experiences = (0 to trials - 1) map { _ =>
  val boxes = Random.shuffle(0 to n - 1).toList
  ((0 to n - 1) map { prisoner =>
    Random.shuffle(0 to n - 1).take(k).exists(b => boxes(b) == prisoner)
  }).forall(identity)
} */

/* Cycle Exploitation */
val experiences = (0 to trials - 1) map { trial =>
  val boxes = Random.shuffle(0 to n - 1).toList
  println(s"----- New trial $trial -----")
  ((0 to n - 1) map { prisoner =>
    var t = 0
    var found = false
    var nextBox = prisoner
    while ((t < k) && !found) {
      print(s"Prisoner $prisoner @ attempt $t is looking in box $nextBox... ")
      nextBox = boxes(nextBox)
      println(s"found $nextBox")
      found = nextBox == prisoner
      t += 1
    }
    found
  }).forall(identity)
}

val p = experiences.count(identity).toDouble / trials
println(p)
```
