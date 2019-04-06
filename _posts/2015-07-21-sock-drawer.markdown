---
layout: post
title: Sock Drawer
date: 2015-07-21 16:52
comments: true
external-url:
categories: Mathematics
---

> A drawer has 18 black socks and 14 white socks. On average, how many socks should one draw to get two equal socks? And to get two different socks?

## Solution A

The answer to the first one is trivial: 3. For the second question, let $N = 18$ be the number of black socks and $M = 14$ the number of white socks. Then:

| outcome   | probability                                                           |
|-----------|-----------------------------------------------------------------------|
| $bw$      | $\frac{N}{N+M} \frac{M-1}{N+M+1}$                                     |
| $wb$      | $\frac{M}{N+M} \frac{N-1}{N+M+1}$                                     |
| $bbw$     | $\frac{N}{N+M} \frac{N-1}{N+M-1} \frac{M-1}{N+M}$                     |
| $wwb$     | $\frac{M}{N+M} \frac{M-1}{N+M-1} \frac{N-1}{N+M}$                     |
| $bbbw$    | $\frac{N}{N+M} \frac{N-1}{N+M-1} \frac{N-2}{N+M-2} \frac{M-1}{N+M-1}$ |
| $wwwb$    | $\frac{M}{N+M} \frac{M-1}{N+M-1} \frac{M-2}{N+M-2} \frac{N-1}{N+M-1}$ |
| ...       | ...                                                                   |

Due to [linearity of expectation](http://www.cse.iitd.ac.in/~mohanty/col106/Resources/linearity_expectation.pdf), the expected value is, by definition:

$$\sum_{k=1}^N{(k + 1)\left(\prod_{i=1}^k{\frac{N + 1 - i}{N + M + 1 - i}}\right)\frac{M}{N + M - k}} +
\sum_{k=1}^M{(k + 1)\prod_{i=1}^k{\frac{M + 1 - i}{N + M + 1 - i}}\frac{N}{N + M - k}}$$

Which, for the given values of $N$ and $M$, gives a result of $^{279}/_{95}$, or 2.93684.

## Solution B

The definition of an [negative hypergeometric distribution](http://en.wikipedia.org/wiki/Negative_hypergeometric_distribution) is:

> (...) the probability of the number of elements taken without replacement from a finite population whose elements can be classified into two mutually exclusive categories like Pass/Fail, Male/Female or Employed/Unemployed that stops when a fixed number of elements of certain class have been taken

If there are $N = 18 + 14 = 32$ elements, of which $K = 18$ are defined as "successes" and the rest are "failures", and the elements are drawn one after the other, without replacements, until $R = 1$ failures are encountered, we know that the expected value is given by:

$$f(N,K,R) = \mathbb{E}[x \sim NHG_{N,K,R}] = R ~ \frac{K}{N-K-1}$$

Consider two cases: one in which the first ball drawn is black $$p =~^{18}/_{20}$$ and the other in which the first ball is white $$q =~^2/_{20}$$. You can then calculate your average for each case and weight them as follows:

$$
\frac{18}{20} ~ f(19, 17, 1) + \frac{2}{20} ~ f(19, 1, 1) + 2
$$

The last term refers to the first draw (which is considered separately) and the last "failure" draw, which is not counted by the negative hypergeometric distribution.
