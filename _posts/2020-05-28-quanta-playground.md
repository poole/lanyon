---
layout: post
title: Quanta Playground
---

## Introduction

**Quantum computing isn't all that complicated.**
At least, it doesn't have to be. Buried underneath all the mathematical notation are some surprisingly simple concepts. When presented in the right way, the basics of quantum computing can be understood and put to work by everyone, regardless of their experience with university-level math. Just as classical computer programming has been democratized and woven into education at the kindergarten level, the art of quantum computing must be introduced to a broader segment of the population if it is ever to become mainstream. After all, people will never finance, implement, or promote what they do not understand.

## Quanta Playground

Originally created as a submission project for Apple's WWDC 2020 Swift Student Challenge, Quanta Playground is my attempt at a gentle introduction into the world of quantum computing. It's a game that challenges users to design quantum circuits that implement a given state transformation. Once said state transformation has been achieved, the user advances to another level. Each level is designed to introduce a different facet of quantum computing - a new gate, design pattern, or whatnot. As the user advances through the experience, they are gradually exposed to more and more concepts that build on one another. The first level might introduce flipping a qubit with a Pauli X gate, and the last might ask the user to implement Grover's search algorithm.

**The best part?** There's not a shred of mathematical notation anywhere. Designing circuits in Quanta Playground is as simple as dragging blocks around. There's no concept of "running" circuits on a simulator or a real quantum device, either. The display of the circuit's state transformation updates in real time as the user rearranges gates, giving them a strong intuition as to how a quantum circuit's function changes as it's redesigned.

![Quanta Playground Interface](/public/images/2020-05-28-quanta-playground/Quanta Playground Interface.png)

<div class="caption" markdown="1">
*A sample level of Quanta Playground.*
</div>


## Implementation

The codebase of Quanta Playground is written 100% in Swift can be divided into four main components:
1. **A scratch-built linear algebra library.** It has support for complex numbers, vectors, matrices, and a select set of operations. This library forms the mathematical foundation for the simulator.
2. **A statevector-based quantum circuit simulator.** This simulator executes a circuit defined as a set of gate operations applied on a certain number of qubits. It returns the final state of the circuit after all of the operations have been executed, as both a statevector and a set of probabilities for each state.
3. **A game logic layer.** This layer keeps track of user progress, checks circuits against solutions, and keeps everything running smoothly. Games can be loaded from a JSON file for easy configuration.
4. **A user interface built with SwiftUI.** SwiftUI is *not* meant for a project like this. The drag-and-drop circuit builder interface and animated bar graphs push the framework right up to its limits.

## Check it out

The whole project is hosted on my GitHub at [theochemel/QuantaPlayground](https://github.com/theochemel/QuantaPlayground). Give it a try!
