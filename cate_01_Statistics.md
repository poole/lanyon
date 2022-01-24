---
layout: page
title: 01_Statistics
---
{% for post in site.posts %}
  {% if post.category == 'Statistics' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
