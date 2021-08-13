---
layout: post
title: Call for blogposts
tags: [tutorial, call, proposal]
authors: The Team
---

\\documentclass{article}\[11pt\] \\usepackage{fullpage}
\\usepackage\[parfill\]{parskip} \\usepackage\[utf8\]{inputenc}
\\usepackage{natbib} \\usepackage{booktabs} \\usepackage\[top=2cm,
bottom=2cm, left=2cm,right=2cm\]{geometry} \\usepackage{marvosym} %
\\hypersetup{ % colorlinks=true, % linkcolor=blue, % urlcolor=blue, % }
\\usepackage{color} \\definecolor{mydarkblue}{rgb}{0,0.08,0.45}
\\usepackage{todonotes}

\\usepackage\[utf8\]{inputenc} % allow utf-8 input
\\usepackage\[T1\]{fontenc} % use 8-bit T1 fonts
\\usepackage\[colorlinks=true, linkcolor=mydarkblue,
citecolor=mydarkblue, filecolor=mydarkblue,
urlcolor=mydarkblue\]{hyperref} \\newcounter{ggiCounter}
\\newcommand{\\ggi}\[1\]{{\\small \\color{mydarkblue}
\\refstepcounter{ggiCounter}\\textsf{\[ggi\]\$\_{\\arabic{ggiCounter}}\$:{\#1}}}}
\\title{ An asynchronous and decentralized Bourbaki via Blogging % \\ %
A Burbaki BlogChain: } \\author{Sebastien Bubeck, David Dobre, Charlie
Gauthier, Gauthier Gidel, Claire Vernade} \\date{}

\\begin{document}

\\maketitle

\\section{Motivations}

The Machine Learning community is currently experiencing a
\\href{<https://neuripsconf.medium.com/designing-the-reproducibility-program-for-neurips-2020-7fcccaa5c6ad>}{reproducibility
crisis} and a reviewing crisis\~\\citep{littman2021collusion}. Because
of the highly competitive and noisy reviewing process of ML
conferences\~\\citep{tran2020open}, researchers have an incentive to
oversell their results, slowing down the progress and diminishing the
integrity of the scientific community. Moreover with the growing number
of papers published and submitted at the main ML
conferences\~\\citep{lin2020we}, it has become more challenging to keep
track of the latest advances in the field. % In short, there is a lack
of transparency and openness when discussing scientific papers % The
\\href{<https://ml-retrospectives.github.io>}{ML Retrospectives
Workshop} was created to give researchers an opportunity to reflect on
their work and their limitations.

\% to \`\`make research more human.\'\'

Blog posts are becoming an increasingly popular and useful way to talk
about science\~\\citep{brown2018science}. They offer substantial value
to the scientific community by providing a flexible platform to foster
open, human, and transparent discussions about new insights or
limitations of a scientific publication. % They offer substantial value
to the scientific community by providing a flexible platform to foster
discussion and present new insights on existing ideas. % This format
allows the writers to discuss ideas in a more informal way than
scientific papers. % It is thus a convenient medium for open, human, and
transparent discussions about either new insights or the limitations of
a scientific publication. However, because they are not as recognized as
standard scientific publications, only a minority of researchers manage
to maintain an active blog and get visibility for their efforts. Many
are well-established researchers
(\\href{<https://francisbach.com/>}{Francis Bach},
\\href{<https://www.argmin.net/>}{Ben Recht},
\\href{<https://www.inference.vc/>}{Ferenc Huszár},
\\href{<https://lilianweng.github.io/lil-log/>}{Lilian Weng}) or big
corporations that leverage entire teams of graphic designers designer
and writers to polish their blogs
(\\href{<https://ai.facebook.com/blog/?page=1>}{Facebook AI},
\\href{<https://ai.googleblog.com/>}{Google AI},
\\href{<https://deepmind.com/blog>}{DeepMind},
\\href{<https://openai.com/blog/>}{OpenAI}). % The current incentives
for writing scientific blog posts are largely personal. % Despite the
value they provide (some blogs mentioned above are widely followed and
shared on social media and more broadly within the community), the
scientific community does not usually offer formal recognition to the
writers\~\\citep{brown2018science}. % With the current lacking
incentives such a publication format is not accessible to a broad part
of the community such as the young researchers that need to quickly get
a form a recognition. As a result, the incentives for writing scientific
blog posts are largely personal; it is unreasonable to expect a
significant portion of the machine learning community to contribute to
such an initiative when everyone is trying to establish themselves
through publications.

Our goal is to create a formal call for blog posts at ICLR to
incentivize and reward researchers to review past work and summarize the
outcomes, develop new intuitions, or highlight some shortcomings. A very
influential initiative of this kind happened after the second world war
in France. Because of the lack of up-to-date textbooks, a collective of
mathematicians under the pseudonym Nicolas
Bourbaki\~\\citep{halmos1957nicolas}, decided to start a series of
textbooks\~\\citep{bourbaki1939elements} about the foundations of
mathematics. Their modern \-\--at the time\-\-- structuralist take on
mathematics had a long lasting impact that continues to influence the
mathematics community of today. \\section{Our Idea: Blog post Conference
Track}

Due to the large diversity of topics that can be discussed in a blog
post, we decided to restrict the range of topics for this call for blog
posts. We identified that the blog posts that would bring to most value
to the community and the conference would be posts that distill and
discuss \\emph{previously published papers}.

\\subsection{Call for blog posts on papers previously published at ICLR}
The call for blog post would take the following form: \\begin{itemize}
\\item Write a post about a paper previously published at ICLR, with the
constraint that one cannot write a blog post on work that they have a
conflict of interest with. This implies that one cannot review their own
work, or work originating from their institution or company. %(e.g., the
call for blog posts of ICLR 2022 would invite submission of original
blog posts on papers accepted at ICLR 2021 and ICLR 2020.) We want to
foster productive discussion about \\textit{ideas}, and prevent posts
that intentionally aim to help or hurt individuals or institutions. %
That is why we will add the constraint that one cannot write a blog post
on a paper one is in a conflict of interest with (similar as in the
reviewing system). \\item Blogs will be peer-reviewed (double-blind, see
Section\~\\ref{sub:sub_process}) for quality and novelty of the content:
clarity and pedagogy of the exposition, new theoretical or practical
insights, reproduction/extension of experiments, etc. \\item The posts
will be published under a unified template (see
Section\~\\ref{sub:sub_format} and Section\~\\ref{sub:sub_process}) and
hosted on the conference website or our own Github page. \\end{itemize}

\\subsection{Positive Impact for the Community} We believe having this
call for blog posts as a conference track would increase the posts\'
visibility, impact, and credibility, while simultaneously providing
benefits to the conference. \\begin{itemize} \\item \\textit{Adoption}:
we think that, with the conference\'s stamp, such a format will be more
broadly recognized and adopted by the community. \\item
\\textit{Accessibility}: maintaining a blog is time
consuming\~\\citep{brown2018science}, and requires many blog posts to
gain a stable following. By allowing researchers to publish a single
post, we will permit occasional blog writers to publish their ideas,
something that is relatively impossible right now. Moreover, it will
make this format accessible to more independent/junior blog writers that
do not have a company or a research lab to support them. \\item
\\textit{Synchronization}: the fast evolving field of ML advances at the
paces of its conferences. By following the same pace the blog posts will
add value and momentum to the conference. It will benefit from the same
advantages of conferences with respect to scientific journals: faster
publication process and cross-fertilization of ideas. % We believe
having the blog posts published at the same pace would make them
significantly more impactful. \\end{itemize}

\\subsection{Positive Impact for the Conference} We develop the
potential positive impact of a blog post track for the conference
itself: \\begin{itemize} % \\item Leveraging the momentum of the
conference: We believe that associating a blogpost track with a large
conference will promote recognition of blog posts as a valid and useful
medium for communicating research topics. \\item Increases the value of
the papers submitted to ICLR: blog posts will discuss previously
published papers, thus increasing their visibility and quality. \\item
Incentivizes researchers to submit their best research to ICLR: high
quality work will likely get highlighted in future years in a blog post.
\\item Improves reproducibility and transparency: the blog post track
will identify and publicly document pitfalls and \"tricks\" that were
not clearly communicated in the original publication. \\item Provides a
scientific value by itself: such blog posts will reproduce and extend
results of previously published papers. They will distill important
theoretical and practical ideas improving their adoption and impact.
\\item Tests of time: this track will provide a sort of crowd-sourced
test of time at a shorter timescale than the current test of times
awards. \\item Promotes accessibility: because many of this track\'s
blog posts will vulgarize past content, this track will make the
conference broadly more accessible (to students, non-natives, and, more
generally, non-experts in the field). \\end{itemize}

\\subsection{Submission Format} \\label{sub:sub_format}

\% Currently, mainstream blogs in the ML community are very
well-crafted, dynamic affairs. % They include dynamic visualizations
with buttons, sliders, embedded javascript engines and games, etc. While
such blogs are pretty, and help transfer novel ideas, they are not the
type of blogposts that we aim for.

\% We find that the natural,
`formally informal'' tone used in blog posts is well suited to a discussion on the limitations and strengths of previous work. But popular blogs in the ML community tend to be very complex, often featuring interactive and dynamic visualizations with buttons, sliders, embedded javascript engines, and so on. % Although these blogs are impressive, we believe that that it is not necessary to require hundreds of hours\footnote{`100+
hours\'\' is explicitly an expectation as per the
\\href{<https://distill.pub/journal/>}{Distill guidelines}} of
collective effort afforded by large teams with diverse skill-sets
(graphic designers, scientific editors) to produce useful and quality
content that will benefit the ML community.

Our goal is to avoid heavily engineered, professionally-made
blog-posts\\footnote{Such as the \`\`100+ hours\'\' mentioned as a
standard by the \\href{<https://distill.pub/journal/>}{Distill
guidelines} }, to entice ideas and clear writing rather than dynamic
visualizations or embedded javascript engines.

\% Firstly, we are enamoured by the more natural, \"formally informal\"
tone of ML blogposts. % Because of that tone, authors are more free to
convey their subject matter and relate their post\'s content to other
work. The grand part of blogs (as it relates to our planned usage of
them) is the fact that their authors can skip the lengthy abstract, the
drab and formulaic review of related work, and get right into the
content. % Of course, if these elements are important to their post,
they can still include them.

\% A big reason why blog posts are so popular is that they are much
simpler to read and parse. % Firstly, it is much simpler to read and
parse the more natural, \`\`formally informal\'\' tone of ML blog posts.
% Authors have more freedom in how they convey their subject matter and
relate their post\'s content to other work. % This casual tone is well
suited to a discussion on the limitations and the strengths of a

\% A big benefit of part of blogs (as it relates to our planned usage of
them) is the fact that their authors can skip many of the dense
formalities of publications, such as the drab and formulaic review of
related work, and get right into the content. % Of course, if these
elements are important to their post, they can still include them.

\% Secondly, allowing such extremely complicated visualisations means
that the authors need an entire team of designers and coders to make
their embedded content. % We want to allow anyone to participate in this
track.

\% Thirdly, we want to enable printing the blogposts, offline reading,
and archiving. % Gifs, videos, and images parse relatively well into
paper, but javascript visualizations less so. % Our track\'s viewers
will be freely able to download the entirety of the website.

\% For these reasons, we chose a simpler, static format. We will only
accept simple markdown files, along with its associated images, gifs,
music files, and videos.

As a result, % instead of using something like HTML which would allow
users maximum flexibility, we restrict submissions to the Markdown
format. We believe this is a good trade-off between complexity and
flexibility. Markdown enables users to easily embed media such as
images, gifs, audio, and video as well as write mathematical equations
using MathJax, without requiring users to know how to create HTML web
pages. This (mostly) static format is also fairly portable; users can
download the blog post without much effort for offline reading or
archival purposes. More importantly, this format can be easily hosted
and maintained through GitHub.

\\subsection{Submission Process} \\label{sub:sub_process}

A full copy of the track\'s blogs will always be publicly available as a
GitHub repository
\\href{<https://github.com/bourbaki-blogchain/bourbaki-blogchain.github.io>}{(mock-up
link)}. Entrants will need to fork this repository and make their fork
private. Should they fail to do so, their submission will be rejected as
it breaches the double-blind review process. Since this is a full fork,
they will be able to view their own copy of the blog. This means that
they will be able to see exactly how their post will look and behave in
the main website.

In their fork, they will add their new blog post along with any media
files it might require. To submit a blog post, the entrants will zip
their fork (but not before stripping it of the author\'s names), and
submit it to our OpenReview venue. Once accepted, entrants will
de-anonymize their post, make their fork public again, and make a GitHub
Pull Request to the main blog, allowing us to pull in their new blog
post in a transparent way.

A temporary mock-up of the blog website is available:
\\href{<https://bourbaki-blogchain.github.io//about/>}{<https://bourbaki-blogchain.github.io//about/>}.
Once the submission period has ended, the GitHub repository of our track
will be temporarily made private for the duration of the conference,
allowing the conference to host the website. After the conference, the
GitHub repository will be made public again to allow viewers to fork and
download its contents.

\\subsection{The potential Pitfalls of our Blog Post Track} In this
section we identify potential issues arising with such a track and
explain how to mitigate them: \\begin{enumerate} \\item
\\textit{Adversarial Blog Posts}: Since the guidelines are to write a
blog post on a previously published paper, one may expect some
researcher to try to use bad faith arguments to criticize a concurrent
paper through one of these blog post. We do not think this will happen,
because these blog posts will be public and thus researchers would
discredit themselves by using bad faith arguments. \\item \\textit{Too
many/few submissions}: As this is a new track, it may be difficult to
predict the volume of submissions. The fact that there are currently
many independent blog posts on the web is a good indicator that there
will be positive interest. To get a better estimate of the volume of
potential submissions, we intend to leverage social media to gauge the
interest of the ML community in such a track; this will allow us to
gather a large enough reviewing committee. % \\item \\textit{Too
many/few submissions}: as this is an \"unconventional\" track, it may be
difficult to predict % We will make sure to estimate the amount of
potential submission in advance to gather a large enough reviewing
committee. % \\item \\textit{Too few submissions}: the fact that there
are currently many independent blog posts on the web is a good signal
that lets us think that this should not be a problem. But to avoid this
issue, we could gauge the interest of the community on Twitter. \\item
\\textit{Reviewing}: Once again as this is a new track, it may be
unclear how to judge blog posts during a review process. We will recruit
a large reviewing committee and define clear guidelines for the
reviewing process. Our primary focus will be on the originality of the
perspective and the novelty of the ideas, insights, and experiments. For
instance, posts that reuse less content from the original paper
(results, direct quotes) will be scored more favourably than those that
use more. \\item \\textit{Too many posts on the same paper}: We may
mitigate this by only selecting a small numbers of blog posts on the
same paper. This could actually be a strength since this can encourage
discussion and highlight different perspectives on the same work.
Moreover, we could explicitly state that we will have this hard limit
(e.g., accepting a maximum of 3 blog posts on the same paper) to entice
researchers to submit blog posts on papers that have less visibility.\
\\end{enumerate}

\\section{Related Initiatives}

We mainly address our difference with respect to
\\href{<https://distill.pub/>}{Distill}, the
\\href{<https://ml-retrospectives.github.io>}{ML Retrospectives
Workshop}, a Tutorial Track, and other workshops discussing alternative
formats for publications.

\\paragraph{Distill.} Created in 2016,
\\href{<https://distill.pub/>}{Distill} is an online scientific journal
based on blog post publications. We address our differences with respect
to Distill: \\ggi{maybe more here}

\\begin{itemize} \\item \\textit{Visualizations}: Blog posts should take
advantage of the fact that they're not paperbound, and use innovative
visualisations. But the process of creating the intricate, dynamic
visualisations associated with Distill posts is a daunting for most
authors. Creating blog posts should be more easily accessible to newer
authors and researchers. Sometimes, being able to embed videos and gifs
is enough. \\item \\textit{Content}: Distill does not target the same
type of content as our track. Distill aims at presenting new research,
and at making this research more accessible. We want our blog post track
to incentivize researchers to revisit and discuss on other researcher\'s
works, in a more natural way than scientific papers allow. Such a
practice would undoubtedly be useful for the community, both as a
short-term "test of time", and also as a way to extract the key ideas
from lengthy articles. \\item \\textit{Limited adoption by the
community}: we believe that since Distill is not associated with a big
conference track, its widespread adoption is hindered. This lack of
association confines it to a small subset of the community that is
already familiar with blog posts. \\item \\textit{Leveraging the
momentum of the conference}: Distill describes itself as a scientific
journal. A large amount of the publications in the ML community are
conference papers. A blog post track that follows conferences would be
better suited to follow the pace of the community. \\end{itemize}

\\paragraph{ML-Retrospective Workshop.} A recurrent workshop in the ML
community is the \\href{<https://ml-retrospectives.github.io>}{ML
Retrospectives Workshop} (NeurIPS 2019, 2020 and ICML 2020). This
workshop is a venue for researchers to talk about their previous work in
a more open and transparent way. More precisely, emphasis has recently
been put on addressing: \\begin{itemize} \\item Flaws or mistakes in the
paper's methodology \\item Limitations in the applicability of the work
\\item Changes in understanding or intuition \\end{itemize}

We share the ultimate goal of \`\`making research more human\'\', but
with a completely different format. % : blog posts. We believe that the
constraint to write about someone else\'s work using natural language
will channel fruitful discussions and provide more visibility to
previously published papers.

\\paragraph{Tutorial Track.} We believe that our proposed blog post
track differentiates itself from a tutorial track because tutorials
operate at different scales. On the one hand, a tutorial regarding a
whole topic (e.g. GANs, adversarial examples, Random matrix theory in
ML) contains a long talk, slides, and potentially exercises to get
familiar with the topics. It is usually made by a team of expert
researchers on the topic. On the other hand, the call for blog posts we
propose focuses on a single publication. It regards a single paper that
can concern a more precise and recent topic (e.g., a specific paper that
addresses mode collapse on GANs, a novel technique to perform
adversarial training, etc.) and could be written by a single researcher
(once again making it more accessible to junior researchers).

\\paragraph{Previous workshops on rethinking publication formats.}
Recently, the \\href{<https://rethinkingmlpapers.github.io/>}{Rethinking
ML Papers Workshop} at ICLR 2021 fuelled the discussion (see references
therein for related past workshops). The presenters discussed the
importance of accessibility, web demonstrations, visualization and blog
posts (among others). One particularly related discussion was the
\\href{<https://slideslive.com/38956531/beyond-static-papers-rethinking-how-we-share-scientific-understanding-in-ml>}{talk
by Lilian Weng (time=4h25mins)} on the usefulness of blog posts to get
up-to-date with the field of ML.

In alignment with these initiatives, this new track is another step in
the direction of making research more human. % our way to go about
implementing a new research format.

\\bibliography{references} \\bibliographystyle{plainnat} \\end{document}
