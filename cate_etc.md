---
layout: page
title: 9_etc
---
{% for post in site.posts %}
  {% if post.category == '9_etc' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
