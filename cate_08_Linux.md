---
layout: page
title: 08_Linux
---
{% for post in site.posts %}
  {% if post.category == '08_Linux' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
