---
layout: post
title: Non-Transitive Probabilities
date: 2015-09-12 22:22
comments: true
external-url:
categories: Mathematics
---

> Sheldon and Penney decide to play a game. They throw a coin three times. If it comes back `HHH` Sheldon wins; if the result is `THH` then Penney wins. Otherwise they both loose. What are their probabilities of winning the game? [^1]

[^1]: I don't remember where I first learned about this problem, but a good overview of both this and the non-transitive dice can be found in the highly recommended Martin Gardner's "[*The Colossal Book of Mathematics: Classic Puzzles, Paradoxes and Problems*](http://www.amazon.com/Colossal-Book-Mathematics-Paradoxes-Problems/dp/0393020231/ref=sr_1_1?ie=UTF8&qid=1442452079&sr=8-1&keywords=The+Colossal+Book+of+Mathematics)".

## Tossing coins

If you thought *"the same"*, then you're right. The probability for both of the above sequences is $\left(\frac{1}{2}\right)^3 = \frac{1}{8} = 0.125$. The coin is memoryless; it doesn't care what was its previous results and so the probability of `HHH` is exactly the same as any other arbitrary sequence of heads and tails such as `THH` or `HTH`. It is only due to human being's ability to easily recognize such patterns that a series of heads, such as `HHHHHHHHHH`, would hardly be recognized as arbitrary as `HTHHTTHTHT`, despite the fact that they both occur once every $2^{10} = 1024$ sequences of tosses. This very simple misinterpretation of statistics has lead to the widespread of the *gambler's fallacy*[^2].

