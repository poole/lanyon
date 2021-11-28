---
layout: page
title: seminar
---
{% for post in site.posts %}
  {% if post.category == 'seminar' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
