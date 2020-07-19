---
layout: page
title: life
---

{% for post in site.posts %}
  {% if post.category == 'life' %}
  <a href="{{ post.url | absolute_url }}">
    {{ post.title }}

  {% endif %}
{% endfor %}
