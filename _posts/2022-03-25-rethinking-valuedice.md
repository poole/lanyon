---
layout: post
title: Rethinking ValueDice - Does It Really Improve Performance?
authors: Ziniu, Li, CUHKSZ; Tian, Xu, NJU; Yang, Yu, NJU; Zhi-Quan, Luo, CUHKSZ
tags: [reinforcement learning, imitation learning, ValueDice, adversarial learning]
---

This post rethinks the ValueDice algorithm introduced in the following ICLR publication. We promote several new conclusions and perhaps some of them can provide new insights.

```angular2html
Kostrikov, Ilya, Ofir Nachum, and Jonathan Tompson. "Imitation learning via off-policy distribution matching." ICLR 2020.
```


Ziniu Li and Tian Xu contribute to this blog equally.



## Overview

This blog is organized in the following way.

1. [Why ValueDice?](#why-valuedice)
2. [Background](#background)
3. [Rethink ValueDice Under the Offline Setting](#rethink-valuedice-under-the-offline-setting)
   1. [Connection Between ValueDice and BC Under Offline Setting](#connection-between-valuedice-and-bc-under-offline-setting)
   2. [Overfitting of ValueDice and BC](#overfitting-of-valuedice-and-bc)
   3. [Discussion: Why BC Performs Well?](#discussion-why-bc-performs-well)
4. [Rethink ValueDice Under the Online Setting](#rethink-valuedice-under-the-online-setting)
5. [Conclusion](#conclusion)

This blog may take 10~15 minutes to read.

## Why ValueDice?

Many practical applications involve sequential decision-making. For these applications, an agent implements a policy to select actions and maximize the long-term return. Imitation learning approaches obtain the optimal policy from expert demonstrations [Argall et al., 2009, Hussein et al., 2017, Osa et al., 2018]. Imitation learning has been successfully applied in game [Ross et al., 2011, Silver et al., 2016], recommendation system [Shi et al., 2019, Chen et al., 2019], and robotics [Levine et al., 2016, Finn et al., 2016], etc.


One of the milestones in imitation learning is the introduction of generative adversarial imitation learning (GAIL) [Ho and Ermon, 2016]. Different from the classical approach Behavioral Cloning (BC) [Pomerleau, 1991] that trains a policy via supervised learning, GAIL performs state-action distribution matching in an adversarial manner [Ghasemipour et al., 2019, Ke et al., 2019, Xu et al., 2020]. Even when expert demonstrations are scarce, GAIL is empirically shown to match the expert performance while BC cannot [Ho and Ermon, 2016]. However, the price is that GAIL requires a number of environment interactions (e.g., 3M for Gym MuJoCo locomotion tasks), which restricts GAIL to be applied under the online setting. In contrast, BC does not require any interaction thus BC is widely applied under the offline setting.

The remarkable achievements of GAIL attract lots of research interests in adversarial imitation learning (AIL) approaches. Among these methods, ValueDice [Kostrikov et al., 2020] has the following two improvements.

1. As an off-policy algorithm, **ValueDice** is empirically shown to **beat BC under the offline setting**. In contrast, previous AIL algorithms (e.g., GAIL), that performs state-action distribution matching,  cannot even work under the offline setting.
2. **ValueDice outperforms another off-policy AIL algorithm DAC [Kostrikov et al., 2019] in terms of interaction efficiency**. Specifically, for many Gym MuJoCo tasks, ValueDice only requires about 50K interaction steps (v.s. 3M of GAIL).


All existing results suggest ValueDice is perfect. This motivates the central question in this blog: *are these improvements benefited from more advanced algorithm designs?* Before answering this question, we have to carefully examine the achievements of ValueDice.

1. For the comparison with BC, the empirical advance of ValueDice seems to contradict the recent lower bound, which indicates BC is (nearly) minimax optimal under the offline setting [Rajaraman et al., 2020, Xu et al., 2021a]. In other words, this theoretical result suggests that <span style="color:red">the worst case performance of BC is optimal under the offline setting</span>.
2. For the online part, it is well accepted that <span style="color:red">optimization of Bellman backup objectives (e.g., temporal-difference learning and Q-learning) with function approximation can easily diverge</span> (see the divergence example in [Baird, 1995, Tsitsiklis and Van Roy, 1997]). To address this divergence issue, target network is proposed in [Mnih et al., 2015] and this technique is widely applied in deep RL [Lillicrap et al., 2016, Fujimoto et al., 2018, Haarnoja et al., 2018]. However, unlike DAC that uses the target network, ValueDice successfully performs off-policy optimization *without* the useful technique target network.

In this blog, we will provide explanations for these ''contradictions'' when we answer the raised research question.

[[click here to go to the top]](#overview)[[click here to go to the reference]](#references)


## Background

In the beginning, you can click the following buttons to obtain basic knowledge about *Markov Decision Process*, *Imitation Learning*, *Behavioral Cloning*, and *ValueDice*. We suggest you still go through these contents quickly even though you are familiar with the covered materials.


<details>
   <summary> Markov Decision Process </summary>

  Following the setup in [Kostrikov et al., 2020], we consider the infinite-horizon Markov decision process (MDP) [Puterman, 2014], which can be described by the tuple $\mathcal{M} = (\mathcal{S}, \mathcal{A}, p, r, p_0, \gamma)$. Here $\mathcal{S}$ and $\mathcal{A}$ are the state and action space, respectively. $p_0(\cdot)$ specifies the initial state distribution while $\gamma \in [0, 1)$ is the discount factor. For a specific state-action pair $(s, a)$, $p(s' \mid s, a)$ defines the transition probability of the next state $s'$ and $r(s, a) \in [0, 1]$ assigns a reward signal.
  <br>  <br>
  To interact with the environment (i.e., an MDP), a stationary policy $\pi: \mathcal{S} \rightarrow \Delta(\mathcal{A})$ is introduced, where $\Delta(\mathcal{A})$ is the set of probability distributions over the action space $\mathcal{A}$. Specifically, $\pi(a \mid s)$ determines the probability of selecting action $a$ at state $s$. The performance of policy $\pi$ is measured by <B>policy value</B> $V(\pi)$, which is defined as the cumulative and discounted rewards. That is,

  $$\begin{align*}
      V(\pi) := \mathbb{E}_{\pi} \left[ \sum_{t=0}^{\infty} \gamma^{t} r(s_t, a_t) \mid s_0 \sim p_0(\cdot), a_t \sim \pi(\cdot|s_t), s_{t+1} \sim p(\cdot|s_t, a_t) \right].
  \end{align*}$$

  To facilitate later analysis, we need to introduce the (discounted) state-action distribution $d^{\pi}(s, a)$:

  $$
  \begin{align*}
      d^{\pi}(s, a) := (1-\gamma) \sum_{t=0}^{\infty} \gamma^{t}\mathbb{P} \left( s_t= s, a_t =a \mid s_0 \sim p_0(\cdot), a_t \sim \pi(\cdot \mid s_t), s_{t+1} \sim p(\cdot \mid s_t, a_t) \right).
  \end{align*}$$

  With a little of notation abuse, we can define the (discounted) state distribution $d^{\pi}(s)$:

  $$\begin{align*}
      d^{\pi}(s) := (1-\gamma) \sum_{t=0}^{\infty} \gamma^{t} \mathbb{P} \left( s_t= s \mid s_0 \sim p_0(\cdot), a_t \sim \pi(\cdot \mid s_t), s_{t+1} \sim p(\cdot \mid s_t, a_t) \right).
  \end{align*}$$

</details>
<details>
  <summary>Imitation Learning</summary>

    The goal of imitation learning is to learn a high-quality policy from expert demonstrations. To this end, we often assume there is a nearly optimal expert policy $\pi^{\operatorname{exp}}$ that could interact with the environment to generate a dataset $\mathcal{D} = \{ (s_i, a_i) \}_{i=1}^{m}$. Then, the learner can use the dataset $\mathcal{D}$ to mimic the expert and to obtain a good policy. The quality of imitation is measured by the <B>policy value gap</B> $V(\pi^{\operatorname{exp}}) - V(\pi)$. The target of imitation learning is to minimize the policy value gap:

    $$\begin{align*}
        \min_{\pi} V(\pi^{\operatorname{exp}}) - V(\pi).
    \end{align*}$$

    Notice that this policy optimization is performed <B>without</B> the reward signal. In this blog, we mainly focus on the case where the expert policy is <I>deterministic</I>, which is true in many applications and is widely used in the literature.
</details>

<details>
  <summary>Behavioral Cloning</summary>

    Given the state-action pairs provided by the expert, Behavioral Cloning (BC) [Pomerleau, 1991] directly learns a policy mapping to minimize the policy value gap. Specifically, BC often trains a parameterized classifier or regressor with the maximum likelihood estimation:
    \begin{align}
    \tag{1}  \label{eq:bc_loss}
        \min_{\theta} \sum_{(s, a) \in \mathcal{D}} -\log \pi_{\theta}(a \mid s),
    \end{align}
    which can be viewed as the minimization of the KL-divergence between the expert policy and the learner's policy [Ke et al., 2019, Ghasemipour et al., 2019, Xu et al., 2020]:
    \begin{align*}
        \min_{\pi} \mathbb{E}_{s \sim d^{\operatorname{exp}}(\cdot)} \left[ D_{\operatorname{KL}} (\pi^{\operatorname{exp}}(\cdot \mid s) || \pi(\cdot|s) ) \right],
    \end{align*}
    where $D_{\operatorname{KL}}(p||q) = \sum_{x \in \mathcal{X}} p(x) \log (p(x)/q(x))$ for two distributions $p$ and $q$ on the common support $\mathcal{X}$.
    <br><br>
    Under the tabular setting where the state space and action space are finite, the optimal solution to objective \eqref{eq:bc_loss} could take in a simple form:
    \begin{align}
    \tag{2} \label{eq:bc_count}
    \pi^{\operatorname{BC}}(a|s) = \left\{ \begin{array}{cc}
     \frac{ \sum_{(s^\prime, a^\prime) \in \mathcal{D}}  \mathbb{I}(s^\prime = s, a^\prime = a)}{\sum_{(s^\prime, a^\prime) \in \mathcal{D}} \mathbb{I}(s^\prime = s)}     & \quad  \text{if} \,\, \sum_{(s^\prime, a^\prime) \in \mathcal{D}} \mathbb{I}(s^\prime = s) > 0 \\
      \frac{1}{|\mathcal{A}|}   &  \quad \text{otherwise}
    \end{array} \right.
    \end{align}
    That is, BC estimates the empirical action distribution of the expert policy on visited states from the expert demonstrations.
</details>


<details>
  <summary>ValueDice</summary>

    With the state-action distribution matching, ValueDice [Kostrikov et al., 2020] implements the objective:
    \begin{align}
    \tag{3}
       \max_{\pi} -D_{\operatorname{KL}} ( d^{\pi} || d^{\operatorname{exp}} ) &:= \mathbb{E}_{(s, a) \sim d^{\pi}} \left[ \log \frac{d^{\operatorname{exp}} (s, a)}{d^{\pi} (s, a)} \right]  \label{eq:state_action_kl_matching_1}  \\
     \tag{4}
        &= \mathbb{E}\left[ \sum_{t=0}^{\infty} \gamma^{t} \log \frac{d^{\operatorname{exp}} (s_t, a_t)}{d^{\pi} (s_t, a_t)} \mid  s_0 \sim p_0(\cdot), a_t \sim \pi(\cdot|s_t), s_{t+1} \sim p(\cdot|s_t, a_t) \right] . \label{eq:state_action_kl_matching_2}
    \end{align}
    That is, \eqref{eq:state_action_kl_matching_2} amounts a max-return RL problem with the reward $\widetilde{r}(s, a) = \log(d^{\operatorname{exp}} (s, a))/ \log (d^{\pi}(s, a))$. In ValueDice, a dual form of \eqref{eq:state_action_kl_matching_2} is presented:
    \begin{align*}
       -D_{\operatorname{KL}} ( d^{\pi} || d^{\operatorname{exp}} ) = \min_{x: \mathcal{S} \times \mathcal{A} \rightarrow \mathbb{R}} \left[ \log \mathbb{E}_{(s, a) \sim d^{\operatorname{exp}}} [e^{x(s, a)}] - \mathbb{E}_{(s, a) \sim d^{\pi}}[x(s, a)] \right].
    \end{align*}
    With the trick of variable change, Kostrikov et al. [2020] derived the following optimization problem:
    \begin{align}
    \tag{5} \label{eq:value_dice_objective}
        \max_{\pi} \min_{\nu: \mathcal{S} \times \mathcal{A} \rightarrow \mathbb{R} } J_{\operatorname{dice}} (\pi, \nu):= \log \left( \mathbb{E}_{(s, a) \sim d^{\operatorname{exp}}}[e^{\nu(s, a) - \mathcal{B}^\pi \nu(s, a)}] \right( - (1-\gamma) \cdot \mathbb{E}_{s_0 \sim p_0(\cdot), a_0 \sim \pi(\cdot|s_0)}[\nu(s_0, a_0)],
    \end{align}
    where $\mathcal{B}^{\pi}\nu(s, a)$ performs one-step Bellman update (with zero reward):
    \begin{align*}
        \mathcal{B}^{\pi}\nu(s, a) = \gamma \mathbb{E}_{s^\prime \sim p(\cdot \mid s, a), a^\prime \sim \pi(\cdot |s^\prime)}\left[ \nu(s^\prime, a^\prime) \right].
    \end{align*}
    As noted in [Kostrikov et al., 2020], objective \eqref{eq:value_dice_objective} only involves the samples from the expert demonstrations to update, which may lack diversity and hamper training. To address this issue, Kostrikov et al. [2020] proposed to use samples from the replay buffer under the online setting. Concretely, an alternative objective is introduced:
    \begin{align*}
        J_{\operatorname{dice}}^{\operatorname{mix}} &:= \log \left( \mathbb{E}_{(s, a) \sim d^{\operatorname{mix}}}[e^{\nu(s, a) - \mathcal{B}^\pi \nu(s, a)}] \right( - (1-\alpha) (1-\gamma) \cdot \mathbb{E}_{s_0 \sim p_0(\cdot), a_0 \sim \pi(\cdot|s_0)}[\nu(s_0, a_0)] \\
        &\quad - \alpha \mathbb{E}_{(s, a) \sim d^{\operatorname{RB}}}\left[ \nu(s, a) - \mathcal{B}^{\pi} \nu(s, a) \right],
    \end{align*}
    where $d^{\operatorname{mix}}(s, a) = (1-\alpha) d^{\operatorname{exp}}(s, a) + \alpha d^{\operatorname{RB}}(s, a)$. Under this case, VauleDice is to perform the modified state-action distribution matching:
    \begin{align*}
       \max_{\pi}\quad  -D_{\operatorname{KL}} ( (1-\alpha) d^{\pi} + \alpha d^{\operatorname{RB}} || (1-\alpha) d^{\operatorname{exp}} + \alpha d^{\operatorname{RB}} ).
    \end{align*}
    As long as $\alpha \in [0, 1)$, the global optimality of $\pi = \pi^{\operatorname{exp}}$ is reserved. In the offline setting, we should set $\alpha = 0$.
</details>


[[click here to go to the top]](#overview)[[click here to go to the reference]](#references)

## Rethink ValueDice Under the Offline Setting

In this section, we revisit ValueDice under the offline setting, where only the expert dataset is provided and environment interaction is not allowed. In this case, the simple algorithm BC can be directly applied while on-policy adversarial imitation learning (AIL) methods cannot. This is because the latter often requires environment interactions to evaluate the state-action distribution $d^{\pi}(s, a)$ to perform optimization.


Under the offline setting, the classical theory suggests that BC suffers the compounding errors issue [Ross et al., 2011, Rajaraman et al., 2020, Xu et al., 2020]. Specifically, once the agent makes a wrong decision (i.e., an imperfect imitation due to finite samples), it may visit an unseen state and make the wrong decision again. In the worst case, such decision errors accumulate over $H$ time steps and the agent could obtain zero reward along such a bad trajectory. This explanation often coincides with the empirical observation that BC performs poorly when expert demonstrations are scarce. Thus, it is definitely interesting and valuable if some algorithms can perform better than BC under the offline setting. Unfortunately, the information-theoretical lower bound [Rajaraman et al., 2020, Xu et al., 2021a] suggests that BC is (nearly) minimax optimal under the offline setting.

> Theorem 1 (Lower Bound [Xu et al., 2021a]) Given expert dataset $\mathcal{D} = \{ (s_i, a_i) \}_{i=1}^m$ which is i.i.d. drawn from $d^{\operatorname{exp}}$, for any offline algorithm $\mathrm{Alg}: \mathcal{D} \rightarrow \widehat{\pi}$, there exists a constant $\delta_0 \in (0, 1/10]$, an MDP $\mathcal{M}$ and a deterministic expert policy $\pi^{\operatorname{exp}}$ such that, for any $\delta \in (0, \delta_0)$, with probability at least $1-\delta$, the policy value gap has a lower bound:

$$\begin{align*}
    V({\pi^{\operatorname{exp}}}) - V({\widehat{\pi}}) \succsim \mathrm{min} \left( \frac{1}{1-\gamma}, \frac{\vert \mathcal{S} \vert}{(1-\gamma)^2 m} \right).
\end{align*}$$


**Remark 1**: We note that the sample complexity of BC is $\widetilde{\mathcal{O}}({ \vert \mathcal{S} \vert } /{((1-\gamma)^2 m)})$ [Xu et al., 2021a], which matches the lower bound up to logarithmic terms. We emphasize that the minimax optimality of BC does not mean that BC is optimal for each task. Instead, it says that the worst case performance of BC is optimal. The worst case performance of offline imitation learning algorithms can be observed on the Reset Cliff MDPs in [Rajaraman et al., 2020, Xu et al., 2021a], which share many similarities with MuJoCo locomotion tasks<sup>[[1]](#1)</sup>. To this end, we can believe that BC is optimal for MuJoCo locomotion tasks under the offline setting.

From the empirical side, we realize that Kostrikov et al. [2020] showed that their proposed algorithm ValueDice could be better than BC on many interesting tasks under the offline setting; see [Kostrikov et al., 2020, Figure 4] or the reproduced results<sup>[[2]](#2)</sup> in the following Figure 1. This manifests a gap between theory and practice. In the sequel, we examine the achievement of ValueDice and explain this gap.

<figure>
<div style="text-align: center;">
<img src="{{ site.url }}/public/images/2022-03-25-rethinking-valuedice/value_dice_reproduce.svg" alt="Missing images"/>
</div>
<figcaption>Figure 1: Comparison of ValueDice and BC under the offline setting with 1 expert trajectory, which reproduces [Kostrikov et al., 2020, Figure 4]. Dashed lines correspond to the performance of expert policies.</figcaption>
</figure>


### Connection Between ValueDice and BC Under Offline Setting

As a first step, let us review the training objective of ValueDice in the offline scenario. For ease of presentation, let us consider the case where the number of expert trajectory is 1, which follows the experimental setting used in Figure 1. As a result, the training objective of ValueDice with $T$ samples is formulated as

$$\begin{align}
\tag{6} \label{eq:value_dice_empirical_surrogate_objective}
   J_{\operatorname{dice}}^{\operatorname{offline}}(\pi, \nu) &:= \log \left( \sum_{t=1}^{T} \left[ e^{\nu(s_t, a_t) - \gamma \mathbb{E}_{\widetilde{a}_{t+1} \sim \pi(\cdot \mid s_{t+1})} [ \nu(s_{t+1}, \widetilde{a}_{t+1}) ] } \right] \right)  - (1-\gamma) \sum_{t=1}^{T} \mathbb{E}_{\widetilde{a}_t \sim \pi (\cdot \mid s_t) }[\nu(s_t, \widetilde{a}_t)],
\end{align}$$

**Remark 2**: Even derived from the principle of state-action distribution matching (i.e., objective \eqref{eq:state_action_kl_matching_1}), under the offline setting, we argue that ValueDice cannot enjoy the benefit of state-action distribution matching. This is because objective \eqref{eq:state_action_kl_matching_1} is performed only on states collected by the expert policy. That is, there is no guidance for policy optimization on non-visited states. This is the main difference between the online setting and offline setting. As a result, we cannot explain the experiment results in Figure 1 by the tailored theory for online state-action distribution matching in [Xu et al., 2021b].

<details>
<summary>Benefits of Online State-Action Distribution Matching (Optional)</summary>

Under the online (or the known transition) setting, state-action distribution matching methods can perform policy optimization on non-visited states. With additional transition information, state-action distribution matching methods could have better sample complexity than BC under mild conditions [Rajaraman et al., 2020]. In some ideal cases, the sample complexity of state-action matching methods is horizon-free [Xu et al., 2021b], which provably beats BC.
</details>


To obtain some intuition about the optimal solutions to the empirical objective \eqref{eq:value_dice_empirical_surrogate_objective}, we can further consider the case where $\gamma = 0$. Note that even this variant could also outperform BC under the offline setting (see Figure 2).

> Theorem 2: Consider the tabular MDPs. If $\gamma = 0$,  objective \eqref{eq:value_dice_empirical_surrogate_objective} reduces to
\begin{align}
\tag{7}  \label{eq:value_dice_empirical_surrogate_objective_gamma_0}
J_{\operatorname{dice}}^{\operatorname{offline}, \gamma=0}(\pi, \nu) &:= \log \left( \sum_{t=1}^{T} e^{\nu(s_t, a_t)} \right) -  \sum_{t=1}^{T} \mathbb{E}_{\widetilde{a}_t \sim \pi (\cdot \mid s_t) }[ \nu(s_t, \widetilde{a}_t)].
\end{align}
Importantly, the BC's solution as in \eqref{eq:bc_count} is also one of the globally optimal solutions for ValueDice's objective in \eqref{eq:value_dice_empirical_surrogate_objective_gamma_0}.

<details>
  <summary>Proof Sketch of Theorem 2</summary>

    For tabular MDPs, each element is independent. As a consequence, for a specific state-action pair $(s_t, a_t)$ appeared in the expert demonstrations, its optimization objective is
    \begin{align*}
      \max_{\pi(\cdot \mid s_t) \in \Delta(\mathcal{A})} \quad \min_{\nu(s_t, a_t) \in \mathbb{R}} \nu(s_t, a_t) + b - \mathbb{E}_{ \widetilde{a}_t \sim \pi (\cdot \mid s_t)}[\nu(s_t, \widetilde{a}_t)],
    \end{align*}
    where $b$ is unrelated to the optimization variable. This optimization problem has equilibrium points when $\pi(a_t|s_t) = 1$ and $\pi(a |s_t) = 0$ for any $a \ne a_t$. To this end, the ''counting'' solution in \eqref{eq:bc_count} for BC is also one of the globally optimal solutions for the empirical objective \eqref{eq:value_dice_empirical_surrogate_objective_gamma_0}. $$\tag*{$\blacksquare$}$$
</details>


<figure>
<div style="text-align: center;">
<img src="{{ site.url }}/public/images/2022-03-25-rethinking-valuedice/value_dice_offline_variant.svg" alt="Missing images"/>
</div>
<figcaption>Figure 2: Comparison of BC and ValueDice's variants (with different discount factors $\gamma$ and orthogonal regularization coefficients $\lambda$) under the offline setting with 1 expert trajectory. The default configuration for ValueDice is $\gamma=0.99$ and $\lambda = 0.0001$. Dashed lines correspond to the performance of expert policies.</figcaption>
</figure>

We remark that Theorem 2 provides a restricted case where ValueDice could degenerate to BC under the offline setting; see the experimental verification in Figure 3. As we have analyzed in Remark 2, the same intuition is expected to hold when $\gamma > 0$ as ValueDice does not have guidance on non-visited states. However, it is technically challenging to draw this conclusion. Instead, we consider another state-action distribution matching method with the $\ell_1$-norm metric. In particular, we claim that this conclusion still holds for tabular MDPs with finite horizons.

<figure>
<div style="text-align: center;">
<img src="{{ site.url }}/public/images/2022-03-25-rethinking-valuedice/bc_loss.svg" alt="Missing images"/>
</div>
<figcaption>Figure 3: Comparison of BC and ValueDice in terms of MSE (i.e., BC’s loss) under the offline setting with 1 expert trajectory. This result suggests that ValueDice is closely related to BC under the offline setting.</figcaption>
</figure>


> Theorem 3: Consider the tabular MDPs with finite horizons. Assume that there is 1 expert trajectory provided. Under the offline setting, we have that BC's solution is the unique globally optimal solution to $\ell_1$-norm based state-action distribution matching (i.e., $\min_{\pi} \Vert d^{\pi} - \widehat{d^{\operatorname{exp}}} \Vert_1 $), where $\widehat{d^{\operatorname{exp}}}$ is the estimated expert state-action distribution from expert demonstrations.


We prove Theorem 3 by induction, which is widely used in the dynamic programming framework [Bertsekas, 2012]; please see the complete proof in the [[arXiv version]](https://arxiv.org/abs/2202.02468). Note that the assumption of 1 expert trajectory is mainly to make the analysis simple and $\ell_1$-norm based state-action distribution matching is to ensure that the objective is well-defined<sup>[[3]](#3)</sup>. Actually, the experiment results in Figure 1 satisfy the assumptions required in Theorem 3. We remark that Theorem 3 establishes a one-to-one connection between BC and ValueDice under the offline setting, which adds a constraint on the optimization procedure (i.e., optimization is defined over visited states). We conjecture that this conclusion holds for other AIL methods. Finally, we note that the one-to-one relationship is not disclosed by Theorem 2.


In summary, we could believe that under the offline setting, AIL methods could not perform optimization on non-visited states. As a result, the BC policy is sufficient to be the globally optimal solution of AIL methods. We highlight that this insight is not illustrated by the lower bound argument [Rajaraman et al., 2020, Xu et al., 2021a], which only tells us that one specific algorithm, BC, is nearly minimax optimal under the offline setting. From another viewpoint, our result also suggests that state-action distribution matching is expected to be a “universal” principle: it is closely related to BC under the offline setting while it enjoys many benefits under the online setting.


### Overfitting of ValueDice and BC

Based on the above conclusion that AIL may reduce to BC under the offline setting, it is still unsettled that why ValueDice outperforms BC in Figure 1. If we look at training curves carefully, we would observe that BC could perform well at the initial learning phase. As the number of iterations increases, the performance of BC tends to degenerate. This is indeed the **overfitting** phenomenon.

To overcome the overfitting in this low-data regime, we can adopt many regularization techniques such as weight decay [Krogh and Hertz, 1991], dropout [Srivastava et al., 2014], and early stopping [Prechelt, 1996]. For simplicity, let us consider the weight decay technique, i.e., adding a squared $\ell_2$-norm penalty for the training parameters to the original training objective. The empirical result is shown in Figure 4. Surprisingly, we can find that even with small weight decay, BC improves its generalization performance and is on-pair with ValueDice.

<figure>
<div style="text-align: center;">
<img src="{{ site.url }}/public/images/2022-03-25-rethinking-valuedice/bc_l2.svg" alt="Missing images"/>
</div>
<figcaption>Figure 4: Comparison of BC with/without weight decay (i.e., $\ell_2$-norm based regularization) with 1 expert trajectory. Dashed lines correspond to the performance of expert policies.</figcaption>
</figure>

The perspective of overfitting motivates us to carefully examine the performance of ValueDice. In particular, we realize that in practice ValueDice uses the orthogonal regularization [Brock et al., 2018], a kind of regularizer from the GAN literature. Without this regularizer, the performance of ValueDice is poor as shown in Figure 2.


> Observation 1: Regularization is important for offline imitation learning algorithms such as BC and ValueDice in the low-data regime.

Up to now, we know that ValueDice degenerates to BC under the offline setting and the experiment results suggest that regularization matters. With a suitable regularization, BC is able to match the expert performance as ValueDice does.


### Discussion: Why BC Performs Well?

One related question about previous experiment results is that **why BC (with regularization) performs so well** (i.e., BC nearly matches the expert performance) even provided with **1 expert trajectory** as in Figure 4. It seems that there are no compounding errors for BC. Furthermore, the presented results seem to contradict the common impression that BC performs poorly but AIL performs well [Ho and Ermon, 2016, Kostrikov et al., 2019]. We discuss this mismatch in this part.


First, the compounding errors argument for BC relies on the assumption that the agent makes a mistake in each time step as in [Ross et al., 2011]. As such, decision errors accumulate over time steps. However, the assumption may not hold for some cases. Considering MDPs with deterministic transitions, the BC’s policy does not make any mistake by starting from a visited initial state. As a consequence, there are no compounding errors along such a “good” trajectory. Formally, the policy value gap of BC is expected to be $\widetilde{\mathcal{O}}( \vert \mathcal{S} \vert H / m )$ under MDPs with deterministic transitions, where $H$ is the finite horizon and $m$ is the number of expert trajectories; see [Xu et al., 2021b].



> Theorem 4 (BC for Deterministic MDPs [Xu et al., 2021b]): Consider the tabular MDPs with finite horizons and deterministic transitions. Given $m$ expert trajectories with length $H$, the policy value gap of BC is upper bounded by:
$$
V(\pi^{\operatorname{exp}}) -  \mathbb{E}[V(\pi^{\operatorname{BC}})] \precsim \left( H, \frac{\vert \mathcal{S} \vert H}{m} \right),
$$
where the expectation is taken over the randomness when collecting the expert dataset and $\pi^{\operatorname{BC}}$ is the ''counting'' solution similar to that in \eqref{eq:bc_count}.

Here the dependence on $\vert \mathcal{S} \vert $ is due to the random initial states. The policy value gap becomes smaller if the initial states are limited. We highlight that this upper bound is tighter than the general one $\widetilde{\mathcal{O}}(\vert \mathcal{S} \vert H^2/m)$, which are derived from MDPs with stochastic transitions [Rajaraman et al., 2020]. The fundamental difference is that stochastic MDPs ensure BC to have a positive probability to make a mistake even by starting from a visited initial state, which leads to the quadratic dependence on $H$. For our purpose, we know that MuJoCo locomotion tasks have (almost) deterministic transition functions and the initial states lie within a small range. Therefore, it is expected that BC (with regularization) performs well as in Figure 4.

> Observation 2: For deterministic tasks (e.g., MuJoCo locomotion tasks), BC has no compounding errors if the provided expert trajectory are complete.

Second, the worse dependence on the planning horizon for BC is observed based on subsampled trajectories in [Ho and Ermon, 2016, Kostrikov et al., 2019]. More concretely, they sample non-consecutive transition tuples from a complete trajectory as the expert demonstrations. This is different from our experiment setting, in which we use complete trajectories. It is obvious that subsampled trajectories artificially “mask” some states. As a result, BC is not ensured to match the expert trajectory even when the transition function is deterministic and the initial state is unique. This explains why BC performs poorly as in [Ho and Ermon, 2016, Kostrikov et al., 2019]. We note that this subsampling operation turns out minor for AIL methods (see the explanation in [Xu et al., 2021b]).

[[click here to go to the top]](#overview)[[click here to go to the reference]](#references)


## Rethink ValueDice Under the Online Setting

In this section, we consider the online setting, where the agent is allowed to interact with the environment. In particular, it is empirically shown that ValueDice outperforms another off-policy AIL algorithm DAC [Kostrikov et al., 2019] in terms of environment interactions; see [Kostrikov et al., 2020, Figure 2] or the reproduced results in the following Figure 5. More surprisingly, ValueDice successfully performs policy optimization without the useful technique target network. This contradicts the common sense that optimization of Bellman backup objectives (e.g., temporal difference learning and Q-learning) with function approximation can easily diverge (see the divergence example in [Baird, 1995, Tsitsiklis and Van Roy, 1997]). To address this divergence issue, target network is proposed in [Mnih et al., 2015] and this technique is widely applied in deep RL [Lillicrap et al., 2016, Fujimoto et al., 2018, Haarnoja et al., 2018]; see [Lee and He, 2019, Zhang et al., 2021, Agarwal et al., 2021, Chen et al., 2022, Li et al., 2022] for the explanation about why the target network can address the divergence issue.

<figure>
<div style="text-align: center;">
<img src="{{ site.url }}/public/images/2022-03-25-rethinking-valuedice/online_complete.svg" alt="Missing images"/>
</div>
<figcaption>Figure 5: Comparison of ValueDice and DAC under the online setting with 1 complete expert trajectory, which reproduces [Kostrikov et al., 2020, Figure 2]. Dashed lines correspond to the performance of expert policies.</figcaption>
</figure>

We realize that the result in [Kostrikov et al., 2020, Figure 2] is based on the setting where complete expert trajectories are provided. In this case, we have known that ValueDice could degenerate to BC, and BC (with regularization) performs well. Furthermore, by comparing learning curves in Figure 1 (offline) and Figure 5 (online), we find that the online interaction does not matter for ValueDice. This helps confirm that the reduction is crucial for ValueDice. Thus, we know the reason why ValueDice does not diverge in this case is that there is no divergence issue for BC.

Now, how about the case where expert trajectories are incomplete/subsampled? That is, the expert state-action pairs are no longer temporally consecutive, which is common in practice. The corresponding results are missing in [Kostrikov et al., 2020] and we provide such results in the following Figure 6. In particular, we see that ValueDice fails but DAC still works.

<figure>
<div style="text-align: center;">
<img src="{{ site.url }}/public/images/2022-03-25-rethinking-valuedice/online_subsample.svg" alt="Missing images"/>
</div>
<figcaption>Figure 6: Comparison of ValueDice and DAC under the online setting with 10 subsampled expert trajectories (the subsampling rate is 20). Dashed lines correspond to the performance of expert policies.</figcaption>
</figure>

> Observation 3. For MuJoCo locomotion tasks, ValueDice performs well in the complete trajectory case while it does not perform well in the subsampled case even though it can interact with the environment.

Since ValueDice and DAC use the same principle (i.e., state-action distribution matching), we believe that the poor performance of ValueDice in Figure 6 is mainly caused by optimization issues. In terms of optimization, one major difference between ValueDice and DAC is that DAC uses the target network technique while ValueDice does not. As mentioned, without a target network, optimization of Bellman backup objectives with function approximation can easily diverge. Note that the divergence issue discussed here does not contradict the good results in Figure 4 and Figure 5 because in that case, ValueDice is closely related to BC that performs well.

In summary, our experiment results support the claim that ValueDice cannot succeed to perform policy optimization with function approximation under the subsampled cases. Moreover, our results suggest that the mentioned success of ValueDice may rely on its connection to BC.

[[click here to go to the top]](#overview)[[click here to go to the reference]](#references)


## Conclusion


In this manuscript, we rethink the algorithm designs in ValueDice and promote new conclusions under both offline and online settings. We clarify that our results do not indicate that ValueDice is ''weaker'' than BC or ValueDice does not show any algorithmic insights. Instead, our studies highlight the connection between adversarial imitation learning algorithms (including ValueDice) and BC under the offline setting, point out the instability of Dice-based technique under the certain scenarios, and clarify some confusing results in the literature. We notice that the ideas from ValueDICE are still valuable, which can be extended to other imitation learning and offline reinforcement learning algorithms. Perhaps, some conclusions in this manuscript could provide insights to examine the algorithmic advances and understand the reported results in the related works such as SoftDice [Sun et al., 2021], OptDice [Lee et al., 2021], SmoDice [Ma et al., 2022], and DemoDice [Kim et al., 2022].

For the general imitation learning studies, our work has the following implications.

- **Algorithm Evaluations:** Our experiment results show <span style="color:red">a clear boundary between the complete trajectory and subsampled trajectory cases</span>. Two cases have dramatically different characteristics, results and explanations. As a result, we must be cautious to evaluate algorithms by identifying the context. Without this, some arguments may be misleading for future studies.

- **Benchmarks:** Our study points out several <span style="color:red">drawbacks of existing MuJoCo benchmarks: deterministic transitions and limited initial states</span>. For one thing, provided 1 complete expert trajectory, simple algorithm BC is competent for many tasks. That is, current tasks are not even ''hard''.  For another thing, in addition to large-scale studies in [Hussenot et al., 2021, Orsini et al., 2021] that mainly focus on existing MuJoCo benchmarks, future imitation learning studies could benefit from more challenging benchmarks with stochastic transitions and diverse initial states.

[[click here to go to the top]](#overview)

## Acknowledgements and Disclosure of Funding

We thank anonymous reviewers for the helpful comments. The work of Yang Yu is supported by National Key R&D Program of China National Key Research and Development Program of China (2020AAA0107200), NSFC(61876077), and Collaborative Innovation Center of Novel Software Technology and Industrialization. The work of Zhi-Quan Luo is supported by the National Natural Science Foundation of China (No. 61731018) and the Guangdong Provincial Key Laboratory of Big Data Computation Theories and Methods.

---

## References
<details>
  <summary>References</summary>

    <ul>
    <li> P. Abbeel and A. Y. Ng. Apprenticeship learning via inverse reinforcement learning. In Proceedings of the 21st International Conference on Machine Learning, pages 1–8, 2004. </li>

    <li> N. Agarwal, S. Chaudhuri, P. Jain, D. Nagaraj, and P. Netrapalli. Online target q-learning with reverse experience replay: Efficiently finding the optimal policy for linear mdps. arXiv, 2110.08440, 2021. </li>

    <li> B. D. Argall, S. Chernova, M. Veloso, and B. Browning. A survey of robot learning from demonstration. Robotics and autonomous systems, 57(5):469–483, 2009. </li>

    <li>  L. Baird. Residual algorithms: Reinforcement learning with function approximation. In Proceedings of the 12th International Conference on Machine Learning, pages 30–37. 1995. </li>

    <li> D. Bertsekas. Dynamic Programming and Optimal Control: Volume I. Athena scientific, 2012. </li>

    <li>  A. Brock, J. Donahue, and K. Simonyan. Large scale gan training for high fidelity natural image synthesis. arXiv, 1809.11096, 2018. </li>

    <li>  X. Chen, S. Li, H. Li, S. Jiang, Y. Qi, and L. Song. Generative adversarial user model for reinforcement learning based recommendation system. In Proceedings of the 36th International Conference on Machine Learning, pages 1052–1061, 2019. </li>

    <li> Z. Chen, J. P. Clarke, and S. T. Maguluri. Target network and truncation overcome the deadly triad in $q$-learning. arXiv, 2203.02628, 2022. </li>

    <li>  C. Finn, S. Levine, and P. Abbeel. Guided cost learning: deep inverse optimal control via policy optimization. In Proceedings of the 33rd International Conference on Machine Learning, pages 49–58, 2016. </li>

    <li> S. Fujimoto, H. van Hoof, and D. Meger. Addressing function approximation error in actor-critic methods. In J. G. Dy and A. Krause, editors, Proceedings of the 35th International Conference on Machine Learning, pages 1582–1591, 2018. </li>

    <li>  S. K. S. Ghasemipour, R. S. Zemel, and S. Gu. A divergence minimization perspective on imitation learning methods. In Proceedings of the 3rd Annual Conference on Robot Learning, pages 1259–1277, 2019. </li>

    <li>  J. Ho and S. Ermon. Generative adversarial imitation learning. In Advances in Neural Information Processing Systems 29, pages 4565–4573, 2016. </li>

    <li>  A. Hussein, M. M. Gaber, E. Elyan, and C. Jayne. Imitation learning: A survey of learning methods. ACM Computing Surveys, 50(2):1–35, 2017. </li>

    <li>  L. Hussenot, M. Andrychowicz, D. Vincent, R. Dadashi, A. Raichuk, S. Ramos, N. Momchev, S. Girgin, R. Marinier, L. Stafiniak, M. Orsini, O. Bachem, M. Geist, and O. Pietquin. Hyperparameter selection for imitation learning. In Proceedings of the 38th International Conference on Machine Learning, pages 4511–4522, 2021. </li>

    <li> L. Ke, M. Barnes, W. Sun, G. Lee, S. Choudhury, and S. S. Srinivasa. Imitation learning as f-divergence minimization. arXiv, 1905.12888, 2019. </li>

    <li> G.-H. Kim, S. Seo, J. Lee, W. Jeon, H. Hwang, H. Yang, and K.-E. Kim. Demodice: Offline imitation learning with supplementary imperfect demonstrations. In Proceedings of the 10th International Conference on Learning Representations, 2022. </li>

    <li> I. Kostrikov, K. K. Agrawal, D. Dwibedi, S. Levine, and J. Tompson. Discriminator-actor-critic: Addressing sample inefficiency and reward bias in adversarial imitation learning. In Proceedings of the 7th International Conference on Learning Representations, 2019. </li>

    <li> I. Kostrikov, O. Nachum, and J. Tompson. Imitation learning via off-policy distribution matching. In Proceedings of the 8th International Conference on Learning Representations, 2020. </li>

    <li> A. Krogh and J. A. Hertz. A simple weight decay can improve generalization. In Advances in Neural Information Processing Systems 4, pages 950–957, 1991. </li>

    <li> D. Lee and N. He. Target-based temporal-difference learning. In Proceedings of the 36th International Conference on Machine Learning, pages 3713–3722, 2019. </li>

    <li> J. Lee, W. Jeon, B. Lee, J. Pineau, and K. Kim. Optidice: Offline policy optimization via stationary distribution correction estimation. In Proceedings of the 38th International Conference on Machine Learning, pages 6120–6130, 2021. </li>

    <li> S. Levine, C. Finn, T. Darrell, and P. Abbeel. End-to-end training of deep visuomotor policies. Journal of Machine Learning Research, 17(39):1–40, 2016. </li>

    <li> Z. Li, T. Xu, and Y. Yu. A note on target q-learning for solving finite mdps with a generative oracle. arXiv, 2203.11489, 2022. </li>

    <li> T. P. Lillicrap, J. J. Hunt, A. Pritzel, N. Heess, T. Erez, Y. Tassa, D. Silver, and D. Wierstra. Continuous control with deep reinforcement learning. In Proceedings of the 4th International Conference on Learning Representations, 2016. </li>

    <li> Y. J. Ma, A. Shen, D. Jayaraman, and O. Bastani. Smodice: Versatile offline imitation learning via state occupancy matching. arXiv preprint arXiv:2202.02433, 2022. </li>

    <li> V. Mnih, K. Kavukcuoglu, D. Silver, A. A. Rusu, J. Veness, M. G. Bellemare, A. Graves, M. Riedmiller, A. K. Fidjeland, G. Ostrovski, et al. Human-level control through deep reinforcement learning. Nature, 518(7540):529–533, 2015. </li>

    <li> M. Orsini, A. Raichuk, L. Hussenot, D. Vincent, R. Dadashi, S. Girgin, M. Geist, O. Bachem, O. Pietquin, and M. Andrychowicz. What matters for adversarial imitation learning? Advances in Neural Information Processing Systems 34, 2021. </li>

    <li> T. Osa, J. Pajarinen, G. Neumann, J. A. Bagnell, P. Abbeel, and J. Peters. An algorithmic perspective on imitation learning. Foundations and Trends in Robotic, 7(1-2):1–179, 2018. </li>

    <li> D. Pomerleau. Efficient training of artificial neural networks for autonomous navigation. Neural Computation, 3(1):88–97, 1991. </li>

    <li> L. Prechelt. Early stopping-but when? In Neural Networks: Tricks of the Trade, volume 1524 of Lecture Notes in Computer Science, pages 55–69. 1996. </li>

    <li> M. L. Puterman. Markov Decision Processes: Discrete Stochastic Dynamic Programming. John Wiley & Sons, 2014. </li>

    <li> N. Rajaraman, L. F. Yang, J. Jiao, and K. Ramchandran. Toward the fundamental limits of imitation learning. In Advances in Neural Information Processing Systems 33, pages 2914–2924, 2020. </li>

    <li> N. Rajaraman, Y. Han, L. Yang, J. Liu, J. Jiao, and K. Ramchandran. On the value of interaction and function approximation in imitation learning. Advances in Neural Information Processing Systems 34, 2021a. </li>

    <li> N. Rajaraman, Y. Han, L. F. Yang, K. Ramchandran, and J. Jiao. Provably breaking the quadratic error compounding barrier in imitation learning, optimally. arXiv, 2102.12948, 2021b. </li>

    <li> S. Ross and D. Bagnell. Efficient reductions for imitation learning. In Proceedings of the 13rd International Conference on Artificial Intelligence and Statistics, pages 661–668, 2010. </li>

    <li> S. Ross, G. J. Gordon, and D. Bagnell. A reduction of imitation learning and structured prediction to no-regret online learning. In Proceedings of the 14th International Conference on Artificial Intelligence and Statistics, pages 627–635, 2011. </li>

    <li> J. Shi, Y. Yu, Q. Da, S. Chen, and A. Zeng. Virtual-taobao: virtualizing real-world online retail environment for reinforcement learning. In Proceedings of the 33rd AAAI Conference on Artificial Intelligence, pages 4902–4909, 2019. </li>

    <li> D. Silver, A. Huang, C. J. Maddison, A. Guez, L. Sifre, G. Van Den Driessche, J. Schrittwieser, I. Antonoglou, V. Panneershelvam, M. Lanctot, et al. Mastering the game of go with deep neural networks and tree search. Nature, 529(7587):484–489, 2016. </li>

    <li> N. Srivastava, G. E. Hinton, A. Krizhevsky, I. Sutskever, and R. Salakhutdinov. Dropout: a simple way to prevent neural networks from overfitting. Journal of Machine Learning Research, 15(1):1929–1958, 2014. </li>

    <li> M. Sun, A. Mahajan, K. Hofmann, and S. Whiteson. Softdice for imitation learning: Rethinking off-policy distribution matching. arXiv, 2106.03155, 2021. </li>

    <li> U. Syed and R. E. Schapire. A game-theoretic approach to apprenticeship learning. In Advances in Neural Information Processing Systems 20, pages 1449–1456, 2007. </li>

    <li> J. N. Tsitsiklis and B. Van Roy. An analysis of temporal-difference learning with function approximation. IEEE transactions on automatic control, 42(5):674–690, 1997. </li>

    <li> T. Xu, Z. Li, and Y. Yu. Error bounds of imitating policies and environments. In Advances in Neural Information Processing Systems 33, pages 15737–15749, 2020. </li>

    <li> T. Xu, Z. Li, and Y. Yu. Error bounds of imitating policies and environments for reinforcement learning. IEEE Transactions on Pattern Analysis and Machine Intelligence, 2021a. </li>

    <li> T. Xu, Z. Li, and Y. Yu. On generalization of adversarial imitation learning and beyond. arXiv, 2106.10424, 2021b. </li>

    <li> S. Zhang, H. Yao, and S. Whiteson. Breaking the deadly triad with a target network. In Proceedings of the 38th International Conference on Machine Learning, pages 12621–12631, 2021. </li>

    </ul>

</details>

[[click here to go to the top]](#overview)

---


## Footnotes

<span id="1">Footnote 1: The similarity between offline lower bound instances and MuJoCo locomotion tasks is explained as follows. Both tasks involve a bad absorbing state: once the agent takes a wrong action, it goes to this bad absorbing state and obtains a zero reward forever.

[[go back to Footnote 1]](#rethink-valuedice-under-the-offline-setting)

<span id="2">Footnote 2: Our implementation of BC is different from the one in [Kostrikov et al., 2020]. In particular, our BC policy is deterministic and does not learn the covariance, while the BC policy in [Kostrikov et al., 2020] is stochastic. We note that although we may learn a stochastic policy, it is important for the evaluation performance to output a deterministic action (i.e., the mean) [Ho and Ermon, 2016, Haarnoja et al., 2018]. In fact, we observe that learning a stochastic policy by sharing the hidden layers really hurts the performance of BC. Nevertheless, we would like to clarify that the implementation of BC in [Kostrikov et al., 2020] aims for a “fair” comparison because ValueDice uses a stochastic policy.

[[go back to Footnote 2]](#rethink-valuedice-under-the-offline-setting)

<span id="3">Footnote 3: In contrast, the KL-divergence used in ValueDice is not well-defined for some state-action pair $(s, a)$ with $d^{\pi}(s, a) = 0$ but $d^{\operatorname{exp}}(s, a) > 0$.

[[go back to Footnote 3]](#connection-between-valuedice-and-bc-under-offline-setting)

---

## Experiment Details

<details>

<summary> Experiment Details</summary>

    <B> Algorithm Implementation:</B> Our implementation of ValueDice and DAC follows the public repository <a href="https://github.com/google-research/google-research/tree/master/value_dice" target="_blank">https://github.com/google-research/google-research/tree/master/value_dice</a> by Kostrikov et al. [2020]. Our implementation of BC is different from the one in this repository. In particular, Kostrikov et al. [2020] implemented BC with a Gaussian policy with trainable mean and covariance as in [Kostrikov et al., 2020, Figure 4]. However, we observe that the performance of this implementation is very poor because the mean and covariance share the same hidden layers and the covariance affects the log-likelihood estimation. Instead, we use a simple MLP architecture without the output of the covariance. This deterministic policy is trained with mean-square-error (MSE):
    \begin{align*}
       \min_{\theta} \sum_{(s, a) \sim \mathcal{D}} (f_{\theta}(s) - a)^2.
    \end{align*}
    The hidden layer size and optimizer of our BC policy follow the configuration for ValueDice.

    <br><br>

    <B> Benchmarks:</B> All preprocessing procedures follow [Kostrikov et al., 2020]. The subsampling procedure follows [Kostrikov et al., 2019]; please refer to <a href="https://github.com/google-research/google-research/blob/master/dac/replay_buffer.py#L154-L177" target="_blank">https://github.com/google-research/google-research/blob/master/dac/replay_buffer.py#L154-L177</a>. The expert demonstrations are from <a href="https://github.com/google-research/google-research/tree/master/value_dice#install-dependencies" target="_blank">https://github.com/google-research/google-research/tree/master/value_dice#install-dependencies</a>.

    <br><br>

    <B> Experiments: </B> All algorithms are run with 5 random seeds (2021-2025). For all plots, solid lines correspond to the mean, and shaded regions correspond to the standard deviation.

</details>


[[click here to go to the top]](#overview)
