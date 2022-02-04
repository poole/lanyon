---
layout: page
title: 11_Linux
---
{% for post in site.posts %}
  {% if post.category == 'Linux' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
