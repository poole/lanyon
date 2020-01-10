---
layout: post
title: Dependency Injection in Java
tags: java dependency-injection di best-practices
---

![Collaborators](https://cchacin.github.io/public/images/dependency-injection-in-java/Collaborators.png)

> The article was initially published at [cchacin.github.io](https://cchacin.github.io/2019/11/14/dependency-injection-in-java/)

> **UPDATE:** Editorial changes to improve the readability, thanks to `Shefali Agarwal`.
> **UPDATE 2019-12-19:** Editorial changes to improve the readability.

Java is an object-oriented language with some functional aspects included in its core. Like any other object-oriented language, classes and objects are the foundations of any functionality that we can write and use. The relationships between the classes/objects make it possible to extend and reuse functionality. However, the way that we choose to build those relationships determine how modular, decoupled, and reusable our codebase is, not only in terms of our production code but also in our test suites.

In this article, we are going to describe the concept of Dependency Injection in Java and how it helps us have a more modular and decoupled codebase, which makes our lives easier, even for testing, without the need of any sophisticated container or framework.

## What is Dependency?

When a class `ClassA` uses any method of another class `ClassB`, we can say that `ClassB` is a dependency of `ClassA`.

![1](https://cchacin.github.io/public/images/dependency-injection-in-java/1.png)

```java
class ClassA {

  ClassB classB = new ClassB();

  int tenPercent() {
    return classB.calculate() * 0.1d;
  }
}
```

In this example, `ClassA` is calculating 10% of the value, and calculating that value, it's reusing the functionality exposed by `ClassB`.

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

If we needed to change/replace `ClassB` with `ClassC` because `ClassC` has an optimized version of the `calculate()` method, we need to recompile `ClassA` because we don't have a way to change that dependency, it's hardcoded inside of `ClassA`.

![Collision](https://cchacin.github.io/public/images/dependency-injection-in-java/Collision.png)

## The Dependency Injection Principle

The **Dependency Injection Principle** is nothing but being able to pass (`inject`) the dependencies when required instead of initializing the dependencies inside of the recipient class.

> Decouple the construction of your classes from the construction of your classes' dependencies

## Forms of Dependency Injection in Java

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

With this approach, we remove the `new` keyword from our `ClassA`. Thus, we move the responsibility for the creation of `ClassB` away from `ClassA`.

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

The above example is better than the initial approach because now we can `inject` in `ClassA` an instance of `ClassB` or even better, a subclass of `ClassB`:

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

But there is a significant problem with the `Setter Injection` approach:

We are hiding the `ClassB` dependency in `ClassA` because by reading the constructor signature, we cannot identify its dependencies right away. The code below causes a `NullPointerException`  on runtime:

```java
class Main {
  public static void main(String... args) {
    ClassA classA = new ClassA();

    System.out.println("Ten Percent: " + classA.tenPercent()); // NullPointerException here
  }
}
```

![npe](https://cchacin.github.io/public/images/dependency-injection-in-java/npe.png)

In a statically typed language like Java, it's always a good thing to let the compiler help us. See `Constructor Injection`


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

`ClassA` still has a hard dependency on `ClassB` but now it can be `injected` from the outside using the constructor:

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

**ADVANTAGES:**
- The functionality remains intact compared with the `Setter Injection` approach
- We removed the `new` initialization from the `ClassA`.
- We still can inject a specialized subclass of `ClassB` to `ClassA`.
- Now the compiler is going to ask us for the dependencies that we need in compile time.

![Happy](https://cchacin.github.io/public/images/dependency-injection-in-java/Happy.png)

### Field Injection (Kids don't try this at home)

There is a 3rd way to inject dependencies in Java, and it is called `Field Injection`. The only way for field injection to work is:

- Mutating the field because it's a non-private and non-final field
- Mutating a final/private field using reflection

This approach has the same problems exposed by the `Setter Injection` approach and additionally adds complexity due to the mutation/reflection required. Unfortunately, this is a pretty common pattern when people use a `Dependency Injection Framework`.

NOTE:

> When a class `ClassA` uses any method of another class `ClassB` we can say that `ClassB` is a dependency of `ClassA`.

> If `ClassA` has a dependency on `ClassB`, `ClassA` constructor should require `ClassB`.

![Feedback](https://cchacin.github.io/public/images/dependency-injection-in-java/Feedback.png)

## Realistic Example

Every single `Hello World` example for any idea, concept, or pattern is super simple to understand, and it just works fine. But when we need to implement it in a real project, things get more complicated, and often, as engineers, we tend to try to solve the problem by introducing new layers to the problem instead of understanding what the real problem is.

Now that we know the advantages of the `Dependency Injection Principle` using the `Constructor Injection` approach, let's create a more realistic example to see some inconveniences and how can we solve it without introducing a new layer to the mix.

### The Todo's Application
![Todos](https://cchacin.github.io/public/images/dependency-injection-in-java/Todos.png)

Let's design a Todo's Application to perform CRUD operations (Create, Read, Update, Delete) to manage our todo list, and an original architecture can be like this:

![3](https://cchacin.github.io/public/images/dependency-injection-in-java/3.png)

- `TodoApp` is the main class that is going to initialize our application; this can be an android app, web page, or a desktop application using any framework.
- `TodoView` is the class that would display a view to interact with, this class is going to delegate the data-related aspects to the `TodoHttpClient`.  It's only responsibility is to paint/draw/render the information and get the input to perform actions against the data using the `TodoHttpClient` dependency.
- `TodoHttpClient` is the class that contains a set of HTTP methods to persists `Todo` objects using a REST API.
- `Todo` is a value object that represents a todo item in our data store.

<!-- <img src="http://yuml.me/diagram/scruffy/class/[TodoApp]->[TodoView],[TodoView]=>[TodoProvider],[TodoHttpClient]->[TodoProvider],[TodoApp]=>[TodoHttpClient]" alt="todoApp" /> -->

![4](https://cchacin.github.io/public/images/dependency-injection-in-java/4.png)

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
    new TodoApp(new TodoView(new TodoHttpClient("https://api.todos.io/")));
  }
}
```

Now let's focus our attention on the relationship between the `TodoView` and `TodoHttpClient` classes and add more details to them:

![Magic](https://cchacin.github.io/public/images/dependency-injection-in-java/Magic.png)

```java
class TodoHttpClient extends MyMagicalHttpAbstraction {

  TodoView(final String baseUrl) {
    super(baseUrl);
  }

  @GET
  List<Todo> getAll() {
    return super.get(Todo.class);
  }

  @GET
  Todo get(long id) {
    return super.get(Todo.class, id);
  }

  @POST
  long save(Todo todo) {
    return super.post(todo);
  }

  @PUT
  Todo update(Todo todo) {
    return super.put(todo, todo.getId());
  }

  @DELETE
  void delete(long id) {
    super.delete(Todo.class, id);
  }
}
```

```java
class TodoView extends MyFrameworkView {
  private final TodoHttpClient httpClient;

  // View initialized by the view library/framework
  // or injected as a dependency as well
  private ListView listView;
  private DetailView detailView;

  TodoView(final TodoHttpClient httpClient) {
    this.httpClient = httpClient;
  }

  void showTodos() {
    listView.add(httpClient.getAll());
  }

  void showTodo(Todo selected) {
    detailView.print(httpClient.get(selected.getId()));
  }

  void save(Todo todo) {
    httpClient.save(todo);
    listView.add(todo)
  }

  void update(Todo todo) {
    httpClient.update(todo);
    detailView.refresh(todo);
  }

  void delete(long id) {
    httpClient.delete(id);
    listView.refresh();
  }
}
```

## Testing our design
![Scientist](https://cchacin.github.io/public/images/dependency-injection-in-java/Scientist.png)

Let's create a unit test for the `TodoView` class where we test the class in isolation without instantiating any of its dependencies. In this case, the dependency is `TodoHttpClient`:

```java
@ExtendWith(MockitoExtension.class)
class TodoViewTest {

  @Test
  void shouldBeEmptyWhenEmptyList(@Mock TodoHttpClient httpClient) {
    // Given
    Mockito.when(httpClient.getAll()).thenReturn(List.of());

    // When
    TodoView todoView = new TodoView(httpClient);
    todoView.showTodos();

    // Then
    Assertions.assertThat(todoView.getListView()).isEmpty();
  }
}
```

Now that we have our test case passing, let's analyze how our design impacts the testing approach:

- We introduced the [Mockito](https://site.mockito.org/) framework to be able to create a fake instance of `TodoHttpClient`, and that adds much complexity.
- We have to prepare our instance of `TodoHttpClient` to fake the return of an empty list when calling the `getAll()` method, now our unit test also contains implementation details about the `TodoHttpClient`.
- Additionally, since `TodoHttpClient` is a concrete class, we cannot change the implementation to call a DB instead without having to change the `TodoView` class as well, and we would need to rewrite the unit tests even when they should isolate this implementation detail.

## Let's improve our design
![VideoLearning](https://cchacin.github.io/public/images/dependency-injection-in-java/VideoLearning.png)

One thing that we can do to decouple our classes is to introduce an interface since the Java language is always a good thing to rely on abstractions instead of relying on actual implementations.

Let's put an interface between `TodoView` and `TodoHttpClient`:

![5](https://cchacin.github.io/public/images/dependency-injection-in-java/5.png)

**TodoProvider**

```java
interface TodoProvider {
  List<Todo> getAll();
  Todo get(long id);
  long save(Todo todo);
  Todo update(Todo todo);
  void delete(long id);
}
```

Let's make the `TodoHttpClient` to implement that interface:

```java
class TodoHttpClient extends MyMagicalHttpAbstraction implements TodoProvider {

  TodoView(final String baseUrl) {
    super(baseUrl);
  }

  @GET
  List<Todo> getAll() {
    return super.get(Todo.class);
  }

  @GET
  Todo get(long id) {
    return super.get(Todo.class, id);
  }

  @POST
  long save(Todo todo) {
    return super.post(todo);
  }

  @PUT
  Todo update(Todo todo) {
    return super.put(todo, todo.getId());
  }

  @DELETE
  void delete(long id) {
    super.delete(Todo.class, id);
  }
}
```

Now the `TodoView` class looks like this:

```java
class TodoView extends MyFrameworkView {
  private final TodoProvider provider;

  // View initialized by the view library/framework
  // or injected as a dependency as well
  private ListView listView;
  private DetailView detailView;

  TodoView(final TodoProvider httpClient) {
    this.provider = provider;
  }

  void showTodos() {
    listView.add(provider.getAll());
  }

  void showTodo(Todo selected) {
    detailView.print(provider.get(selected.getId()));
  }

  void save(Todo todo) {
    provider.save(todo);
    listView.add(todo)
  }

  void update(Todo todo) {
    provider.update(todo);
    detailView.refresh(todo);
  }

  void delete(long id) {
    provider.delete(id);
    listView.refresh();
  }
}
```

**What do we gain with these changes?**

We are able to change the `TodoHttpClient` with something like `TodoDBProvider` in the `TodoApp` and the application behavior would remain the same:

```java
new TodoApp(new TodoView(new TodoDbProvider("dbName", "dbUser", "dbPassword")));
```

## Let's see how that helps in unit tests
![Library](https://cchacin.github.io/public/images/dependency-injection-in-java/Library.png)

```java
@ExtendWith(MockitoExtension.class)
class TodoViewTest {

  @Test
  void shouldBeEmptyWhenEmptyList(@Mock TodoProvider provider) {
    // Given
    Mockito.when(provider.getAll()).thenReturn(List.of());

    // When
    TodoView todoView = new TodoView(httpClient);
    todoView.showTodos();

    // Then
    Assertions.assertThat(todoView.getListView()).isEmpty();
  }
}
```

The test is still green which is great, but wait... nothing changed actually :(

The only changes were related to naming:

- `TodoHttpClient` -> `TodoProvider` no value for the test.
- `httpClient` -> `provider` no value for the test here.
- We are still relying on the mocking framework.
- We are still coupling the test to the interface's name: `TodoProvider`.
- We are still coupling the test to the method name: `getAll()`

## Can we remove the mocking framework?

If we have now an interface, why are we coupled to the mocking framework to create a fake object that we can manually create using an anonymous class? Let's change that:

```java
@ExtendWith(MockitoExtension.class)
class TodoViewTest {

  // Given
  TodoProvider provider = new TodoProvider() {
    @Override
    public List<TodoItem> getAll() {
      return List.of();
    }

    @Override
    public TodoItem get(long id) {
      return null;
    }

    @Override
    public long save(TodoItem todo) {
      return 0;
    }

    @Override
    public TodoItem update(TodoItem todo) {
      return null;
    }

    @Override
    public void delete(long id) {

    }
  };

  // When
  var todoView = new TodoView(provider);
  todoView.displayListView();

  // Then
  assertThat(todoView.getTodoItemList()).isEmpty();
}
```

Sweet, now our design is more flexible since we can inject a different `TodoProvider` implementation, and we can do the same in our tests without using a mocking framework. But, we are paying the price: **Verbosity**, the mocking framework removes the need for implementing every single method from the interfaces.

## Only the beginning

In the next article, let's remove the verbosity from the tests and write an even better design.

Stay tuned for more posts like this.
