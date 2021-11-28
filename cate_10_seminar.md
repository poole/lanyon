---
layout: page
title: 10_seminar
---
{% for post in site.posts %}
  {% if post.category == '10_seminar' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
