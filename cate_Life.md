---
layout: page
title: life
---
{% for post in site.posts %}
  {% if post.category == 'life' %}
  <a href="{{ post.url | absolute_url }}">
    {{ post.title }}
    <small>{{ post.date | date_to_string }}</small>

  {% endif %}
{% endfor %}
