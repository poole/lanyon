---
layout: post
title: The Flippant Juror
date: 2015-07-20 20:09
comments: true
external-url:
categories: Mathematics
---

> A three-man jury has two members each of whom independently has probability $$p$$ of making the correct decision and a third member who flips a coin for each decision (majority rules) A one-man jury has probability $$p$$ of making the correct decision. Which jury has the better probability of making the correct decision? [^a]

  [^a]: This is problem 3 of Frederick Mosteller's "*[Fifty Challenging Problems in Probability](http://www.amazon.com/Challenging-Problems-Probability-Solutions-Mathematics/dp/0486653552)*".

## Solution

The winning outcomes for the first scenario (three juris) are:

| outcome     | probability          |
|-------------|----------------------|
| $$A_0B_1C_1$$ | $$\frac{1}{2}(1-p)~p$$ |
| $$A_1B_0C_0$$ | $$\frac{1}{2}(1-p)~p$$ |
| $$A_1B_1C_0$$ | $$\frac{1}{2}p^2$$     |
| $$A_1B_1C_1$$ | $$\frac{1}{2}p^2$$     |

Hence, the probability of a correct decision is given by:

$$
\begin{align}
2\frac{1}{2}(1-p)~p + 2\frac{1}{2}p^2 & = (1-p)~p + p^2 \\
& = p - p^2 + p^2 \\
& = p
\end{align}
$$

The two scenarios are strictly equivalent.

## Intuition

Half the times the flippant member agrees with the first member. In these cases the conditional probability of a correct decision is $$p$$. The other half it agrees with the second member, where the conditional probability is also $$p$$, thus $$\frac{1}{2}p + \frac{1}{2}p = p$$.
