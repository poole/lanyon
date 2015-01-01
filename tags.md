---
layout: page
title: Tags
---

{% assign tag_separator = '<br />' %}

<div class="page">
  {% assign sorted_tags = site.data.tags | sort:"name" %}
  {% for tag in sorted_tags %}
    {% include tag_link_formatter.html %}
  {% endfor %}
</div>
