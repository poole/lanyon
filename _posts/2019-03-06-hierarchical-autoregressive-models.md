---
title:  "Hierarchical autoregressive image models with auxiliary decoders"
date:   2019-03-06 12:00:00
//author: Jeffrey De Fauw
categories: hierarchical generative autoregressive image
permalink: hierarchical-autoregressive-models
---

{% include image.html img="/images/2019_hierarchical_autoregressive_image/samples_frontpage_256x256.png" title="256x256 class-conditional samples from our model." caption="256x256 class-conditional samples from our model."  url="/images/2019_hierarchical_autoregressive_image/samples_frontpage_256x256.png" %}
 
We hierarchically stack discrete autoencoders to allow likelihood models to capture long-range structure in images. This allows us to generate realistic images at 128x128 and 256x256 with autoregressive models, which had not been shown before!  
[**arXiv**](https://arxiv.org/abs/1903.04933){:target="_blank"}   
[**Samples for all classes of ImageNet**](https://bit.ly/2FJkvhJ){:target="_blank"}

_**Jeffrey De Fauw**, Sander Dieleman, Karen Simonyan_  

## Abstract

Autoregressive generative models of images tend to be biased towards capturing local structure, and as a result they often produce samples which are lacking in terms of large-scale coherence. To address this, we propose two methods to learn discrete representations of images which abstract away local detail. We show that autoregressive models conditioned on these representations can produce high-fidelity reconstructions of images, and that we can train autoregressive priors on these representations that produce samples with large-scale coherence. We can recursively apply the learning procedure, yielding a hierarchy of progressively more abstract image representations. We train hierarchical class-conditional autoregressive models on the ImageNet dataset and demonstrate that they are able to generate realistic images at resolutions of 128×128 and 256×256 pixels.

