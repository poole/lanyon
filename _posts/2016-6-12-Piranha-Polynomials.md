---
layout: post
title: Piranha Polynomials & Iterators
---

### Overview

I worked on wrapping Piranha polynomials within SymEngine this week. It felt much more interesting than wrapping Flint polynomials, mainly because I was reading the Piranha's source and was in direct touch with the  author of the library. Many thanks to [@bluescarni](https://github.com/bluescarni) who helped me getting familiar with it. As before, I'll briefly summarise the work I did this week along with my progress.

### Piranha Polynomials

Piranha's polynomial class is the `piranha::polynomial` class. It's templatized as follows:

```c++
template<typename Cf, typename Key>
class polynomial : power_series< ... >
```

There are two major differences about Piranha Polynomials and SymEngine polynomials. Firstly, it uses a custom unordered map implementation called `hash_set` for storing it's degree-coefficient pairs. `hash_set` has been internally optimized for polynomial manipulations in general. On a side note, this makes SymEngine have all three types of polynomial representations too! Secondly, Piranha does not distinguish between univariate polynomials and multivariate polynomials. All polynomials are multivariate polynomials, univariate polynomials being a special case (with just one element in it's `symbol_set`).

Here, `Cf` is the class for storing the coefficients, while `Key` are the monomials themselves. Unlike Flint, we can use any integer class as the coefficient class for the polynomials. So, the first question was wether to use `piranha::integer` (and use implicit conversions like I did in Flint polynomials) or `SymEngine::integer_class` as the integer class for Piranha polynomials. After a brief discussion with Isuru, we decided to go with SymEngine's integers. The `Key` class used is `piranha::monomial<uint>`, which means it will store one `unsigned int` per symbol (representing the degree, in each monomial). 

### SymEngine's integers in `piranha::polynomial`

For an integer class to be usable as the `Cf`

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

header files 


Laters!