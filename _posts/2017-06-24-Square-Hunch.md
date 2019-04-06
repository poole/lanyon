---
layout: post
title: Square Hunch
date: 2017-06-24 19:30
comments: true
external-url:
categories: Mathematics
---

> Let $a_0, a_1, a_2, ...$ be a sequence of integers, where $a_{m+n} + a_{m-n} = ½(a_{2m}+a_{2n})$. If $a_1 = 1$, what would be the value of $a_{1997}$?[^1]

[^1]: I first read about this puzzle on "[*The Art and Craft of Problem Solving*](https://www.amazon.com/Art-Craft-Problem-Solving/dp/0471789011/ref=sr_1_1?ie=UTF8&qid=1498345535&sr=8-1&keywords=art+craft+problem+solving)" by Paul Zeitz.

The first thing one should do when trying to tackle something like this is to *"check out the terrain"*. I would be very tempted to write a computer program to find the values for me right away, but where should the program start from, considering that this is a recurrence? We do know how to implement *recursive functions*, but the way the recurrence is formulated, it's not straightfoward to define it.

## Release the mathematician in you

Let's try to tackle this problem analitically and without computer aid. Where to begin? What about trying to establish a kind of *ground truth*?

**Step 1. Check out the terrain**

Let $m = 0$, $n = 0$, then:

$$
\begin{equation}
a_0 + a_0 = \frac{1}{2}(a_0+a_0) ⇔ 2a_0 = a_0 ⇔ a_0 = 0
\end{equation}
$$

Great, we now have two data points: $a_0$ and $a_1$. Can we try and generalize the equation?

**Step 2. Find the general equivalence for some fixed values**

Assuming we fix $n = 0$, the recurrence becomes:

$$
\begin{equation}
a_m + a_m = \frac{1}{2}(a_{2m}+a_0) ⇔ 2a_m = \frac{1}{2}a_{2m} ⇔ \class{bghighlight}{4a_m = a_{2m}}
\end{equation}
$$

This equation[^2] is neat for two things: (i) it no longer depends on two variables ($n$ and $m$), and thus can provide a solution given the exact index we want to compute; and (ii) if we multiply the current value by 4, we get the solution for the current index $\times$ 2.

With this result in mind, let's calculate a few more values:

[^2]: If you are wondering why I didn't simplified it instead as $a_m = \frac{a_{2m}}{4}$, it's because we are usually "peeking" incrementally (i.e. from lower to upper indexes in the sequence), so it's typically more useful to have something that can provide a solution based on previous results.

| Index | Value |
|-------|-------|
| $a_0$ | **0** { as calculated } |
| $a_1$ | **1** { as given } |
| $a_2$ | **4** { $= 4a_1$ } |
| $a_3$ | - |
| $a_4$ | **16** { $= 4a_2$ } |
| $a_5$ | - |
| $a_6$ | - |
| $a_7$ | - |
| $a_8$ | **64** { $= 4a_4$ } |

**Step 3. Fill some holes to get a clear picture**

As we've already gathered some solutions, let's attempt to calculate $a_3$. Let $m = 2$, $n = 1$, then:

$$
\begin{equation}
a_{2+1} + a_{2-1} = \frac{1}{2}(a_4+a_2) ⇔ a_3 + 1 = \frac{1}{2}(16+4) ⇔ \class{bghighlight}{a_3 = 9}
\end{equation}
$$

... wait a minute.

**Step 4. Establish an hypothesis**

Could it be that $\class{bghighlight}{H(a_k = k^2)}$? If so, then $a_5 \stackrel{?}{=} 25$. Shall we try it out? Let $m = 4$, $n = 1$, then:

$$
\begin{equation}
a_{4+1} + a_{4-1} = \frac{1}{2}(a_8+a_2) ⇔ a_5 + 9 = \frac{1}{2}(64+4) ⇔ a_5 = 25
\end{equation}
$$

Hurray! We now know a lot more about the recurrence:

| Index | Value  | Hypothesis |
|-------|--------|------------|
| $a_0$ | **0**  | $0^2$      |
| $a_1$ | **1**  | $1^2$
| $a_2$ | **4**  | $2^2$
| $a_3$ | **9**  | $3^2$
| $a_4$ | **16** | $4^2$
| $a_5$ | **25** | $5^2$
| $a_6$ | - | $6^2 = 36$ ?
| $a_7$ | - | $7^2 = 42$ ?
| $a_8$ | **64** | $8^2$

**Step 5. Prove it!**

Yeah, yeah... by now most of us would be convinced that we reached an easy solution to get us to $a_{1997}$, but how can we be certain that our hypothesis will not fail with larger numbers? Well, we must prove it... And prove it we will!

**Step 5.1. Choose a proof approach**

Think about it... We are trying to prove *sequences*, and we already know some lower values of the sequence. We want to prove that our hypothesis is valid for every element of the sequence. This smells a lot like *induction*, particularly  [*strong induction*](https://en.wikipedia.org/wiki/Mathematical_induction#Complete_induction).

In *strong induction* we assume that when attempting to prove an hypothesis $H$, then:

$$
\begin{equation}
∀_k : H(k_0) ∧ H(k_0 + 1) ∧ H(k_0 + 2) ∧ \cdots ∧ H(k) ⇒ H(k+1)
\end{equation}
$$

... in other words, if the inductive hypothesis holds for all values up to $k$, starting from a base value $k_0$, then it *must* hold for $k+1$.

**Step 5.2. Induction it is! Test the base case**

Does $H(k = 0)$ hold? Yep, since $0^2 = 0 = a_0$. We also know that for $H(k = 1) ≡ 1^2 = 1 = a_1$, and for $H(k = 2) ≡ 2^2 = 4 = a_2$, so although unecessary, it boosts our confidence.

**Step 5.3. Demonstrate the inductive step**

Now we assume that, since our hypothesis hold for $k = 0, 1, 2, ..., x$  it must hold for $k = x+1$:

$a_{x+1} + a_{x-1} = \frac{1}{2}(a_{2x}+a_{2\times 1})$ <br>
$≡$ { since $4a_m = a_{2m}$ } <br>
$a_{x+1} + a_{x-1} = \frac{1}{2}(4a_{x}+a_{2})$ <br>
$≡$ { given that $a_k = k^2$ } <br>
$a_{x+1} + (x-1)^2 = \frac{1}{2}(4x^2+a_{2})$ <br>
$≡$ { knowing that $a_2 = 4$ } <br>
$a_{x+1} + (x-1)^2 = 2x^2+2$ <br>
$≡$ { since $(a-b)^2 = (a^2-2ab+b^2)$ } <br>
$a_{x+1} = 2x^2+2 - (x^2-2x+1)$<br>
$≡$ { simplifying } <br>
$a_{x+1} = x^2+2x+1$<br>
$≡$ { since $(a+b)^2 = (a^2+2ab+b^2)$ } <br>
$a_{x+1} = (x+1)^2$<br>
$≡$ { let $k=x+1$ } <br>
$\class{bghighlight}{a_k = k^2}$&nbsp;Q.E.D.<br>

**Step 6. Pown that puzzle!**

$\class{bghighlight}{a_{1997} = 1997^2 = 3988009}$. Easy, uh?
