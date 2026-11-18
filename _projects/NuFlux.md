---
layout: page
title: NuFlux.jl – Neutrino Flux Calculations
description: A Julia package for reading, parsing, and interpolating atmospheric neutrino flux tables
img: assets/img/nuflux.svg
importance: 1
category: work
related_publications: true
---

## Overview

**NuFlux.jl** is a Julia package developed for handling atmospheric neutrino flux calculations, with a particular focus on reading and processing the Honda atmospheric neutrino flux tables. I was one of the main developpers of the package.

The package provides tools to parse neutrino flux data and extract flux values for different neutrino types as a function of energy, zenith angle, and azimuth angle. It also supports numerical interpolation, enabling the evaluation of flux distributions at arbitrary points within the tabulated data.

This package facilitates the integration of atmospheric neutrino flux models into neutrino physics simulations and analyses, particularly in the context of neutrino telescope experiments such as KM3NeT.

## Key Features

- **Flux table parsing:** Read and process Honda atmospheric neutrino flux files from different geographical sites.
- **Neutrino identification:** Access flux tables for different neutrino species using PDG particle identifiers.
- **Multidimensional flux evaluation:** Extract neutrino flux values as a function of energy, zenith angle, and azimuth angle.
- **Numerical interpolation:** Support for linear, quadratic, and cubic interpolation methods.
- **Logarithmic interpolation:** Enable interpolation in logarithmic flux space for improved approximation of the underlying flux distributions.
- **Flexible angular averaging:** Calculate averaged flux values when zenith or azimuth information is not specified.

## Implementation and Usage

The package is implemented in Julia and provides a straightforward interface for loading atmospheric neutrino flux tables and evaluating flux values.

A typical workflow consists of loading a Honda flux file, selecting the desired neutrino species, and evaluating the corresponding flux at a given energy and direction.

```julia
using NuFlux

# Load atmospheric neutrino flux data
NUFLUX_PATH = split(Base.pathof(NuFlux), "src")[1]
FLUX_DATA_DIR = joinpath(NUFLUX_PATH, "data")

flux_dict = NuFlux.readfluxfile(
    joinpath(FLUX_DATA_DIR, "frj-ally-20-12-solmin.d")
)

# Select the muon neutrino flux table
muon_neutrino_flux = flux_dict[NuFlux.NUMU_PDGID]

# Define the kinematic parameters
energy = 10.0  # GeV
cosθ = 0.5
ϕ = 0.0         # radians

# Evaluate the atmospheric neutrino flux
flux_value = NuFlux.flux(
    muon_neutrino_flux,
    energy,
    cosθ,
    ϕ;
    interpol=true,
    interpol_method="linear",
    interp_logflux=true
)

println("Flux value: ", flux_value)
```

The package supports different interpolation strategies, with linear interpolation in logarithmic flux space recommended for approximating the behavior of the Honda flux distributions.

## Scientific Applications

NuFlux.jl provides a practical interface for incorporating atmospheric neutrino flux predictions into scientific analyses and simulation frameworks.

Its functionality is particularly relevant to:

- Atmospheric neutrino flux modeling.
- Neutrino event-rate calculations.
- Neutrino telescope simulations.
- Monte Carlo studies of atmospheric neutrino interactions.
- Phenomenological studies involving neutrino energy and angular distributions.

## Technologies

- **Programming language:** Julia
- **Physics domain:** Neutrino astrophysics and particle physics
- **Data source:** Honda atmospheric neutrino flux tables
- **Numerical methods:** Multidimensional interpolation and angular averaging

## Repository and Documentation

The source code, installation instructions, examples, and documentation are available online:

- [GitHub repository – KM3NeT/NuFlux.jl](https://github.com/KM3NeT/NuFlux.jl)
- [Package documentation](https://km3net.github.io/NuFlux.jl/)

The project is released under the MIT License.