[^2]: The *[gambler's fallacy](https://en.wikipedia.org/wiki/Gambler%27s_fallacy)*: the belief that if something happens more frequently than normal during some period, it will happen less frequently in the future.

Let's change the game a little bit:

> Penney now proposes Sheldon they should flip a coin until one of the patterns appear. Who has the higher probability of winning?

In other words, what's the probability for `HHH` and `THH` occurring **first** in a potentially infinite sequence of coin tosses? Most people would assume to be the same, but in fact `THH` has an higher chance of winning than `HHH`!.. *Say wat*? If you don't believe me, run the following javascript program:

{% highlight javascript linenos %}
const _ = require('lodash')

const p1 = [0, 0, 0] // consider heads = 0 
const p2 = [1, 0, 0] //   ...and tails = 1

function findWinner(p1r, p2r) {
  if (_.isEmpty(p1r)) return 'p1'
  else if (_.isEmpty(p2r)) return 'p2'
  
  const toss = _.random(0, 1)
  const nextP1 = (_.first(p1r) == toss) ? _.tail(p1r) : p1
  const nextP2 = (_.first(p2r) == toss) ? _.tail(p2r) : p2
  return findWinner(nextP1, nextP2)
}

const simulate = _.range(1, 100).map(() => findWinner(p1, p2))
console.log(_.countBy(simulate, (w) => w))
{% endhighlight %}

Here's the results for one of the runs:

```
Sheldon won 3685
Penney won  6315
```

In fact, for every sequence Sheldon bets, Penney seems to be able to choose a better one; something that seems to be making Sheldon twitch his face.

## Non-transitive Dice

Before explaining what is going on, let's try a different game:

> Sheldon is now tired of loosing with Penney, and proposes a different game. He shows her three dice and says that each one of them should pick one die; the one that rolls the higher value wins. Sheldon even suggests Penney to go first. Upon observation, Penney realizes these are not normal dice:

```
Die A: 1 1 4 4 4 4
Die B: 3 3 3 3 3 3
Die C: 2 2 2 2 5 5
```

Which die would Penney pick? Some people would choose the one that has an higher expected value, of course... But doing the math:

| Die | $\mathbb{E}$xpected Value |
|:---:|:-----------------------------:|
|  A  | ⅙(1 + 1 + 4 + 4 + 4 + 4) = 3  |
|  B  | ⅙(3 + 3 + 3 + 3 + 3 + 3) = 3  |
|  C  | ⅙(2 + 2 + 2 + 2 + 5 + 5) = 3  |
|-----|-------------------------------|

Funny... All have the same expected value, so it shouldn't matter, right?

Let's suppose Penney picks die `B`. Sheldon would pick die `A` and beat her with a probability of ⅔. Penney decides to pick `A` then. That's fine, Sheldon picks `C` and wins with odds of 5:4. Penney is furious and picks `C`! He goes for `B` and wins two thirds of the throws. *Bazinga*™!

That's strange, isn't it? There's no *best die*; just because `A` is a better die than `B`, and `B` than `C`, it doesn't mean that `A` will be better than `C`. In fact, it will loose most of the times. Behold an example of *non-transitive*[^3] probabilities! As always, we can check our sanity with a small javascript program:

[^3]: Recall that a binary relation $R$ over a set $X$ is transitive *iff* $\forall_{a,b,c~\in~X}: aRb \wedge bRc \rightarrow aRc$.

{% highlight javascript linenos %}
const _ = require('lodash')

const dieA = [1, 1, 4, 4, 4, 4]
const dieB = [3, 3, 3, 3, 3, 3]
const dieC = [2, 2, 2, 2, 5, 5]

const roll = (die) => _.sample(die)
const count = (as, e) => _.filter(as, (x) => x == e).length

const AvsB = _.range(1, 100).map(() => (roll(dieA) > roll(dieB)) ? 'A' : 'B')
const BvsC = _.range(1, 100).map(() => (roll(dieB) > roll(dieC)) ? 'B' : 'C')
const CvsA = _.range(1, 100).map(() => (roll(dieC) > roll(dieA)) ? 'C' : 'A')

console.log(`A (${count(AvsB, 'A')}) vs B (${count(AvsB, 'B')})`)
console.log(`B (${count(BvsC, 'B')}) vs C (${count(BvsC, 'C')})`)
console.log(`C (${count(CvsA, 'C')}) vs A (${count(CvsA, 'A')})`)
{% endhighlight %}

Here are the results from one of the runs:

```
A (6641) vs B (3359)
B (6650) vs C (3350)
C (5586) vs A (4414)
```

In fact, it's very easy to check this out. There are always $6^2 = 36$ possible outcomes in each pair of throws. In `A` vs `B`, `A` wins when it rolls a 4 (24 combinations) and looses when it rolls a 1 (12 combinations). In `C` vs `B`, `C` only wins when it rolls a 5 (12 combinations). In `C` vs `A`, a 2 will win against a 1 (8 combinations), and a 5 will win against everything else (12 combinations).  

Wikipedia has a nice section of [non-transitive dice](https://en.wikipedia.org/wiki/Nontransitive_dice), including a 4 dice set invented by Bradley Efron, where there's always a die that beats another one with a probability of ⅔:

```
Die A: 4, 4, 4, 4, 0, 0
Die B: 3, 3, 3, 3, 3, 3
Die C: 6, 6, 2, 2, 2, 2
Die D: 5, 5, 5, 1, 1, 1
```

It's easy to check that $P(A>B) = P(B>C) = P(C>D) = P(D>A)$.

## Penney's game

Back to tossing coins, why does `THH` occurs first than `HHH`? Let's examine ten runs:

| Run | Sequence | Winner|
|:---:|:---------|------:|
|  0  | T T T T T T T T H T **T H H** | Penney |
|  1  | H T T H **T H H**  | Penney |
|  2  | **H H H** | Sheldon |
|  3  | T H T **T H H** | Penney |
|  4  | **H H H** | Sheldon |
|  5  | T H T **T H H** | Penney |
|  6  | H H T T T T T **T H H** | Penney |
|  7  | H H **T H H** | Penney |
|  8  | **T H H** | Penney |
|  9  | **T H H** | Penney |

By now it should be evident to the reader [the reason](https://en.wikipedia.org/wiki/Penney%27s_game) Penny seems misspelled.
{: .sidenote }

Spot the pattern? The only way Sheldon wins is if `HHH` occurs right from the beginning. Otherwise, as soon as a `T` comes out, Penney will (eventually) win. `THH` may be regarded here as a kind of *prefix* of `HHH`.

The fact that the game now ends whenever one of them **first completes a certain sequence**, does indeed introduce a kind of **memory**; not in the coins *per se*, but in the game! Wondering about *non-transitiveness* in this game? Well, Sheldon realized he could win Penney's `THH` by betting on `TTH`:

| Run | Sequence | Winner|
|:---:|:---------|------:|
|  0  | **T H H**  | Penney  |
|  1  | T H T H T **T T H**  | Sheldon |
|  2  | **T H H**  | Penney |
|  3  | T H **T T H**  | Sheldon |
|  4  | H **T H H**  | Penney |
|  5  | **T T H**  | Sheldon |
|  6  | T T **T T H**  | Sheldon |
|  7  | H **T H H**  | Penney |
|  8  | H T T **T T H**  | Sheldon |
|  9  | T **T T H**  | Sheldon |

Don't these runs seem shorter than the above ones? Hmm...
{: .sidenote }

It was a close call, but near the theoretical probability of ⅔ that Sheldon calculated. Is there anything Penney can do to win Sheldon's bet? Well, yes... Here's the complete table of best choices:

| Player 1 | Player 2 |	Odds in favor of P2    |
|:--------:|:------:|:----------------------:|
| HHH |	THH	| 7:1 |
| HHT	| THH	| 3:1 |
| HTH	| HHT	| 2:1 |
| HTT	| HHT	| 2:1 |
| THH	| TTH	| 2:1 |
| THT	| TTH	| 2:1 |
| TTH	| HTT	| 3:1 |
| TTT	| HTT |	7:1 |

A rule of thumb is to end the betting sequence with the first two opponent's choices, and begin it with the opposite of your last choice. An intuitive explanation for this result given in [Wikipedia](https://en.wikipedia.org/wiki/Penney%27s_game) is that:

> ...in any case that the sequence is not immediately the first player's choice, the chances for the first player getting their sequence-beginning, the opening two choices, are usually the chance that the second player will be getting their full sequence. So the second player will most likely "finish before" the first player.

To be continued...
