---
layout: page
title: ML_Evaluation
---
{% for post in site.posts %}
  {% if post.category == 'ML_Evaluation' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
