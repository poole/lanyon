---
layout: page
title: 03_Evaluation
---
{% for post in site.posts %}
  {% if post.category == 'Evaluation' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
