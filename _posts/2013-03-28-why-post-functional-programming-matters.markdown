---
layout: post
title: "Why Post-Functional Programming Matters"
date: 2013-03-28 20:37
comments: true
external-url:
categories: Software
---

> The limits of my language mean the limits of my world. -- Ludwig Wittgenstein

Computer (and computing) science (CS) is a very peculiar field of research when compared to other sciences, particularly concerning themes such as *software engineering* and *system's architecture*. For starters, it has little more than 80 years, which puts it into an interesting proposition when compared to Physics or Mathematics: having a "conversation" with key personalities is not that unrealistic. Unlike Aristotle, Isaac Newton or Albert Einstein, many of the "genius" behind computer science are still living among us; a gentle evidence of its youth.

On the other hand, the liberal use of the term "science" (even *engineering* as in *computing engineering*), makes our Physics friends flinch at our day-to-day methodology. We don't calculate programs. We don't derive implementations. And when something goes wrong, our assessment method is so empirical that it would be equivalent to building a copy of the failed bridge, and observe bolt by bolt -- with intuition (and stack dumps) guiding which bolts to observe first -- hoping to find the one that fails. This arguable "lack of scientific rigour" is well reflected when Donald Knuth wrote one of the most rigorous treatises on computer science, and decided to call it "*The Art of Computer Programming*" [^1].

  [^1]: Where Knuth lift the status of *Art* to the mere act of reading his work.

But this constant attitude towards the synthesis of programs doesn't mean that development cannot be made more *rigorous* [^12], or at least more *scientific* or *closer to the exact sciences*. The hacker way of *coding first, asking questions later* is more due to the *attractiveness* of computers as a *creation tool* than to any inherent property (or limitation) of the field. Researchers and professionals of the so called *critical systems* had demonstrated this possibility years ago, with the aid of *formal methods* [^2]. Much of this research builds upon a rigorous abstraction of *computability* and *language*, and is known as Lambda Calculus. Formalized circa 1930, it has enabled the research on the behaviour of computational systems, the creation of predictive models of its properties, and to uncover high-level patterns of computation that abstract irrelevant details and empower the creation of even more complex systems. That's what happens when you use mathematics, and that's what makes a science... well... *scientific*; much more important than the capability of explaining current observations, is the ability to "predict" yet unobserved phenomena.

  [^12]: People seem to mistake rigorous with rigid. The former implies rules, while the later implies resistance to change.

But we don't need to go into "heavy" formal systems, such as Coq or Isabelle, to reap the benefits of mathematics, and still have a practical framework to build and deploy products [^3]. In fact, the 1950s gave us such tool: LISP [^4].

  [^2]: Before most readers run away upon gazing the words "formal", please consider than I am a professor of Agile Methodologies, so bear with me for a while :-)

  [^3]: I would argue we "shouldn't", unless we are hardcore researchers is those topics.

  [^4]: And yet before another exodus *en masse*, do please consider that Java and C# are also part of my courses' syllabus.

Notwithstanding, most of the tools that we use today are not LISP based. But most are C based, and despite the fundamental differences Alan Kay introduced with Object-Oriented languages, they are (still) an imperative variant. And with imperative languages, any relation between the math behind the problem, and the implementation artifacts (source-code), is the sole responsibility of the developer. We know the mathematical model behind the QuickSort algorithm, and of the binary search in a list. But none of these relations "emerge" when we contemplate (or glance) at its source-code in C. It is, in its most fundamental sense, a list of commands that a system "rigorously" obeys [^5], though it represents an extremely close model of what the CPU is doing, and as such it has enjoyed outstanding run-time performance and massive adoption [^6].

  [^5]: Obeying rigorously doesn't make the act rigorous.

  [^6]: These reasons are no longer true; today's compilers are much more efficient at producing assembly code than an human is, due to the magic of out-of-order execution, caches, pipelines, multi-cores and SIMD instructions.

On the other end of the spectrum there are the LISP (and ML) variants and other Lambda-Calculus inspirations. This isn't about a mere syntactic preference, favouring parenthesis `()` over brackets `{}`. This is about a fundamentally different perspective, where programs no longer manipulate *memory* nor define their own *flux*, but are more regarded as algebraic equivalences and substitution of symbols, where *memory* and *flux* are implementation details of the machine. These languages are called *functional* because they focus on *verbs*, on functions and composition; *mathematical* functions as *transformations* and *relations*, in contrast to imperative languages that focus on *nouns*, on things, what they are, and their corresponding capabilities.

