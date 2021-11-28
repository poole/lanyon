---
layout: page
title: 2_Preprocess
---
{% for post in site.posts %}
  {% if post.category == '2_Preprocess' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}
