---
layout: page
title: etc
---
{% for post in site.posts %}
  {% if post.category == 'etc' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
