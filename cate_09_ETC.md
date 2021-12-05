---
layout: page
title: 09_ETC
---
{% for post in site.posts %}
  {% if post.category == 'ETC' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
