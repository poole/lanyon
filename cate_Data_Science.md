---
layout: page
title: Data_Science
---
{% for post in site.posts %}
  {% if post.category == 'Data_Science' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})

  {% endif %}
{% endfor %}
