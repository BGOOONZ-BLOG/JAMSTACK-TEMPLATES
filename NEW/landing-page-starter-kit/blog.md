---
layout: home
title: Blog
date: 2018-01-14 2:10:10 +0000
class: blog
description: Articles
permalink: /blog/
---

<div class="container">
    <h2>All Posts</h2>
    <ul class="posts">
    {% assign posts = site.posts | sort: 'date' | reverse %}
    {% for post in posts %}
        <li class="post-item">
            <h3>
                <a class="post-link" href="{{ post.url | prepend: site.baseurl }}" title="{{ post.title | escape }}">{{ post.title | escape }}</a>
            </h3>
            <h4>{{ post.date | date_to_long_string }}</h4>
        </li>
    {% endfor %}
    </ul>
</div>