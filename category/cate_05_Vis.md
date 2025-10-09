---
layout: page
title: 05_Vis
---
{% for post in site.posts %}
  {% if post.category == 'Vis' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
