---
layout: page
title: GraphNeT – Graph Neural Networks for Neutrino Telescopes
description: Deep learning and graph neural networks for neutrino event classification and reconstruction
img: assets/img/graphnet-logo-and-wordmark.png
importance: 3
category: work
related_publications: true
---

## Overview

**GraphNeT** is an open-source Python framework designed to apply deep learning techniques to event reconstruction and classification in neutrino telescopes.

My contribution was the adaptation of the framework for the KM3NeT experiment.

The project exploits Graph Neural Networks (GNNs) to represent neutrino detector events as graphs, where detector sensors and their recorded signals are represented by nodes and their relationships by edges.

Unlike traditional reconstruction algorithms, which often rely on predefined assumptions and manually engineered observables, graph-based deep learning architectures can learn complex relationships directly from detector data.

GraphNeT provides a flexible framework for developing, training, and deploying machine learning models for neutrino telescopes, with applications across different detector configurations and experimental collaborations, including IceCube and KM3NeT.

## Key Features

- **Graph Neural Networks:** Represent neutrino telescope events as graphs and exploit their structure to extract information from detector signals.
- **Event reconstruction:** Develop deep learning models to estimate neutrino event properties, including energy and direction.
- **Event classification:** Distinguish between different event topologies and particle interaction channels, such as track-like and cascade-like events.
- **DynEdge architecture:** Implement graph-based neural network architectures designed for high-performance event reconstruction.
- **Modular model development:** Combine reusable neural network components to construct and experiment with different GNN architectures.
- **Training and optimization:** Train deep learning models using large-scale simulated neutrino datasets and monitor their performance.
- **Model deployment:** Apply trained models to experimental datasets and integrate predictions into neutrino reconstruction workflows.

## Graph Neural Networks for Neutrino Physics

Neutrino telescopes record light signals produced by charged particles propagating through a detection medium. These signals are detected by arrays of optical sensors distributed throughout the detector volume.

The resulting event data are naturally represented as irregular, spatially distributed structures, making graph-based approaches particularly suitable for their analysis.

In GraphNeT, an event is represented as a graph:

- **Nodes:** Represent individual detector sensor pulses and their associated information, such as charge and arrival time.
- **Edges:** Encode relationships between detector signals, typically based on spatial or learned connectivity.
- **Graph Neural Network:** Processes the graph structure to learn meaningful representations of the event.
- **Prediction layers:** Use the learned representation to perform reconstruction or classification tasks.

This approach allows neural networks to exploit both the temporal and spatial information contained in neutrino telescope observations.

## Model Architecture and Workflow

GraphNeT provides a modular architecture that separates data processing, model development, training, and deployment.

The typical workflow consists of four main stages.

### 1. Data preparation

Experimental and simulated neutrino telescope data are converted into formats suitable for machine learning applications.

The framework provides tools to process detector-specific data and organize event information into graph-compatible representations.

### 2. Model development

GraphNeT provides reusable components for constructing graph neural networks using PyTorch and PyTorch Geometric.

Different architectures can be configured by combining graph construction methods, neural network layers, and task-specific prediction modules.

One of the central architectures implemented in GraphNeT is DynEdge, a dynamic graph neural network designed for event reconstruction.

### 3. Model training

Models are trained using simulated neutrino events, with configurable training procedures, optimization strategies, and evaluation metrics.

The training framework also supports experiment tracking and monitoring, facilitating comparisons between different model architectures and hyperparameter configurations.

### 4. Model deployment

Once trained, models can be deployed to perform inference on new datasets.

Their predictions can then be incorporated into neutrino event reconstruction and physics analysis pipelines.

## Scientific Applications

GraphNeT provides a framework for exploring the potential of deep learning in neutrino telescope experiments.

Its applications include:

- Neutrino energy and direction reconstruction.
- Track and cascade event classification.
- Low-energy neutrino event reconstruction.
- High-energy neutrino event identification.
- Neutrino interaction topology classification.
- Detector noise identification and pulse cleaning.
- Atmospheric neutrino analyses.
- Neutrino oscillation studies.
- Applications to different neutrino telescope configurations, including KM3NeT and IceCube.

## Technologies

- **Programming language:** Python
- **Deep learning:** PyTorch
- **Graph learning:** PyTorch Geometric
- **Machine learning:** Graph Neural Networks and Deep Learning
- **Physics domain:** Neutrino astrophysics and particle physics
- **Applications:** Neutrino event reconstruction and classification

## Repository and Documentation

The source code, installation instructions, examples, and documentation are available online:

- [GitHub repository – giogiopg/graphnet](https://github.com/giogiopg/graphnet)
- [Original GraphNeT repository](https://github.com/graphnet-team/graphnet)
- [Official documentation](https://graphnet-team.github.io/graphnet/)
- [GraphNeT scientific publication](https://doi.org/10.5281/zenodo.7928487)

GraphNeT is distributed under the Apache License 2.0.
