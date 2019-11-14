---
layout: post
title: Dependency Injection in Java
---

![Collaborators](/public/images/dependency-injection-in-java/Collaborators.png)

Java is an object-oriented language with some functional aspects included in its core, like any other object-oriented language, classes and objects are the foundation of any functionality that we can write and use in it and the relationships between the classes/objects make possible to extend and reuse functionality. But the way that we choose to build those relationships can determine how modular, decoupled and reusable is our codebase and not only in terms of production code but also in our test suites.

In this article we are going to describe the concept of Dependency Injection in Java and how that helps us to have a more modular and decoupled codebase that makes our lives easier even for testing without the need of any sophisticated container or framework.

## What is a Dependency?

When a class `ClassA` uses any method of another class `ClassB` we can say that `ClassB` is a dependency of `ClassA`.

<img src="http://yuml.me/diagram/scruffy/class/[ClassA]-uses a method of->[ClassB], [ClassB]-[note: ClassB It's a dependency of ClassA{bg:gray}], [ClassA]-[note: ClassA depends on ClassB{bg:dark}]" alt="dependency" />

```java
class ClassA {

  ClassB classB = new ClassB();

  int tenPercent() {
    return classB.calculate() * 0.1d;
  }
}
```

In this example, `ClassA` is calculating the 10% of a value, and in order to calculate that value, it's reusing the functionality exposed by `ClassB`.

<img src="http://yuml.me/diagram/scruffy/class/[ClassA|-classB|+double tenPercent()]->[ClassB||+int calculate()]" alt="dependency" />

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

If we needed to change/replace `ClassB` with `ClassC` because has an optimized version of the `calculate()` method, we will need to recompile our project.

![Collision](/public/images/dependency-injection-in-java/Collision.png)

## The Dependency Injection Principle

The **Dependency Injection Principle** is nothing else than being able to pass (`inject`) the dependencies when required instead of initializing the dependencies inside of the recipient class.

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

With this approach we remove the `new` keyword from our `ClassA`, with that we move away from `ClassA` the responsibility of the creation of `ClassB`.

`ClassA` still have a hard dependency on `ClassB` but now it can be `injected` from the outside:

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

This is definitely better than the initial approach, now we can `inject` in `ClassA` an instance of `ClassB` or even better we can also inject a subclass of `ClassB`:

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

But there is a main problem with the `Setter Injection` approach:

We are hiding the `ClassB` dependency in `ClassA` because reading the constructor signature we can not identify its dependencies right away, we can write the code in this way causing a `NullPointerException` that only is going to be caught on runtime:

```java
class Main {
  public static void main(String... args) {
    ClassA classA = new ClassA();

    System.out.println("Ten Percent: " + classA.tenPercent()); // NullPointerException here
  }
}
```

![npe](/public/images/dependency-injection-in-java/npe.png)

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

![Happy](/public/images/dependency-injection-in-java/Happy.png)

### Field Injection (Kids don't try this at home)

![dont](/public/images/dependency-injection-in-java/dont.jpg)

There is a 3rd way to inject dependencies in Java, and it is called `Field Injection`, the only ways for field injection to work are:

- Mutating the field because it's a non-private and non-final field
- Mutating a final/private field using reflection

This approach has the same problems exposed for the `Setter Injection` and additionally adds complexity due to mutation/reflection required, unfortunately this is a pretty common pattern used when a `Dependency Injection Framework` it's used.

## Realistic Example

Every single `Hello World` example for any idea, concept, pattern, framework or library is super simple of understand and it just work fine, but when we need to implement in a real project things get more complicated and often as engineers we tend to try to solve the problem introducing new layers to the problem instead of understanding what is the real problem.

Now that we know the advantages of the `Dependency Injection Principle` using the `Constructor Injection` approach, let's create a more realistic example to see some inconveniences and how can we solve it without introducing a new layer to the mix.

### The Todo's Application
![Todos](/public/images/dependency-injection-in-java/Todos.png)

Let design a Todo's Application to perform CRUD operations (Create, Read, Update, Delete) to manage our todo list, a initial architecture can be like this:

<img src="http://yuml.me/diagram/scruffy/class/[TodoApp]->[TodoView],[TodoView]->[TodoHttpClient]" alt="todoApp" />

- `TodoApp` is the main class that is going to initialize our application, this can be an android app, web page or a desktop application using any framework.
- `TodoView` is the class that would display a view to interact with, this class is going to delegate the data-related aspects to the `TodoHttpClient` and it's only responsibility is to paint/draw/render the information and get the input to perform actions against the data using the `TodoHttpClient` dependency.
- `TodoHttpClient` is the class that contains a set of HTTP methods to persists `Todo` objects using a REST API.
- `Todo` is a value object that represents a todo item in our data store.

<img src="http://yuml.me/diagram/scruffy/class/[TodoApp|- TodoView view|+ main(String... args)]->[TodoView|- TodoHttpClient client|showTodos; + showTodo; + addTodo; + deleteTodo; +updateTodo],[TodoView]->[TodoHttpClient||+ GET /todos; + GET /todos/:id; + POST /todos; + POST /todos/:id; + PUT /todos/:id]" alt="todoApp" />

Let's write the Java classes for our design using the `Constructor Injection` approach that we just learned:

```java
class Todo {
  /* Value Object class */
  // content omitted
}
```

```java
class TodoApp {
  private final TodoView todoView;

  TodoApp(final TodoView todoView) {
    this.todoView = todoView;
  }
  // content omitted
}
```

```java
class TodoView {
  private final TodoHttpClient todoHttpClient;

  TodoView(final TodoHttpClient todoHttpClient) {
    this.todoHttpClient = todoHttpClient;
  }
  // content omitted
}
```

```java
class Main {
  public static void main(String... args) {
    new TodoApp(new TodoView(new TodoHttpClient("https://api.todos.io/")))
  }
}
```
