---
layout: post
title: Exercises in Program Design by Calculation
date: 2017-01-25 18:28
comments: true
external-url:
categories: Mathematics
---

Below you can find some examples on correctness checking and derivation through calculation of simple programs. These exercises are part of the _Formal Methods in Software Engineering_ course given at the _Masters in Informatics Engineering_ at the _Faculty of Engineering, University of Porto_.

---

Find the _Weakest Precondition_ of the following:

1.1. $\\{wp\\}$ `b:=c+1; a:=c+2` $\\{c<b ∧ b<a\\}$

$wp($`b:=c+1`, $wp($`a:=c+2`, $c<b ∧ b<a))$ <br/>
$≡$ { Successive application of the assignment `:=` rule } <br/>
$wp($`a:=c+2`, $c<b ∧ b<a) → c<b ∧ b<c+2$ <br/>
$wp($`b:=c+1`, $c<b ∧ b<c+2) → c<c+1 ∧ c+1<c+2 ≡$<span class='bghighlight'> $\text{True}$ </span>.


1.2. $\\{wp\\}$ `if (a>b) then c:=a` $\\{ c=\text{max}(a,b) \\}$

If we assume this definition:

$$\text{max}(a,b) ≜ \begin{cases} a &\mbox{if } a > b \\
b & \mbox{if } a ≤ b \end{cases}$$

It follows that:

$wp($`if (a>b) then c:=a`, $c=\text{max}(a,b))$ <br/>
$≡$ { By the `if` rule } <br/>
$a>b ∧ wp($`c:=a`, $c=\text{max}(a,b)) ∨ a≤b ∧ wp($`skip`, $c=\text{max}(a,b))$ <br/>
$≡$ { Assignment `:=` and `skip` rule } <br/>
$a>b ∧ a=\text{max}(a,b) ∨ a≤b ∧ c=\text{max}(a,b)$ <br/>
$≡$ { By the definition of $\text{max}(a,b)$ } <br/>
$a>b ∧ a=a ∨ a≤b ∧ c=b$ <br/>
$≡$ { Identity } <br/>
$a>b ∨ a≤b ∧ c=b$ <br>
$≡$ { Distributive Property of ∨ } <br>
$(a>b ∨ a≤b) ∧ (a>b ∨ c=b)$ <br>
$≡$ { Left identity of ∧, since $(a>b ∨ a≤b)$ is a tautology } <br>
<span class='bghighlight'> $a>b ∨ c=b$ </span>.

---

Find if the following triplets hold (i.e., _true_ or _false_), by calculating the _Weakest Precondition_:

2.1. $\\{y=3\\}$ `y:=x-y; x:=y+1; y:=x-1` $\\{y<x\\}$

First we calculate the weakest precondition:

$wp($`y:=x-y`, $wp($`x:=y+1`, $wp($`y:=x-1`, $y < x)))$ <br/>
$≡$ { Successive application of the assignment  `:=` rule } <br/>
$wp($`y:=x-1`, $y<x) → x-1<x$ <br/>
$wp($`x:=y+1`, $x-1<x) → y<y+1 ≡ y<y+1$ <br/>
$wp($`y:=x-y`, $y<y+1) → x-y < (x-y)+1 ≡ \text{True}$

Now we need to prove that the implication holds:

$(y=3)→\text{True}→\\:?→$<span class='bghighlight'> $\text{True}$ </span>.

2.2. $\\{x≥-100 ∧ x≤100\\}$ `if (x<0) then x:=x+100 else y:=2*x fi` $\\{y≥0 ∧ y≤300\\}$

First we calculate the weakest precondition:

$wp($`if (x<0) then x:=x+100 else y:=2*x fi`, $0 ≤ y≤300)$ <br/>
$≡$ { By the `if` rule } <br/>
$x<0 ∧ wp($`x:=x+100`, $0≤y≤300) ∨ x≥0 ∧ wp($`y:=2*x`, $0≤y≤300)$ <br/>
$≡$ { Assignment `:=` rule } <br/>
$x<0 ∧ 0≤y≤300 ∨ x≥0 ∧ 2x≥0 ∧ 2x≤300$ <br/>
$≡$ { Algebra and set theory } <br/>
$x<0 ∧ 0≤y≤300 ∨ 0≤x≤150$ <br/>

Now we need to prove that the implication holds:

$(x≥-100 ∧ x≤100) → (x<0 ∧ 0≤y≤300 ∨ 0≤x≤150) →\\: ? →$<span class='bghighlight'>$\text{False}$ </span>.

---

Provide the *total* proof for the following specification:

> $[n≥0 ∧ d>0]$ <br>
> ```q:=0;
> r:=n;
> while (r>=d) do
>   q:=q+1;
>   r:=r−d
> od
> ``` <br>
> $[n = q⋅d + r∧0≤r ∧ r<d]$

a. We first choose and invariant:

<span class='bghighlight'>$\\:I ≜ n = q⋅d+r ∧ r≥0 ∧ d>0\\:$</span>

