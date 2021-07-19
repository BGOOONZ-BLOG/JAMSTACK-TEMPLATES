---
layout: post
title:  Building Custom Apps with Ember CLI
date:   2015-03-04 14:15:20
categories:
speaker: Brittany Storoz
---

Slides: <http://brittanystoroz.github.io/presentations/embercli-fxos/>

Ember CLI fills a huge void in the JavaScript development flow.

Needs to add upon the Ember CLI for Firefox OS:

* manifest file
* components that mimic OS interface
* publish to the marketplace

Perfect use cases for ember-cli addons. `ember addon name-of-addon`

## Creating a manifest file

Generate a blueprint for the manifest. `ember g blueprint`

`postprocessTree` hook to modify the build after post processing.

## Building components

Include the asset dependencies from bower and make them available to the
consuming application. Achieved through using the `afterInstall` hook.

Create a component in the `addon` directory, import into the consuming app
in the `app` directory.

## Validation and publishing

A perfect use case for a command.

`ember fxos:validate` and `ember fxos:publish`

Place in `lib/commands`. A module with `name` and `aliases` properties, `run`
function.
