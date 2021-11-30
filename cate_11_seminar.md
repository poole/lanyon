---
layout: page
title: 11_Seminar
---
{% for post in site.posts %}
  {% if post.category == '11_Seminar' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
