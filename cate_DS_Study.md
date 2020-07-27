---
layout: page
title: DS_Study
---
{% for post in site.posts %}
{% if post.category == 'DS_Study' %}
* {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endif %}
{% endfor %}
