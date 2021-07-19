---
layout: post
title:  Bring Sanity to Frontend Infrastructure with Ember 
date:   2015-03-03 16:00:20
categories:
speaker: Sam Selikoff
---

Data -> API -> Interface

Backends are scalable and consistent.

### Frontend considerations:

* js/css libs
* build pipeline
* data layer
* deployments
* testing

### When the frontend is led astray:

* wastes time
* hard to share
* slow onboarding
* hampers growth

Ember CLI to the rescue, improving infrastructure right away, discover
infrastructure tomorrow.

Creates a consistent, uniform infrastructure. It brings forth conventions.

> Eliminates trivial differences that hold us back

#### Deployment progression

`ember build` -> Script for CI -> Addon -> `ember deploy` -> Deploy server

#### Testing progression

`ember test` -> xhr interceptor for adding data to the app -> Addon -> Clientside server

## What happened

Helped to identify redundancies and add abstractions.

## Tomorrow

semver + CLI conventions

Consistency brings flexibility. Also brings forth standards and best practices.

Helped to standardize:

Promises
Rendering layer
API standards
ES6 modules

## Considerations

It's okay to start with a monolith. In fact, it's a good thing. However, sometimes
the process and structure will need to evolve in the future.

# Ember is not just a framework, it's a philosophy

Fold in shared solutions. Innovate and share.

