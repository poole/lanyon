---
layout: post
title: Decoupling in Java
published: false
---

![Collaborators](https://cchacin.github.io/public/images/decoupling-in-java/Collaborators.png)

> The article was originally published at [cchacin.github.io](https://cchacin.github.io/2019/11/22/decoupling-in-java/)

Maintaining a Java codebase is not an easy task, especially with a codebase with thousands of lines of production code and huge test suites that can get easily outdated or even broken after changes in the implementations.

In terms of decoupling our classes, we tend to think that creating interfaces is a clear separation between our implementations (which is technically true), but at the end of the day even when our classes are not coupled to each other, they are instead coupled to the interfaces. One clear sign of this problem is our need to use mocking frameworks like mockito or jmock in order to have isolated unit tests. This is a code smell because if we think about it, we are not able to mock our collaborators without knowing the implementation details.

In this article, we are going to see how to organize your codebase in such a way that your code is really decoupled and modularized, you don't have to modify your tests when you decide to change some implementation details (like choosing a different HTTP library or a different database abstraction layer), the code will be mocking free as a consequence and you also can optionally remove the dependency injection frameworks from your code.

In the article about [Dependency Injection in Java]() we saw how to improve our designs using the **Dependency Injection Principle** and injecting our dependencies using the constructor as the best practice to do so. In the small example we defined the relationship between 2 classes: `TodoView` and `TodoHttpClient` and how `TodoView` was taken an instance of `TodoHttpClient` in it's constructor.

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
