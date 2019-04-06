---
layout: post
title: Coin vs Die
date: 2015-07-21 16:27
comments: true
external-url:
categories: Mathematics
---

> John makes a bet with Donald that he's able to flip heads on a coin before Donald throws 2 in a die. What's the probability of Donald winning, considering John begins the game and they play alternately?

Let the probability of tossing an head be $$p=~^1/_2$$ and tail $$q=~^1/_2$$, and the probability of tossing any die face other than a 2 be $$r=1-~^1/_6=~^5/_6$$. If we consider the outcome of John winning, then:

| outcome               | probability |
|-----------------------|-------------|
| $$H$$                 | $$p$$       |
| $$T⚅H$$               | $$qrp$$     |
| $$T⚅T⚅H$$             | $$qrqrp$$   |
| ...                   | $$(qr)^np$$ |


Therefore, the converse probability is given by:

$$1 - \sum_{n~=~0}^{\infty}{^1/_2~\left(^5/_6\cdot~^1/_2\right)^n}$$

Since this is a [geometric series](https://en.wikipedia.org/wiki/Geometric_series) with $$\lvert~r~\rvert =~^5/_6\cdot~^1/_2 < 1$$, then $$\sum_{n~=~0}^{\infty}a_i=\frac{a}{1-r}$$, so:

$$
\begin{align}
1 - \sum_{n~=~0}^{\infty}{^1/_2~\left(^5/_6\cdot~^1/_2\right)^n}&=1-\frac{^1/_ 2}{1-~^5/_{12}}\\
&=~^1/_7
\end{align}
$$
