---
layout: post
title: "Pending Project"
date: 2013-02-19 01:24
comments: true
external-url:
categories: Projects
output:
  pdf_document:
    latex_engine: xelatex
---

> It is argued that there may be a case where all gambozinos are white.

Most of us learn that there are two types of reasoning, namely deductive and inductive. In deductive reasoning, one usually starts from a general observation (a set of premises) and arguments towards a specific conclusion. For example, from the classic statement *all men are mortal*, along with the observation that *Socrates is a man*, it follows that *Socrates is mortal*. In a more abstract sense, we are asserting that, should a set of things have a certain property[^1], and should something belong to that set, then it must have that same property, i.e. (i) $$\forall_x P(x) \rightarrow Q(x)$$, (ii) $$P($$Socrates$$)~\vdash Q($$Socrates$$)$$.

[^1]: This is formally equivalent to $$\forall_{x \in P} : Q(x)$$, but we are being relaxed.

Inductive reasoning, on the other hand, makes generalizations based on individual instances. Imagine that you go outside in a quest to observe the *gambozino*, an animal so rare that it only appears minutes before the sunset in a rainy day. You were lucky to catch three young, white *gambozinos*, drinking water by the lake. Since it is the first time you see one, you assume that, probably, *most gambozinos are white*. In the following days you repeat the feat, and you now seem to be confident that *all gambozinos are white*. Hence, (i) $$P(a) \wedge Q(a)$$, (ii) $$P(b) \wedge Q(b)$$, (iii) $$P(c) \wedge Q(c)$$ ... (iv) $$\forall_x P(x) \rightarrow Q(x)$$?

Of course it doesn't seem valid to assume that, only because you have seen a dozen of gambozinos, all must have the same characteristics. But what if you had observed hundreds, or even millions? Is it sound to begin an argument based on a probability (most), and conclude an universal assertion (all), due to the sheer number of observations?

## Proving an Universal

