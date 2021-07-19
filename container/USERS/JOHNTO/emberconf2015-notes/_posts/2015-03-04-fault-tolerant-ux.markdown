---
layout:  post
title:   Fault Tolerant UX
date:    2015-03-04 10:00:20
video:   https://www.youtube.com/watch?v=s2awUFvA-0I&list=PLE7tQUdRKcyacwiUPs0CjPYt6tJub4xXU&index=18
slides:  
speaker: Dan Gebhart
---

Controls have to be laid out as clearly as possible. Functions and state of a system
should be clearly defined. Ships/planes/etc. require approval from governing bodies.
Software, not so much.

The model has switched from HTML with a sprinkle of JS to JS with a sprinkle of HTML.

Engineering in the web has become more rigorous, and there are way more considerations
to be made for the numerous devices with a web browser.

# Fault tolerant UX is a transactional user experience

### ACID test

* atomic
* consistent
* isolated
* durable

The experience should consistently move between valid states.

A transaction needs to be durable. A user should be confident that state will be persisted
when "Submit" is pressed.

Applications _MUST NOT_ violate the rules of transactional UX, _OR ELSE_.

Fault tolerant UX === Forgiving UX

Transitional persistence is an aspect to consider, data that hasn't been saved but is being edited.

* Undo/Redo: If you make a mistake (deletion), provide a way to undo it.
* Offline support: Achieved through isolation, huge win for usability.
* Async interface: Interactions aren't blocked by the server.

Ember provides simple, elegant patterns for building a consistent UX. Ember Data
provides an avenue for consistent and durable UX.

> Rethink assumptions and primitives.

Normalized data, evented connections, promisified methods.

## Orbit.js

Primary interfaces: requestable and transformable.

Connectors deal with synchronous event handling, with promise-aware events. They
translate events between sources, and wait (async blocking).

ember-orbit

URLs drive app state in Ember apps => sources drive model state in orbit.

<https://github.com/orbitjs>
