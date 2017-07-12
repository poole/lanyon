---
layout: post
title: Useful constructors in Go
---

I'm learning Go ("golang") by building a
[Physically-Based Renderer](https://github.com/hunterloftis/pbr)
and today I've begun refactoring pbr's constructors based on this philosophy:

Where possible, design structs that don't require constructors
and which have useful zero values by default (`point := &Vector3{1, 2, 3}`).
But when a constructor is necessary, follow the pattern:

```go
func NewFoo(absolutely, required int, config ...FooConfig) *Foo
```

That way, a minimal call like `NewFoo(1, 2)` points to a useful Foo.
Users with more specific requirements can specify more config:

```go
foo := NewFoo(3, 4, FooConfig{bar: "baz"})
```

Internally, the `Foo` struct can elegantly support `FooConfig` via struct embedding:

```go
type Foo struct {
  absolutely int
  required int
  FooConfig
}
```
