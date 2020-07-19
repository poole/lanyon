---
layout: page
title: life
---

{% for post in site.posts %}
  {% if post.category == 'life' %}

    <!-- * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }}) -->
    <a href="{{ post.url | absolute_url }}">
      {{ post.title }}

  {% endif %}
{% endfor %}
