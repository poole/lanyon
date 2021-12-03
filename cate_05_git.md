---
layout: page
title: 05_git
---
{% for post in site.posts %}
  {% if post.category == '05_git' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
