---
layout: post
title:  Dynamic Graphic Composition in Ember
date:   2015-03-03 16:30:20
categories:
speaker: Chris Henn
---

How do we split a statistical graphic into parts?

Benefits:

* Can change one feature of the graphic at a time.
* Easier to digest.
* Suggests the aspects that are _possible_ to change.
* Encourages cusom viz for every data situation. 

Resulting in conveying data better.

### Graph example with scatterplot

Block params provide a great way to add "layers" to a visualization. Provides
a flexible system to convey data.

Grammar of Graphics - Hadley Wickham

## Scatterplot grammar

* Mappings from variables to aspects of the plot. "Data to aesthetic mappings"
* Requires som sort of mapping function. "Scale"
* Represent as points. "Geom (geometry)"
* Layers
  * Geom
  * Stat
  * Optional data to aesthetic mapping
* Coordinate System: Cartesian, Polar, etc.
* Faceting

## What does this look like in Ember?

Components for data to aesthetic mapping. Computed properties for scales.
Layers: Separate components for geometries, stats, and the optional data to
aesthetic mappings.

## Further considerations

* Interactivity
* Animations and transitions
  * Performance
* When is the grammar appropriate?

