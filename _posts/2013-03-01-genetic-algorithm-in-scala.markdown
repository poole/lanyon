---
layout: post
title: "An Exploration of Genetic Algorithms in Scala"
date: 2013-03-01 23:34
comments: true
external-url:
categories: Software
---

Genetic algorithms are search heuristics that mimics the process of natural evolution, by adhering to nature-inspired techniques such as *inheritance*, *mutation*, *selection*, and *crossover*. In this post, we'll see how to build a simple mechanism in [Scala](http://www.scala-lang.org/) that would allow us to evolve specimens.

## Desiderata

Let's first start by defining our contract. Here's some basic assumptions:

* A genetic exploration evolves `Specimens`,
* Specimens are made up from sequences of `Genes`,
* There's a finite number of possible genes, hence we'll need a `GenePool`,
* At any point, we should be able to calculate how *fit* a specimen is; *i.e.* a function from `Specimen` to `Double`,
* There's a probability of a single gene to mutate during the *crossover*,
* There's a maximum population (number of `Specimens`) to simulate,
* It is possible to decide when to stop evolving our specimens (`StopCondition`).

## Implementation

The above can be represented by the following class signature:

```scala
class GeneticExploration[Gene, Specimen <% Iterable[Gene]]
    (val mutationRate: Double,
     val population: Int,
     genePool: Array[Gene],
     specimenBuilder: Iterable[Gene] => Specimen,
     fitnessF: Specimen => Double,
     stopCondition: List[Specimen] => Boolean)
```

What can we use as specimen? What about a `String` of characters? `Strings` are perfect candidates for specimens according to the above signature, since each individual character can act as a `Gene` (*i.e.* a `String` can be viewed as an `Iterable[Char]`). Here's a specimen:

```scala
val target = "as armas e os baroes assinalados"
```

And here's the corresponding gene pool:

```scala
val genePool = Array('a','b','c','d','e','f','g','h',
                     'i','j','k','l','m','n','o','p',
                     'q','r','s','t','u','v','w','x',
                     'y','z',' ')
```

Using `String` specimens makes calculating the fitness fairly straightforward:

```scala
def fitness(src: String): Double = src.zip(target).count { case (s, t) => s == t }
```

In other words, the fitness of a string is equal to the number of correct characters according to our target goal. Sometimes we'll need new random genes from our gene pool. Let's build an infinite stream of them:

```scala
def randomGenes: Stream[Gene] = genePool(Random.nextInt(genePool.length)) #:: randomGenes
```

... which makes generating a random new specimen also straightforward:

```scala
def newSpecimen(len: Int): Specimen = specimenBuilder(randomGenes.take(len))
```

It seems we have a lot of things in place. Let's start by initializing a `GeneticExploration` class:

```scala
val petri = new GeneticExploration[Char, String](
    0.01, 500, genePool,           // rate of mutation, max population and gene pool
    cs => new String(cs.toArray),  // how to build a specimen from genes
    fitness,                       // the fitness function
    _.exists(_ == target)          // the stop condition
)
```

Where to now? We need to evolve specimens, but for that, we'll need an initial pool of primordial specimens. Let's capture the usage before implementing those functions:

```scala
val evolvedSpecimens = petri.evolution(petri.randomPool(archetype))
```

An `archetype` is simply a seed specimen from which the primordial soup is made of, as seen in the implementation of `randomPool`:

```scala
type Pool = List[Specimen]

def randomPool(archetype: Specimen): Pool =
  (1 to population).map(_ => newSpecimen(archetype.size)).toList
```

It is time to code the *"main"* function, which basically evolves a pool (by mating its specimens) until the stop condition is met:

```scala
def evolution(pool: Pool, epoch: Int = 0): (Pool, Int) = {
    val newGeneration = popReproduction(matePool(pool))
    if (stopCondition(newGeneration)) (newGeneration, epoch)
    else evolution(newGeneration, epoch + 1)
}
```

Mating involves finding the specimens more fit to survive and leave offspring:

```scala
type MatePool = List[(Specimen, Double)]

def matePool(pool: Pool): MatePool = {
    val fitnesses = pool.map(fitnessF).toArray
    pool.zip(renormalize(fitnesses))
}
```

With the typical renormalization (i.e., the sum of all fitnesses in the pool must be equal to 1):

```scala
def renormalize(vector: Array[Double]): Array[Double] = {
    val sum = vector.sum
    vector.map(_ / sum)
}
```

How do the population as an whole reproduce? Well, mates are selected from the mate pool using their fitness as the probability of being chosen:

```scala
def popReproduction(matePool: MatePool): Pool =
  (1 to population).par.map(_ =>
    crossover(monteCarlo(matePool), monteCarlo(matePool))).toList
```

A naïve implementation of the Monte Carlo method could be coded as:

```scala
def monteCarlo[A](weightedList: List[(A, Double)]): A =
  weightedList(Random.nextInt(weightedList.length)) match {
     case (s, f) if f > Random.nextFloat => s
     case _ => monteCarlo(weightedList)
  }
```

The crossing over of two specimens is here accomplished by randomly recombining their genes:

```scala
def crossover(a: Specimen, b: Specimen): Specimen =
  mutate(specimenBuilder(a.zip(b).map(gene =>
    if (Random.nextFloat >= 0.5) gene._1 else gene._2)))
```

... though sometimes mutations occur, i.e., random genes that were not inherited:

```scala
def mutate(s: Specimen): Specimen =
  specimenBuilder(s.map(gene =>
    if (mutationRate > Random.nextFloat) randomGenes.head else gene))
```

And that's it! Go ahead and try... You can use the `target` as the `archetype`. See how many generations does it take for the algorithm to find out the very first phrase from "[*Os Lusíadas*](http://en.wikipedia.org/wiki/Os_Lus%C3%ADadas)".
