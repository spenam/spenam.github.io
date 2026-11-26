---
layout: page
title: StrangeArt – Mathematical Generative Art and Strange Attractors
description: A Julia-based mathematical generative art project exploring strange attractors, nonlinear dynamical systems, numerical integration, and parameter-driven visual patterns.
img: assets/img/clifford-density.png
importance: 7
category: fun
related_publications: false
---

## Overview

**StrangeArt** is a personal project exploring the intersection of mathematics, dynamical systems, numerical computation, and generative art.

I have a particular interest in **mathematical generative art**: the idea that relatively simple mathematical equations can produce remarkably complex, intricate, and visually appealing structures. StrangeArt is an opportunity to explore this fascination through programming, turning mathematical systems into computational artwork.

The project focuses on generating two-dimensional visual representations of **strange attractors**, mathematical objects associated with nonlinear dynamical systems and chaotic behavior.

By iterating discrete maps or numerically integrating continuous differential equations, the project produces trajectories whose geometric structures reveal the underlying dynamics of each system.

Rather than manually designing visual compositions, StrangeArt uses mathematical rules to generate them. Small variations in parameters can lead to substantial changes in the resulting geometry, creating an interesting relationship between mathematical behavior and visual expression.

The project currently implements six dynamical systems:

- **Hénon map:** A discrete-time dynamical system exhibiting chaotic behavior and a characteristic fractal attractor.
- **Clifford attractor:** A two-dimensional nonlinear map producing intricate and often highly symmetric structures.
- **De Jong attractor:** A trigonometric iterative system capable of generating complex organic patterns.
- **Lorenz attractor:** A classical continuous-time chaotic system known for its characteristic butterfly-shaped geometry.
- **Rössler attractor:** A continuous dynamical system producing spiral structures and chaotic trajectories.
- **Thomas attractor:** A three-dimensional cyclically symmetric dynamical system with distinctive geometric patterns.

An important objective is to make experimentation with these systems straightforward, allowing different parameters, numerical configurations, projections, and rendering techniques to be explored without manually modifying the underlying implementation.

StrangeArt is both a programming project and a personal exploration of how mathematics can become a medium for visual creativity.

![De Jong density animation with all four parameter values](assets/img/dejong-b-density.gif)

## Key Features

- **Multiple dynamical systems:** Generate artwork from six different strange attractors, including Hénon, Clifford, de Jong, Lorenz, Rössler, and Thomas.
- **Discrete dynamical maps:** Generate trajectories through iterative nonlinear equations.
- **Continuous dynamical systems:** Numerically integrate ordinary differential equations to obtain attractor trajectories.
- **Numerical integration:** Use adaptive Verner integration through the OrdinaryDiffEqVerner and SciMLBase ecosystem.
- **Parameter exploration:** Investigate how changing system parameters affects the geometry and structure of generated artwork.
- **Parameter-sweep animations:** Generate GIF animations illustrating the gradual transformation of attractors as parameters evolve.
- **Density-based rendering:** Convert trajectory samples into two-dimensional occupancy grids for high-resolution visualizations.
- **Color mapping:** Apply logarithmic or linear density scales and parameter-dependent color palettes.
- **Vector graphics:** Export generated artwork as SVG files.
- **Raster graphics:** Generate high-resolution PNG images suitable for visualization and further artistic use.
- **Custom dynamical systems:** Extend the project with user-defined differential equations.
- **Command-line interface:** Generate artwork and animations directly from the terminal.
- **Reproducible generation:** Keep numerical parameters, rendering settings, and generation scripts organized and configurable.

## Mathematical Foundations

The central idea behind StrangeArt is that mathematical systems can produce complex visual structures through relatively simple rules.

The project explores two complementary approaches to generating these structures: discrete dynamical systems and continuous dynamical systems.

### 1. Discrete dynamical systems

Discrete systems evolve through repeated application of mathematical functions.

A two-dimensional discrete map can be represented as:

\[
\begin{aligned}
x_{n+1} &= f(x_n,y_n;\theta) \\
y_{n+1} &= g(x_n,y_n;\theta)
\end{aligned}
\]

