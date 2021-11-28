---
layout: page
title: 3_Evaluation
---
{% for post in site.posts %}
  {% if post.category == '3_Evaluation' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
