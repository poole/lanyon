---
layout: page
title: 03_DL
---
{% for post in site.posts %}
  {% if post.category == 'DL' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