But discussing programming languages is hard... We know that people tend to *defend* their choices by considering language criticism a personal attack on themselves, and stay inside their comfort zone. Discussing programming paradigms is even more difficult; the typical Java developer may be opinionated about C#, but it will probably be very defensive against... say... Erlang or Haskell. Endless discussions over parenthesis or commas will spring to life. Code readability (whatever that is) will be summoned. Even the categories of *average programmers* and *real-world programs* will be promptly accepted as axiomatic facts of daily programming. Irony and sarcasm will reign, such as the recent dichotomy of programming being either "math" or "interpretative dance" [^35].

  [^35]: See [this](http://nescala.org/2013/talks#47).

So why give a 60 year old concept any importance? The above was tried and claimed years ago, and yet, imperative (and OO) languages are now the norm. Perhaps once we understand what Functional Programming enables us to do today (instead of discussing semantics over what it is), we will come to understand what Paul Graham once said [^36]:

> ... the short explanation of why this 1950s language is not obsolete is that it was not technology but math, and math doesn't get stale. The right thing to compare Lisp to is not 1950s hardware, but, say, the Quicksort algorithm, which was discovered in 1960 and is still the fastest general-purpose sort.

  [^36]: Another key personality that made such bold assertions was turing laureate Alan Kay, the father of Object-Oriented programming, who once said he regarded LISP as the "Maxwell’s Equations of Software" (see [this interview](http://queue.acm.org/detail.cfm?id=1039523)).

So, without much ado, here's the top 5 reasons *Why (Post-)Functional Programming Matters* for the ad-tech companies [^31]:

  [^31]: There are countless many other reasons, not necessarily exclusive of FP, some of which are highly technical and out of scope of this article. For the curious, read about *unified type systems*, *type inference*, *anonymous functions*, *closures*, *immutability*, *lazy evaluation*, *delimited continuations*, *higher-order functions*, *higher-kinded types*, *nested functions*, *currying*, *pattern matching*, *algebraic data types*, *tail recursion*, *partial functions*, *structural types*, *dependent types*, *explicitly typed self references*, *type bounds*, *variance*, *type annotations*, *type views*, *type classes*, and follow the white rabbit...

### Reason N. 5 They scale! ###

> The way the processor industry is going, is to add more and more cores, but nobody knows how to program those things. I mean, two, yeah; four, not really; eight, forget it. -- Steve Jobs

Pick a software architect -- any architect that has drawn large-scale software systems --- and ask her about design and architectural patterns, say *Pipes and Filters*, *Client-Server* or the *Observer* pattern; she'll undoubtedly tell you is that they are now accepted as an invaluable tool to create, communicate and document the orchestration among the myriad of components in a large system. The legacy we inherited from Gamma *et al.*, heavily inspired in the works of Christopher Alexander [^7], goes well beyond the mere catalogue of recurrent designs. It gives us a framework to capture and systematize empirical knowledge, to uncover new relations and to think at higher levels of abstraction.

[^7]: A mathematician and civil architect.

But these "classic" patterns lack something of a greater value too: they lack the mathematical formalism that allows one to *reason* about their structure and their interactions [^27]. Let me tempt you with an example. Consider both the set of natural numbers and an operation (such as sum) over them; there are a lot of *properties* about the sum. First, sum is an endofunction, which is a funny way to say that if you sum two natural numbers, you get a natural number as a result. It also has the so called *neutral* element: if you sum something with zero, you get back the same number. Sum is also an associative operation; `(1+2)+3` is equivalent to `1+(2+3)`. These properties -- an associative endofunction with an identity -- form what is known as a *monoid* [^15].

  [^27]: Lacking something of value doesn't make a thing worthless.

  [^15]: If we also consider the inverse of addition (subtraction), then we have a *group*.

There are endless monoids over endless types of structures. String concatenation, for example, form a *monoid over strings* (with the identity being the empty string). One can simply regard the fancy name *monoid* as a "pattern" of structures; but a different type of pattern in the sense that it is strictly defined [^10].

  [^10]: Mathematicians may even argue that *these* are the true type of patterns.

Now your question should be: what does this matter to me, or to the construction of advertising systems? Very simple. Monoids (being associative) enjoy a very interesting property: they scale! Because `(a+b+c+d)` is the same thing as `(a+b)+(c+d)`, you can send the first part `(a+b)` to a machine, and the second part `(c+d)` to another machine. The two operations can then execute in parallel, and their result can be merged by yet another machine [^14]. This is very close to the fundamental ideas beyond the *mapreduce* model, recently popularized by Google's implementation, and as you can see, you don't really need to rely on such specific technologies to reap the same benefits [^9].

  [^14]: Another cool property (this one given by *groups*) is that there are some operations that cancel each other; if you sum and then subtract the same number, you come back to where you've started. In a more general sense, if your functions form a group, then you've just gained some optimisation techniques *for free*.

  [^9]: Mapreduce is actually a very good lesson on how people are easily attached to labels. A few years ago, even before "big data" became the buzzword it is today, everyone in the ad space  thinking on "big" data was talking about mapreduce. However, and despite its fundamental principles being mostly those of functional programming, many developers that loved mapreduce simultaneously loathed anything related to FP. Today's hype in big-data is *Hadoop*. Go figures...

So Functional Programming scales, because it allows the programmer to scale. It brings a multitude of powerful abstractions, which not only avoids re-inventing the wheel, but allows a more "precise" reasoning over programs, its properties and their resulting quality.

### Reason N. 4 They really scale! ###

> The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time. -- Tim Cargill

Software is more than just writing code. It's debugging code! And there's a root to all evil when it comes to debugging: *mutability*. I once spent hours of trying understand why a certain program ceased to function if I executed it step-by-step, but worked OK if I just jumped over the function. The problem? The debugger window was displaying the local variables and some good, well-intended soul, decided to override a getter to cache the result. And that specific getter function was crashing the application.

But there's more... If we never know when objects will change, we can't possibly know if removing an apparent superfluous call, or changing the order of execution, will output the same behaviour [^11]. We've all seen this taken to the extreme in dynamic languages such as JavaScript. Undefined functions and fields springing to life, because some previous call defined and re-defined them. A living hell to debug. [^8]

  [^8]: Some people, when confronted with a problem, think: hey, I can solve this with reflection. Now they have two problems. As with every tool, meta-programming is not a free lunch.

  [^11]: There's something very dysfunctional in the way dynamic OO programming deals with mutability. On one hand, the whole idea behind OO is that (inner) details don't matter. A car is a car, and it has the functionality expected from a car. You "ask" the car to start, accelerate, break and stop. It's a powerful concept particularly when coupled with abstraction; every vehicle should adhere to this *interface* of accelerating and breaking. What really spoils everything is that you never know when a Car will start behaving differently the second time you look at it. Now, what you can argue -- and I concur -- is that there's something here associated with *scale*: big things (like cars or databases) are expected to change internally. But a *clog* is not. And when clogs suddenly transform into valves...

Functional Programming scales, because it gives better guarantees about the behaviour of your programs. They are easier to test, because they are more "isolated" in a certain sense. But much more important it empowers safer redesign and re-factoring; it makes program more resilient to change!

### Reason N. 3 They scale even if you do nothing about it! ###

> A programming language is low level when its programs require attention to the irrelevant. -- Alan J. Perlis.

Now imagine if pieces of programs could be regarded as *pure*, i.e., having absolutely no side effects. What would this mean?

If parts of a program are pure, then one can rearrange the order of their execution. They won't rely on any context, besides the parameters one passes to them. This key idea of FP is called "referential transparency"; functions do not behave differently the second time you look at them: you give the same inputs, you get the same result. A trivial idea with profound implications, because if there's absolute guarantee that changing the order of execution will produce the same results, then one gains scalability for free, by, for example, executing different parts of the program in different threads or machines.

But there's more to purity than inherent parallelization; things that *really pure™* functional languages [^16] take advantage of: *laziness* and *memoization*. Avoiding the risk to incur in a large technical debate over the advantages and disadvantages of such techniques, let us just state what they *provide*, and leave to the reader the decision over their suitability for the ad-tech industry.

  [^16]: Purity, as with so many other qualities, comes in sizes.

Laziness and memoization could be translated to two obvious principles: "*don't compute something until you need it*" and "*don't recompute something you have computed before*". Though trivial principles, the programmer usually has to be aware of them throughout the code; here's a list, multiply the elements by two, give me the first one. Wait... why don't I just take the first one, and multiply it by two?

And what about loading a webpage? Show me the first article (written in markdown); translate it to HTML. Show me again the first article; translate it again... A thousand of users requesting to view the first article; a thousand of translations of exactly the same content. Hmmm... Maybe we should once and for all translate the first article and store it somewhere? Let's throw in a cache.

Suffice to say that FP -- particularly due to the principle of "referential transparency" -- provides the ability to tackle those concerns at the compiler level. A sufficiently advanced compiler can even achieve much of that for us... automatically; it may not throw in a cache, but it will easily memoize the results of a function whose parameters are *always the same*. FP scales even when you don't make a deliberate effort for that.

### Reason N. 2 They provide a new kind of glue ###

> Such a catalogue of "advantages" is all very well, but one must not be surprised if outsiders don't take it too seriously. It says a lot about what functional programming isn't (it has no assignment, no side effects, no flow of control) but not much about what it is. The functional programmer sounds rather like a mediæval monk, denying himself the pleasures of life in the hope that it will make him virtuous. -- John Hughes

So far it seems that if we strip other languages from features such as mutability and control flow, then we would have the same benefits of functional programming, without the hassle of learning a new language. Hence, the question remains: *why should we care to learn FP in the first place?*

Flashback circa 1968. We are near Garmisch Germany, and NATO is holding *the* seminal conference on "Software Engineering". So far everyone seems to agree on one particular conclusion: software is in *crisis*. Projects are running over-budget, over-time, and with low quality. They are inefficient, they don't meet the requirements, their code is difficult to maintain. Some software isn't even delivered... ever! They realized all this *before* Windows™ was presented to the world. [^18] Forty years later, what have we learned? [^19]

From the several ideas there discussed, one of them looked at computer software as they looked at complex electronic systems: software should be *componentized*, i.e., built from prefabricated components [^20]. Powerful idea! In the subsequent years, we saw the appearance of Unix's Pipes and Filters, Objective-C, OLE, COM and the concept of *Frameworks* in general.

On the object-oriented side, a similar race gave us the *AbstractSingletonProxyFactoryBean*... whatever that is. [^21]

The crux of modularization is a two-step process: (1) you first divide your problem into sub-problems, and then (2) you combine (glue) the results. You can look at this like an electronic circuit; you separate your problem (a computer) into sub-problems (CPU, Memory, GPU...) and then you provide the glue (copper circuits and wires that roughly match inputs with outputs).

What happens when you provide the wrong kind of glue, say, plastic instead of copper, or wire an input to another input? Best-case scenario: it doesn't work. [^22]

Another (different) way to view modularization is like a big puzzle. Pieces have a *shape* and they only *compose* if their shape match. If done correctly, you are kept safe from combining components that don't talk to each other, simply because their shape doesn't allow it. This is akin to the experience given by (strongly-typed) functional languages. [^23] Instead of declaring capabilities of objects, you define *transformations* that accept *things* of a particular shape. For example, to filter out elements of a container structure, you don't really need a function for every kind of containers out there (Lists, Trees...) As long as the structure you're providing has the *shape* of something that can be iterated over, then you simple iterate ruling out objects that don't match your filter. [^24]

Functional programming provides new kinds of glue, such as *higher-order functions*, *function composition*, *point-free definitions*, *type-classes* and *higher-kinded types*. Some languages can even check these "glues" at compile time, making your program safer. You write less code, you reuse more, and it keeps you from reinventing the *square wheel*.

Again, consider the number of components an ad-tech platform now comprehends, yield managers, ad decision logic, RTB clients, forecast engines, logging, campaign optimizers, and you'll understand why improving modularization (and making sure they fit with each other) is a crucial step in the industry.

  [^18]: Perhaps not a fair joke, but I couldn't resist :)

  [^19]: Actually, we learned a lot; we now know that requirements are expected to change, and that gave us *Agile Methodologies*. We know that Moore's Law is coming to an end, and that gave us *Parallel Programming*. Quality is important, and that gave us *Test-Driven Development*. We also know that a suitable algorithm is orders of magnitude better than "premature optimization"... But, we *kinda keep forgetin'* about all that.

  [^20]: Doug McIlroy, *"Mass Produced Software Components"* in Proceedings of Software Engineering Concepts and Techniques, 1969.

  [^21]: "*A convenient proxy factory bean superclass for proxy factory beans that create only singletons.*" (see [here](http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/aop/framework/AbstractSingletonProxyFactoryBean.html) and [here](http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/beans/factory/BeanClassLoaderAware.html)).

  [^22]: Worst-case scenario, it explodes in your face.

  [^23]: In nature, proteins also act in a similar fashion: they bind to other molecules due to their "shape".

  [^24]: This simple notion of filtering a collection is a nuisance in most imperative programming languages. Not only most of them can't even return the same collection type (e.g., in C# you start with a *List* and end with an *IEnumerable*), but the filter implementation is repeated *for every kind of container*.

### Reason N. 1 Because it's cool ###

> C is quirky, flawed, and an enormous success. -- Dennis M. Ritchie.

Much of the above was known more than twenty years ago, at a time where C was the *de-facto* king of programming languages. And yet, here we are, claiming again and again the advantages of functional programming. What really changed? Is imperative programming just getting old? Is Functional Programming becoming a hype?

The fact that C was a huge success is (arguably) a mystery [^26]. C is (was) well-known, widely adopted by both the industry and the academia, and hence enjoyed an incredible amount of scrutiny. A huge amount of C libraries and frameworks became promptly available in the wild. Yes, everyone knew C wasn't perfect. In fact, C's unsafe type system was an imminent disaster. Turing award laureate Tony Hoare once called the "null reference" [^25] its billion-dollar mistake. And yet, even today, C ranks second in the Tiobe popularity index. Why?

  [^25]: In fact, he was talking about Algol, to which C owes its roots.

  [^26]: A kind of mystery like the [video-tape war](http://en.wikipedia.org/wiki/Videotape_format_war).

Perhaps the keyword here is *establishment*. All those frameworks and libraries and tools built for C (in C) made it the number one choice. People didn't even think for a second. If C is popular, and has *everything* I need, why choose another language?

Of course, the fallacy lies in the definition of "need"... Notwithstanding, there's a bitter lesson here, learned the hard way by Haskell proponents: if you fail to provide the *complete experience*, it really doesn't matter how good your product is.

So what changed?

We've now come full circle to the title of this article. Maybe some of you have been wondering about the usage of the prefix (post-) in post-functional. What is different today from what we had 20 years ago, is that the functional paradigm is no longer relegated to obscure, academic corners, whimsically forcing you out of your comfort zone.

Instead, what we are now observing is a merge between object-oriented and functional languages, at different degrees of realization. At the lowest level, we see the latest version of the C++ standard (0x11), incorporate the notion of lambdas and function objects. The same is true for Java 8, and was true for C# 2.0 and all its subsequent versions. And it's not just higher-order functions. In Biancuzzi's book "Masterminds of Programming", we can read Anders Hejlsberg (lead C# developer) rant on how the future of the language lies in adopting FP techniques to cope with multi-core/parallel programming. We may even go as far as Microsoft's release of F# as a first-class language for the "big-data" industry [^28], that runs on top of the CLR.

And finally we have Scala. A language created by Prof. Martin Odersky, that fuses object-orientation and functional programming at their most fundamental level. Its secret? It runs on top of the Java Virtual Machine (JVM), and seamlessly interoperates with existing Java libraries and frameworks. It was specifically designed for scaling at large, and has enjoyed several successful adoption stories in the industry, including Twitter, LinkedIn, Foursquare, and The Guardian, just to name a few. "*Functional Programming Principles in Scala*" [^29], an MOOC held by Coursera, had more that 50.000 students registered, becoming one of the most successful on-line courses. It's not hard to conclude that, if *these* players are using Scala, maybe one should keep an eye on it.

  [^28]: I'm deliberately incurring into an "appeal to authority" fallacy.

  [^29]: See [this](https://www.coursera.org/course/progfun).

So, post-functionalism is about realizing that the *ecosystem* matters. Instead of trying to get people out of its comfort zone, it brings those features into what people are comfortable with [^30]. Post-functionalism is about realizing that *both* object-oriented and functional programming can contribute to a new (merged) *thing*: OO is an excellent tool to design "components", the outward limits of systems, while FP provides an invaluable tool to express its inwards. This thing is *object-functional* programming.

  [^30]: To be completely honest, functional-programming also comes riddled with mathematical jargon and category-theory concepts that may make your head explode. Your mileage may vary...

(Post-)Functionalism is now a reality. To some extent, it doesn't really matter if you've been evangelized by this article. I've claimed that (post-)functional programming will give you better, more robust, more scalable, more modular programs. It would make you better cope with the specific needs of the fast growing industry that is the *ad-tech*, because the issues *ad-tech* has (high-availability, high-scalability, robustness, fault-tolerance, adaptiveness) *are* the issues that FP learned to solve decades ago. But, perhaps, the most pragmatic reason why post-functional programming *matters* is because you will no longer be able to ignore it.
