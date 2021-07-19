---
layout: post
title:  Aligning Ember with Web Standards
date:   2015-03-04 10:45:20
categories:
speaker: Matthew Beale
---

The JavaScript standardization process is about to change.

WHATWG + W3C => HTML/DOM/XHR/Streams  
TC39 + Ecma International => promises, loops, etc.

Shift:

W3C + Ecma (Standards group) | WHATWG + TC39 (Working group)

Now a "Living Standard". A big change: ES6 => ES2015

1. Strawman
* Proposal: Polyfills
* Draft: Experimaental
* Candidate: Compliant
* Finished: Shipping

Creates a "Living Web". Aligning with standards is no longer a one time event.

The primary goal is productivity.

### Why Standards?

* Portable
* Reflect best practices
* Endure

The participants win when you adopt early.

# Transpilers are here to stay

"Polyfill" - Remy Sharp

Babel! "Not born to die"

The platforms your application runs on will determine how you transpile. Babel
intends to be flexible in this regard.

## Aligning Ember's object model

1. stable
* a good pattern
* implemented correctly
* implemented performantly

## ES Classes

Three new tools:

1. class
* extend
* super

Gotchas:

1. new syntax
* super semantics change
* mixins
* setUnknownProperty
* merged/concat properties
* transpiler output?

Strategy:

1. provide legacy wrapper
* use syntax as a carrot
* private use can start sooner

Standards are a two-way street.

<http://201-created.com/ember-community-survey-2015>.
