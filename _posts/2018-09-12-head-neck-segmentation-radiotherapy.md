---
title:  "Deep learning to achieve clinically applicable segmentation of head and neck anatomy for radiotherapy"
date:   2018-09-12 12:00:00
//author: Jeffrey De Fauw
categories: segmentation head neck cancer radiotherapy health
permalink: head-neck-segmentation-radiotherapy
---

{% include image.html img="/images/2018_head_neck_segmentation/segm_example.png" title="Example segmentations of the model vs the oncologist." caption="Example segmentations of the model vs the oncologist."  url="/images/2018_head_neck_segmentation/segm_example.png" %}
 
We propose a model for segmenting the organs at risk in 3D Computed Tomography (CT) scans for the planning of radiotherapy treatment. Improvements in such a segmentation could result in improved and faster treatment.     
[**arXiv**](https://arxiv.org/abs/1809.04430){:target="_blank"}   
[**Open-sourced augmentation**](https://github.com/deepmind/multidim-image-augmentation){:target="_blank"}  
[**Open-sourced surface distance metrics**](https://github.com/deepmind/surface-distance){:target="_blank"}

_Stanislav Nikolov, Sam Blackwell, Ruheena Mendes, **Jeffrey De Fauw**, Clemens Meyer, Cían Hughes, Harry Askham, Bernardino Romera-Paredes, Alan Karthikesalingam, Carlton Chu, Dawn Carnell, Cheng Boon, Derek D'Souza, Syed Ali Moinuddin, Kevin Sullivan, DeepMind Radiographer Consortium, Hugh Montgomery, Geraint Rees, Ricky Sharma, Mustafa Suleyman, Trevor Back, Joseph R. Ledsam, Olaf Ronneberger_  

## Abstract

Over half a million individuals are diagnosed with head and neck cancer each year worldwide. Radiotherapy is an important curative treatment for this disease, but it requires manually intensive delineation of radiosensitive organs at risk (OARs). This planning process can delay treatment commencement. While auto-segmentation algorithms offer a potentially time-saving solution, the challenges in defining, quantifying and achieving expert performance remain. Adopting a deep learning approach, we demonstrate a 3D U-Net architecture that achieves performance similar to experts in delineating a wide range of head and neck OARs. The model was trained on a dataset of 663 deidentified computed tomography (CT) scans acquired in routine clinical practice and segmented according to consensus OAR definitions. We demonstrate its generalisability through application to an independent test set of 24 CT scans available from The Cancer Imaging Archive collected at multiple international sites previously unseen to the model, each segmented by two independent experts and consisting of 21 OARs commonly segmented in clinical practice. With appropriate validation studies and regulatory approvals, this system could improve the effectiveness of radiotherapy pathways.