where:

- \(x_n,y_n\) represent the current state.
- \(f,g\) define the nonlinear transformation.
- \(\theta\) represents the system parameters.
- \(n\) denotes the iteration number.

Starting from an initial condition, the system generates a sequence of points in the plane.

By plotting these points, it becomes possible to observe the geometric structures produced by the underlying equations.

The project implements three discrete systems.

**Hénon map**

The Hénon map is a classical example of a nonlinear discrete dynamical system:

\[
\begin{aligned}
x_{n+1} &= 1-a x_n^2+y_n \\
y_{n+1} &= b x_n
\end{aligned}
\]

Its behavior depends on the parameters \(a\) and \(b\). For suitable configurations, the system produces a characteristic strange attractor.

**Clifford attractor**

The Clifford map is implemented using trigonometric transformations:

\[
\begin{aligned}
x_{n+1} &= \sin(a y_n)+c\cos(a x_n) \\
y_{n+1} &= \sin(b x_n)+d\cos(b y_n)
\end{aligned}
\]

Changing the four parameters can produce a wide variety of intricate structures.

**De Jong attractor**

The de Jong map uses another nonlinear trigonometric transformation:

\[
\begin{aligned}
x_{n+1} &= \sin(a y_n)-\cos(b x_n) \\
y_{n+1} &= \sin(c x_n)-\cos(d y_n)
\end{aligned}
\]

Its parameter space offers particularly interesting opportunities for artistic exploration, as small changes can produce significantly different visual patterns.

### 2. Continuous dynamical systems

Unlike discrete maps, continuous dynamical systems evolve according to ordinary differential equations.

Their general representation is:

\[
\frac{d\mathbf{x}}{dt}=F(\mathbf{x},t;\theta)
\]

where:

- \(\mathbf{x}\) represents the system state.
- \(F\) defines the differential equations.
- \(t\) represents continuous time.
- \(\theta\) contains the system parameters.

The resulting trajectories are computed numerically using an adaptive Verner integration method.

Three continuous systems are currently implemented.

**Lorenz system**

The Lorenz equations are:

\[
\begin{aligned}
\frac{dx}{dt} &= \sigma(y-x) \\
\frac{dy}{dt} &= x(\rho-z)-y \\
\frac{dz}{dt} &= xy-\beta z
\end{aligned}
\]

The system is a well-known example of deterministic chaos and produces the iconic butterfly-shaped Lorenz attractor for suitable parameter configurations.

**Rössler system**

The Rössler equations are:

\[
\begin{aligned}
\frac{dx}{dt} &= -y-z \\
\frac{dy}{dt} &= x+ay \\
\frac{dz}{dt} &= b+z(x-c)
\end{aligned}
\]

This system produces characteristic spiral trajectories and increasingly complex behavior depending on its parameters.

**Thomas system**

The Thomas system is defined by:

\[
\begin{aligned}
\frac{dx}{dt} &= \sin(y)-bx \\
\frac{dy}{dt} &= \sin(z)-by \\
\frac{dz}{dt} &= \sin(x)-bz
\end{aligned}
\]

Its cyclic structure and nonlinear interactions make it particularly interesting from both a mathematical and visual perspective.

### 3. From mathematical trajectories to artwork

Once a trajectory has been generated, its points can be interpreted as a visual composition.

The simplest approach consists of plotting the trajectory directly, producing a geometric representation of the system's evolution.

However, for dense trajectories, directly plotting individual points can make it difficult to distinguish regions with different visitation frequencies.

StrangeArt therefore also implements a density-based rendering approach.

The process consists of:

1. Generating a collection of trajectory points.
2. Defining a two-dimensional rendering region.
3. Mapping each point to its corresponding pixel or grid cell.
4. Accumulating the number of visits to each cell.
5. Converting the occupancy matrix into an image.
6. Applying a color mapping to reveal the density structure.

The resulting density matrix is represented as a `UInt32` occupancy grid.

