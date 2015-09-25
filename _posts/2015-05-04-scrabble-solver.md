---
layout: post
title: Scrabble Solver
category: programming
tags: [python, scrabble-solver]
---

I was pretty excited to learn about sorting functions in Python recently, and that led me to the idea of creating a Scrabble solver. 

This was my approach:

* I found a file containing the Scrabble lexicon ([here](https://github.com/ikhramts/isaword/blob/master/dictionaries/owl2-lwl.txt)), and spliced out all the words. My program imports the words into a string.
* The user indicates whether they are playing Scrabble or Words with Friends – letter values are different between the two games.
* The program calculates every single possible permutation of length n less than or equal to the number of tiles. Blank tiles are equivalent to entering the 26 letters of the alphabet.
* Each permutation is checked against the list of valid words, and if there is a match, then the word is saved into a list.
* The word values are tallied.
* Voila!

Except, well... The program I came up with only sort of works, because it can only process 6-tile racks before my computer gets overwhelmed and freezes. That’s not particularly helpful for, as you know, tile racks usually contain 7 tiles.

Anyways, here’s my code. I will post an update once I have figured out how to make the program more efficient.

{% gist 7bd33882ff2f6b7857f0 %}
