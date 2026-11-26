---
layout: page
title: Tessera – Mathematical Generative Art and Geometric Tessellations
description: A lightweight Python project for exploring periodic, aperiodic, and k-uniform tilings made from regular polygons, with an emphasis on mathematical structure and generative visual design.
img: assets/img/weird.svg
importance: 8
category: fun
related_publications: false
---

# Tessera – Mathematical Generative Art and Geometric Tessellations

## Overview

**Tessera** is a lightweight Python project for exploring and generating geometric tilings. It brings together ideas from geometry, symmetry, combinatorics, and computational design to create intricate patterns from regular polygons.

The project focuses on periodic, aperiodic, and, in particular, **k-uniform edge-to-edge tilings**. These structures offer a fascinating mathematical playground: simple geometric elements combine according to precise rules to produce patterns with rich visual complexity.

Tessera generates plain SVG output, making its results easy to inspect, scale, edit, and incorporate into other creative or technical workflows. It is designed to be lightweight, with no third-party runtime dependencies.

I have a particular appreciation for mathematical generative art. I enjoy exploring how relatively simple mathematical rules can produce elaborate visual structures, and tessellations are a beautiful example of this principle. Tessera is a way to investigate that relationship between mathematical constraints and visual creativity.

## Try Tessera Online

One of the things I particularly like about Tessera is how lightweight it is. The package has no third-party runtime dependencies, and its compact design makes it possible to bring the experience directly to the web.

You don't need to install Python or clone the repository to start exploring geometric tilings. You can experiment with Tessera directly in your browser through its interactive web version:

