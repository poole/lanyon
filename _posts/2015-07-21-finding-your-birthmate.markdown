---
layout: post
title: Finding Your Birthmate
date: 2015-07-21 16:27
comments: true
external-url:
categories: Mathematics
---

> You want to find someone whose birthday matches yours. What is the least number of strangers whose birthdays you need to ask about to have a 50-50 chance? [^a]

  [^a]: This is problem 32 of Frederick Mosteller's "*[Fifty Challenging Problems in Probability](http://www.amazon.com/Challenging-Problems-Probability-Solutions-Mathematics/dp/0486653552)*".

The problem can be modeled as a negative binomial with parameters $r = 1$ and $p = 1/365$, hence the PMF is given by $\left(\frac{N-r}{N}\right)^\frac{1}{p} p$.

Since we want to find the number that gives us a 50-50 chance, we need to calculate the inverse CDF of the negative binomial and find the value for $0.5$. The CDF of the negative binomial is given by:

$$
 f(x) =
  \begin{cases}
   1-\left(\frac{365}{364}\right)^{-\lfloor x\rfloor-1} & \text{if } x \geq 0 \\
   0       & \text{otherwise}
  \end{cases}
$$

I still don't know how to compute the inverse of this CDF, but a numerical approximation gives us 252. In [Maxima](http://maxima.sourceforge.net/), one can use: `quantile_negative_binomial(0.5, 1, 1/365);`
