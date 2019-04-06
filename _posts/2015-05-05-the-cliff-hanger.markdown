---
layout: post
title: The Cliff-Hanger
date: 2015-05-05 19:03
comments: true
external-url:
categories: Mathematics
---

> Joseph is coming from "queima das fitas" and is a little tipsy. He stands near a cliff doing... something. If he takes one more step forward, he falls over the edge. He takes **a series of infinite random steps** either towards the cliff ($$p=~^1/_3$$) or away ($$q=1-p=~^2/_3$$). What is his chance of escaping? [^a]

  [^a]: This is adapted from problem 35 of Frederick Mosteller's "*[Fifty Challenging Problems in Probability](http://www.amazon.com/Challenging-Problems-Probability-Solutions-Mathematics/dp/0486653552)*".

Let $$p$$ be the probability of moving towards the cliff ($$←$$), and $$q$$ of moving away ($$→$$). Then:

| outcome               | probability |
|-----------------------|-------------|
| $$←$$                   | $$p$$         |
| $$[→←]←$$               | $$p[1\cdot q^1p^1]$$ |
| $$[→→←←]← \\ [→←→←]←$$  | $$p[2\cdot q^2p^2]$$         |
| $$[→→→←←←]← \\ [→←→←→←]← \\ [→→←→←←]← \\ [→←→→←←]← \\ [→→←←→←]←$$  | $$p[5\cdot q^3p^3]$$         |
| ... | $$p[14\cdot q^4p^4]$$
| ... | ... |


The first few Catalan numbers are 1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786.
{: .sidenote }

Inside `[]` one can regard the valid combinations of arrows as the same problem of enumerating the valid combinations of balanced `()`'s in an expression. This sequence can be captured using the [Catalan](http://en.wikipedia.org/wiki/Catalan_number) number:

$$\frac{(2 n)!}{(n + 1)! n!}$$

Hence, the probability of the cliff hanger escaping is given by:

$$p+p\sum_{n=1}^{\infty}{\frac{(2 n)!}{(n + 1)! n!}p^n q^n} = 0.5$$

Which is kind of counter-intuitive: in half of the **infinite expansions** Joseph ends up falls over the edge, and in the other half, not.
