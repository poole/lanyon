---
layout: post
title: Even has Latex!
tags: [test, tutorial, markdown, latex]
authors: Doe, John Sr., School of Hard Knocks
---

## How to add $\LaTeX$ commands to your posts:

### Inline

To add inline math, you can use `$ <math> $`. Here is an example:


`$ \sum_{i=0}^j \frac{1}{2^n} \times i $` becomes
$ \sum_{i=0}^j \frac{1}{2^n} \times i $

### Block

To add block math, you *must* use `$$<math>$$`. Here are some examples:

```
$$\begin{equation}
a \times b \times c = 0 \\
j=1 \\
k=2 \\
\end{equation}$$
```

...becomes...

$$\begin{equation}
a \times b \times c = 0 \\
j=1 \\
k=2 \\
\end{equation}$$

```
$$\begin{align}
i2 \times b \times c =0 \\
j=1 \\
k=2 \\
\end{align}$$
```

...becomes...

$$\begin{align}
i2 \times b \times c =0 \\
j=1 \\
k=2 \\
\end{align}$$

Don't forget the enclosing `$$`! Otherwise, your newlines won't work:

```
\begin{equation}
i2=0 \\
j=1 \\
k=2 \\
\end{equation}
```

...becomes...

\begin{equation}
i2=0 \\
j=1 \\
k=2 \\
\end{equation}
