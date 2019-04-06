---
layout: post
title: AWS
date: 2017-09-04 00:46
comments: true
external-url:
categories: AWS
---

> Bisca (a Portuguese version of the Italian game [Bríscola](https://en.wikipedia.org/wiki/Briscola)) is a trick-taking card game usually played by 2 players with the common 52-card French deck, but with the 8, 9 and 10's of each suite removed, thus creating a 40-card deck. The main objective is to accumulate more points than the opponent, based on the cards that are captured and forfeited.

There are several variations to this game; the one I learned in Portugal as a kid is called *Bisca dos 10*, although the 9-, 7-, and 3-card variants seem more popular. For the purpose of this study we will use the following rules (and ignore the dealing ritual):

1. Each player starts with 10 cards drawn at random from the deck;
2. The remaining cards sit in a pile. The last card (bottom of the pile) is revealed and its suit used as the Trump;
3. The player who won the last round (or game), plays a card from his hand in the deal. The opponent then places one of his cards, following suit if possible[^2], which will determine whether he captures or forfeits the cards on the table, based on the following precedence: **(a)** if the cards are the same suit, the highest value card (or the highest face number on non-value cards) wins; **(b)** if there is a *trump card* among them, who played the highest trump card wins; **(c)** the first card played wins;
5. After the play each player takes a new card from the top of the deck, first the player who won the cards from the table. The whole procedure (1—5) is repeated, until;
6. When there are no more cards to be played, the captured cards values are counted up by adding their point values. Highest score wins.

[^2]: Again, there are variations to the *following suit* protocol. In one variation **(1)** the opponent must **always follow suit**, or else he **forfeits the game**. Others **(2)** only trigger this rule when there are no more cards to be drawn from the pile.

## Let's start with the basics...

The scoring is done according to the following table, and is independent of the suit:

| Rank    | Value |
|---------|-------|
| Ace     | 11    |
| Seven   | 10    |
| King    | 4     |
| Jack    | 3     |
| Queen   | 2     |
| (other) | 0     |

As we have 10 cards for each of the 4 suits, there are **120 points in total at play**. Hence, to win, one must score more than 61.

**1. What's the expected value of a player's initial hand?**

Recall the [linearity of expectation](http://www.cse.iitd.ac.in/~mohanty/col106/Resources/linearity_expectation.pdf). The mean (or expected value) is, by definition, the sum of all possible values multiplied by their respective probabilities. There are 4 suits for each rank, and we take 10 cards, so:

$$
\begin{eqnarray*}
10 \cdot\mu_X &=& 10\cdot\mathbb{E}[X] = 10\cdot\sum_{x\in X}x\cdot p(x) \\
      &=& 10 \cdot (11\cdot\frac{4}{40} + 10\cdot\frac{4}{40} + 4\cdot\frac{4}{40} + 3\cdot\frac{4}{40} + 2\cdot\frac{4}{40})\\
      &=& \class{bghighlight}{30}.
\end{eqnarray*}
$$

Not so fast! Can you spot something funny?... That's right, we aren't considering the fact that once a card is drawn, it cannot be drawn again. In probability jargon, we call this **sampling without replacement**.

... but the joke is on us! The fact is that **sampling without replacement doesn't change expectation**. Why not? Well, consider the following scenario: draw 2 cards at random from a deck of 40. What is the probability that the first one is an Ace? <sup>4</sup>/<sub>40</sub>. What is the probability that the second one is an Ace? Yep, <sup>4</sup>/<sub>40</sub>, again! Without further knowledge, **we have to treat each experience as independent**. Hence, what is the expected value for a single draw? $(11\cdot\frac{4}{40} + 10\cdot\frac{4}{40} + 4\cdot\frac{4}{40} + 3\cdot\frac{4}{40} + 2\cdot\frac{4}{40})$. And for ten draws? Exactly 10 times that.

So the answer to the above question is that, on average, a **player will initially hold 30 points**.

**2. What's the probability of missing one suit in the initial hand?**

So, you have just drawn 10 cards and you realised you have no Hearts. Let's think in terms of cases. How many combinations are there of choosing 10 cards from 30 (since we've dropped a suit)? $\binom{30}{10}$. But we have also to consider every combination of 3 suits: $\binom{4}{3}$. Therefore:

$$
P[\text{missing suit}] = \frac{\binom{4}{3}\binom{30}{10}}{\binom{40}{10}} ≈ \class{bghighlight}{14.2\%}
$$

**3. What's the probability of having every suit in the initial hand?**

By symmetry of the precedent, the probability of having at least one card of every suit is $1 - 14.2\% ≈ \class{bghighlight}{85.8\%}$.

**4. What's the probability of having exactly one Ace in the initial hand?**

So, there are 4 possible Aces, and 36 non-Aces. Take 9 from the later and 1 from the former and get:

$$
P[\text{one Ace}] = \frac{\binom{4}{1}\binom{36}{9}}{\binom{40}{10}} ≈ \class{bghighlight}{44.4\%}
$$

**5. What's the probability of having at least one Ace in the initial hand?**

Well, a naive approach would be to sum the probabilities of having exactly 1, 2, 3 and 4 Aces, like so:

$$
P[\text{at least one Ace}] = \frac{\binom{4}{1}\binom{36}{9} + \binom{4}{2}\binom{36}{8} + \binom{4}{3}\binom{36}{7} + \binom{4}{4}\binom{36}{6}}{\binom{40}{10}} ≈ \class{bghighlight}{70\%}
$$

Of course it would be easier to treat this by symmetry:

$$
P[\text{at least one Ace}] = 1 - P[\text{no Ace}] = 1 - \frac{\binom{4}{0}\binom{36}{10}}{\binom{40}{10}} ≈ 1 - 0.2998 ≈ \class{bghighlight}{70\%}
$$

Note there is nothing special about the Ace. In fact, here's something to remember: **the probability of drawing a card of a certain rank in the initial hand is 70%**. This was the first counter-intuitive answer I calculated for this game... so counter-intuitive that I rushed to simulate it!

## A small interlude to talk about distributions...

The type of calculations we've been doing represent a pattern in probability theory: consider a finite population with $N$ elements, $K$ of which have a certain characteristic. Proceed to draw, without replacement, $n$ elements. What's the probability of successfuly picking $k$ that possess that characteristic?

$$
P(X=k)=f(k; N, K, n)=\frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}
$$

We call this an [hypergeometric distribution](https://en.wikipedia.org/wiki/Hypergeometric_distribution), and there are a lot of properties mathematicians already studied about it. For our game, the probability of drawing $n$ ≤ 40 cards of a certain Rank with $k$ = {1, 2, 3, 4} successes is thus:

$$
P(\text{draw}~k~\text{cards of a certain rank})=f(k; 40, 4, n)=\frac{\binom{4}{k}\binom{36}{n-k}}{\binom{40}{n}}
$$

## Back to cards...

**6. What's the expected number of Aces in the initial hand?**

Well:

$$
\sum_{x\in X}x\cdot p(x) = \frac{1\cdot\binom{4}{1}\binom{36}{9} + 2\cdot\binom{4}{2}\binom{36}{8} + 3\cdot\binom{4}{3}\binom{36}{7} + 4\cdot\binom{4}{4}\binom{36}{6}}{\binom{40}{10}} = \class{bghighlight}{1}.
$$

Spotted the symbol ($=$)? Not $≈ 1$, but **exactly 1**; second counter-intuitive result, considering the 70% probability of having at least one Ace! But if we check the mean of an hypergeometric distribution, we observe it's equal to $n\frac{K}{N}$, hence: $10\cdot\frac{4}{40} = 1$. Coincidence?

**OMG!** Once again, we are overlooking the fact that **sampling without replacement doesn't change expectation**. The probability of drawing an Ace is <sup>4</sup>/<sub>40</sub> = 0.1. So how many Aces are we expecting to find in ten draws?... Yep, it's almost humiliating.

## Another small interlude to talk about proofs...

Can we prove once and for all that sampling without replacement doesn't change expectation? It's not easy (at least for me it wasn't). We need to observe two important identities, *viz*:

$$
x\binom{K}{x} = \frac{xK!}{x!(K-x)!} = \frac{K!}{(x-1)!(K-x)!} = \frac{K(K-1)!}{(x-1)!((K-1) - (k-1))!} = K\binom{K-1}{x-1}
$$

... and the second one:

$$
\binom{N}{n} = \frac{N!}{n!(N-n)!} = \frac{N(N-1)!}{n(n-1)!((N-1)-(n-1))!} = \frac{N}{n}\binom{N-1}{n-1}
$$

Now, the trick is to reduce an ugly summation of type $\sum_x xf(x)$ into something tractable. Observe that[^3]:

$$
\sum_{x = 0}^{n} \frac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}} = 1
$$

From these, we can proceed with the calculation:

$\phantom{\equiv}~\mu_X = \sum_{x = 0}^{n} x\cdot\frac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}}$ <br>
$\equiv$ { apply first identity }<br>
$\phantom{\equiv}~\sum_{x = 0}^{n} K\frac{\binom{K-1}{x-1}\binom{N-K}{n-x}}{\binom{N}{n}}$ <br>
$\equiv$ { apply second identity }<br>
$\phantom{\equiv}~\sum_{x = 0}^{n} K\frac{\binom{K-1}{x-1}\binom{N-K}{n-x}}{\frac{N}{n}\binom{N-1}{n-1}}$ <br>
$\equiv$ { since $ \frac{1}{a/b} = {b/a} $ }<br>
$\phantom{\equiv}~\sum_{x = 0}^{n} K\frac{n}{N}\frac{\binom{K-1}{x-1}\binom{N-K}{n-x}}{\binom{N-1}{n-1}}$ <br>
$\equiv$ { since $ \sum C\cdot a = C\sum a $ }<br>
$\phantom{\equiv}~K\frac{n}{N}\sum_{x = 0}^{n} \frac{\binom{K-1}{x-1}\binom{N-K}{n-x}}{\binom{N-1}{n-1}}$ <br>
$\equiv$ { since $ a-b = (a-1)-(b-1) $ }<br>
$\phantom{\equiv}~K\frac{n}{N}\sum_{x = 0}^{n} \frac{\binom{K-1}{x-1}\binom{(N-1)-(K-1)}{(n-1)-(x-1)}}{\binom{N-1}{n-1}}$ <br>
$\equiv$ { basic substitution to apply third identity }<br>
$\phantom{\equiv}~\mu_X = \frac{nK}{N}$ <br>

Ufff!

[^3]: Here I am, showing off with mathematical proofs, and I just conjured an unproven identity by classifying it as *known*. The proof uses [Vandermonde's Identity](https://en.wikipedia.org/wiki/Vandermonde%27s_identity), where $\sum_{x=0}^n\binom{a}{x}\binom{b}{n-x}$ = $\binom{a+b}{n}$. Since $1/\binom{N}{n}$ is a constant in the summation, it follows that $1/\binom{N}{n}\sum_{x=0}^n\binom{K}{x}\binom{N-K}{n-x}$ = $1/\binom{N}{n}\cdot\binom{K+N-K}{n}$ = $\binom{N}{n}/\binom{N}{n}$ = $1$. I leave as an exercise to the reader to prove Vandermonde's Identity.

## We were talking about cards...

Yes. Yes, we were... But the length of this post is running out of control, so we will get back to interesting statistical facts about Bisca in [Part II]() of this essay, where I will cover conditional probabilities, namely what can you assume about your opponent game *after* you've observed your own hand.