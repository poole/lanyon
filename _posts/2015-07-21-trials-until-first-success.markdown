---
layout: post
title: Trials Until First Success
date: 2015-07-21 16:27
comments: true
external-url:
categories: Mathematics
---

> On the average, how many times must a die be thrown until one gets a 6?

## Approach A: Analytical

Let $p =~^1/_6$ as the probability of getting a 6, and $q = 1 - p$ of not getting one. Then:

 | case | throws | probability |
 |------|--------|-------------|
 | 6    | 1      | $p$         |
 | x6   | 2      | $pq$        |
 | xx6  | 3      | $pq^2$      |
 | xxx6 | 4      | $pq^3$      |
 | ...  | $n$    | $pq^{n-1}$  |

The mean (or expected value) is, by definition:

$$\mu_X = \mathbb{E}[X] = \sum_{x \in S} x \cdot p(x)$$

Hence:

$$1p + 2pq^1 + 3pq^2 + \cdots + npq^{n-1}= \sum_{n=1}^\infty np(1-p)^{n-1} = 1/p = 6$$

As a check, if we sum all probabilities we have:

$$p(1 + q + q^2 + q^3 + \cdots+q^{n-1}) = \sum_{n=1}^\infty pq^{n-1} = \frac{p}{1-q} = \frac{p}{p} = 1$$

## Approach B: Distributions

We use a [negative binomial](http://en.wikipedia.org/wiki/Negative_binomial_distribution) to model the variable. The definition of a negative binomial is:

 > (...) the number of successes in a sequence of *iid* Bernoulli trials before a specified (non-random) number of failures (denoted r) occurs is given by NBin(r, p).

Let $X \sim NBin(1,~^1/_6)$, that is we define a single failure as the chance of throwing a 6. The expected value of a negative binomial is given by:

$$\mathbb{E}[X] = r\frac{1-p}{p}$$

The solution to our problem is given by $\mathbb{E}[X] + 1$ since we want to include the last throw, hence:

$$\mathbb{E}[X] + 1 = 1\frac{1-~^1/_6}{^1/_6} + 1= 6$$

**Notes.** Wikipedia presents the mean using the probability of a success instead of a failure:

$$\mathbb{E}[X] = r\frac{q}{1-q}$$

Where $q = (1 - p)$.
