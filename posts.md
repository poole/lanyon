---
layout: page
title: ICLR Blog Posts
tags: [posts]
# authors: Bubeck, Sebastien (Microsoft); Dobre, David (Mila); Gauthier, Charlie (Mila); Gidel, Gauthier (Mila); Vernade, Claire (DeepMind)
---

All of the blog posts accepted to ICLR 2022 can be found here.



<ul>
  {% for post in site.posts %}
    <div >
        <h2 class="post-title">
        <a href="{{ post.url | absolute_url }}">
            {{ post.title }}
        </a>
        </h2>

        <span class="post-date">{{ post.date | date_to_string }} | {% for tag in post.tags %}
            <a class="content-tag" href="/tags/#{{ tag | slugify }}"> {{ tag }} </a>
                {% endfor %}
        </span>
        <span class="post-date">{{ post.authors }}</span>

        {{ post.excerpt }}
        <hr>
    </div>
  {% endfor %}
</ul>
