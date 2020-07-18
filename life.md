---
layout: page
title: Life
---

{% if post.category == 'life' %}
  {% for post in site.posts %}
    * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
    {% endfor %}
{% endif %}