It was the skeptic [Sextus Empiricus](https://en.wikipedia.org/wiki/Sextus_Empiricus) who first questioned the validity of inductive reasoning, by positing that a universal rule could not be established from an incomplete set of particular instances:

> When they propose to establish the universal from the particulars by means of induction, they will effect this by a review of either all or some of the particulars. But if they review some, the induction will be insecure, since some of the particulars omitted in the induction may contravene the universal; while if they are to review all, they will be toiling at the impossible, since the particulars are infinite and indefinite.

According to Sextus Empiricus, only if one had observed all gambozinos could one conclude the universal statement, since even just a single particular would be sufficient to disprove the generalization. Therefore, (i) $$P(a) \wedge Q(a)$$, (ii) $$P(b) \wedge \neg Q(b) \vdash \forall_x P(x) \not\rightarrow Q(x)$$.

## Monotonicity of Entailment

There are other different ways to show that inductive reasoning isn't a valid form of argumentation. For example, let us go back to Socrates and the mortality of men. Suppose Socrates is observed to never die[^2]. We should then reject the conclusion, not because of its form, but because of its premises; either *Socrates isn’t a man*, or *not all men are mortal*. Should we still accept the premises, then Socrates will (someday) die, by the sheer force of our logic.

[^2]: We may have a practical problem with this premise since, to observe that Socrates never dies, one would have to (i) wait an infinite amount of time, and (ii) be immortal.

Now suppose that we observe more men that don't die. We may add this fact to our list of premises, but we now seem to be in a position of *inconsistency*. Some men die, others don't, and thus being a man isn't sufficient to guarantee its mortality: $$P(x)\not\rightarrow Q(x)$$. We can't even begin to reject the conclusion since our premises are contradictory. Otherwise, no matter how many new premises you add, the conclusion is always a direct *consequence* of the hypothesis.

This characteristic, i.e., that in a consistent argumentation one may add premises without affecting the validity of the conclusion, is called the *monotonicity principle*, and one can see that the inductive reasoning violates it: adding a black *gambozino* rejects the previous conclusion, so (i) $$P(a) \wedge Q(a)$$, (ii) $$P(b) \wedge \neg Q(b)$$ ... (iii) $$\nvdash \forall_x P(x) \rightarrow Q(x)$$.

## There are Infinitely Many Primes

In inductive reasoning, the premises do not guarantee the conclusion, although they may give it some probability or plausibility. In order to prove an universal claim one have to observe every instance of that claim, or else assume it as a (potentially refutable) hypothesis.

The Goldbach conjecture, _every even number is a sum of two primes_, is a fine example of how mathematical induction is different from simple induction. It states that *every even integer greater than 2 can be written as the sum of two primes,* e.g. 10 = 7 + 3. But despite no even number ever found violates this rule, the conjecture remains mathematically unproven.
{: .sidenote }

But, mathematicians keep proving things about numbers without actually observing every one of them. For example, while it is only believed that every even number is a sum of two primes, it is actually known that there is an infinite number of primes. So, if it is true that mathematical induction involves a sort of generalization, how can we ensure its validity within a logical framework?

Mathematical induction is actually a very different type of reasoning, and the art goes as back as 2000 years. Euclid is recognized as probably the first one to have implicitly used it for proving that there are infinitely many primes. The reasoning is similar to the following (from [Wikipedia](http://en.wikipedia.org/wiki/Euclid's_theorem)):

Suppose you were searching for prime numbers, and you had already collected a very fine list of them, $$p_1, p_2, \ldots , p_n$$. Let $$P$$ be the product of all the prime numbers in the list, $$P = p_1 p_2 \ldots p_n$$. Let $$q = P + 1$$. Then, $$q$$ is either prime or not: (i) if $$q$$ is prime then there is at least one more prime than is listed, and (ii) if $$q$$ is not prime then some prime factor $$p$$ divides $$q$$. This factor $$p$$ is not on our list: if it were, then it would divide $$P$$ (since $$P$$ is the product of every number on the list); but as we know, $$p$$ divides $$P + 1 = q$$. Then $$p$$ would have to divide the difference of the two numbers, which is $$(P + 1) - P = 1$$. But no prime number divides $$1$$ so there would be a contradiction, and therefore $$p$$ cannot be on the list. This means at least one more prime number exists beyond those in the list. ∎

## Mathematical Induction

The above proof is based on a very particular type of structure inherent to natural numbers, and it is precisely that structure that allows us to prove something *for every number*, despite there are infinitely many of them. Let us delve a little bit more on how a proof by induction works before coming back to logic. Suppose you want to prove that the following statement holds for all natural numbers $$n$$:

$$
\begin{equation}
0 + 1 + 2 + \cdots + n = \frac{n(n+1)}{2}
\label{eq:main}
\end{equation}
$$

The proof consists of two distinct (but intertwined) steps: first, we show that the statement holds when $$n$$ is equal to the lowest value that $$n$$ is given in the original statement, that is when $$n = 0$$:

$$0 = \frac{0(0+1)}{2}$$

Then we need to show that, if the statement holds for some $$n$$, then the statement also holds in the subsequent of n, i.e. when $$n + 1$$ is replaced by $$n$$:

$$0 + 1 + \cdots + k + (k + 1) = \frac{(k+1)((k+1)+1)}{2}$$

Using equation $\eqref{eq:main}$, we can rewrite the left-hand side, so all that remains is to (algebraically) prove the equality:

$$\frac{k(k+1)}{2} + (k + 1) = \frac{(k+1)((k+1)+1)}{2}$$

which is trivial. Therefore $\eqref{eq:main}$ holds. ∎

## The Falling of Dominoes

The previous application of induction is based on the fact that every natural number is *connected* to every other by a known rule: summing. In fact, if you take the lowest of the natural numbers 0, and keep adding 1 to the result, you will eventually reach *every* natural number that it exists. Therefore if you prove that (i) if any arbitrary number $$k$$ has a property $$P$$, then $$k + 1$$ must also have that property, and (ii) the lowest of those numbers has $$P$$, then it follows that every number $$n$$ has that property.

And here lies the slight of hand! Mathematical induction is similar to the sequential effect of falling dominoes. Put every one of them in a line, and prove that, if an arbitrary domino falls, the one next to him must fall[^3]. Then push the first one and, voilá: *every one of them falls*.

[^3]: This may seem tricky, but you could assume some form of consistent newtonian physics, and a fixed distance between pieces.

## To Induction or not Induction

We have argued that a consistent logic cannot support inductive conclusions based on the observation of instances, so how is mathematical induction reconciled with logic? The trick is very simple; mathematical induction on natural numbers is actually a form of deductive reasoning, as shown in the following second-order clause:

$$\forall_{P, (b, k, n) \in \mathbb{N}} [\exists_b P(b) \wedge (\forall_{k \geq b} P(k) \rightarrow P(k+1)] \rightarrow \forall_{n \geq b} P(n)$$

...where $$P$$ is any proposition, $$b$$, $$k$$ and $$n$$ are natural numbers, and $$b$$ assumes the lowest value for which $$P$$ holds (usually $$0$$ or $$1$$). Remember Socrates and the mortality of men? The concept here is very similar. One asserts that, for every proposition $$P$$, if an individual has a certain property, the next individual also has that property. Since we know (by observation) that the first individual in a series has the property, then it follows that every individual has that same property. The universal statement is a consequence of the established premises, and not a generalization based on individual case analysis. QED.

## All Gambozinos are White

This form of induction does not necessarily involve numbers; one can actually generalize it to any type of *well-founded* structure, i.e., any structure whose elements relate to each other in a finite number of ways, essentially creating a "chain". Back to *gambozinos*, imagine that you are able to assert that (i) if a *gambozino* is white, its descendants will always be white, and (ii) the first two *gambozinos* to exist were white[^4]. Then, by the nature of the structure that rules the *gambozino* ascendency, all *gambozinos* are proven to be white[^5].

[^4]: There are actually premises that we've disregarded for the sake of simplicity, such as (iii) except for the first two of them, a *gambozino* can only exist through sexual reproduction, and (iv) the parenthood of a *gambozino* is an [antisymmetric](https://en.wikipedia.org/wiki/Antisymmetric_relation), [anti-reflexive](https://en.wikipedia.org/wiki/Reflexive_relation) and [anti-transitive](https://en.wikipedia.org/wiki/Intransitivity#Antitransitivity) relation.

[^5]: Unless genetic manipulation is allowed, but then you would be attacking the premise, not the conclusion.

## Conclusion

Mathematical induction is a powerful tool in deductive reasoning that allows to prove properties of an infinite number of elements without having to actually observe every one of them. It works whenever the elements we are dealing with are part of a well-founded relation, and we are able to assume properties over that relation. Mathematical induction is thus well beyond inductive reasoning, able to assert the *veracity* of an argument over its mere *plausibility*.
