---
layout: post
title: Scrabble Solver (Redux)
---

I realized a few critical issues with how I structured my Scrabble Solver [the last time around](http://yinishi.github.io/2015/05/04/scrabble-solver/). In retrospect, it seems incredibly silly that I overlooked these details, but then again, all problems look obvious in retrospect.

1. When the program was checking words against the Scrabble lexicon, it was doing so against all valid words. Huge problem. Say the user entered the letters “ABCDE”. The program computed all permutations of those letters and checked each one against _every single word_ in the lexicon, even words that did not contain any of the letters A, B, C, D, or E.
2. In a similar vein, words were being checked against the lexicon without any respect for word length. That is, two-letter permutations were being checked against not only the valid 2-letter words, but all the valid 3- to 15-letter words as well.
3. Blank tiles were being managed incorrectly. What version 1 of the program did was replace every instance of “?” with a string containing all letters of the alphabet. However, this means that program was given too many letters to create words from. To illustrate, say the input was “A?”. The way the program was originally set up, the user input would actually be interpreted as “AABCDEFG…” etc., which in turn means that every permutation of the alphabet would have been considered fair game. Not only was this highly inefficient, but this was actually just wrong.

Addressing these errors, especially 1 and 2, cut down my program runtime by a huge amount. I’ve also added a few other improvements to the program, such as renaming variables and using functions and list comprehensions to improve readability.

The new version of the program is below. 

{% gist a1c98fa5772ff6dc0730 %}
