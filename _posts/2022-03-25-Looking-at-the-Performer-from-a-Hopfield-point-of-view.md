---
layout: post
title: Looking at the Performer from a Hopfield Point of View
authors: Brandstetter J. and Ramsauer H. and Holzleitner M. and Hochreiter S. and Schäfl B.
tags: [deep learning, hopfield networks, associative memory, attention, transformer]
usemathjax: true
---

<div class="message">
  The recent paper <a href="https://arxiv.org/abs/2009.14794">Rethinking Attention with Performers</a> constructs a new
  efficient attention mechanism in an elegant way. It strongly reduces the computational cost for long sequences, while
  keeping the intriguing properties of the original attention mechanism. In doing so, Performers have a complexity only
  linear in the input length, in contrast to the quadratic complexity of standard Transformers. This is a major
  breakthrough in the strive of improving Transformer models.
</div>

The <a href="https://ai.googleblog.com/2020/10/rethinking-attention-with-performers.html">Performer blog post</a> can
be used as a proper explanation of the paper.

In this blog post, we look at the Performer from a Hopfield Network point of view and relate aspects of the Performer
architecture to findings in the field of associative memories and Hopfield Networks. This blog post sheds light on the
Performer from three different directions:
<ul>
  <li><b>Performers resemble classical Hopfield Networks.</b>
   <a href="https://ml-jku.github.io/hopfield-layers/"> Recently</a>, it was shown that the update rule of modern
   continuous Hopfield Networks is the attention of the Transformer. We now show that generalized kernelizable
   attention of the Performer resembles the update rule of classical Hopfield Networks.
  </li><br>
  <li><b>Sparseness increases memory capacity.</b>
   We point out that sparseness considerably increases the memory capacity in classical Hopfield Networks and
   associative memories, and discuss how sparseness is achieved by the Performer.
  </li><br>
  <li><b>Performer normalization relates to the activation function of continuous Hopfield Networks.</b>
   We correlate the normalization term $ \widehat{D}^{-1} $ of the Performer with activation functions of classical
   continuous Hopfield Networks.
  </li>
</ul>

This blog post is structured as follows: We start with a short review of classical Hopfield Networks, then interpret
generalized kernelizable attention of the Performer as one-step update of a classical Hopfield Network (discrete and
continuous), and discuss sparseness and normalization of the Performer. Finally, we show an exemplary implementation
of a continuous classical Hopfield Network for illustrative purposes.
With this blog post we aim at contributing to a better understanding of Transformer models. This blog post loosely
builds on the paper <a href="https://arxiv.org/abs/2008.02217">Hopfield Networks is All You Need</a> and the
corresponding <a href="https://ml-jku.github.io/hopfield-layers/">blog post</a>.

<h2 style="margin-top:50px">Classical Hopfield Networks</h2>

This part is taken from the
<a href="https://ml-jku.github.io/hopfield-layers/">Hopfield Networks is All You Need blog post</a>. A very good
overview of Hopfield Networks can be found <a href="http://www.scholarpedia.org/article/Hopfield_network">here</a>.

<h3>Binary (Polar) Classical Hopfield Networks</h3>

The simplest associative memory is just a <b>sum of outer products</b> of the $ N $ patterns
$ \\{\mathbf{x}\_{i}\\}\_{i=1}^{N} $ that we want to store (Hebbian learning rule). In classical Hopfield Networks
these patterns are polar or binary, i.e. $ \boldsymbol{x}\_{i} \in \\{ -1,1 \\}^{d} $ or
$ \boldsymbol{x}\_{i} \in \\{ 0,1 \\}^{d} $, respectively, where $ d $ is the length of the patterns. The corresponding
weight matrix $ \boldsymbol{W} $ for $ \boldsymbol{X}=(\boldsymbol{x}\_{1},\dotsc,\boldsymbol{x}\_{N})$ is:

$$
\begin{equation}
\boldsymbol{W} = \boldsymbol{X}\boldsymbol{X}^{T} . \tag{1}
\end{equation}
$$

The weight matrix $ \boldsymbol{W} $ stores the patterns, from which a pattern is retrieved starting with a
<b>state pattern</b> $ \boldsymbol{\xi} $.

