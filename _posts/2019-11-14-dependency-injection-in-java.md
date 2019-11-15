---
layout: post
title: Dependency Injection in Java (part 1)
---

![Collaborators](https://cchacin.github.io/public/images/dependency-injection-in-java/Collaborators.png)

> **UPDATE:** This article is part of a series. Check out the full series:
[Part 1](https://cchacin.github.io/2019/11/14/dependency-injection-in-java/), [Part 2](https://cchacin.github.io/2019/11/14/dependency-injection-in-java-2/)

> **UPDATE:** Editorial changes were made to improve the readability, thanks to `Shefali Agarwal`

Java is an object-oriented language with some functional aspects included in its core. Like any other object-oriented language, classes and objects are the foundations of any functionality that we can write and use and the relationships between the classes/objects make it possible to extend and reuse functionality. However, the way that we choose to build those relationships determine how modular, decoupled and reusable our codebase is, not only in terms of our production code but also in our test suites.

In this article, we are going to describe the concept of Dependency Injection in Java and how it helps us have a more modular and decoupled codebase which makes our lives easier, even for testing, without the need of any sophisticated container or framework.

## What is a Dependency?

When a class `ClassA` uses any method of another class `ClassB` we can say that `ClassB` is a dependency of `ClassA`.

![1](https://cchacin.github.io/public/images/dependency-injection-in-java/1.png)

```java
class ClassA {

  ClassB classB = new ClassB();

  int tenPercent() {
    return classB.calculate() * 0.1d;
  }
}
```

In this example, `ClassA` is calculating 10% of a value, and in order to calculate that value, it's reusing the functionality exposed by `ClassB`.

![2](https://cchacin.github.io/public/images/dependency-injection-in-java/2.png)

And it can be used like this:

```java
class Main {
  public static void main(String... args) {
    ClassA classA = new ClassA();

    System.out.println("Ten Percent: " + classA.tenPercent());
  }
}
```

Now, there is a big problem with this approach:

> `ClassA` **is tightly coupled with** `ClassB`

If we needed to change/replace `ClassB` with `ClassC` because ‘ClassC’ has an optimized version of the `calculate()` method, we will need to recompile our project.

![Collision](https://cchacin.github.io/public/images/dependency-injection-in-java/Collision.png)

## The Dependency Injection Principle

The **Dependency Injection Principle** is nothing but being able to pass (`inject`) the dependencies when required instead of initializing the dependencies inside of the recipient class.

> Decouple your classes construction of the constructions of its dependencies

## Dependency Injection approaches in Java

### Setter Injection (Not recommended)

```java
class ClassA {

  ClassB classB;

  /* Setter Injection */
  void setClassB(ClassB injected) {
    classB = injected;
  }

  int tenPercent() {
    return classB.calculate() * 0.1d;
  }
}
```

With this approach we remove the `new` keyword from our `ClassA`. Thus, we move the responsibility of the creation of `ClassB` away from `ClassA`.

`ClassA` still has a hard dependency on `ClassB` but now it can be `injected` from the outside:

```java
class Main {
  public static void main(String... args) {
    ClassA classA = new ClassA();
    ClassB classB = new ClassB();

    classA.setClassB(classB);

    System.out.println("Ten Percent: " + classA.tenPercent());
  }
}
```

This is definitely better than the initial approach, now we can `inject` in `ClassA` an instance of `ClassB` or even better, a subclass of `ClassB`:

```java
class ImprovedClassB extends ClassB {
  // content omitted
}
```

```java
class Main {
  public static void main(String... args) {
    ClassA classA = new ClassA();
    ImprovedClassB improvedClassB = new ImprovedClassB();

    classA.setClassB(improvedClassB);

    System.out.println("Ten Percent: " + classA.tenPercent());
  }
}
```

But there is a major problem with the `Setter Injection` approach:

We are hiding the `ClassB` dependency in `ClassA` because by reading the constructor signature we can not identify its dependencies right away, we can write the code in this way causing a `NullPointerException` that is only going to be caught on runtime:

```java
class Main {
  public static void main(String... args) {
    ClassA classA = new ClassA();

    System.out.println("Ten Percent: " + classA.tenPercent()); // NullPointerException here
  }
}
```

![npe](https://cchacin.github.io/public/images/dependency-injection-in-java/npe.png)

In statically typed languages like Java is always a good thing to let the compiler help us. See `Constructor Injection`


### Constructor Injection (Highly recommended)

```java
class ClassA {

  ClassB classB;

  /* Constructor Injection */
  ClassA(ClassB injected) {
    classB = injected;
  }

  int tenPercent() {
    return classB.calculate() * 0.1d;
  }
}
```

`ClassA` still have a hard dependency on `ClassB` but now it can be `injected` from the outside using the constructor:

```java
class Main {
  public static void main(String... args) {
    /* Notice that we are creating ClassB fisrt */
    ClassB classB = new ImprovedClassB();

    /* Constructor Injection */
    ClassA classA = new ClassA(classB);

    System.out.println("Ten Percent: " + classA.tenPercent());
  }
}
```

ADVANTAGES:
- The functionality remains intact compared with the `Setter Injection` approach
- We removed the `new` initialization from the `ClassA`
- We still can inject a specialized subclass of `ClassB` to `ClassA`
- Now the compiler is going to ask us for the dependencies that we need in compile time

![Happy](https://cchacin.github.io/public/images/dependency-injection-in-java/Happy.png)

### Field Injection (Kids don't try this at home)

There is a 3rd way to inject dependencies in Java, and it is called `Field Injection`, the only ways for field injection to work are:

- Mutating the field because it's a non-private and non-final field
- Mutating a final/private field using reflection

This approach has the same problems exposed for the `Setter Injection` and additionally adds complexity due to mutation/reflection required, unfortunately, this is a pretty common pattern used when a `Dependency Injection Framework` it's used.

## Conclusion:

*When a class `ClassA` uses any method of another class `ClassB` we can say that `ClassB` is a dependency of `ClassA` and if `ClassA` has a dependency in `ClassB` the latter has to be explicitly required in `ClassA`'s constructor.*

In the [Part 2](https://cchacin.github.io/2019/11/14/dependency-injection-in-java-2/) of this series we are going to implement a more realistic use case using the **Dependency Injection Principle**.