b. And a variant:

<span class='bghighlight'>$\\:M ≜ r\\:$</span>

c. We provide proof that the invariant holds before the loop:

$[P]$ `q:=0; r:=n` $[I]$<br/>
$≡$ { By the definition of $I$ and $wp$} <br/>
$P → wp($`q:=0`, $wp($`r:=n`, $n = q ⋅ d + r ∧ r ≥ 0 ∧ d>0$ <br/>
$≡$ { Successive application of the assignment `:=` rule } <br/>
$P → (n = 0 ⋅ d + n ∧ n ≥ 0 ∧ d>0)$ <br/>
$≡$ { Definition of $P$, algebra and set theory } <br/>
$n ≥ 0 ∧ d > 0 → (n = n ∧ n ≥ 0 ∧ d>0) ≡$ <span class='bghighlight'> $\\:\text{True}\\:$</span>

d. We provide proof that the invariant holds during the loop and that the variant is strictly decreasing:

$[I ∧ C ∧ M = M']$ `q:=q+1; r:=r-d` $[I ∧ M < M']$ <br/>
$≡$ { Definition of $I$ and $M$ } <br/>
$[\ldots]$ `q:=q+1; r:=r-d` $[n = q ⋅ d + r ∧ r ≥ 0 ∧ d>0 ∧ r < M']$ <br/>
$≡$ { Proof by $wp$ } <br/>
$\ldots\\: → wp($`q:=q+1`, $wp($`r:=r-d`, $n = q ⋅ d + r ∧ r ≥ 0 ∧ d>0 ∧ r < M'))$ <br/>
$≡$ { Successive application of the assignment `:=` rule } <br/>
$\ldots\\: → n = (q + 1) ⋅ d + (r - d) ∧ (r-d) ≥ 0 ∧ d>0 ∧ (r - d) < M'$ <br/>
$≡$ { Definition of $I$, $C$, $M$ and algebra } <br/>
$(n = q⋅d + r ∧ r≥0 ∧ r≥d ∧ d>0 ∧ r=M') → (n = q⋅d + r ∧ (r-d)≥0 ∧ d>0 ∧ (r-d)< M')$ <br/>
$≡$ { Algebra and set theory } <br/>
<span class='bghighlight'> $\\:\text{True}\\:$</span>

e. We provide proof that the post-condition is implied by loop termination:

$I ∧ ¬ C → Q$ <br/>
$≡$ { Definition of $I$, $C$ and $Q$ } <br/>
$(n = q ⋅ d + r ∧ r ≥ 0∧ d>0 ∧ r < d) → (n = q ⋅ d + r ∧ 0 ≤ r ∧ r < d)≡$ <span class='bghighlight'> $\\:\text{True}\\:$</span>

f. We provide proof that the variant is strictly positive before the loop:

$I ∧ C → M > 0$ <br/>
$≡$ { Definition of $I$, $C$ and $M$ } <br/>
$(n = q ⋅ d + r ∧ r ≥ 0 ∧ r >= d ∧ d>0) → (r > 0)≡$ <span class='bghighlight'> $\\:\text{True}\\:$</span>

---

Find the program `S` that refines the following specifications:

4.1. $\\{x=0\\}$ `S` $\\{y=x\\}$

Spec($x=0$, `S`, $y=x$) <br/>
$\sqsubseteq$ { Refinement of the assignment `:=` } <br/>
Spec($x=0$, `y:=x`, $y=x$).

4.2. $\\{y=2 ∧ x=3\\}$ `S` $\\{x=3\\}$

Spec($y=2 ∧ x=3$, `S`, $x=3$) <br/>
$\sqsubseteq$ { Refinement of `skip`, given that $y=2 ∧ x=3 → x=3$ } <br/>
Spec($y=2 ∧ x=3$, `skip`, $x=3$).

---

Prove o seguinte programa através de refinamento (indique as regras que aplicou em cada passo).

> $\\{ x = m ∧ y = n ∧ m>0\\}$ <br>
> ```
> while (x!=0) do
>   y:=y-1;
>   x:=x-1
> od
> ``` <br>
> $\\{ y = n - m \\}$

O ponto de partida é então:

Spec($x=m ∧ y=n ∧ m>0$, `S`, $y=n-m)$

a. Encontrar invariante e variante do ciclo e verificar aplicabilidade da regra da repetição. Lembrando a regra da repetição (para caso de condição de guarda simples, e com $I$ em vez de $P$, considerando que desempenha o papel de invariante do ciclo):

$\\{I\\}$ `S` $\\{I∧¬G\\}$ <br>
$\sqsubseteq$ { Regra da repetição } <br>
$\\{I\\}$ `while G do` $\\{I∧G∧V=V_0\\}$ `S1` $\\{I∧0 ≤ V<V_0\\}$ `od` $\\{I∧¬G\\}$

Para a aplicar, temos de escolher $I$ (invariante do ciclo) e $V$ (variante do ciclo), e.g.:

$I ≜ y = n-m+x ∧ x≥0$ <br>
$V ≜ x$

No entanto, a pré-condição e pós-condição do triplo inicial não são equivalentes a $I$ e $I∧¬G$  (com $G ≜ x≠0$) respectivamente, pelo que temos de começar por enfraquecer a pré-condição e fortalecer a pós-condição, para depois introduzir o ciclo:

$\hphantom{⊑}$ { enfraquecer a pré-condição } <br>
$\\{ x = m ∧ y = n ∧ m>0 \\}$ `S` $\\{ y = n - m \\}$ <br>
$⊑$ { dado que $x = m ∧ y = n ∧ m>0 → y = n – m + x ∧ x ≥ 0$ } <br>
$\\{ y = n-m+x ∧ x ≥ 0 \\}$ `S` $\\{ y = n-m \\}$ <br>
$⊑$ { fortalecer a pós-condição, dado $(y = n-m+x ∧ x≥0) ∧ ¬x≠0 → y = n-m$ } <br>
$\\{\ldots\\}$ `S` $\\{ (y = n-m+x ∧ x≥ 0)  ∧ ¬x≠0\\}$ <br>
$⊑$ { introduzir o ciclo, pela regra da repetição, com $V≜x$ } <br>
$\\{\ldots\\}$ `while x!=0 do ` $\\{y=n-m+x ∧ x≥0 ∧ x≠0 ∧ x=V_0\\}$ `S1` $\\{y=n-m+x ∧ x≥0 ∧ 0≤x<V_0\\}$ `od` $\\{ (y = n-m+x ∧ x≥0) ∧ ¬x=0\\}$ <br>
$⊑$ { por simplificação de expressões } <br>
$\\{\ldots\\}$ `while x != 0 do` $\\{y=n-m+x ∧ x>0 ∧ x=V_0\\}$ `S1` $\\{(y=n-m+x ∧ x≥0 ∧ x<V_0\\}$ `od` $\\{ y = n-m+x ∧ x=0 \\}$ <br>

b. Introduzir sequência aplicando regra da composição. Temos agora que refinar $\\{y=n-m+x ∧ x>0 ∧ x=V_0\\}$ `S1` $\\{y=n-m+x ∧ x≥0 ∧ x<V_0\\}$ para $\\{y=n-m+x ∧ x>0 ∧ x=V_0\\}$ `y:=y-1; x:=x-1` $\\{y=n-m+x ∧ x≥0 ∧ x<V_0\\}$

Para isso, temos de começar por aplicar a regra da composição, com uma asserção intermédia $M$ apropriada:

$\\{y=n-m+x ∧ x>0 ∧ x=V0\\}$ `S1` $\\{y=n-m+x ∧ x≥0 ∧ x<V_0\\}$ <br>
$⊑$ { regra da composição } <br>
$\\{y=n-m+x ∧ x>0 ∧ x=V_0\\}$ `S2` $\\{M\\}$ `S3` $\\{y=n-m+x ∧ x≥0 ∧ x<V_0\\}$

Uma solução segura é usar a pré-condição mais fraca:

$M ≜ wp($`x:=x-1`, $y=n-m+x ∧ x≥0 ∧ x<V_0)$ <br>
$\hphantom{M} ≡ (y=n-m+x-1 ∧ x-1≥0 ∧ x-1<V_0)$ <br>
$\hphantom{M} ≡ (y=n-m+x-1 ∧ x≥1 ∧ x≤V_0)$


c. Introduzir uma das atribuições:

$\\{y=n-m+x-1 ∧ x≥1 ∧ x≤V_0\\}$ `S3` $\\{y=n-m+x ∧ x≥0 ∧ x<V_0\\}$ <br>
$⊑$ {dado que $(y=n-m+x-1 ∧ x≥1 ∧ x≤V_0) ⇛ (y=n-m+x ∧ x≥0 ∧ x<V_0)[x/x-1]$ } <br>
$\\{y=n-m+x-1 ∧ x≥1 ∧ x≤V_0\\}$ `x: = x-1` $\\{y=n-m+x ∧ x≥0 ∧ x<V_0\\}$

d. Introduzir a outra atribuição:

$\\{y=n-m+x ∧ x>0 ∧ x=V_0\\}$ `S2` $\\{y=n-m+x-1 ∧ x≥1 ∧ x≤V_0\\}$ <br>
$⊑$ { ... } <br>
$\\{y=n-m+x ∧ x>0 ∧ x=V_0\\}$ `y := y-1` $\\{y=n-m+x-1 ∧ x≥1 ∧ x≤V_0\\}$

Neste caso temos de provar que:

$y=n-m+x ∧ x>0 ∧ x=V_0 ⇛ y-1=n-m+x-1 ∧ x≥1 ∧ x≤V_0$

Ora cada clásula do lado direita é equivalente ou implicada pela cláusula na mesma posição do lado esquerdo, pela que a implicação é sempre verdadeira, para quaisquer valores das variáveis. Isto conclui a prova por refinamento.