<div class="message">
  <p><b>Nomenclature</b></p>

  We denote the $ N $ <b>stored patterns</b> as $ \newcommand{\subscript}[2]{#1_{#2}}
  \subscript{\{\subscript{\boldsymbol{x}}{i}\}}{i=1}^{N} $ and any <b>state pattern</b> or <b>state</b> as
  $ \boldsymbol{\xi} $.
</div>

The basic <b>synchronous update rule</b> is to repeatedly multiply the state pattern $ \boldsymbol{\xi} $ with the
weight matrix $ \boldsymbol{W} $, subtract the bias and take the sign:

$$
\begin{equation}
\boldsymbol{\xi}^{t+1} = \text{sgn}(\boldsymbol{W}\boldsymbol{\xi}^{t} - \boldsymbol{b}) \ , \tag{2}
\label{eq:restorage}
\end{equation}
$$

where $ \boldsymbol{b} \in \mathbb{R}^{d} $ is a bias vector, which can be interpreted as a threshold for every
component. The <b>asynchronous update rule</b> performs this update only for one component of $ \boldsymbol{\xi} $ and
then selects the next component. Convergence is reached if $ \boldsymbol{\xi}^{t+1} = \boldsymbol{\xi}^{t} $.

The asynchronous version of the update rule of Eq. \eqref{eq:restorage} minimizes the <b>energy function</b>
$ \text{E} $:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\text{E} = -\frac{1}{2}\boldsymbol{\xi}^{T} \boldsymbol{W} \boldsymbol{\xi} + \boldsymbol{\xi}^{T}\boldsymbol{b} =
-\frac{1}{2} \subscript{\sum}{i=1}^{d}\subscript{\sum}{j=1}^{d} \subscript{w}{ij}\subscript{\xi}{i}\xi_{j} +
\subscript{\sum}{i=1}^{d} \subscript{b}{i}\subscript{\xi}{i} \ . \tag{3}
\label{eq:energyHopfield}
\end{equation}
$$

As derived in the papers of <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=58341">Bruck</a>,
<a href="https://www.sciencedirect.com/science/article/pii/0166218X85900290">Goles-Chacc et al.</a>
and <a href="https://authors.library.caltech.edu/7427/1/HOPpnas82.pdf">the original Hopfield paper</a>,
the convergence properties are dependent on the structure of the weight matrix $ \boldsymbol{W} $ and the method by
which the nodes are updated:

<ul>
  <li>
   For <b>asynchronous</b> updates with $ w_{ii} \geq 0 $ and $ w_{ij} = w_{ji} $, the updates converge to a stable
   state.
  </li><br>
  <li>
   For <b>synchronous</b> updates with $ w_{ij} = w_{ji} $, the updates converge to a stable state or a limit cycle of
   length 2.
  </li>
</ul>

For the asynchronous update rule and symmetric weights,
$ \text{E}(\boldsymbol{\xi}^{t+1}) \leq \text{E}(\boldsymbol{\xi}^{t}) $ holds. When
$ \text{E}(\boldsymbol{\xi}^{t+1}) = \text{E}(\boldsymbol{\xi}^{t}) $ for the update of every component of
$ \boldsymbol{\xi}^{t} $, a local minimum in $ \text{E} $ is reached. For multiple, say $ M $, state patterns
summarized in a matrix $ \boldsymbol{Q}=(\boldsymbol{\xi}\_{1},\dotsc,\boldsymbol{\xi}\_{M}) $ and
$ \boldsymbol{b}=0 $, the update rule reads

$$
\begin{equation}
\widetilde{\boldsymbol{Q}} = \text{sgn}(\boldsymbol{W}\boldsymbol{Q}) \ . \tag{4}
\label{eq:updateHopfield}
\end{equation}
$$

An illustration of the pattern retrieval mechanism can be found in the
<a href="https://ml-jku.github.io/hopfield-layers/">Hopfield Networks is All You Need blog post</a>.

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_bw.png"
       alt="Homer in B&W"
       style="height:137px;border-radius:0px">
</center>

The <b>weight matrix</b> $ \boldsymbol{W} $ is the outer product of this black and white image
$ \boldsymbol{x}\_{\text{Homer}} $:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\boldsymbol{W} = \subscript{\boldsymbol{x}}{\text{Homer}}^{\text{ }} \subscript{\boldsymbol{x}}{\text{Homer}}^T \ ,
\qquad \subscript{\boldsymbol{x}}{\text{Homer}}^{\text{ }} \in \{ -1,1\}^{d} \ , \tag{5}
\label{eq:weightMatrix}
\end{equation}
$$

where for this example $ d = 64 \times 64 $. It takes one update until the original image is restored.

<center>
  <img src="{{ size.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_bw_mr.png"
       alt="Homer in B&W (masked and retrieved)"
       style="width:original;border-radius:0px">
</center>

What happens if we store <b>more than one pattern</b>? The weight matrix is then built from the sum of outer product
of <b>six stored patterns</b>:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\boldsymbol{W} = \sum_{i=1}^{6} \subscript{\boldsymbol{x}}{i}^{\text{ }} \subscript{\boldsymbol{x}}{i}^{T} \ ,
\qquad \subscript{\boldsymbol{x}}{i} \in \{ -1,1\}^d \ . \tag{6}
\end{equation}
$$

The <b>six stored patterns</b> refer to the six input images:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_bw_r.png"
       alt="Retrieval with Homer in B&W (masked)"
       style="width:100%;border-radius:0px">
</center>

The example patterns are correlated, and therefore the retrieval has errors.

<h3>Continuous Classical Hopfield Networks</h3>

The Performer works with continuous activations while the Hopfield Network is binary. However, also continuous
versions of Hopfield Networks have been proposed. The <b>energy function of continuous classical Hopfield Networks</b>
is treated by <a href="https://www.pnas.org/content/pnas/81/10/3088.full.pdf">Hopfield</a> in 1984,
<a href="http://cognet.mit.edu/journal/10.1162/neco.1994.6.3.459">Koiran</a> in 1994 and
<a href="https://www.semanticscholar.org/paper/
On-the-dynamics-of-discrete-time%2C-continuous-state-Wang/d0e873086aec12ee222bab6f92f752590eefecf4">Wang</a> in 1998.
For continuous classical Hopfield Networks the energy function of Eq. \eqref{eq:energyHopfield} is expanded to:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\text{E} (\boldsymbol{\xi}) = -\frac{1}{2}\boldsymbol{\xi}^{T} \boldsymbol{W} \boldsymbol{\xi} +
\boldsymbol{\xi}^{T}\boldsymbol{b} + \subscript{\sum}{i=1}^{d} \subscript{\int}0^{\xi[i]} f^{-1}(y) \ dy \ , \tag{7}
\label{eq:energyHopfieldContinuous}
\end{equation}
$$

where $ \xi[i] $ denotes the $ i $-th component of $ \boldsymbol{\xi} $.

In <a href="https://www.pnas.org/content/pnas/81/10/3088.full.pdf">Hopfield's paper</a> and in an informative
<a href="http://www.scholarpedia.org/article/Hopfield_network">Scholarpedia article</a>,
it is shown that the energy function $ \text{E} (\boldsymbol{\xi}) $ of Eq. \eqref{eq:energyHopfieldContinuous} is a
<b>Lyapunov function</b> of the (continuous) dynamics of $ \boldsymbol{\xi} $. In literature, update rules are derived
via the underlying ordinary differential equation of the Lyapunov function
(<a href="https://www.pnas.org/content/pnas/81/10/3088.full.pdf">Hopfield</a>,
<a href="http://cognet.mit.edu/journal/10.1162/neco.1994.6.3.459">Koiran</a>,
<a href="http://www.scholarpedia.org/article/Hopfield_network">Scholarpedia article</a>). Here, the update
rule is derived by applying the <b>Concave-Convex-Procedure</b> (CCCP) described by
<a href="https://papers.nips.cc/paper/2125-the-concave-convex-procedure-cccp.pdf">Yuille and Rangarajan</a> on the
energy function of Eq. \eqref{eq:energyHopfieldContinuous}:

<ul>
  <li>
   The total energy $ \text{E}(\boldsymbol{\xi}) $ is split into a convex and a concave term:
   $ \newcommand{\subscript}[2]{#1_{#2}} \text{E}(\boldsymbol{\xi}) = \subscript{\text{E}}{1}(\boldsymbol{\xi}) +
   \subscript{\text{E}}{2}(\boldsymbol{\xi}) $
  </li><br>
  <li>
   The term $ \newcommand{\subscript}[2]{#1_{#2}} \subscript{\sum}{i=1}^{d} \subscript{\int}{0}^{\xi[i]}
   f^{-1}(y) \ dy = \subscript{\text{E}}{1}(\boldsymbol{\xi}) $ is convex. We will later see which conditions are
   sufficient for $ \newcommand{\subscript}[2]{#1_{#2}} \subscript{\text{E}}{1}(\boldsymbol{\xi}) $ to be convex.
  </li><br>
  <li>
   The term $ \newcommand{\subscript}[2]{#1_{#2}} -\frac{1}{2}\boldsymbol{\xi}^{T} \boldsymbol{W} \boldsymbol{\xi} +
   \boldsymbol{\xi}^{T}\boldsymbol{b} = \subscript{\text{E}}{2}(\boldsymbol{\xi}) $ is concave. Since
   $ \boldsymbol{W} $ is positive semi-definite (every matrix which can be written as sum of outer products is),
   $ \frac{1}{2}\boldsymbol{\xi}^{T} \boldsymbol{W} \boldsymbol{\xi} $ is convex.
  </li><br>
  <li>
   The CCCP applied to $ \text{E} $ is:
  </li>
</ul>

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{align}
\subscript{\nabla}{\boldsymbol{\xi}}\subscript{\text{E}}{1}(\boldsymbol{\xi}^{t+1}) &= - 
\subscript{\nabla}{\boldsymbol{\xi}}\subscript{\text{E}}{2}(\boldsymbol{\xi}^{t})
\tag{8} \label{eq:updateCpp1} \\[10px]
\subscript{\nabla}{\boldsymbol{\xi}}\left(\subscript{\sum}{i=1}^{d} \subscript{\int}{0}^{\xi[i]} f^{-1}(y) \ dy \right)
(\boldsymbol{\xi}^{t+1}) &= - \subscript{\nabla}{\boldsymbol{\xi}} \left(-\frac{1}{2}\boldsymbol{\xi}^{T}
\boldsymbol{W} \boldsymbol{\xi} + \boldsymbol{\xi}^{T}\boldsymbol{b} \right)(\boldsymbol{\xi}^{t})
\tag{9} \label{eq:updateCpp2} \\[10px]
f^{-1}(\boldsymbol{\xi}^{t+1}) &= \boldsymbol{W}\boldsymbol{\xi}^{t} - \boldsymbol{b} \ .
\tag{10} \label{eq:updateCpp3}
\end{align}
$$

In order for $ \text{E}\_1(\boldsymbol{\xi}) $ to be convex, it is sufficient to ensure that $ f(y) $ is strictly
increasing. To see this, the argument is as follows: If $ f(y) $ is stricly increasing, then also $ f^{-1}(y) $ is strictly
increasing. Consequently, the derivative of $ f^{-1}(y) $ is larger than zero and therefore

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\frac{\partial^{2} \subscript{\text{E}}{1}(\boldsymbol{\xi})}{\partial \xi[i] \partial \xi[j]}= \begin{cases}
(f^{-1})'(\xi[i])>0 & \text{ if } i=j \\ 0 & \, \text{else}\end{cases}. \tag{11}
\end{equation}
$$

This implies that the Hessian of $ \text{E}\_1(\boldsymbol{\xi}) $ is a diagonal matrix with strictly positive diagonal
elements, thus it is positive definite and therefore $ \text{E}\_1(\boldsymbol{\xi}) $ is convex.

Many activation functions fulfill these requirements. In the literature, usually the tangens hyperbolicus  or sigmoid
function is used.

If we now set $ f(y) = \tanh $, we can rewrite Eq. \eqref{eq:updateCpp3} as:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{align}
\tanh^{-1}(\boldsymbol{\xi}^{t+1}) &= \boldsymbol{W}\boldsymbol{\xi}^{t} - \boldsymbol{b}
\tag{12} \label{eq:updateCpp4} \\[10px]
\boldsymbol{\xi}^{t+1} &= \tanh \left(\boldsymbol{W}\boldsymbol{\xi}^{t} - \boldsymbol{b} \right) \ .
\tag{13} \label{eq:updateCpp5}
\end{align}
$$

Note that by abuse of notation we apply $ f $ elementwise here. This now looks very familiar to a one-layer neural
network. Similarly as in Eq. \eqref{eq:updateHopfield}, for multiple, say $ M $, state patterns summarized in a matrix
$ \boldsymbol{Q}=(\boldsymbol{\xi}\_1,\dotsc,\boldsymbol{\xi}\_M) $ and $ \boldsymbol{b}=0 $, the update rule reads

$$
\begin{equation}
\widetilde{\boldsymbol{Q}} = \tanh(\boldsymbol{W}\boldsymbol{Q}) \ . \tag{14}
\label{eq:updateHopfieldContinuous}
\end{equation}
$$

<h2 style="margin-top:50px">Performer Attention Resembles Update of Classical Hopfield Networks</h2>

<div class="message">
  <p><b>Nomenclature change</b></p>

  We now change from $ N $ (stored patterns) to $ L $ (number of input tokens) to be consistent with the Performer
  paper.
</div>

The following image is taken from the
<a href="https://arxiv.org/abs/2009.14794">Rethinking Attention with Performers</a> paper. On the left, the Transformer
self-attention mechanism introduced in the paper
<a href="https://arxiv.org/abs/1706.03762">Attention is All You Need</a> is shown. The complexity of the Transformer
self-attention is quadratic with respect to the number of input tokens $ L $. On the right, the linear attention
framework of the Performer is shown. The linear <b>generalized kernelizable attention</b> is implemented via the
so-called <b>FAVOR+</b> (<i>Fast Attention Via positive Orthogonal Random features</i>) mechanism.

<center>
  <figure>
    <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/performer.png"
         alt="Performer attention mechanism"
         style="width:original;border-radius:0px">
    <figcaption>Source: <a href="https://arxiv.org/abs/2009.14794">Rethinking Attention with Performers</a></figcaption>
  </figure>
</center>

Let's start by writing down the Transformer self-attention $ \boldsymbol{Z} $ for $ L $ tokens, hidden dimension $ d $,
token input dimension $ i $:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\boldsymbol{Z} = \text{softmax} \left(\frac{1}{\sqrt{\subscript{d}{K}}} \boldsymbol{Q}\boldsymbol{K}^{T} \right)
\boldsymbol{V} \ , \tag{15}
\end{equation}
$$

where the dimensions of the involved matrices are the following:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{alignat}{5}
& && &&\boldsymbol{Z} &&\in \mathbb{R}^{L \times d} \ , \tag{16} \\

&\boldsymbol{Q} &&= \subscript{\boldsymbol{XW}}{Q} \ , \quad &&\boldsymbol{Q} &&\in \mathbb{R}^{L \times d} \ ,
\boldsymbol{X} &&\in \mathbb{R}^{L \times i} \ , \subscript{\boldsymbol{W}}{Q} &&\in \mathbb{R}^{i \times d} \ ,
\tag{17} \\

&\boldsymbol{K}^{T} &&= \subscript{\boldsymbol{W}}{K}^{T} \boldsymbol{X}^{T} \ ,
\quad &&\boldsymbol{K}^{T} &&\in \mathbb{R}^{d \times L} \ , \subscript{\boldsymbol{W}}{K}^{T}
&&\in \mathbb{R}^{d \times i} \ , \boldsymbol{X}^{T} &&\in \mathbb{R}^{i \times L} \ , \tag{18} \\

&\boldsymbol{V} &&= \subscript{\boldsymbol{XW}}{V} \ , \quad &&\boldsymbol{V} &&\in \mathbb{R}^{L \times d} \ ,
\boldsymbol{X} &&\in \mathbb{R}^{L \times i} \ , \subscript{\boldsymbol{W}}{V} &&\in \mathbb{R}^{i \times d} \ .
\tag{19}
\end{alignat}
$$

$ d_{K} $ denotes some normalization constant, often it is set to $ d_K=d $.

<div class="message">
  <p><b>Complexity of the Transformer attention</b></p>

  The attention matrix

  $$
  \newcommand{\subscript}[2]{#1_{#2}}
  \begin{equation}
  \boldsymbol{A} = \text{softmax} \left(\frac{1}{\sqrt{\subscript{d}{K}}} \boldsymbol{Q}\boldsymbol{K}^{T} \right)
  \tag{20}
  \end{equation}
  $$

  has the dimensions $ \boldsymbol{A} \in \mathbb{R}^{L \times L} $ and its
  <b>complexity therefore scales quadratically</b>. This is a huge disadvantage of the Transformer for long sequences
  (many tokens).
</div>

In the Performer paper, the FAVOR+ mechanism is introduced and the Transformer self-attention is substituted by
generalized kernelizable attention, whose complexity scales linearly with the number of input tokens $ L $.
The idea of the Performer is to decompose the attention matrix into a matrix product:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\subscript{\boldsymbol{A}}{\text{Perf}} = \widehat{\boldsymbol{D}}^{-1} \boldsymbol{Q'} \boldsymbol{K'}^{T} \ , \tag{21}
\end{equation}
$$

where $ \boldsymbol{Q'} $ and $ \boldsymbol{K'} $ can be directly computed from the queries $ \boldsymbol{Q} $ and the
keys $ \boldsymbol{K} $ using a kernel function $ \phi: \mathbb{R}^{d} \rightarrow \mathbb{R}^{r} $, which maps:

$$
\begin{alignat}{3}
& \boldsymbol{Q} &&\rightarrow \boldsymbol{Q'} \ , \quad &&\boldsymbol{Q'} &&\in \mathbb{R}^{L \times r} \ , \tag{22} \\
& \boldsymbol{K}^{T} &&\rightarrow \boldsymbol{K'}^{T} \ , \quad &&\boldsymbol{K'}^{T} &&\in \mathbb{R}^{r \times L} \ .
\tag{23}
\end{alignat}
$$

Consequently, the generalized kernelizable attention $ \boldsymbol{Z'} $ reads

$$
\begin{equation}
\boldsymbol{Z'} = \widehat{\boldsymbol{D}}^{-1} \left( \boldsymbol{Q'} \left(\boldsymbol{K'}^{T} \boldsymbol{V} \right)
\right) \ , \tag{24}
\end{equation}
\label{eq:performerAttention}
$$

where $ \widehat{\boldsymbol{D}}^{-1} = \text{diag}\left(\boldsymbol{Q'}\boldsymbol{K'}^{T}\boldsymbol{1}\_L \right) $,
and the dimensions of the involved matrices are the following:

$$
\begin{alignat}{2}
& &&\boldsymbol{Z'} &&\in \mathbb{R}^{L \times d} \ , \tag{25} \\
& &&\boldsymbol{Q'} &&\in \mathbb{R}^{L \times r} \ , \tag{26} \\
& &&\boldsymbol{K'}^{T} &&\in \mathbb{R}^{r \times L} \ , \tag{27} \\
& &&\boldsymbol{V} &&\in \mathbb{R}^{L \times d} \ . \tag{28}
& &&\end{alignat}
$$

<div class="message">
  <p><b>Complexity of the Performer attention</b></p>

  The matrix product $ \boldsymbol{K'}^{T} \boldsymbol{V} = \boldsymbol{W} $ can be computed in linear time in $ L $,
  the matrix product $ \boldsymbol{Q'}\boldsymbol{W} $ can also be computed in linear time in $ L $.
  $ \widehat{\boldsymbol{D}}^{-1} $ is a diagonal matrix and can thus also be computed in linear time in $ L $. To 
  summarize, for $ \boldsymbol{Z'} $, the <b>complexity therefore scales linearly with $ L $</b>. This is the big
  achievement of the Performer.
</div>

The matrix product $ \boldsymbol{K'}^{T} \boldsymbol{V} = \boldsymbol{W} $ is the sum of outer products and has the
dimension $ \boldsymbol{W} \in \mathbb{R}^{r \times d} $. For $ r = d $, we have

$$
\begin{equation}
\widetilde{\boldsymbol{Q}}' = \boldsymbol{Q'} \boldsymbol{W} \ , \tag{29}
\label{eq:performerAttention2}
\end{equation}
$$

which <b>resembles the transposed one-step update of classical binary (polar) and continuous Hopfield Networks</b>
introduced for pattern retrieval in Eq. \eqref{eq:updateHopfield} and Eq. \eqref{eq:updateHopfieldContinuous},
respectively.

Both the mapping $ \phi: \mathbb{R}^{d} \rightarrow \mathbb{R}^{r} $ of Eq. \eqref{eq:performerAttention} and the
normalization $ \widehat{\boldsymbol{D}}^{-1} $ of Eq. \eqref{eq:performerAttention} play an important role. This is
discussed in the next paragraph.

<h2 style="margin-top:50px">The Performer Related to Classical Hopfield Networks</h2>

We now relate the Performer to known facts from the field of Hopfield Networks and associative memories, namely
sparseness, one-step update and storage capacity. We further look at continuous classical Hopfield Networks and
investigate the generalized kernelizable attention of the Performer, especially by looking at the mapping
$ \phi: \mathbb{R}^{d} \rightarrow \mathbb{R}^{r} $ and the normalization $ \widehat{\boldsymbol{D}}^{-1} $ of Eq.
\eqref{eq:performerAttention}.

<h3>About sparseness, one-step update and storage capacity</h3>

One obvious difference between the update of classical Hopfield Networks stated in Eq. \eqref{eq:updateHopfield} and the
matrix product $ \boldsymbol{Q'} \left(\boldsymbol{K'}^{T} \boldsymbol{V} \right) = \boldsymbol{Q'} \boldsymbol{W} $ of
the generalized kernelizable attention of Eq. \eqref{eq:performerAttention2} is that the classical Hopfield Network
update can be iteratively applied multiple times, whereas the matrix product $ \boldsymbol{Q'} \boldsymbol{W} $ is
applied only once. One-step update for classical Hopfield Networks was e.g. investigated in
<a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.45.2550&rep=rep1&type=pdf">Schwenker et al.</a>
and in <a href="https://www.sciencedirect.com/science/article/pii/S0893608012002298">Palm</a>. The storage capacity of
classical binary Hopfield Networks for fixed-point retrieval of patterns (multiple updates) with a small percentage of
errors is $ C \cong 0.14d $. In
<a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.45.2550&rep=rep1&type=pdf">Schwenker et al.</a>, it is
shown that for auto-association <b>one-step retrieval</b> achieves <b>nearly the same capacity values</b> as
fixed-point retrieval does. Furthermore, in
<a href="https://www.sciencedirect.com/science/article/pii/S0893608012002298">Palm</a> it is stated that using
<b>sparse patterns</b> turns out to achieve <b>much higher capacity values</b> ($ C=0.72d $ for one-step retrieval,
which is a factor 5 higher than the classical network capacity $ C=0.14d $). In
<a href="https://iopscience.iop.org/article/10.1209/0295-5075/6/2/002/pdf">Tsodyks et al.</a>, the storage capacity is
even found to increase with $ C(p) \sim \frac{1}{p|\ln p|}d $, where $ p $ is the percentage of non-zero weights. An
overview of the storage capacities can be found in
<a href="https://www.researchgate.net/publication/38112825_Memory_Capacities_for_Synaptic_and_Structural_Plasticity">
Knoblauch et al.</a>, storage capacities in classical Hopfield Networks are also discussed in the blog
<a href="https://ml-jku.github.io/hopfield-layers/">Hopfield Networks is All You Need</a>.

To summarize: <b>Sparse patterns yield very large storage capacities</b>, also for one-step retrieval. Below we have a
closer look at the mapping $ \phi: \mathbb{R}^{d} \rightarrow \mathbb{R}^{r} $ in the
<a href="https://arxiv.org/abs/2009.14794">Rethinking Attention with Performers</a> paper and relate the choices of the
paper with this statement.

<h3>About the mapping $ \phi $ and about the normalization $ \widehat{\boldsymbol{D}}^{-1} $</h3>

In the paper <a href="https://arxiv.org/abs/2009.14794">Rethinking Attention with Performers</a>, a kernel function
$ \phi: \mathbb{R}^{d} \rightarrow \mathbb{R}^{r} $ maps $ \boldsymbol{Q} \rightarrow \boldsymbol{Q'} $ and
$ \boldsymbol{K}^{T} \rightarrow \boldsymbol{K'}^{T} $. The kernel function $ \phi $ is of the form:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\phi(\boldsymbol{z}) = \frac{h(\boldsymbol{z})}{\sqrt{r}} \left(\subscript{f}{1}(\subscript{\boldsymbol{w}}{1}^{T}
\boldsymbol{z}),\dotsc,\subscript{f}{1}(\subscript{\boldsymbol{w}}{m}^{T}\boldsymbol{z}),\dotsc,
\subscript{f}{l}(\subscript{\boldsymbol{w}}{1}^{T}\boldsymbol{z}),\dotsc,\subscript{f}{l}(
\subscript{\boldsymbol{w}}{m}^{T}\boldsymbol{z}) \right)\ , \tag{30}
\label{eq:kernelFunction}
\end{equation}
$$

where $ \boldsymbol{z} $ are the row vectors of $ \boldsymbol{Q} $ and $ \boldsymbol{K} $ (i.e. column vectors of
$ \boldsymbol{K}^{T} $), $ f\_{1},\dotsc,f\_{l} $ are functions that map from $ \mathbb{R}\rightarrow\mathbb{R} $, $ h $
is a function that maps from $ \mathbb{R}^{d} \rightarrow \mathbb{R} $, and
$ \boldsymbol{w}\_{1},\dotsc,\boldsymbol{w}\_{m} \overset{iid}{\sim} \mathcal{D} $ are vectors from some distribution
$ \mathcal{D}\in \mathcal{P}(\mathbb{R})^{d} $. It also immediately follows that $ r=l \cdot m $. In the paper, it turns
out to work best if $ m=r $, $ l=1 $, $ \boldsymbol{w}\_{1},\dotsc,\boldsymbol{w}\_{r} $ are orthogonal random feature
maps, and the ReLU function is used for $ f_1 $.

<div class="message">
  <ul>
    <li>
      ReLU activation functions <b>enforce sparseness of $ \boldsymbol{Q'} $ and $ \boldsymbol{K'} $</b>. This complies
      with the theory of classical Hopfield Networks, i.e. that <b>sparse patterns yield very large storage
      capacities.</b>
    </li><br>
    <li>
      The $ \tanh $ function of Eq. \eqref{eq:updateHopfieldContinuous} and the Performer normalization
      $ \widehat{\boldsymbol{D}}^{-1} $ of Eq. \eqref{eq:performerAttention} play similar roles. Namely, they
      <b>both keep the result of the one-step pattern retrieval bounded</b>.
    </li><br>
    <li>
      The <b>approximation of the original softmax attention</b> and the subsequent <b>preservation of the intruiging
      properties of the original attention mechanism</b> is achieved via the normalization
      $ \widehat{\boldsymbol{D}}^{-1} $ and the introduction of a kernel function, see Eq. \eqref{eq:kernelFunction}. It
      is interesting to note that the  softmax function of the original attention mechanism can only be approximated in
      expectation. In the Performer, both having the approximation based on only a few samples and setting $ f(\cdot) $
      to ReLU does not comply with a proper approximation of the softmax function. However, this setting is reported to
      work best in the Performer paper. 
    </li>
  </ul>
</div>

<h2 style="margin-top:50px;">Continuous Hopfield Networks for Illustrative Purposes</h2>

In this last part of the blog, we look at some illustrative examples:
<ul>
  <li>
    <a href="#continuous-classical-hopfield-networks">Continuous classical Hopfield Networks</a>
  </li>
  <li>
    <a href="#sparse-continuous-classical-hopfield-networks">Sparse continuous classical Hopfield Networks</a>
  </li>
  <li>
    <a href="#modern-continuous-hopfield-networks">Modern continuous Hopfield Networks</a>
  </li>
  <li>
    <a href="#sparse-modern-continuous-hopfield-networks">Sparse modern continuous Hopfield Networks</a>
  </li>
  <li>
    <a href="#performer-networks">Performer Networks</a>
  </li>
  <li>
    <a href="#sparse-performer-networks">Sparse Performer Networks</a>
  </li>
</ul>

<h3 id="continuous-classical-hopfield-networks">Continuous Classical Hopfield Networks</h3>

We first implement a <b>continuous classical Hopfield Network</b>, and we are going to retrieve a continuous Homer
($ \boldsymbol{\xi} $) out of many continuous stored patterns
$ \boldsymbol{X}=(\boldsymbol{x}\_{1},\dotsc,\boldsymbol{x}\_{N}) $ using Eq. \eqref{eq:updateCpp5}. Instead of polar
patterns, i.e. $ \boldsymbol{x}\_{i} \in \\{ -1, 1\\}^{d} $ where $ d $ is the length of the patterns, patterns are now
continuous, i.e. $ \boldsymbol{x}\_{i} \in \left[ -1, 1\right]^{d} $.

We start again with the retrieval of only one stored pattern, which is not a too hard job.

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c.png"
       alt="Homer continuous (masked and retrieved)"
       style="height:137px;border-radius:0px">
</center>

The next task is again a retrieval out of six stored patterns, which already does not work any more.

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c_r.png"
       alt="Retrieval with Homer continuous (masked)"
       style="width:100%;border-radius:0px">
</center>

<h3 id="sparse-continuous-classical-hopfield-networks">Sparse Continuous Classical Hopfield Networks</h3>

We will now exploit the insight from above, namely that <b>sparse patterns yield very large storage capacities</b>.
Therefore, all components $ \boldsymbol{\xi}[l] > -0.5 $ and all components $ \boldsymbol{x}\_{i}[l] > -0.5 $ of
$ \boldsymbol{X}^{T} $  are set to zero, giving $ \boldsymbol{\xi}^{\text{ }}\_{\text{sparse}} $ and
$ \boldsymbol{X}^{T}\_{\text{sparse}} $, respectively. The sparse version of Eq. \eqref{eq:updateCpp5} now reads:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\boldsymbol{\xi}^{\text{new}} = \tanh \left(\boldsymbol{X}\subscript{\boldsymbol{X}}{\text{sparse}}^{T}
\subscript{\boldsymbol{\xi}}{\text{sparse}} \right) \ . \tag{31}
\label{eq:updateCpp5Sparse}
\end{equation}
$$

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c_s_r.png"
       alt="Retrieval with Homer continuous and sparse (masked)"
       style="width:100%;border-radius:0px">
</center>

Pattern retrieval now works for 6 stored patterns, but what about more patterns?

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c_s_r_m.png"
       alt="Retrieval with Homer continuous and sparse, many samples (masked)"
       style="width:100%;border-radius:0px">
</center>

<h3 id="modern-continuous-hopfield-networks">Modern Continuous Hopfield Networks</h3>

It seems that a model with larger storage capacity is needed. Recently,
<a href="https://ml-jku.github.io/hopfield-layers/">Modern Continuous Hopfield Networks for Deep Learning
Architectures</a> were introduced in the paper <a href="https://arxiv.org/abs/2008.02217">Hopfield Networks is All You
Need</a>. It was shown that modern continuous Hopfield Networks can store exponentially (in $ d $) many patterns. To
retrieve a pattern $ \boldsymbol{\xi} $, the update rule of modern continuous Hopfield Networks for $ N $ stored
patterns $ \boldsymbol{X} = (\boldsymbol{x}\_{1},\dotsc,\boldsymbol{x}\_{N}) $ reads:

$$
\begin{equation}
\boldsymbol{\xi}^{\text{new}} = \boldsymbol{X} \text{softmax} (\beta \boldsymbol{X}^{T} \boldsymbol{\xi}) \ , \tag{32}
\label{eq:updateModernHopfield}
\end{equation}
$$

where $ \beta $ is the <b>inverse temperature</b> controlling the <b>learning dynamics</b>. We choose the value
$ \beta = 25 $, which enables useful pattern retrieval for 6 stored patterns, but fails if 24 patterns are stored. Note
that the learning dynamics for $ \beta = 25 $ are different to the ones shown in the
<a href="https://ml-jku.github.io/hopfield-layers/">Hopfield blog post</a> due to normalization of the patterns.

For 6 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c_r_b25.png"
       alt="Retrieval with Homer continuous (masked)"
       style="width:100%;border-radius:0px">
</center>

For 24 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c_r_m_b25.png"
       alt="Retrieval with Homer continuous, many samples (masked)"
       style="width:100%;border-radius:0px">
</center>

<h3 id="sparse-modern-continuous-hopfield-networks">Sparse Modern Continuous Hopfield Networks</h3>

We will now again exploit the insight from above, namely that <b>sparse patterns yield very large storage
capacities</b>. Therefore, in Eq. \eqref{eq:updateModernHopfield} all components $ \boldsymbol{\xi}[l] > -0.5 $ and all
components $ \boldsymbol{x}\_{i}[l] > -0.5 $ of $ \boldsymbol{X}^{T} $  are set to zero, giving
$ \boldsymbol{\xi}\_{\text{sparse}}^{\text{ }} $ and $ \boldsymbol{X}^{T}\_{\text{sparse}} $, respectively. The sparse
version of Eq. \eqref{eq:updateModernHopfield} now reads:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\boldsymbol{\xi}^{\text{new}} = \boldsymbol{X} \text{softmax} (\beta \subscript{\boldsymbol{X}}{\text{sparse}}^{T}
\subscript{\boldsymbol{\xi}}{\text{sparse}}) \ , \tag{33}
\label{eq:update_modernHopfieldSparse}
\end{equation}
$$

For 6 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c_s_r_b25.png"
       alt="Retrieval with Homer continuous and sparse (masked)"
       style="width:100%;border-radius:0px">
</center>

For 24 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_c_s_r_m_b25.png"
       alt="Retrieval with Homer continuous and sparse, many samples (masked)"
       style="width:100%;border-radius:0px">
</center>

<h3 id="performer-networks">Performer Networks</h3>

In the paper <a href="https://arxiv.org/abs/2008.02217">Hopfield Networks is All You Need</a>, it is further shown that
the update rule of Eq. \eqref{eq:updateModernHopfield} of modern continuous Hopfield Networks is the self-attention of
Transformer networks. We therefore use the insights of the Performer paper to substitute Eq.
\eqref{eq:updateModernHopfield} by:

$$
\begin{equation}
\boldsymbol{\xi'}^{\text{new}} = \boldsymbol{X} \ \mathbb{E}\left[\boldsymbol{X'}^{T} \boldsymbol{\xi'}
\widehat{\boldsymbol{D}}^{-1}\right]   \ . \tag{34}
\label{eq:updatePerformerOneStep}
\end{equation}
$$

Equation \eqref{eq:updatePerformerOneStep} directly follows out (of the transposed) of Eq.
\eqref{eq:performerAttention} by setting $ \boldsymbol{Q} $ to $ \boldsymbol{\xi} $ (pattern to retrieve) and setting
$ \boldsymbol{K} $ and $ \boldsymbol{V} $ to $ \boldsymbol{X} $ (matrix of stored patterns). To obtain
$ \boldsymbol{X'} $ and $ \boldsymbol{\xi'} $, we use the mapping $ \phi(\boldsymbol{z}) $ introduced in Eq.
\eqref{eq:kernelFunction}, using $ h(\boldsymbol{z}) = \exp\left(- \frac{\\|\boldsymbol{z} \\|^{2}}{2} \right) $,
$ l=1 $, $ f\_{1}(\cdot) = \exp(\cdot) $, and one drawn set of orthogonal random features
$ \boldsymbol{w}\_{1}, \dotsc, \boldsymbol{w}\_{r} $. In the mapping, we further set $ \boldsymbol{z} $ to
$ \sqrt{\beta} \boldsymbol{z} $ to operate in the same regime as Eq. \eqref{eq:updateModernHopfield}. $ \mathbb{E} $ is
the expectation over $ \boldsymbol{X'}^{T} \boldsymbol{\xi'} \widehat{\boldsymbol{D}}^{-1} $.

For 6 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_p_c_r_b25.png"
       alt="Performer retrieval with Homer continuous (masked)"
       style="width:100%;border-radius:0px">
</center>

For 24 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_p_c_r_m_b25.png"
       alt="Performer retrieval with Homer continuous, many samples (masked)"
       style="width:100%;border-radius:0px">
</center>

For clarity, let's now visualize what is going on here:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/performer_retrieval.svg"
       alt="Performer retrieval"
       style="width:50%;border-radius:0px">
</center>

<h3 id="sparse-performer-networks">Sparse Performer Networks</h3>

We will now again exploit the insight from above, namely that <b>sparse patterns yield very large storage
capacities</b>. Therefore, in Eq. \eqref{eq:updatePerformerOneStep} all components $ \boldsymbol{\xi}[l] > 0.5 $ and all
components $ \boldsymbol{x}\_{i}[l] > 0.5 $ of $ \boldsymbol{X}^{T} $  are set to zero, giving
$ \boldsymbol{\xi}\_{\text{sparse}}^{\text{ }} $ and $ \boldsymbol{X}^{T}\_{\text{sparse}} $. The sparse version of Eq.
\eqref{eq:updatePerformerOneStep} now reads:

$$
\newcommand{\subscript}[2]{#1_{#2}}
\begin{equation}
\boldsymbol{\xi'}^{\text{new}} = \boldsymbol{X} \ \mathbb{E}\left[\subscript{\boldsymbol{X'}}{\text{sparse}}^{T}
\subscript{\boldsymbol{\xi'}}{\text{sparse}} \widehat{\boldsymbol{D}}^{-1}\right]   \ . \tag{35}
\label{eq:updatePerformerOneStepSparse}
\end{equation}
$$

For 6 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_p_c_s_r_b25.png"
       alt="Performer retrieval with Homer continuous and sparse (masked)"
       style="width:100%;border-radius:0px">
</center>

For 24 stored patterns:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/homer_p_c_s_r_m_b25.png"
       alt="Performer retrieval with Homer continuous and sparse, many samples(masked)"
       style="width:100%;border-radius:0px">
</center>

For clarity, let's now again visualize what is going on here:

<center>
  <img src="{{ site.url }}/public/images/2022-03-25-Looking-at-the-Performer-from-a-Hopfield-point-of-view/performer_retrieval_s.svg"
       alt="Performer retrieval, sparse"
       style="width:50%;border-radius:0px">
</center>

<h2 style="margin-top:50px;">Conclusion</h2>
The aim of this blog post has been to describe relations between the recently introduced Performer models and properties
of continuous classical and continuous modern Hopfield Networks: 

<ul>
  <li>
    Performers resemble classical Hopfield Networks. 
  </li>
  <li>
    Sparseness increases memory capacity. 
  </li>
  <li>
    Performer normalization relates to the activation function of continuous Hopfield Networks.
  </li>
</ul>

<h2 style="margin-top:50px;">Material</h2>

<ul>
  <li>
    <a href="https://arxiv.org/abs/2009.14794">Paper: Rethinking Attention with Performers</a>
  </li><br>
  <li>
    <a href="https://ai.googleblog.com/2020/10/rethinking-attention-with-performers.html">
    Blog post to paper: Rethinking Attention with Performers</a>
  </li><br>
  <li>
    <a href="https://arxiv.org/abs/2008.02217">Paper: Hopfield Networks is All You Need</a>
  </li><br>
  <li>
    <a href="https://ml-jku.github.io/hopfield-layers/">Blog post to paper: Hopfield Networks is All You Need</a>
  </li><br>
  <li>
    <a href="https://www.youtube.com/watch?v=xJrKIPwVwGM">Yannic Kilcher's video on Performer</a>
  </li><br>
  <li>
    <a href="https://www.youtube.com/watch?v=nv6oFDp6rNQ">Yannic Kilcher's video on Hopfield Networks</a>
  </li>
</ul>
