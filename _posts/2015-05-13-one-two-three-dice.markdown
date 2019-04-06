---
layout: post
title: One, Two, Three Dice
date: 2015-05-13 01:28
comments: true
external-url:
categories: Mathematics
---

> Which one would you bet on? Throw 6 dice and get at least one 6, 12 dice and get at least two 6's, or 18 dice and get at least three 6's?

Let's do the math. The probability of throwing 6 dice and getting at least one 6 is:

$$
1 - \binom{6}{0}\times\frac{5^6}{6^6} ≈ \underline{0.665}
$$

The probability of throwing 12 dice and getting at least two 6's is:

$$
1 - \left(\binom{12}{0}\times\frac{5^{12}}{6^{12}} + \binom{12}{1}\times\frac{5^{11}}{6^{12}}\right) ≈ 0.619
$$

The probability of throwing 18 dice and getting at least three 6's is:

$$
1 - \left(\binom{18}{0}\times\frac{5^{18}}{6^{18}} + \binom{18}{1}\times\frac{5^{17}}{6^{18}} + \binom{18}{2}\times\frac{5^{16}}{6^{18}}\right) ≈ 0.597
$$

Shocked?
