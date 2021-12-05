---
layout: page
title: 02_Preprocess
---
{% for post in site.posts %}
  {% if post.category == 'Preprocess' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
