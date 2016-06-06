---
layout: post
title: Flint Polynomials
---

### Overview

This week has not been as interesting as the last. Most of my work this week involved wrapping Flint Polynomials, for use in SymEngine. I will discuss their internal implementation and how they were integrated to the library.

### Flint Polynomials

Flint's integer polynomial class is the `fmpz_poly` class. Flint, being a C library also provides a C++ wrapper for most of it's classes. In our case, it's the `fmpz_polyxx` class. As discussed last week, the arithmetic operators for the class have already been overloaded and it can be seamlessly used with the base class which is already set up.

Internally, flint uses a dense representation of polynomials. What this means is that the coefficient for each degree in the polynomial are stored in a vector. This is in contrast to a sparse approach which deals stores only non-zero coefficients of a polynomial in a dictionary. Flint also uses it's own integer class as the coefficient type. Flint's integers are basically similar to GMP integers, and also follow the same naming conventions. (eg. `fmpz_t` is analogous to `mpz_t`) They have internal optimizations to make them faster for use within the flint library itself. Flint does not provide the option to use a custom integer class as the type of coefficients like Piranha does.

All the work related to flint polynomials can be seen in [#971](https://github.com/symengine/symengine/pull/971). The majority of the PR concerns introducing a new class `UIntPolyFlint` and all the necessary functionality like `__hash__`, `eval` and `compare`. Test cases have also been added, to see if the polynomial manipulation is working as intended. There is some additional minor work done here apart from this class introduction.

The polynomial base class now has three methods :

```c++
static Poly from_container()
static Poly from_dict()
static Poly from_vec()
```
These methods are, as indicated from their names, used to construct the polynomial from any of the three sources. So, for example to construct a `UIntPolyFlint`, you can : 

```c++
PolyFlint a = PolyFlint::from_container(fmpz_polyxx A);
PolyFlint b = PolyFlint::from_vec(vector<integer_class> B);
PolyFlint a = PolyFlint::from_dict(map<uint, integer_class> C);
```

### `integer_class` Conversions

Another issue was that methods like `eval` must return integers of `integer_class`. Thus, we needed functions to convert `fmpzxx` to any of the 4 possible integer classes used by SymEngine. The 4 integers used by SymEngine are :

```
1. mpz_class         The default C++ class provided by GMP
2. mpz_wrapper       SymEngine's wrapper around GMP's mpz_t
3. piranha::integer  Piranha's integer class
3. fmpz_wrapper      SymEngine's wrapper around Flint's fmpz_t
```

We, might even require such conversion for Piranha polynomials. So, I generalized this and made `to_integer_class()` which takes in either `flint::fmpzxx` or `piranha::integer` and returns an `integer_class`. There was a small discussion on where these functions should be placed, with Isuru which was insightful. Basically, what I was doing earlier caused a considerable [increase](https://github.com/symengine/symengine/pull/971#issuecomment-223743950) in compilation time, which was later corrected. An example of one such function is : 

```c++
#if SYMENGINE_INTEGER_CLASS == GMP || GMPXX
#ifdef HAVE_SYMENGINE_FLINT
inline integer_class to_integer_class(const flint::fmpzxx &i)
{
    integer_class x;
    fmpz_get_mpz(x.get_mpz_t(), i._data().inner);
    return x;
}
#endif
#endif
```

A `get_coeff()` function was also added to the polynomial base is a much needed function for any polynomial manipulation.

### Miscellaneous Work

There were some changes done to the polynomial structure before the flint polynomials were introduced. Constructor of the polynomials from vectors was removed, as it wasn't required. And a `from_vec` was added for the SymEngine polynomial dictionaries `UIntDict` and `UExprDict`. The changes can be seen here [#965](https://github.com/symengine/symengine/pull/965/).

In Travis CI builds, SymEngine was using flint-2.4.4 from a static location. There's a [bug](https://github.com/wbhart/flint2/issues/217) that I encountered using this version, which dealt with incorrect header declaration in one of the flint files. Now, we clone the flint repository from  [wbhart/flint2](https://github.com/wbhart/flint2/) to use in the CI builds. The change is in [#973](https://github.com/symengine/symengine/pull/973).

I'm working on wrapping Piranha polynomials next week. After that is done, I plan to start getting higher level functionality like `gcd` and `factorize` ready.

Ciao!