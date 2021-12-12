---
layout: page
title: 13_Tableau
---
{% for post in site.posts %}
  {% if post.category == 'Tableau' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
