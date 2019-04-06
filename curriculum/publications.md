---
title: Publications
date: July 2017
---

{% assign toppubs = ((site.data.proceedings | sort: 'citations') | reverse) %}
{% assign proceedings = site.data.proceedings.size %}
{% assign periodics = site.data.periodics.size %}
{% assign nationals = site.data.nationalpubs.size %}
{% assign refereedconfs = proceedings | plus: nationals %}
{% assign others = site.data.otherpubs.size %}
{% assign total = (refereedconfs | plus: periodics | plus: others) %}
{% assign allpubs = site.data.proceedings | concat: site.data.periodics | concat: site.data.nationalpubs | concat :site.data.otherpubs %}
{% assign isi = allpubs | where_exp:"item","item.index contains 'isi'" | size %}
{% assign scopus = allpubs | where_exp:"item","item.index contains 'scopus'" | size %}
{% assign dblp = allpubs | where_exp:"item","item.index contains 'dblp'" | size %}

Since 2008, I have co-authored **{{ refereedconfs }} articles in conferences** with scientic referee, **{{ periodics }} articles in periodics**, and **{{ others }} other** articles. In total, these **{{ total }} publications** have attracted over **{{ site.data.bibliometrics.citations }} citations**, resulting in an **h-index of {{ site.data.bibliometrics.hindex }}** and an **i10-index of {{ site.data.bibliometrics.i10index }}**, thus averaging **{{ site.data.bibliometrics.citations | divided_by: total }} citations per paper**. A summary of the eight most cited publications the complete can be found below. Indexed articles by the ISI Web of Science ({{ isi }}), SCOPUS ({{ scopus }}) and The DBLP Computer Science Bibliography ({{ dblp }}) are identified by the tags ISI, SCOPUS and DBLP respectively. More recent articles are still waiting for proper indexation, but all PLoP publications are indexed by SCOPUS.

{:.small-table}
| Title | Citations | Year |
|-------|-----------|------|
{% for pub in toppubs %}{% if pub.citations %}| {{ pub.name }} | {{ pub.citations }} | {{ pub.year }} |
{% endif %}{% endfor %}

## Papers in periodics with scientific referee

<ol reversed>
{% for pub in site.data.periodics %}
    <li>
      {{ pub.authors | join: ', ' }}, <i>{{ pub.name }}</i>, {{ pub.periodic }}. {{ pub.year }}{% if pub.index %} [ <abbr>{{pub.index | join: ', '}}</abbr> ]{% endif %}{% if pub.doi %} { <abbr>doi</abbr> <a href="http://dx.doi.org/{{ pub.doi }}">{{ pub.doi }}</a> }{% endif %}{% if pub.isbn %} {&nbsp;<abbr>isbn</abbr> <a href="">{{ pub.isbn }}</a>&nbsp;}{% endif %};
    </li>
{% endfor %}
</ol>

## Papers in conference proceedings with scientific referee

<ol reversed>
{% for pub in site.data.proceedings %}
    <li>
      {{ pub.authors | join: ', ' }}, <i>{{ pub.name }}</i>, {{ pub.conference }} (<abbr>{{ pub.acronym }}</abbr>). {{ pub.city }}, {{ pub.year }}{% if pub.index %} [ <abbr>{{pub.index | join: ', '}}</abbr> ]{% endif %}{% if pub.doi %} { <abbr>doi</abbr> <a href="http://dx.doi.org/{{ pub.doi }}">{{ pub.doi }}</a> }{% endif %}{% if pub.isbn %} {&nbsp;<abbr>isbn</abbr> <a href="">{{ pub.isbn }}</a>&nbsp;}{% endif %};
    </li>
{% endfor %}
</ol>

## Papers in national conferences with scientific referee

<ol reversed>
{% for pub in site.data.nationalpubs %}
    <li>
      {{ pub.authors | join: ', ' }}, <i>{{ pub.name }}</i>, {{ pub.conference }} (<abbr>{{ pub.acronym }}</abbr>). {{ pub.city }}, {{ pub.year }}{% if pub.index %} [ <abbr>{{pub.index | join: ', '}}</abbr> ]{% endif %}{% if pub.doi %} { <abbr>doi</abbr> <a href="http://dx.doi.org/{{ pub.doi }}">{{ pub.doi }}</a> }{% endif %}{% if pub.isbn %} {&nbsp;<abbr>isbn</abbr> <a href="">{{ pub.isbn }}</a>&nbsp;}{% endif %};
    </li>
{% endfor %}
</ol>

## Other scientific production

<ol reversed>
{% for pub in site.data.otherpubs %}
    <li>
      {{ pub.authors | join: ', ' }}, <i>{{ pub.name }}</i>, {{ pub.conference }}{% if pub.acronym %} (<abbr>{{ pub.acronym }}</abbr>){% endif %}. {% if pub.city %}{{ pub.city }}, {% endif %}{{ pub.year }}{% if pub.index %} [ <abbr>{{pub.index | join: ', '}}</abbr> ]{% endif %}{% if pub.doi %} { <abbr>doi</abbr> <a href="http://dx.doi.org/{{ pub.doi }}">{{ pub.doi }}</a> }{% endif %}{% if pub.isbn %} {&nbsp;<abbr>isbn</abbr> <a href="">{{ pub.isbn }}</a>&nbsp;}{% endif %};
    </li>
{% endfor %}
</ol>