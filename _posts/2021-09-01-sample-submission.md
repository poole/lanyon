---
layout: post
title: Sample Submission
authors: Bubeck, Sebastien (Microsoft); Dobre, David (Mila); Gauthier, Charlie (Mila); Gidel, Gauthier (Mila); Vernade, Claire (DeepMind)
tags: [sample, template, tutorial]  # This should be the relevant areas related to your blog post
---

This post outlines a few more things you may need to know for creating and configuring your blog posts.

1. [Configurations](#configurations)
2. [Creating Posts](#creating-posts)
3. [Images](#images)
4. [Interactive Figures](#interactive-figures)
5. [$\LaTeX\$](#latex)
6. [References](#references)

## Configurations

You should **NOT** modify the default values in `_config.yml`, found in the root directory of this repo.
These must be left as is for the correct export and eventual merging to the master ICLR repo.

## Creating Posts

To create a new post in the blog, add a new Markdown file to the `_posts/` directory, with the name 
following the format `2022-05-03-submission-name.md` (note the date is the start of the conference).
Begin the post with the following code (which will be used to automatically generate a BibTeX entry
at the bottom of your post):

```markdown
---
layout: post
title: [SUBMISSION NAME]
authors: [AUTHORS]
tags: [TAGS]
---
```

From there, write your content as you would a normal Markdown file.
For a more high-level and generic overview of how to format Markdown files such as formatting text,
code, headings, etc. check out the [Example Content]({% post_url 2020-04-02-example-content %}) post.

## Images

If you include an image hosted elsewhere on the web simply use the standard GitHub-flavoured-MarkDown 
syntax (be wary of copyrights):

```
![Example Image](https://iclr.cc/static/core/img/ICLR-logo.svg)
```

![Example Image](https://iclr.cc/static/core/img/ICLR-logo.svg)


Its generally a better idea to avoid linking to images hosted elsewhere - links can break and you
might face losing important information in your blog post. 
To include images in your submission in this way, you must do something like the following:

```markdown
{% raw %}![ICLR LOGO]({{ site.url }}/public/images/2021-09-01-sample-submission/ICLR-logo.png){% endraw %} 
```

which becomes:

![ICLR LOGO]({{ site.url }}/public/images/2021-09-01-sample-submission/ICLR-logo.png)

The {% raw %}`{{ site.url }}`{% endraw %} syntax expands the site URL for you.
To ensure that there are no namespace conflicts, you must save your asset to your unique directory
`/public/images/2022-05-03-[SUBMISSION NAME]` within your submission.

## Interactive Figures

Here's how you could embed interactive figures that have been exported as HTML files.
Note that we will be using plotly for this demo, but anything built off of HTML should work
(**no javascript is allowed!**).
All that's required is for you to export your figure into HTML format, and make sure that the file 
exists in the `_includes/[SUBMISSION NAME]/` directory in this repository's root directory.
To embed it into any page, simply insert the following code anywhere into your page.

```markdown
{% raw %}{% include [FIGURE_NAME].html %}{% endraw %} 
```

For example, the following code can be used to generate the figure underneath it.

```python
import pandas as pd
import plotly.express as px

df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv')

fig = px.density_mapbox(df, lat='Latitude', lon='Longitude', z='Magnitude', radius=10,
                        center=dict(lat=0, lon=180), zoom=0,
                        mapbox_style="stamen-terrain")
fig.show()

fig.write_html('./_includes/2021-09-01-sample-submission/plotly_demo_1.html')
```

And then include it with the following:

```markdown
{% raw %}{% include 2021/2021-09-01-sample-submission/plotly_demo_1.html %}{% endraw %} 
```

Voila!

{% include 2021-09-01-sample-submission/plotly_demo_1.html %}


The above figure is pretty cool, but you can also embed heavier/more complex figures.
For brevity, the following figure is generated from the figure produced in 
[this plotly tutorial](https://plotly.com/python/dropdowns/).

{% include 2021-09-01-sample-submission/plotly_demo_2.html %}


## $\LaTeX$

### Inline

To add inline math, you can use `$ <math> $`. Here is an example:


`$ \sum_{i=0}^j \frac{1}{2^n} \times i $` becomes
$ \sum_{i=0}^j \frac{1}{2^n} \times i $

### Block

To add block math, you *must* use `$$<math>$$`. Here are some examples:

```
$$\begin{equation}
a \times b \times c = 0 \\
j=1 \\
k=2 \\
\end{equation}$$
```

...becomes...

$$\begin{equation}
a \times b \times c = 0 \\
j=1 \\
k=2 \\
\end{equation}$$

```
$$\begin{align}
i2 \times b \times c =0 \\
j=1 \\
k=2 \\
\end{align}$$
```

...becomes...

$$\begin{align}
i2 \times b \times c =0 \\
j=1 \\
k=2 \\
\end{align}$$

Don't forget the enclosing `$$`! Otherwise, your newlines won't work:

```
\begin{equation}
i2=0 \\
j=1 \\
k=2 \\
\end{equation}
```

...becomes...

\begin{equation}
i2=0 \\
j=1 \\
k=2 \\
\end{equation}


## References

You'll notice that at the bottom of every post, a BibTeX entry is automatically generated for
you from the header you added at the beginning.
For example,

```markdown
---
layout: post
title: ICLR Blog Post Sample Submission
authors: Bubeck, Sebastien (Microsoft); Dobre, David (Mila); Gauthier, Charlie (Mila); Gidel, Gauthier (Mila); Vernade, Claire (DeepMind)
tags: [sample, template]
---
```

gets rendered to what you see below this.
