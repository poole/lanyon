---
title:  "Clinically applicable deep learning for diagnosis and referral in retinal disease"
date:   2018-08-13 12:00:00
//author: Jeffrey De Fauw
categories: retinal disease health
permalink: clinically-applicable-deep-learning-retinal-disease
---

{% include image.html img="/images/2018_nature_medicine_oct/figure_1_smaller.png" title="" caption=""  url="/images/2018_nature_medicine_oct/figure_1_smaller.png" %} We propose a two-stage architecture that consists of first mapping the original (noisy) Optical Coherence Tomography (OCT) scan to multiple tissue-segmentation hypotheses, and consequently using a classification network on these tissue maps to infer diagnosis and referral probabilities. On these tasks we achieve expert-level results or better. One benefit of the two-stage architecture is that it allows for much quicker transfer to different device types, as demonstrated in the paper.  
[Nature Medicine article](https://www.nature.com/articles/s41591-018-0107-6){:target="_blank"}.  
[Open-access link](https://rdcu.be/4sNU){:target="_blank"}.  
[BBC article](https://www.bbc.co.uk/news/health-44924948){:target="_blank"}. 

## Abstract

The volume and complexity of diagnostic imaging is increasing at a pace faster than the availability of human expertise to interpret it. Artificial intelligence has shown great promise in classifying two-dimensional photographs of some common diseases and typically relies on databases of millions of annotated images. Until now, the challenge of reaching the performance of expert clinicians in a real-world clinical pathway with three-dimensional diagnostic scans has remained unsolved. Here, we apply a novel deep learning architecture to a clinically heterogeneous set of three-dimensional optical coherence tomography scans from patients referred to a major eye hospital. We demonstrate performance in making a referral recommendation that reaches or exceeds that of experts on a range of sight-threatening retinal diseases after training on only 14,884 scans. Moreover, we demonstrate that the tissue segmentations produced by our architecture act as a device-independent representation; referral accuracy is maintained when using tissue segmentations from a different type of device. Our work removes previous barriers to wider clinical use without prohibitive training data requirements across multiple pathologies in a real-world setting.
