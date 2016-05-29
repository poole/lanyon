---
layout: post
title: Wrap a lot
---

### Overview

As I pointed out in last week's post, I have begun my work on the wrapping aspects of my project. The final aim of wrapping the polynomial class is to provide users with the option of using specialized polynomial libraries like Flint and Piranha.

Right at the beginning of the project, I was lacking the basic idea of how the wrapping will work. Mostly I was confused by the fact that we have to right common code for all the libraries (SymEngine, Flint & Piranha) with the problem being, each of the these libraries have different internal representation and methods. By the end of the week, thanks to Isuru, I have much more understanding of the desired structure of the code. Here's a short summary on how it will work.

### Polynomial Base
There will be four end (derived) classes. `UIntPoly` & `UExprPoly` (the SymEngine) polynomials, `UIntPolyFlint` and also `UIntPolyPiranha`. Each of these classes derive from the base class called `UPolyBase`. Now the base class must have methods and members which can be used commonly by each of the derived classes. Thus, the base class should have two members, the `var` which depicts the variable of the polynomial and a `container` which contains the data about the polynomial (basically the coefficients corresponding to each degree).

This is skeleton of how the classes should look like :

```c++
template <typename Container>
class UPolyBase
{
	Symbol var;
	Container container;
}

// the derived polynomials
class UIntPolyPiranha : UPolyBase<piranha::polynomail>
class UIntPolyFlint   : UPolyBase<flint::fmpz_polyxx>
```

### SymEngine's Container

The containers of the Flint and Piranha will be discussed in detail in the upcoming weeks. We now had to think about what the container must be for SymEngine. Also we have to merge as much functionality as possible. I saw that both the external libraries had operators overloaded for addition, subtraction, multiplication and division. So, methods like `add_poly` and `sub_poly` etc. could be made common in the base class itself if I implemented a container for holding SymEngine polynomials which also has it's operators overloaded. 

I was not familiar with the symbolic side of the polynomials, and found out that a container had already been made for `UExprPoly` called `UExprDict`. The class was nothing but a wrapper around `map<int, Expression>`. It had overloaded methods for addition, subtraction etc. So, technically this dictionary was storing all the information about the polynomials. I just had to create another similar wrapper for `map<uint, integer_class>` for the integer counterpart of the polynomial class. This resulted in [#946](https://github.com/symengine/symengine/pull/946) and Isuru mentioned that most of the code for both these dictionary wrappers is about the same! So, I decided to make a base class for polynomial dictionary wrappers and both of these can inherit from that. Any different implementations (like `*=`) can be overridden in the derived class if needed.

The ordered map base looks like :

```c++
template <typename Key, typename Value, typename Wrapper>
class ODictWrapper
{
    std::map<Key, Value> dict_;

    friend Wrapper operator-(const Wrapper &a, const Wrapper &b)
    {
        Wrapper c = a;
        c -= b;
        return c;
    }

    Wrapper operator-() const
    {
        ODictWrapper c = *this;
        for (auto &iter : c.dict_)
            iter.second *= -1;
        return static_cast<Wrapper &>(c);
    }

    ....
}

// the derived wrappers
class UIntDict  : ODictWrapper<uint, integer_class, UIntDict>
class UExprDict : ODictWrapper<int, Expression, UExprDict>
```

### Finishing the class

After the containers for SymEngine were complete, I started implementing the polynomial base class, from which the two current polynomial classes will inherit. The class turned out to be very similar to the prototype described above. Accessor methods were added and basic polynomial functions were added [#951](https://github.com/symengine/symengine/pull/951).

All we have to do now for functions like `add_poly` is use the overloaded operators on the containers. Also, template argument deduction will automatically allow us to call the functions directly on two same polynomial types.

An example of a common template function for addition :

```c++
template <typename Poly>
RCP<const Poly> add_upoly(const Poly &a, const Poly &b)
{
    auto dict = a.get_poly();
    dict += b.get_poly();
    return Poly::from_dict(a.get_var(), std::move(dict));
}
```

and how easily it can be used :

```c++
A = uint_poly("x", {(0 : 1), (1 : 2)});	// 2*x + 1
B = uint_poly("x", {(2 : 2)});			// 2*x**2

C =  add_upoly(*A, *B);
```

### Miscellaneous Work

The names of the classes I refer to here are the new names. The old names were a little unintuitive, so decided to change them, along with introducing a new subfolder in the repository to hold all code related to polynomials (and their tests). Some code was also shifted to places more apt, all changes can be seen here [#960](https://github.com/symengine/symengine/pull/960).

There are a small number of miscellaneous changes that need to be worked out in the overall structure, here they are [#962](https://github.com/symengine/symengine/pull/962).

More on this and Flint next week! Goodbye!