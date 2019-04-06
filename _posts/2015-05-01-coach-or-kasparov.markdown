---
layout: post
title: Coach or Kasparov
date: 2015-05-01 16:33
comments: true
external-url:
categories: Mathematics
---

> To encourage John's promising chess career, his coach offers him a prize if he wins (at least) two games in a row in a three-game series to be played with his coach and Garry Kasparov alternately: coach-kasparov-coach or kasparov-coach-kasparov, according to John's choice. Kasparov is (evidently) a better player than John's coach. Which series should John choose? [^a]

[^a]: This is adapted from problem 2 of Frederick Mosteller's "*[Fifty Challenging Problems in Probability](http://www.amazon.com/Challenging-Problems-Probability-Solutions-Mathematics/dp/0486653552)*".

Let $$p_C$$ be the probability of winning the coach and $$p_K$$ the probability of winning Kasparov, where $$p_C < p_K$$. The winning outcomes for the first scenario (C-K-C) are:

| outcome     | probability       |
|-------------|-------------------|
| $C_0K_1C_1$ | $p_C~p_K~(1-p_C)$ |
| $C_1K_1C_0$ | $p_C~p_K~(1-p_C)$ |
| $C_1K_1C_1$ | $p_C~p_K~p_C$     |

And thus $p_C~p_K~(1-p_C) + p_C~p_K~(1-p_C) + p_C~p_K~p_C = p_K~p_C~(2 - p_C)$. For the second scenario (K-C-K):

| outcome     | probability       |
|-------------|-------------------|
| $K_0C_1K_1$ | $p_K~p_C~(1-p_K)$ |
| $K_1C_1K_0$ | $p_K~p_C~(1-p_K)$ |
| $K_1C_1K_1$ | $p_K~p_C~p_K$     |

Where $p_K~p_C~(1-p_K) + p_K~p_C~(1-p_K) + p_K~p_K~p_C = p_K~p_C~(2 - p_K)$. Hence:

$$
\begin{align*}
p_K~p_C~(2 - p_K) & \stackrel{?}{=} p_K~p_C~(2 - p_K) \\
2 - p_C & \stackrel{?}{=} 2 - p_K \\
p_C & < p_K
\end{align*}
$$
