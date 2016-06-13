---
layout: post
title: Piranha Polynomials & Iterators
---

### Overview

I worked on wrapping Piranha polynomials within SymEngine this week. It felt much more interesting than wrapping Flint polynomials, mainly because I was reading the Piranha's source and was in direct touch with the  author of the library. Many thanks to [@bluescarni](https://github.com/bluescarni) who helped me getting familiar with it. As before, I'll briefly summarize the work I did this week along with my progress.

### Piranha Polynomials

Piranha's polynomial class is the `piranha::polynomial` class. It's templatized as follows:

```c++
template<typename Cf, typename Key>
class polynomial : power_series< ... >
```

There are two major differences about Piranha Polynomials and SymEngine polynomials. Firstly, it uses a custom unordered map implementation called `hash_set` for storing it's degree-coefficient pairs. `hash_set` has been internally optimized for polynomial manipulations in general. On a side note, this makes SymEngine have all three types of polynomial representations too! Secondly, Piranha does not distinguish between univariate polynomials and multivariate polynomials. All polynomials are multivariate polynomials, univariate polynomials being a special case (with just one element in it's `symbol_set`).

Here, `Cf` is the class for storing the coefficients, while `Key` are the monomials themselves. Unlike Flint, we can use any integer class as the coefficient class for the polynomials. So, the first question was wether to use `piranha::integer` (and use implicit conversions like I did in Flint polynomials) or `SymEngine::integer_class` as the integer class for Piranha polynomials. After a brief discussion with Isuru, we decided to go with SymEngine's integers. The `Key` class used is `piranha::monomial<uint>`, which means it will store one `unsigned int` per symbol (representing the degree, in each monomial). 

### SymEngine's integers in `piranha::polynomial`

For an integer class to be usable as the `Cf` it should have some basic properties like, default constructibility, copy constructibility, `nothrow` destructibility, `nothrow` move assignability and `nothrow` move constructibility. As of yet, `mpz_wrapper`, `fmpz_wrapper` and `mpz_class` did not pass the `nothrow` checks. All that had to bee done was that I had to add `noexcept` to the wrappers we had already written. This allowed `mpz_wrapper` and `fmpz_wrapper` to be used as coefficients in Piranha polynomials. Ofcourse, Piranha's own integer class passes all these checks too.

Currently, there is no solution for having `mpz_class` as the coefficient class for polynomials. Firstly, these gmpxx integers methods have not been marked `nothrow` yet. There is a forum [post](https://gmplib.org/list-archives/gmp-devel/2016-April/004271.html) on how it can be added, and actually has been added in the development version but hasn't been released yet. Another reason  is that `mpz_class` uses [expression templates](https://en.wikipedia.org/wiki/Expression_templates) for improved performance. This means that unlike normal integers, any arithmetic operation does not necessarily return the same integer class.

```c++
int a, b;
is_a<int>(a+b); 		// true

mpz_class a, b;
is_a<mpz_class>(a+b);	// false
```

The reason it cannot be used within Piranha is that Piranha checks the coefficient type after each operation so that it knows what [ring](https://en.wikipedia.org/wiki/Polynomial_ring) the polynomial belongs to. Here, it will be unable to detect what the ring is, as the returned coefficient will be an expression template. Thus, it was decided that the integer class `mpz_class` can't be used alongside Piranha with SymEngine. So, the following became invalid, on which a warning is thrown and the class is changed to `mpz_wrapper` :

```
cmake -DWITH_PIRANHA=yes -DINTEGER_CLASS=gmpxx
```

All the work on Piranha polynomials and the `cmake` changes can be found in [#980](https://github.com/symengine/symengine/pull/980).

###Iterators

Currently this is what the `print` functions for our univariate integer polynomials looked like : 

```c++
string print(const UIntPoly& p)
{
	for(auto it = p.dict_.begin(); it != p.dict_.end(); ++it)
	{
		// use it->first and it->second
	}
}

string print(const UIntPolyFlint& p)
{
	for(auto it = p.degree(); it >= 0; --it)
	{
		// use it and p.get_coeff(it)
	}
}
```

These methods are very similar and do not deserve to be separate functions. All that was needed to unify these methods was to have iterators for each of the three classes, and then we can have use the same code for many functions like `print`, `as_symbolic` and `derivative`. This also called for a new base class to be made, `UIntPolyBase` from which these three integer polynomials inherit and it itself inherits from the original base class `UPolyBase`.

I stuck with the syntax of `it->first` and `it->second` for the unified iterators. Which means `operator*` needed to return a `std::pair<uint, integer_class>`. So, for SymEngine polynomials all I needed to do was return iterators to the internal dictionary and that was it. Not going into too much technicality, for Flint and Piranha I used custom iterators which had `operator++` defined on them and returned a pair whenever `it->` or `*it` was called on them. They basically iterated over the degree and returned only for non-zero coefficients for both the libraries. The actual implementation of the iterator scheme can be seen in [#985](https://github.com/symengine/symengine/pull/985).

Initially I was happy with this approach as I was able to write (unifying the three) :

```
string print(const UIntPolyBase& p)
{
	for(auto it = p.dict_.begin(); it != p.dict_.end(); ++it)
	{
		// use it->first and it->second
	}
}
```

Isuru pointed out that instead of returning the `integer_class` in the pair, we should return a reference to it. Now, this made sense but was a bit tricky to implement. Also the iterator could no longer return reference like `const integer_class&`, as Flint did not even store it's coefficients as `integer_class`. To tackle this, another template parameter had to be added to the custom iterator class which determined the second term of the pair (which was supposed to be the reference to the coefficient in the internal storage of the polynomial). Also, I had to dig in to the Flint documentation and ask Piranha's author, for knowing how I could get `const` references to the coefficients in internal storage. After this was finally implemented, there was a new `get_coeff_ref` method, which does not copy but returns a reference to the required coefficient. The only downside to all this was that instead of `it->second` I had to use `to_integer_class(it->second)` everywhere in the common functions.

### Miscellaneous Work

I saw that in SymEngine, there were lots of redundant header file includes in many files. I wrote a short python script which makes a header dependency tree, and automatically removes header includes which are not needed. After some manual inspection of the changes I pushed in [#981](https://github.com/symengine/symengine/pull/981). It was really amazing to see the script flag more than 500 lines of redundant includes. The PR has not been merged yet, though.

I will be working on higher level functionality like `gcd` in the coming week. Will keep you guys posted.

Laters!