---
layout: page
title: 99_Seminar
---
{% for post in site.posts %}
  {% if post.category == 'Seminar' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
