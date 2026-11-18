---
layout: page
title: KM3OpenOsc.jl – KM3NeT Open Data Analysis
description: A Julia package for processing KM3NeT open data and building detector response histograms for neutrino oscillation analyses
img: assets/img/KM3NeT_logo.jpg
importance: 2
category: work
related_publications: true
---

## Overview

**KM3OpenOsc.jl** is a Julia package developed to facilitate the analysis of KM3NeT neutrino telescope open datasets, with a particular focus on atmospheric neutrino oscillation studies using KM3NeT/ORCA data. I fully developped this package and worked towards the publication of the open data.

The package provides tools to construct, fill, and export detector response histograms using publicly available KM3NeT datasets. Starting from a user-defined binning configuration, it allows the construction of histograms for reconstructed and true event quantities, incorporating atmospheric neutrino flux predictions and neutrino oscillation probabilities.

The software provides an interface between KM3NeT open data and the numerical tools required for neutrino oscillation analyses, making it easier to reproduce and explore the detector response used in scientific studies.

## Key Features

- **Open data processing:** Load and process KM3NeT atmospheric neutrino open datasets, including the ORCA 433 kt-y dataset.
- **Detector response construction:** Build multidimensional histograms from configurable binning definitions.
- **Neutrino event weighting:** Apply atmospheric neutrino flux and oscillation weights to simulated neutrino events.
- **Neutrino oscillations:** Calculate oscillation matrices using neutrino oscillation parameters, interfacing with `Neurthino.jl`.
- **Atmospheric flux models:** Incorporate Honda atmospheric neutrino flux predictions through `NuFlux.jl`, with support for alternative flux inputs.
- **Data and Monte Carlo comparison:** Construct corresponding histograms for experimental data and simulated neutrino samples.
- **HDF5 export:** Export filled histograms and detector response information into HDF5 files for further analysis.

## Implementation and Usage

The package is implemented in Julia and provides a modular workflow for processing KM3NeT open data.

The analysis begins by loading the open dataset and its associated binning definition. Detector response histograms are then initialized and filled using the experimental data or simulated neutrino events.

A typical workflow involves the following steps:

### 1. Loading the data

The package uses `KM3io.jl` to access KM3NeT open data files and retrieve neutrino Monte Carlo and experimental data samples.

```julia
using KM3OpenOsc
using KM3io
using NuFlux

# Load the KM3NeT ORCA open dataset
f = KM3io.OSCFile(OSCFILE)

nu = f.osc_opendata_nu
data = f.osc_opendata_data
```

### 2. Building detector response histograms

Histograms are initialized using a binning definition provided in JSON format. This definition specifies the variables and binning configuration used for the analysis.

```julia
# Initialize histograms
hn = create_histograms(BINDEF)
hd = create_histograms(BINDEF)
```

### 3. Computing neutrino oscillation matrices

The package interfaces with `Neurthino.jl` to calculate neutrino oscillation matrices from a given set of oscillation parameters.

```julia
# Define oscillation parameters
BF = Dict(
    "dm_21" => 7.42e-5,
    "dm_31" => 2.18e-3,
    "theta_12" => deg2rad(33.45),
    "theta_23" => deg2rad(45.57),
    "theta_13" => deg2rad(8.62),
    "dcp" => deg2rad(230)
)

# Calculate oscillation matrices
U, H = get_oscillation_matrices(BF)
```

### 4. Incorporating atmospheric neutrino fluxes

Atmospheric neutrino flux predictions are obtained through `NuFlux.jl`. Honda flux tables can be loaded for different geographical sites.

```julia
# Load atmospheric neutrino flux
flux_dict = get_flux_dict(flux_path)
```

### 5. Filling and exporting histograms

Once the oscillation matrices and flux predictions are available, the detector response histograms can be filled using the corresponding Monte Carlo and experimental data samples.

```julia
# Fill neutrino response histograms
fill_response!(
    hn,
    nu,
    flux_dict,
    U,
    H;
    oscillations=true
)

# Fill experimental data histograms
fill_response!(hd, data)

# Export histograms to HDF5
export_histograms_hdf5(
    hn,
    "neutrino_histograms.h5"
)
```

This workflow provides a convenient way to transform KM3NeT open datasets into structured histograms suitable for subsequent statistical analyses.

## Scientific Applications

KM3OpenOsc.jl is particularly useful for exploring the physics potential of KM3NeT/ORCA and reproducing key elements of atmospheric neutrino oscillation analyses.

Potential applications include:

- Atmospheric neutrino oscillation studies.
- Neutrino mass ordering sensitivity analyses.
- Reconstruction and detector response studies.
- Comparison between experimental data and Monte Carlo predictions.
- Reproduction of KM3NeT/ORCA open-data analyses.
- Development and validation of neutrino oscillation analysis frameworks.

## Software Ecosystem

KM3OpenOsc.jl builds upon several Julia packages within the KM3NeT software ecosystem:

- **KM3io.jl:** Reading and accessing KM3NeT-specific data formats.
- **NuFlux.jl:** Loading and evaluating atmospheric neutrino flux predictions.
- **Neurthino.jl:** Computing neutrino oscillation probabilities and propagation matrices.
- **HDF5.jl:** Storing and exporting analysis histograms.

## Technologies

- **Programming language:** Julia
- **Experiment:** KM3NeT/ORCA
- **Physics domain:** Neutrino oscillations and astroparticle physics
- **Data processing:** Multidimensional histograms and event weighting
- **Numerical methods:** Neutrino oscillation probability calculations and flux reweighting
- **Data formats:** ROOT, JSON, HDF5

## Repository and Documentation

The source code, installation instructions, examples, and tutorials are available online:

- [GitHub repository – KM3NeT/KM3OpenOsc.jl](https://github.com/KM3NeT/KM3OpenOsc.jl)
- [Package documentation](https://km3net.github.io/KM3OpenOsc.jl/)
- [KM3NeT Open Data Center](https://opendata.km3net.de/)
- [Software release – Zenodo](https://doi.org/10.5281/zenodo.15715220)

The project is released under the BSD 3-Clause License.