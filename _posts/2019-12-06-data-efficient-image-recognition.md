---
title:  "Data-efficient image recognition with contrastive predictive Coding"
date:   2019-12-06 12:00:00
categories: self-supervised unsupervised
permalink: data-efficient-image-recognition
---

{% include image.html img="/images/2019_cpc_v2/cpc_v2.png" title="The method outperforms training from scratch for every amount of labels, even when using all labels." caption="The method outperforms training from scratch for every amount of labels, even when using all labels"  url="/images/2019_cpc_v2/cpc_v2.png" %}

Beating previous state of the art in self-supervised learning for ImageNet by almost 3% absolute with less parameters (71.5% vs 68.6% top1) and outperforming outperforming purely supervised approaches in all data regimes.

_Olivier J. Hénaff, Aravind Srinivas, **Jeffrey De Fauw**, Ali Razavi, Carl Doersch, S. M. Ali Eslami, Aaron van den Oord_  

## Abstract

Human observers can learn to recognize new categories of images from a handful of examples, yet doing so with machine perception remains an open challenge. We hypothesize that data-efficient recognition is enabled by representations which make the variability in natural signals more predictable. We therefore revisit and improve Contrastive Predictive Coding, an unsupervised objective for learning such representations. This new implementation produces features which support state-of-the-art linear classification accuracy on the ImageNet dataset. When used as input for non-linear classification with deep neural networks, this representation allows us to use 2-5x less labels than classifiers trained directly on image pixels. Finally, this unsupervised representation substantially improves transfer learning to object detection on PASCAL VOC-2007, surpassing fully supervised pre-trained ImageNet classifiers.
