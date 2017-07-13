---
layout: post
title: Renamed types in Go
---

When I first saw this in Go, I thought, *"why the hell would anyone want to do that?"*

```go
type MyType float64
```

Great, now I have a float that's kind of like a float, but it
throws errors if I try to use it like a float with other floats.
I put this silly and clearly useless construct aside.

Then, working on my [physically-based renderer](https://github.com/hunterloftis/pbr) a couple of days later,
I got into a mess.
PBR is nothing but [Vector3](https://github.com/hunterloftis/pbr/blob/gh-pages/pbr/vector3.go)s -
just billions and billions of Vector3s.
They're perfect for points in space, distances, directions, light energy, pixel colors, and signal strength.
Profiling shows that `Vector3.Unit()` is PBR's single most-expensive operation,
which makes sense because `Unit` requires a `math.Sqrt` and, again, this is done billions of times.

I wanted to eliminate unnecessary calls to `Unit`, but was afraid to.
Many vector operations -
like using the [dot product](https://chortle.ccsu.edu/VectorLessons/vch09/vch09_7.html)
to determine the cosine between two vectors -
are only accurate between *unit* vectors.
Applying them to non-unit vectors would create difficult-to-diagnose bugs.
Liberal application of `Unit` would improve safety, but would also slow down the program.

Simultaneously, I was drowning in Vector3s.
I'd written function after function like this:

```go
func (m *Material) reflect(norm, inc Vector3, rnd *rand.Rand) (bool, Vector3, Vector3)
```

One of those returned Vector3s represents the direction of a light ray.
The other represents energy attenuation (color) when light hits a surface.
Confusing the two results in nonsense values like "2 meters plus an incandescent light bulb"
or "forward-left times fuschia."

Suddenly, the idea of named types that refuse to mix with members of different names didn't sound so stupid.

To experiment, I [implemented](https://github.com/hunterloftis/pbr/pull/4) a
[Direction](https://github.com/hunterloftis/pbr/blob/gh-pages/pbr/direction.go) type based on Vector3.
All of the unit-vector-only operations found a home here.
Anything that might possibly result in a non-unit vector returned a Vector3, not a Direction.
Similarly, the expensive `Unit()` operation now converted Vector3s into Directions.
Several benefits fell out of this arrangement:

First, I found a couple of bugs in the code. I'm not even exactly sure where they were,
but after the change, some subtle camera field-of-view issues disappeared.

Second, my code became shorter and more readable.
I got to [delete a bunch of stuff](https://github.com/hunterloftis/pbr/pull/4/files)
and the above function turned into:

```go
func (m *Material) reflect(norm, inc Direction, rnd *rand.Rand) (bool, Direction, Vector3)
```

Third, the compiler alerted me to a couple of unnecessary calls to `Unit()`.
How? After the change, `Unit` was no longer a valid method of `Direction` -
a Direction is already a unit, after all.
Renders actually completed faster after renaming the type.

The fixed bugs, improved readability, and increased performance convinced me to
introduce a new [Energy type](https://github.com/hunterloftis/pbr/blob/gh-pages/pbr/energy.go),
a Vector3 that exclusively deals with light energy.

Now Energies, Directions, and Vector3s are easy to differentiate
and the compiler understands that "violet divided by up minus a line" makes no sense.

```go
func (m *Material) reflect(norm, inc Direction, rnd *rand.Rand) (bool, Direction, Energy)
```

I'm still new to Go so I'm sure there are ways I could make this better
or improve the type system in other ways.
If you have recommendations, please [let me know!](https://twitter.com/hunterloftis)
