---
layout: post
title: Dependency Injection in Java (part 2)
published: false
---

![Feedback](https://cchacin.github.io/public/images/dependency-injection-in-java/Feedback.png)

> **UPDATE:** This article is part of a series. Check out the full series:
[Part 1](https://cchacin.github.io/2019/11/14/dependency-injection-in-java/), [Part 2](https://cchacin.github.io/2019/11/14/dependency-injection-in-java-2/)

In the [Part 1]() of this series, we discussed about how to implement **Dependency Injection** using the `Constructor Injection` approach and the benefits that can bring to our codebase.

## Realistic Example

Every single `Hello World` example for any idea, concept, pattern, framework or library is super simple to understand and it just works fine, but when we need to implement in a real project things get more complicated and often as engineers we tend to try to solve the problem by introducing new layers to the problem instead of understanding what is the real problem.

Now that we know the advantages of the `Dependency Injection Principle` using the `Constructor Injection` approach, let's create a more realistic example to see some inconveniences and how can we solve it without introducing a new layer to the mix.

### The Todo's Application
![Todos](https://cchacin.github.io/public/images/dependency-injection-in-java/Todos.png)

Let's design a Todo's Application to perform CRUD operations (Create, Read, Update, Delete) to manage our todo list, an initial architecture can be like this:

![3](https://cchacin.github.io/public/images/dependency-injection-in-java/3.png)

- `TodoApp` is the main class that is going to initialize our application, this can be an android app, web page or a desktop application using any framework.
- `TodoView` is the class that would display a view to interact with, this class is going to delegate the data-related aspects to the `TodoHttpClient` and it's only responsibility is to paint/draw/render the information and get the input to perform actions against the data using the `TodoHttpClient` dependency.
- `TodoHttpClient` is the class that contains a set of HTTP methods to persists `Todo` objects using a REST API.
- `Todo` is a value object that represents a todo item in our data store.

<!-- <img src="http://yuml.me/diagram/scruffy/class/[TodoApp|- TodoView view|+ main(String... args)]->[TodoView|- TodoHttpClient client|showTodos; + showTodo; + addTodo; + deleteTodo; +updateTodo],[TodoView]->[TodoHttpClient||+ GET /todos; + GET /todos/:id; + POST /todos; + POST /todos/:id; + PUT /todos/:id]" alt="todoApp" /> -->
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
    new TodoApp(new TodoView(new TodoHttpClient("https://api.todos.io/")))
  }
}
```

Now let's focus our attention to the relationship between the `TodoView` and `TodoHttpClient` classes and add more details to them:

![Scientist](https://cchacin.github.io/public/images/dependency-injection-in-java/Scientist.png)

```java
class TodoView {
  private final TodoHttpClient todoHttpClient;

  TodoView(final TodoHttpClient todoHttpClient) {
    this.todoHttpClient = todoHttpClient;
  }
  // content omitted
}
```

![404](https://cchacin.github.io/public/images/dependency-injection-in-java/404.png)

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

## Testing our design