Two different density transformations are available:

- **Linear scaling:** Color intensity is proportional to the number of visits.
- **Logarithmic scaling:** Compresses large differences in occupancy to reveal both highly visited and less frequently visited regions.

This approach makes it possible to create visually richer representations of attractors while preserving information about the underlying trajectory distribution.

## Parameter Exploration and Generative Art

One of my main motivations for developing StrangeArt is the exploration of parameter spaces.

In mathematical generative art, the parameters of a system become artistic controls. A small numerical modification can transform an existing structure into an entirely different composition.

Instead of considering one configuration as the final result, StrangeArt encourages the exploration of entire families of visual structures.

### 1. Parameter sweeps

A parameter sweep consists of generating multiple versions of the same attractor while varying one of its parameters.

For example, the Clifford attractor can be explored by varying its parameter \(a\) across a predefined interval.

Each generated trajectory corresponds to a different mathematical configuration.

The project also supports parameter sweeps for:

| System | Swept parameter | Default range |
|---|---|---|
| Clifford | \(a\) | -1.6 to -1.2 |
| De Jong | \(a\) | -2.6 to -1.9 |
| Hénon | \(a\) | 0.8 to 1.4 |
| Lorenz | \(\rho\) | 20 to 28 |
| Rössler | \(c\) | 2 to 6 |
| Thomas | \(b\) | 0.32 to 0.18 |

These ranges provide convenient starting points for experimentation rather than restricting the systems to a particular mathematical regime.

### 2. Parameter-dependent coloring

Parameter sweeps can also be combined into a single visual composition.

Instead of assigning one color to an entire image, the color of each trajectory can encode the parameter value used to generate it.

This creates a visual correspondence between mathematical parameters and artistic appearance.

The batch-generation workflow uses a perceptually uniform, viridis-like palette sampled along an Oklab color path.

A color bar identifies the parameter range, making the resulting artwork both visually interesting and interpretable.

### 3. Animated mathematical transformations

StrangeArt also supports the generation of GIF animations.

Each frame represents an attractor generated using a different parameter value.

By displaying the frames sequentially, the animation illustrates how the geometry evolves as the mathematical system changes.

The animation workflow supports:

- Configurable parameter ranges.
- Explicit parameter values.
- Configurable frame counts.
- Adjustable animation delays.
- Different projections for continuous systems.
- Individual animations for each built-in attractor.

For example, a Lorenz parameter sweep can concentrate several frames around \(\rho=24.74\), allowing particularly interesting changes in system behavior to be explored.

This makes animations a useful way to investigate the relationship between nonlinear dynamics and visual complexity.

## Rendering and Visualization

The project supports several output formats, each serving a different purpose.

### SVG rendering

SVG output provides scalable vector representations of the generated trajectories.

This format is particularly useful for inspecting geometric structures, opening artwork in a browser, and working with vector graphics editors.

### PNG density rendering

PNG rendering provides raster-based visualizations using accumulated trajectory densities.

The default density workflow accumulates one million orbit samples and applies logarithmic color mapping.

The rendering resolution and number of samples can be configured to explore different levels of visual detail.

### GIF animations

GIF output provides a convenient way to visualize parameter-dependent transformations.

The animation pipeline generates a sequence of images and combines them into an animated representation without requiring a high-level image-processing dependency.

The implementation uses the lightweight `Giflib_jll` package for GIF support.

## Software Architecture and Implementation

StrangeArt is implemented in Julia and follows a modular architecture designed to separate mathematical systems, numerical integration, rendering, and animation generation.

The project is organized into several main components:

| Component | Responsibility |
|---|---|
| `src/attractors/` | Mathematical definitions and trajectory generation |
| `src/rendering/` | SVG, PNG, and density-based rendering |
| `src/animation/` | Parameter-sweep animation generation |
| `src/StrangeArt.jl` | Main module and public API |
| `bin/` | Command-line interface |
| `scripts/` | Reusable batch-generation workflows |
| `test/` | Automated tests |

The architecture separates the generation of mathematical trajectories from their visual representation.

