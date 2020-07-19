---
layout: page
title: Archive
---
{% for post in site.posts %}
  {% if post.category == 'Archive' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
