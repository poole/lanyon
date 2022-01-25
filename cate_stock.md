<!-- ---
layout: page
title: stock
---
{% for post in site.posts %}
  {% if post.category == 'stock' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %} -->
