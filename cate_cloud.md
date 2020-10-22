---
layout: page
title: Cloud
---
{% for post in site.posts %}
  {% if post.category == 'Cloud' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
