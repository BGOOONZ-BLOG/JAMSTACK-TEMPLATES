---
layout: post
title:  Physical Design
date:   2015-03-04 16:45:20
categories:
speaker: Edward Faulkner
---

Every developer is a UX designer. Considerations: the
end user, and the Ember developer

The physical world is constrained by physics but computers are abstract,
and don't abide by physics on the screen. It's our job to recreate this.
Pretending to be physical creates a better user experience.

# Don't break the rules of physics

Smooth motion in _reaction_ to the user.

Animations, and motion in general, live in the gaps between what _was_ and what _will become_.

`npm i --save liquid-fire`

Some subtle details can be handled with a single CSS properties. Other details require more
involvement.

Use a `{{liquid-outlet}}` and a `app/transitions.js` to define animation between routes.
