---
layout: post
title: Finding the Poisonous Compound
date: 2015-08-30 15:58
comments: true
external-url:
categories: Mathematics
---

> Mark was doing an experiment in the laboratory with chemical compounds when he accidentally mixed up 4 of the vials. Unfortunately, one (and just one) of the compounds is extremely lethal, capable of killing a mammal in 24 hours. The problem is that he needs to sort the lethal one out in exactly 24 hours. What is the minimum amount of lab rats he needs to use in order to find which compound is the lethal one? What if he had mixed up 1000 vials?

## Solution for 4 vials

Whatever we do, there's no way we can attempt to reduce the number of rats with gained information after doing a trial: there's simply no time! Hence, the naïve solution for the 4 vials would be one rat per compound; after 24h, the one that is dead would point to the correct vial.

A naïve optimization of this strategy would reduce the need to three rats: Mark would leave one compound out of the experience, and if no rat died, the compound that was left out would be the correct one. The minimum amount, however, would be 2 rats, through the following scheme:

| Compound | Rat A | Rat B |
|:--------:|------:|------:|
| 1        | No    | No    |
| 2        | Yes   | No    |
| 3        | No    | Yes   |
| 4        | Yes   | Yes   |

... where compound 1 wouldn't be administered at all; compound 2 would be administered to Rat A; compound 3 to Rat B; and compound 4 to both of them. If both rats end up dying, Mark would know that the poison is in vial 4. Be aware that this works only because there's a single poisonous compound and no interference between them.

## Solution for _n_ vials

How would one proceed with 8 vials?

| Compound | Rat A | Rat B | Rat C |
|:--------:|------:|------:|------:|
| 1        | No    | No    | No    |
| 2        | Yes   | No    | No    |
| 3        | No    | Yes   | No    |
| 4        | Yes   | Yes   | No    |
| 5        | No    | No    | Yes   |
| 6        | Yes   | No    | Yes   |
| 7        | No    | Yes   | Yes   |
| 8        | Yes   | Yes   | Yes   |

The attentive reader would have already noticed that, for $n$ vials, Mark needs $\lceil\log_{2}{n}\rceil$ rats, with the information of the vials encoded using rats as bits. 8 compounds can be encoded in 3 bits, and 10 bits is enough to encode 1024 compounds. Hence, the number of rats required to test 1000 vials is 10.