This makes it possible to reuse the same numerical output for different rendering strategies without coupling the mathematical implementation to a particular image format.

### 1. Numerical computation

Discrete maps are evaluated iteratively, with configurable transient removal and retained trajectory lengths.

For continuous systems, the project uses the adaptive Verner `Vern7` integration method through `OrdinaryDiffEqVerner` and `SciMLBase`.

The integration workflow supports configurable duration, time steps, and transient removal.

### 2. Extensibility

The project is designed to support additional dynamical systems.

Custom continuous systems can be defined through user-provided in-place differential equations.

For example:

```julia
using StrangeArt

custom_system!(du, u, p, t) = (
    du[1] = p * u[2];
    du[2] = -p * u[1]
)

points = ode_points(custom_system!, (1.0, 0.0); p=1.0)
```

The resulting trajectory can then be passed to the available rendering workflows.

Built-in systems can also be extended by adding new generators to `src/attractors/` and registering them in the system registry.

### 3. Reproducibility and testing

The project includes reusable scripts for generating collections of attractors and parameter sweeps.

The main generation settings can be adjusted to control:

- Number of trajectory samples.
- Image resolution.
- Parameter ranges.
- Numerical integration settings.
- Density transformations.
- Color palettes.
- Animation configurations.

Automated tests are available through Julia's package testing infrastructure.

## Technologies

- **Programming language:** Julia 1.10+
- **Numerical integration:** OrdinaryDiffEqVerner and SciMLBase
- **Numerical methods:** Adaptive Verner `Vern7` integration
- **Dynamical systems:** Hénon, Clifford, de Jong, Lorenz, Rössler, and Thomas
- **Rendering:** Custom SVG and PNG generation
- **Density visualization:** Two-dimensional occupancy grids and logarithmic/linear scaling
- **Color science:** Oklab color interpolation and perceptually uniform palettes
- **Animation:** GIF generation and parameter-sweep workflows
- **GIF support:** Giflib_jll
- **Testing:** Julia Pkg test infrastructure
- **Development tools:** Git and GitHub
- **Output formats:** SVG, PNG, and GIF

## Roadmap

StrangeArt is an evolving personal project. Its main direction is to expand the mathematical systems available, improve visual rendering techniques, and explore more sophisticated forms of mathematical generative art.

**Current implementation**

- Six built-in strange attractors.
- Discrete map trajectory generation.
- Continuous ODE integration.
- Configurable trajectory sampling.
- SVG and PNG rendering.
- Density-based visualization.
- Logarithmic and linear density scaling.
- Parameter-sweep image generation.
- GIF animations.
- Custom continuous dynamical systems.
- Modular project architecture and automated tests.

**Potential future directions**

- Additional chaotic and nonlinear dynamical systems.
- Exploration of higher-dimensional dynamical systems and projections.
- More advanced density estimation and rendering techniques.
- Additional color palettes and artistic rendering styles.
- Interactive parameter exploration.
- More sophisticated animation workflows.
- Automated exploration of parameter spaces to discover visually interesting configurations.
- A broader collection of mathematical generative artwork.

## Personal Motivation

Beyond the technical aspects, StrangeArt is a project driven by my interest in mathematics as a source of artistic inspiration.

I find it particularly fascinating that mathematical equations, sometimes consisting of only a few lines, can generate structures with such a high degree of complexity and visual richness.

What makes generative art especially interesting to me is the balance between control and emergence: the equations and parameters define the rules, but the final visual structure is often difficult to anticipate without actually running the system.

Exploring these systems is therefore both a mathematical investigation and a creative process.

With StrangeArt, I want to experiment with this relationship between mathematics, computation, and aesthetics, and to build a growing collection of visual works generated entirely from mathematical principles.

The project reflects my belief that **mathematics is not only a tool for understanding the world, but also a powerful medium for creating art.**

## Repository

The complete source code, generation scripts, example artwork, and installation instructions are available on GitHub.

**GitHub:** https://github.com/spenam/StrangeArt

**License:** MIT
