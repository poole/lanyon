---
layout: page
title: About
---

The Machine Learning community is currently experiencing a 
[reproducibility crisis](https://neuripsconf.medium.com/designing-the-reproducibility-program-for-neurips-2020-7fcccaa5c6ad)
and a reviewing crisis [[Littman, 2021]](#Litt). Because of the highly competitive and noisy
reviewing process of ML conferences [[Tran et al., 2020]](#Tran), researchers have an incentive to
oversell their results, slowing down the progress and diminishing the
integrity of the scientific community. Moreover with the growing number
of papers published and submitted at the main ML conferences [[Lin et al., 2020]](#Lin), it has
become more challenging to keep track of the latest advances in the
field.

Blog posts are becoming an increasingly popular and useful way to talk
about science [[Brown and Woolston, 2018]](#Brow). 
They offer substantial value to the scientific community
by providing a flexible platform to foster open, human, and transparent
discussions about new insights or limitations of a scientific
publication. However, because they are not as recognized as standard
scientific publications, only a minority of researchers manage to
maintain an active blog and get visibility for their efforts. Many are
well-established researchers ([Francis Bach](https://francisbach.com/),
[Ben Recht](https://www.argmin.net/), [Ferenc
Huszár](https://www.inference.vc/), [Lilian
Weng](https://lilianweng.github.io/lil-log/)) or big corporations that
leverage entire teams of graphic designers designer and writers to
polish their blogs ([Facebook AI](https://ai.facebook.com/blog/?page=1),
[Google AI](https://ai.googleblog.com/),
[DeepMind](https://deepmind.com/blog),
[OpenAI](https://openai.com/blog/)). As a result, the incentives for
writing scientific blog posts are largely personal; it is unreasonable
to expect a significant portion of the machine learning community to
contribute to such an initiative when everyone is trying to establish
themselves through publications.


- [A Blog Post Conference Track](#a-blog-post-conference-track)
- [Positive Impact for the Community](#positive-impact-for-the-community)
- [Positive Impact for the Conference](#positive-impact-for-the-conference)
- [Potential Risks](#potential-risks)
- [Related Initiatives](#related-initiatives)
- [References](#references)

# A Blog Post Conference Track

Our goal is to create a formal call for blog posts at ICLR to
incentivize and reward researchers to review past work and summarize the
outcomes, develop new intuitions, or highlight some shortcomings. A very
influential initiative of this kind happened after the second world war
in France. Because of the lack of up-to-date textbooks, a collective of
mathematicians under the pseudonym Nicolas Bourbaki [[Halmos 1957]](#Halm), decided to start a
series of textbooks about the foundations of mathematics [[Bourbaki, 1939]](#Bour).
In the same vein, we aim at providing a new way to summarize scientific knowledge in 
the ML community.

Due to the large diversity of topics that can be discussed in a blog
post, we decided to restrict the range of topics for this call for blog
posts. We identified that the blog posts that would bring to most value
to the community and the conference would be posts that distill and
discuss *previously published papers*.

### A call for blog posts discussing work previously published at ICLR

The format and process for this blog post track is:

-   Write a post about a paper previously published at ICLR, with the
    constraint that one cannot write a blog post on work that they have
    a conflict of interest with. This implies that one cannot review
    their own work, or work originating from their institution or
    company. We want to foster productive discussion about *ideas*, and
    prevent posts that intentionally aim to help or hurt individuals or
    institutions.

-   Blogs will be peer-reviewed (double-blind, see
    Section <a href="#sub:sub_process" data-reference-type="ref" data-reference="sub:sub_process">2.5</a>)
    for quality and novelty of the content: clarity and pedagogy of the
    exposition, new theoretical or practical insights,
    reproduction/extension of experiments, etc.

-   The posts will be published under a unified template (see
    Section <a href="#sub:sub_format" data-reference-type="ref" data-reference="sub:sub_format">2.4</a>
    and
    Section <a href="#sub:sub_process" data-reference-type="ref" data-reference="sub:sub_process">2.5</a>)
    and hosted on the conference website or our own Github page.


## Positive Impact for the Community

We believe that a formal blog post conference track would increase the posts’ visibility, impact, 
and credibility, while simultaneously providing benefits to the conference.

-   *Adoption*: we think that a conference’s "stamp" will give more credibility to blog posts,
    making them more broadly recognized and adopted by the community.

-   *Accessibility*: maintaining a blog is time consuming , and requires
    many blog posts to gain visibility and recognition. 
    By allowing researchers to publish a single post, we will enable occasional blog writers to
    publish their ideas to a much broader audience - something that is relatively impossible right
    now. 
    Moreover, it will make this format accessible to independent/junior blog writers that do not 
    have a company or a research lab to support them.

-   *Synchronization*: the fast evolving field of ML advances at the
    paces of its conferences. Following the same pace the blog posts
    will add value and momentum to the conference. It will benefit from
    the same advantages of conferences with respect to scientific
    journals: faster publication process and cross-fertilization of
    ideas.

## Positive Impact for the Conference

We develop the potential positive impact of a blog post track for the
conference itself:

-   Increases the value of the papers submitted to ICLR: blog posts will
    discuss previously published papers, thus increasing their
    visibility and quality.

-   Incentivizes researchers to submit their best research to ICLR: high
    quality work will likely get highlighted in future years in a blog
    post.

-   Improves reproducibility and transparency: the blog post track will
    identify and publicly document pitfalls and "tricks" that were not
    clearly communicated in the original publication.

-   Provides a scientific value by itself: such blog posts will
    reproduce and extend results of previously published papers. They
    will distill important theoretical and practical ideas improving
    their adoption and impact.

-   Tests of time: this track will provide a sort of crowd-sourced test
    of time at a shorter timescale than the current test of times
    awards.

-   Promotes accessibility: because many of this track’s blog posts will
    vulgarize past content, this track will make the conference broadly
    more accessible (to students, non-natives, and, more generally,
    non-experts in the field).


# Potential Risks

In this section we identify potential issues arising with such a track
and explain how to mitigate them:

1.  *Adversarial Blog Posts*: Since the guidelines are to write a blog
    post on a previously published paper, one may expect some researcher
    to try to use bad faith arguments to criticize a concurrent paper
    through one of these blog post. We do not think this will happen,
    because these blog posts will be public and thus researchers would
    discredit themselves by using bad faith arguments.

2.  *Too many/few submissions*: As this is a new track, it may be
    difficult to predict the volume of submissions. The fact that there
    are currently many independent blog posts on the web is a good
    indicator that there will be positive interest. To get a better
    estimate of the volume of potential submissions, we intend to
    leverage social media to gauge the interest of the ML community in
    such a track; this will allow us to gather a large enough reviewing
    committee.

3.  *Reviewing*: Once again as this is a new track, it may be unclear
    how to judge blog posts during a review process. We will recruit a
    large reviewing committee and define clear guidelines for the
    reviewing process. Our primary focus will be on the originality of
    the perspective and the novelty of the ideas, insights, and
    experiments. For instance, posts that reuse less content from the
    original paper (results, direct quotes) will be scored more
    favourably than those that use more.

4.  *Too many posts on the same paper*: We may mitigate this by only
    selecting a small numbers of blog posts on the same paper. This
    could actually be a strength since this can encourage discussion and
    highlight different perspectives on the same work. Moreover, we
    could explicitly state that we will have this hard limit (e.g.,
    accepting a maximum of 3 blog posts on the same paper) to entice
    researchers to submit blog posts on papers that have less
    visibility.

# Related Initiatives

We mainly address our difference with respect to
[Distill](https://distill.pub/), the [ML Retrospectives
Workshop](https://ml-retrospectives.github.io), a Tutorial Track, and
other workshops discussing alternative formats for publications.

### Distill

Created in 2016, [Distill](https://distill.pub/) is an online scientific
journal based on blog post publications. We address our differences with
respect to Distill:
-   *Visualizations*: Blog posts should take advantage of the fact that
    they’re not paperbound, and use innovative visualisations. But the
    process of creating the intricate, dynamic visualisations associated
    with Distill posts is a daunting for most authors. Creating blog
    posts should be more easily accessible to newer authors and
    researchers. Sometimes, being able to embed videos and gifs is
    enough.

-   *Content*: Distill does not target the same type of content as our
    track. Distill aims at presenting new research, and at making this
    research more accessible. We want our blog post track to incentivize
    researchers to revisit and discuss on other researcher’s works, in a
    more natural way than scientific papers allow. Such a practice would
    undoubtedly be useful for the community, both as a short-term “test
    of time”, and also as a way to extract the key ideas from lengthy
    articles.

-   *Limited adoption by the community*: we believe that since Distill
    is not associated with a big conference track, its widespread
    adoption is hindered. This lack of association confines it to a
    small subset of the community that is already familiar with blog
    posts.

-   *Leveraging the momentum of the conference*: Distill describes
    itself as a scientific journal. A large amount of the publications
    in the ML community are conference papers. A blog post track that
    follows conferences would be better suited to follow the pace of the
    community.

### ML-Retrospective Workshop

A recurrent workshop in the ML community is the [ML Retrospectives
Workshop](https://ml-retrospectives.github.io) (NeurIPS 2019, 2020 and
ICML 2020). This workshop is a venue for researchers to talk about their
previous work in a more open and transparent way. More precisely,
emphasis has recently been put on addressing:

-   Flaws or mistakes in the paper’s methodology

-   Limitations in the applicability of the work

-   Changes in understanding or intuition

We share the ultimate goal of “making research more human”, but with a
completely different format. We believe that the constraint to write
about someone else’s work using natural language will channel fruitful
discussions and provide more visibility to previously published papers.

### Tutorial Track

We believe that our proposed blog post track differentiates itself from
a tutorial track because tutorials operate at different scales. On the
one hand, a tutorial regarding a whole topic (e.g. GANs, adversarial
examples, Random matrix theory in ML) contains a long talk, slides, and
potentially exercises to get familiar with the topics. It is usually
made by a team of expert researchers on the topic. On the other hand,
the call for blog posts we propose focuses on a single publication. It
regards a single paper that can concern a more precise and recent topic
(e.g., a specific paper that addresses mode collapse on GANs, a novel
technique to perform adversarial training, etc.) and could be written by
a single researcher (once again making it more accessible to junior
researchers).

### Previous workshops on rethinking publication formats

Recently, the [Rethinking ML Papers
Workshop](https://rethinkingmlpapers.github.io/) at ICLR 2021 fuelled
the discussion (see references therein for related past workshops). The
presenters discussed the importance of accessibility, web
demonstrations, visualization and blog posts (among others). One
particularly related discussion was the [talk by Lilian Weng
(time=4h25mins)](https://slideslive.com/38956531/beyond-static-papers-rethinking-how-we-share-scientific-understanding-in-ml)
on the usefulness of blog posts to get up-to-date with the field of ML.

In alignment with these initiatives, this new track is another step in
the direction of making research more human.

# References

<a name="Litt">Michael L Littman. Collusion rings threaten the integrity of computer science research. Communications of the ACM, 2021.</a>

<a name="Tran">David Tran, Alex Valtchanov, Keshav Ganapathy, Raymond Feng, Eric Slud, Micah Goldblum, and Tom Goldstein. An open review of openreview: A critical analysis of the machine learning conference review process. arXiv, 2020. </a>

<a name="Lin">Hsuan-Tien Lin, Maria-Florina Balcan, Raia Hadsell, and Marc’Aurelio Ranzato. What we learned from neurips2020 reviewing process. Medium https://medium.com/@NeurIPSConf/what-we-learned-from-neurips-2020-reviewing-process-e24549eea38f, 2020. </a>

<a name="Brow">Eryn Brown and Chris Woolston. Why science blogging still matters. Nature, 2018.</a>

<a name="Halm">Paul R Halmos. Nicolas bourbaki. Scientific American, 1957.<a>

<a name="Bour">Nicolas Bourbaki. Elements of mathematics. Éditions Hermann, 1939.</a>