**[Launch Tessera – Interactive Web Explorer](https://spenam.github.io/tessera/)**

The online version makes the project more accessible: you can explore geometric constructions and play with mathematical patterns immediately, without setting up a development environment.

I like the idea that a mathematical generative art project should be something people can interact with, not just a collection of algorithms or pre-rendered images. Being able to experiment with the constructions directly in a browser makes that experience much more immediate.

## Key Features

- **Periodic tilings:** Generate familiar regular patterns such as square, triangular, and hexagonal tilings.
- **Aperiodic patterns:** Construct an octagonal cut-and-project point set and its Voronoi dual.
- **k-uniform tilings:** Generate edge-to-edge arrangements of regular polygons using GomJau-Hogg construction notation.
- **Reference catalogue:** Browse a starter collection of 19 constructions, covering examples from 1-uniform through 4-uniform tilings.
- **Regular polygon fields:** Create decorative fields of regular polygon motifs with configurable numbers of sides.
- **SVG rendering:** Export vector graphics that remain crisp at any scale.
- **Python API and command-line interface:** Explore constructions programmatically or directly from the terminal.
- **Configurable visual styles:** Adjust colors, palettes, outlines, opacity, scale, rotation, and layer composition.

## Mathematical Foundations

### Periodic tilings

Periodic tilings cover the plane through patterns that repeat under translations. Tessera includes generators for three fundamental examples:

- Square tilings
- Triangular tilings
- Hexagonal tilings

These simple structures provide a foundation for exploring more elaborate arrangements and transformations.

### k-uniform tilings

One of the central features of Tessera is its support for **k-uniform tilings**.

A k-uniform tiling has exactly _k_ symmetry orbits of vertices. In other words, its vertices fall into exactly _k_ distinct classes under the symmetries of the tiling.

A vertex figure describes the sequence of polygons meeting around a vertex. Importantly, different vertex orbits do not necessarily correspond to different vertex figures, making the classification of these tilings more subtle than simply counting local polygon arrangements.

Tessera includes a reference catalogue of selected constructions for k = 1 through k = 4, as well as a generator that accepts custom GomJau-Hogg notation.

The current local catalogue contains:

| Uniformity | Included constructions | Known complete total |
| ---------- | ---------------------: | -------------------: |
| 1-uniform  |                     11 |                   11 |
| 2-uniform  |                      4 |                   20 |
| 3-uniform  |                      3 |                   61 |
| 4-uniform  |                      1 |                  151 |

The catalogue is deliberately a starter collection rather than an exhaustive classification. Tessera can generate additional patterns from valid construction notation, but it does not automatically discover every possible tiling or certify the k-uniformity of arbitrary user-supplied constructions.

### Mixed regular polygons

A particularly interesting aspect of the project is the ability to combine different regular polygons while preserving exact edge-to-edge connections.

For standard Euclidean edge-to-edge tilings by regular polygons, Tessera supports polygons with 3, 4, 6, 8, and 12 sides.

For example, the construction:

`6-4-3/m30/r(c2)`

generates a mixed tiling containing regular hexagons, squares, and equilateral triangles.

Another example:

`8-4/m90/r(h4)`

produces a pattern based on regular octagons and squares.

These constructions illustrate how a small collection of geometric elements, combined under symmetry and adjacency constraints, can generate surprisingly elaborate structures.

### Aperiodic geometry

Tessera also explores patterns that do not exhibit ordinary translational periodicity.

Its quasicrystal generator uses an **octagonal cut-and-project construction**, followed by a Voronoi dual to produce polygonal cells.

This provides a different kind of geometric exploration from the periodic generators. Rather than repeating a fixed unit cell, the construction uses a projection-based mathematical process to produce an aperiodic arrangement.

It is worth distinguishing this approach from Penrose rhomb substitution tilings: Tessera's implementation is specifically an octagonal cut-and-project point set rendered through Voronoi cells.

## Generative Art and Visual Exploration

The main motivation behind Tessera is to turn mathematical constructions into visual objects.

Tessellations are especially appealing as a form of generative art because they combine strict mathematical rules with a large space of possible visual outcomes.

A few choices can substantially change the resulting composition:

- The polygons used in the construction
- The symmetry operations and their parameters
- The size and extent of the generated patch
- The orientation and scale of the pattern
- The color palette and fill strategy
- The thickness and color of polygon outlines
- The layering and opacity of different generators

Tessera separates the mathematical construction from its visual presentation. This makes it possible to experiment with different styles while preserving the underlying geometric relationships.

The result can be both mathematically meaningful and aesthetically interesting: a visual composition whose structure is determined by geometry rather than manually placing individual shapes.

## Rendering and Visualization

Tessera uses **SVG (Scalable Vector Graphics)** as its primary output format.

This is particularly useful for geometric artwork because vector graphics preserve sharp edges and precise polygon boundaries regardless of display or print resolution.

The renderer supports multiple layers, composited in order. Common options include:

- `tile_size`: overall geometric scale
- `scale`: additional scaling
- `rotation`: rotation of the pattern
- `x` and `y`: positioning
- `fill`: palette, alternate, solid, random, or none
- `color`: explicit fill color
- `stroke`: polygon outline color
- `stroke_width`: outline thickness
- `opacity`: layer transparency

The generated patch is clipped to the SVG viewport. Increasing `max_repeat` can improve coverage of the construction, although it also increases generation time and output size.

## Software Architecture and Implementation

Tessera is implemented in Python and organized around a small collection of geometric generators and shared rendering utilities.

The main components are:

- `catalogue.py`: built-in k-uniform reference constructions
- `geometry.py`: polygon primitives and geometric transformations
- `style.py`: color palettes and fill selection
- `render.py`: shared SVG renderer and generator registry
- `presets.py`: starter configurations
- `cli.py`: command-line interface
- `tilings/periodic.py`: periodic patterns and regular polygon motif fields
- `tilings/aperiodic.py`: cut-and-project points and Voronoi cells
- `tilings/uniform.py`: regular polygon placement and symmetry expansion

The implementation keeps the generation of geometric structures separate from their rendering. This makes the individual generators easier to understand, test, and extend.

### Python API

The project also exposes a Python API for use in scripts and other applications.

For example:

```python
from tessera import generate_uniform, uniform_catalogue, render

# Browse reference constructions with k <= 4.
for entry in uniform_catalogue(4):
    print(
        entry["id"],
        entry["k"],
        entry["vertex"],
        entry["notation"]
    )

# Generate a mixed triangle/square/hexagon patch.
polygons = generate_uniform(
    "6-4-3/m30/r(c2)",
    width=1000,
    height=1000,
    tile_size=70,
    max_repeat=12
)

# Render the construction to SVG.
svg = render({
    "width": 1000,
    "height": 1000,
    "layers": [{
        "type": "uniform",
        "notation": "6-4-3/m30/r(c2)",
        "tile_size": 70,
        "max_repeat": 12
    }]
})
```

### Command-line interface

The command-line interface makes it easy to explore the built-in catalogue and generate SVG files.

For example:

```bash
# List built-in k-uniform constructions.
tessera --list-uniform --max-k 4

# Render a mixed regular-polygon tiling.
tessera --notation '6-4-3/m30/r(c2)' -o mixed.svg

# Render a catalogue entry.
tessera --uniform u4-01 -o four-uniform.svg
```

The project requires Python 3.10 or newer and has no third-party runtime dependencies.

## Technologies

- **Python 3.10+** – implementation and public API
- **SVG** – vector-based graphical output
- **Computational geometry** – polygon construction, transformations, and Voronoi diagrams
- **GomJau-Hogg notation** – construction notation for k-uniform tilings
- **Unit testing** – Python's built-in `unittest` framework

## Testing

The test suite can be run using Python's built-in testing framework:

```bash
python -m unittest discover -s tests -v
```

## Mathematical References

The implementation of the k-uniform tiling generator draws on the following work:

- V. Gomez-Jauregui, H. Hogg, C. Manchado and C. Otero, _GomJau-Hogg's Notation for Automatic Generation of k-Uniform Tessellations with ANTWERP v3.0_, Symmetry 13(12), 2376 (2021).
- [ANTWERP source project](https://github.com/HHogg/antwerp) – algorithmic reference for polygon placement and symmetry-expansion notation.
- [The Tiling Atlas](https://www.thetilingatlas.com/catalogue) – reference catalogue of regular-polygon k-uniform tilings.
- [OEIS A068599](https://oeis.org/A068599) – related sequence of k-uniform tiling counts.

## Personal Motivation

I have always found mathematical generative art particularly appealing. There is something fascinating about discovering how a relatively small set of rules can produce such a wide variety of intricate visual patterns.

Tessera explores this idea through geometry. Polygons, symmetry operations, adjacency constraints, and projection methods become the building blocks of visual compositions.

What I particularly enjoy about this kind of project is the connection between mathematical rigor and aesthetic freedom. The geometry imposes precise constraints, but the choice of constructions, scales, colors, and visual arrangements leaves considerable room for experimentation.

For me, Tessera is both a computational geometry project and a creative exploration of mathematical structures. It is an opportunity to turn abstract geometric ideas into tangible visual patterns—and to make those ideas accessible to others through a lightweight tool that can be explored directly in a web browser.

**Mathematics can describe the structure of a pattern, but it can also be the very thing that creates its beauty.**

## Try It and Explore the Source

- **[Open the interactive Tessera web explorer](https://spenam.github.io/tessera/)**
- **[Browse the source code on GitHub](https://github.com/spenam/Tessera)**

The project is lightweight, self-contained, and designed to make mathematical tiling constructions accessible through both a reusable Python API and an interactive browser experience.
