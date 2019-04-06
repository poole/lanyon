---
layout: post
title: Sleeping Beauty
date: 2016-05-28 15:46
comments: true
external-url:
categories: Mathematics
---

> Sleeping Beauty undergoes an experiment where she's put to sleep on Sunday. Immediately after that, a fair coin is tossed. If it comes out Heads, Sleeping Beauty is waken on Monday. If it comes out Tails, she's waken both on Monday and Tuesday. After being waken, the experimentalist asks Sleeping Beauty: *"What is your degree of certainty that the coin landed heads?"*. He subsequently puts Sleeping Beauty to sleep, taking care to administer her an amnesia inducing drug that ensures she doesn't remember the experiment. Hence, everytime Sleeping Beauty is awaked, she won't know which day it is or whether she has already been awakened before or not. What should her answer be?

It's amazing how a simple puzzle installs chaos among mathematicians and philosophers alike. Some would argue that the correct probability is ½: after all, the coin is **fair**, isn't it? Others would say that the correct probability should be ⅓. Think about this problem for a second because the correct answer is... **both**!

As many things in life, it's all a matter of perspective. And the conundrum here lies in the way the problem is phrased. But before going into maths and probability theory, we shall **simulate**:

```scala
var correct = 0
var questions = 0
var heads = 0
var trials = 10000

// Let's run some trials
(1 to trials).foreach { trial =>
  // toss a fair coin
  scala.util.Random.nextBoolean() match {
    case true =>  // Heads was tossed. Wake on Monday.
      // Sleeping Beauty always bet Heads was tossed;
      // ... in this case, only once.
      questions += 1
      correct += 1
      heads += 1
    case _ =>     // Tails was tossed. Wake on Monday and Tuesday.
      // Sleeping Beauty always bet Heads was tossed;
      // ... in this case, it will bet both on Monday
      // and Tuesday. But it will fail!
      questions += 2
  }
}

println("Probability of SB being correct: " + correct.toDouble/questions)
println("Probability of Heads being tossed: " + heads.toDouble/trials)
```

Here's a sample run:

```
Probability of SB being correct: 0.33636242148870776
Probability of Heads being tossed: 0.5034
```

## Two questions, two answers

The attentive reader should have already grasped that the answer depends on *what exactly we are counting as a success*. If we measure success as the *number of times Sleeping Beauty is able to give a correct answer*, then her *degree* of confidence should be ⅓, as the above simulation shows. If you are still unable to see how, under that measurement of success, the number of times Sleeping Beauty is awakened impacts the answer, then imagine the following puzzle variant:

> (...) she's put to sleep on the 31th of December. If it comes out Heads, Sleeping Beauty is waken on the 1st of January. If it comes out Tails, she's waken every single day for the whole year, *i.e.*, 365 days.

Or even something a little more extreme:

> (...) If it comes out Heads, Sleeping Beauty is waken on Monday. If it comes out Tails, she stays asleep forever.

The last one is my favorite variation, since it's pretty obvious that, if she's ever awakened, then the confidence she has that Heads was tossed is 100%; even if that mere fact doesn't influence even a bit the tossing of a fair coin. It is an *a posteriori* confidence, *given that she's waken*.

On the converse, this discussion points out to the second interpretation, which is the *confidence Sleeping Beauty has that the coin could produce Heads at the moment of tossing*. In other words, an *a priori* confidence on the bias of the coin *per se*. This last one would always be 0.5, but we can no longer rely on multiple trials to measure success(es) because if Tails come up, Sleeping Beauty will never be able to answer.

There has been an extensive discussion on this topic, so I will not reiterate what has already been well laid out [in this paper](http://arxiv.org/ftp/arxiv/papers/0806/0806.1316.pdf), in this  [video](https://www.youtube.com/watch?v=zL52lG6aNIY), in [Wikipedia](https://en.wikipedia.org/wiki/Sleeping_Beauty), or, more recently, during several different expositions [[1](https://www.quantamagazine.org/20160114-sleeping-beautys-necker-cube-dilemma/),
[2](https://www.quantamagazine.org/20160129-solution-sleeping-beautys-dilemma/), [3](https://www.quantamagazine.org/20160331-why-sleeping-beauty-is-lost-in-time/)] in [Quanta Magazine](http://www.quantamagazine.org/).
