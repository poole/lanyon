---
layout: page
title: 04_NLP
---
{% for post in site.posts %}
  {% if post.category == 'NLP' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
