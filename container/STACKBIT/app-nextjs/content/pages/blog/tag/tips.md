---
title: Tips
sections:
  - type: hero_section
    title: Tips
    align: center
    padding_top: medium
    padding_bottom: none
    background_color: none
  - type: blog_feed_section
    blog_feed_cols: three
    enable_cards: true
    show_recent: false
    tag: content/data/tags/tips.yaml
    show_date: true
    show_categories: true
    show_author: false
    show_excerpt: true
    show_image: true
    padding_top: small
    padding_bottom: large
    has_border: true
  - type: form_section
    title: Newsletter Signup
    title_align: center
    content: >-
      Subscribe to our newsletter to make sure you don't miss anything.
    content_align: center
    form_position: bottom
    form_layout: inline
    form_id: subscribeForm
    form_action: /thank-you
    form_fields:
      - input_type: email
        name: email
        label: Email
        default_value: Your email address
        is_required: true
    submit_label: Subscribe
    padding_top: medium
    padding_bottom: medium
    has_border: true
    background_color: secondary
seo:
  title: Posts in Tips
  description: This is the tag archive page
  extra:
    - name: og:type
      value: website
      keyName: property
    - name: og:title
      value: Posts in Tips
      keyName: property
    - name: og:description
      value: This is the tag archive page
      keyName: property
    - name: og:image
      value: images/post-2,jpg
      keyName: property
      relativeUrl: true
    - name: twitter:card
      value: summary_large_image
    - name: twitter:title
      value: Posts in Tips
    - name: twitter:description
      value: This is the tag archive page
    - name: twitter:image
      value: images/post-2,jpg
      relativeUrl: true
layout: advanced
---
