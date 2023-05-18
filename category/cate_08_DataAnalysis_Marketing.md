---
layout: page
title: 08_DataAnalysis_Marketing
---
{% for post in site.posts %}
  {% if post.category == 'DataAnalysis_Marketing' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
