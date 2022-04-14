---
layout: post
title: Representation Change in Model-Agnostic Meta-Learning
authors: Goerttler, Thomas (TU Berlin); Müller, Luis (TU Berlin); Obermayer, Klaus (TU Berlin)
tags: [meta-learning, maml, representation change, representation reuse, domain adaptation, cross-domain]  # This should be the relevant areas related to your blog post
---


Last year, an exciting adaptation of one of the most popular optimization-based meta-learning approaches, model-agnostic meta-learning (MAML) [[Finn et al., 2017]](#Finn), was proposed in 
<p></p>
<span>&nbsp;&nbsp;&nbsp;&#9654;&nbsp;&nbsp;</span>Jaehoon Oh, Hyungjun Yoo, ChangHwan Kim, Se-Young Yun (ICLR, 2021) [BOIL: Towards Representation Change for Few-shot Learning](#Oh)
<p></p>
The authors adapt MAML by freezing the last layer to force *body only inner learning* (BOIL). Interestingly, this is complementary to ANIL (almost no inner loop) proposed in
<p></p>
<span>&nbsp;&nbsp;&nbsp;&#9654;&nbsp;&nbsp;</span>Aniruddh Raghu, Maithra Raghu, Samy Bengio, Oriol Vinyals (ICLR, 2020) [Rapid Learning or Feature Reuse? Towards Understanding the Effectiveness of MAML](#Raghu)
<p></p>
Both papers attempt to **understand the success** of MAML and **improve** it.
[Oh et al. [2021]](#Oh) compare BOIL, ANIL, and MAML and show that both improve the performance of MAML. Albeit, BOIL outperforms ANIL, especially when the task distribution varies between training and testing.


## MAML

Before studying BOIL and ANIL, it is worth recalling how MAML works, as it forms the basis of both algorithms. MAML learns an initialization using second-order methods across tasks from the same distribution. The optimization is done in two nested loops (bi-level optimization), with meta-optimization happening in the outer loop. The entire optimization objective can be expressed as:

$$
\begin{equation}\label{equ:outer}
\theta^* := \underset{\theta \in \Theta}{\mathrm{argmin}} \frac{1}{M} \sum_{i=1}^M \mathcal{L}(in(\theta, \mathcal{D}_i^{tr}), \mathcal{D}_i^{test}),
\end{equation}
$$

where $M$ describes the number of tasks in a batch, and $\mathcal{D}_i^{tr}$ and $\mathcal{D}_i^{test}$ are the training and test set of the task $i$. The function $\mathcal{L}$ describes the task loss and the function $in(\theta, \mathcal{D}_i^{tr})$ represents the inner loop. For every task $i$ in a batch, the neural network is initialized with $\theta$. In the inner loop, this value is optimized for one or a few training steps of gradient descent on the training set $\mathcal{D}_i^{tr}$ to obtain fine-tuned task parameters $\phi_i$. Taking only one training step in the inner loop, for example, the task parameters correspond to

$$
\begin{equation}
\phi_i \equiv in(\theta, \mathcal{D}_i^{tr}) = \theta - \alpha  \nabla_{\theta} \mathcal{L}(\theta, \mathcal{D}_i^{tr}).
\end{equation}
$$

The meta-parameters $\theta$ are now updated with respect to the average loss of each tasks' fine-tuned parameters $\phi_i$ on test set $\mathcal{D}_i^{test}$.
Thus, MAML optimizes with respect to the loss after fine-tuning, having far superior performance to simple pre-training, as is outlined in the original publication.
Many different adaptations to MAML improve learning speed or performance and solve various new tasks and task distributions.
A deeper introduction and an interactive comparison of some variants can be found in [Müller et al. [2021]](#Mueller).

##  Freezing layers

In the standard version of MAML and most of its variants, all parameters of the meta-optimized model are updated in the inner loop when applied on a few-shot learning task. However, [Raghu et al. [2020]](#Raghu) have discovered that during fine-tuning in the inner loop, representations of the body (convolutional layers before the fully-connected head) of the network hardly change (see the section of [representation similarity analysis](#representation-similarity-analysis)). Therefore, the authors propose to skip updating the network body altogether, saving a significant amount of time, as now the expensive second-order updates are only required for the network head. Additionally, they observe regularization effects that further improve the model's performance. The authors' empirical results confirm a slight increase in performance while achieving an optimization speed by a factor of $1.7$ during training and $4.1$ during inference.
They conclude that MAML is **rather reusing the features than learning them rapidly**. Here, the reuse of features is attributed to layers whose performance does not rely on a change of representation in the inner loop (which, according to the authors, goes along with small changes in the layers' weights). Rapid learning can therefore be found only in the head, where a lot of change happens during fine-tuning.

<div style="float: right; margin-left: 25px; margin-bottom: 25px; max-width: 600px; width:100%">
{% include 2022-03-25-representation-change-in-model-agnostic-meta-learning/intro_pic.html %}  
</div>

In addition, the authors of ANIL propose an algorithm where the meta-learned head is dropped entirely. The unlabeled data of the test task is classified by comparing the distance of its representations after the penultimate layer to the unlabeled ones. They call it NIL (no inter loop), showing at least comparable performance.


Instead of simplifying the fine-tuning for MAML, [Oh et al. [2021]](#Oh) come up with a complementary idea. If MAML does not change the representations in the first part of the network, why not freeze the last layer and hence, force the network to update the first part in order to fulfill the few-shot learning task. 

The differences in learning can be seen on the right-side figure. The points describe the representations after the feature extractor (in the images tasks, this usually is the convolutional part), and the two lines depict the (linear) classifier.
MAML hardly updates the representation, but the classifier changes clearly. ANIL only changes the linear classifier, whereas BOIL changes only the representations.

For reasons of clarity, [Oh et al. [2021]](#Oh) re-express feature reuse as representation reuse and rapid learning as representation change. In the following, we will also use these re-expressed terms. In addition, they claim that **representation change is necessary to solve cross-domain tasks** and 

> BOIL is closer to the ultimate goal of meta-learning, which is a domain-agnostic adaptation.

The authors of BOIL verify their claims via the experiments discussed in the next section.


## Experiments

[Oh et al. [2021]](#Oh) compare the performance of both ANIL and BOIL with MAML. For the results reported in the figure below, the 4-conv network with 64 channels from [Vinyals et al. [2016]](#Vinyals) is applied to multiple datasets.
For most of the datasets, BOIL outperforms MAML and ANIL significantly. This holds for few-shot learning tasks based on coarse-grained datasets and fine-grained datasets.
In addition, experiments are performed where the meta-train tasks are not coming from the same distribution mixing more general datasets with specific ones. In the classical case of transfer learning to use a trained model on general data for specific data, BOIL outperforms the other methods significantly.

All in all, we observe that BOIL significantly outperforms ANIL and MAML in most cases, and ANIL mostly outperforms MAML. But to answer whether representation change or reuse is dominant, we believe that focussing only on the predictive performance is insufficient.

{% include 2022-03-25-representation-change-in-model-agnostic-meta-learning/performances.html %}  

## Representation Similarity Analysis

Both the authors of ANIL and BOIL use representation similarity analysis to justify their hypotheses, specifically to claim representation change or representation reuse for different layers. We want to extend this discussion and reason about the similarity analysis results.
Representation similarity analysis is applied in both ANIL and BOIL on query sets with 5 classes and 15 images from the miniImageNet dataset.

### Center Kernel Alignment

After applying centered kernel alignment (CKA) [[Kornblith et al., 2019]](#Kornblith) on the representation of MAML before and after the inner loop updates, it can be observed that the similarity in the last layer of the model changes a lot during fine-tuning. In contrast, all of the other layers change only barely.
Since the assignment of the labels in few-show learning is typically entirely random, the large change in the head is not surprising. Looking at how tasks are generated, we know that there could be two tasks with exactly the same data but a different order of the labels.

<div style="float: left; margin-right: 25px; margin-bottom: 25px; max-width: 350px; width:100%">
{% include 2022-03-25-representation-change-in-model-agnostic-meta-learning/cka.html %}
</div>

Referring the data to the correct one-hot encoded neuron is connected with a large change in similarity.
Interestingly, it seems that almost all task-specific adaptation happens in the last layer, as we have seen with ANIL.
However, it might also be the case that the data from the distributions studied in MAML and ANIL are simply too similar. Results from [Oh et al. [2021]](#Oh) could hint at this, as in cross-domain tasks, MAML and ANIL are not performing well.
In addition, it has been shown that already, during training of the meta-optimization, the change in similarity is a magnitude smaller in earlier layers than in later ones [[Goerttler & Obermayer, 2021]](#Goerttler). This can even be observed in classical machine learning, e.g., when applying a convolution network on MNIST.

Looking at the results of CKA on BOIL, we observe that there is more change in the representation of convolution layer 4. However, the fine-tuned representation of earlier layers remains similar to their representation before adaptation, showing similar behavior to MAML. This raised the question by one of the [reviewers](https://openreview.net/forum?id=umIdUL8rMH) whether the penultimate layer simply replaces the linear layer rather than meaningfully adapting to new features. The authors respond to this, saying that *the penultimate layer of BOIL acts as a non-linear transformation* of features into the fixed linear decision boundaries of the head.

### Cosine Similarity

<div style="float: right; margin-left: 25px; margin-bottom: 25px;  max-width: 600px; width:100%">
{% include 2022-03-25-representation-change-in-model-agnostic-meta-learning/cosine_similarity.html %}
</div>

In addition to CKA, the authors of BOIL explore the layer-wise alteration of the representation with the cosine similarities of the four convolution modules. They compare all the similarities between the samples with the same class (intra-class) and samples with a different class (inter-class). The results can be seen on the right side.

We observe that the similarity does not change for MAML and ANIL. In addition, their pattern is similar, and both hint at *representation reuse*. Their pattern - monotonically decreasing to make the representations separable - does not change during fine-tuning. The intra-class similarity is higher than the intra-class similarity, hinting at a separated representation. Hence, MAML's and ANIL's effectiveness depends on the meta-initialized body and not on task-specific adaptation.

BOILs pattern is different. It only decreases until convolutional block three. Also, the intra-class and inter-class similarities are not significantly different. Therefore, the representations resulting from the meta-initialized body cannot be classified. However, the inter-class cosine similarities have decreased after fine-tuning the model. After adaptation, the representations can be classified (and, as we know, even from a not fine-tuned head).

Although the similarity of convolutional blocks one to three do not change, the authors justify this with a general peculiarity of the convolutional body [[Oh et al., 2021]](#Oh). As the gradient norms in convolution modules one to three are also higher than in MAML and ANIL, they conclude that the *representation reuse* is lower.

## Discussion

MAML is a great meta-learning algorithm and very flexible due to its bi-level optimization setup. However, it is sometimes criticized that it does not actually *learn to learn* (this term is often used interchangeably with meta-learning) but only learns a good average across similar tasks. (A)NIL supports this argument by showing equivalent performance without inner loops for the network body on established few-shot learning benchmarks.
On the other hand, BOIL demonstrates the fact that layers earlier than the head *can* significantly adapt to tasks, despite the fact that this is only possible when freezing the head entirely. 
Albeit, we think that the most important factor leading to the present observations is related to the few-shot learning setup and a lack of task diversity. We hope that in the future other, more difficult few-shot tasks will also become popular, where the samples of the distribution of tasks are more dissimilar, e.g., the Meta-Dataset [[Triantafillou et al., 2020]](#Triantafillou).

As a result of the methods presented above, we can conclude that the MAML objective is able to enforce *representation change* on earlier layers but has a natural tendency to focus most of the fine-tuning adaptation on the head *if* the head is available for adaptation in the inner loop. This tendency becomes evident again throughout BOIL, where representation change in the earlier layers persists.
We doubt that the current state of experiments suffices to determine whether this is due to algorithmic or architectural design or whether task distributions are possibly not yet diverse enough to make network-wide representation change necessary. We note that, while general representation change might be desirable in the context of domain adaptation, using the MAML update scheme also comes with a high computational cost. However, it has become evident that the currently established benchmarks such as *miniImageNet* might not make representation change necessary in all layers. The performance increase that BOIL achieved might indicate the superiority of representation change in the long run.
We believe that performance increase, together with the fact that BOIL is the first successful application of *representation change* in the context of MAML, makes the algorithm a very important contribution to the future application and understanding of MAML.
It particularly provides an argument to prefer a high amount of representation change in a convolutional layer instead of in the head.
## References

<a name="Finn" href="http://proceedings.mlr.press/v70/finn17a.html">Chelsea Finn, Pieter Abbeel, Sergey Levine. Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks. ICML, 2017.</a>

<a name="Goerttler" href="https://arxiv.org/pdf/2105.05757.pdf">Thomas Goerttler, Klaus Obermayer. Exploring the Similarity of Representations in Model-Agnostic Meta-Learning. Learning2Learn at ICLR, 2021.</a>

<a name="Kornblith" href="http://proceedings.mlr.press/v97/kornblith19a/kornblith19a.pdf">Simon Kornblith, Mohammad Norouzi, Honglak Lee, Geoffrey Hinton. Similarity of neural network representations revisited. ICML 2019.
</a>

<a name="Mueller" href="https://interactive-maml.github.io/">Luis Müller, Max Ploner, Thomas Goerttler, Klaus Obermayer. An Interactive Introduction to Model-Agnostic Meta-Learning. Visualization for AI Explainability at IEEE VIS, 2019.
</a>


<a name="Oh" href="https://openreview.net/forum?id=umIdUL8rMH">Jaehoon Oh, Hyungjun Yoo, ChangHwan Kim, Se-Young Yu. BOIL: Towards Representation Change for Few-shot Learning. ICLR, 2021.</a>

<a name="Raghu" href="https://openreview.net/forum?id=rkgMkCEtPB">Aniruddh Raghu, Maithra Raghu, Samy Bengio, Oriol Vinyals. Rapid Learning or Feature Reuse? Towards Understanding the Effectiveness of MAML. ICLR, 2020.</a>

<a name="Triantafillou" href="https://papers.nips.cc/paper/2016/file/90e1357833654983612fb05e3ec9148c-Paper.pdf">Eleni Triantafillou, Tyler Zhu, Vincent Dumoulin, Pascal Lamblin, Utku Evci, Kelvin Xu, Ross Goroshin, Carles Gelada, Kevin Swersky, Pierre-Antoine Manzagol, Hugo Larochelle. Meta-Dataset: A Dataset of Datasets for Learning to Learn from Few Examples. ICLR, 2020.
</a>


<a name="Vinyals" href="https://papers.nips.cc/paper/2016/file/90e1357833654983612fb05e3ec9148c-Paper.pdf">Oriol Vinyals, Charles Blundell, Timothy Lillicrap, Daan Wierstra. Matching networks for one shot learning. NeurIPS, 2016.
</a>

