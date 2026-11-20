---
layout: page
title: OpenMobility – Urban Mobility Intelligence and Traffic Forecasting
description: A Python-based urban mobility analytics project combining open traffic data, geospatial processing, machine learning, and anomaly detection to understand and forecast traffic patterns across Paris
img: assets/img/road_analysis.png
importance: 6
category: fun
related_publications: false
---

## Overview

**OpenMobility** is an open-source Python project focused on urban mobility data engineering and predictive analytics, with an initial focus on understanding and anticipating traffic patterns across Paris.

The project combines public traffic measurements, data quality assessment, exploratory analysis, geographic information, machine learning, and anomaly detection to build a reproducible foundation for urban mobility intelligence.

Starting with permanent road traffic counters published by the City of Paris, OpenMobility provides an end-to-end workflow to collect, process, analyze, visualize, and forecast traffic conditions.

The project is developed incrementally, starting with reliable data engineering and exploratory analysis before introducing predictive models and more advanced spatial-temporal techniques.

A central objective is to explore how open urban data and computational methods can be combined to better understand traffic dynamics, identify unusual road conditions, and eventually develop network-level mobility intelligence.

The implementation follows a **CPU-first approach**, relying on efficient data processing tools and lightweight machine learning models rather than requiring dedicated GPU infrastructure.

## Key Features

- **Automated data ingestion:** Retrieve hourly traffic measurements from the Paris Open Data API using paginated requests.
- **Data preprocessing:** Normalize heterogeneous source fields, convert timestamps, and generate consistent analytical datasets.
- **Data quality assessment:** Identify missing values, duplicate observations, sensor coverage issues, and inconsistencies in traffic measurements.
- **Exploratory data analysis:** Study traffic patterns by hour, weekday, and sensor, with automatically generated reports and visualizations.
- **Geographic integration:** Associate traffic measurements with road-network geometries and calculate geographic matching statistics.
- **Interactive traffic maps:** Visualize road segments and traffic intensity using Folium and interactive geographic layers.
- **Traffic forecasting:** Train individual XGBoost regression models for eligible traffic sensors.
- **Temporal feature engineering:** Incorporate historical traffic measurements, lagged values, rolling statistics, and cyclical time features.
- **Predictive evaluation:** Compare machine learning predictions against a seasonal-naive baseline using standard regression metrics.
- **Anomaly detection:** Identify unusual traffic spikes and drops through robust analysis of prediction residuals.
- **Reproducible outputs:** Store processed datasets, trained models, forecasts, evaluation metrics, and visualizations in structured formats.

## Implementation and Methodology

The project is developed in Python and follows a modular architecture that separates data ingestion, preprocessing, quality assessment, geographic integration, predictive modeling, and visualization.

The workflow is organized into four development phases:

| Phase | Objective | Status |
|---|---|---|
| Phase 1 | Data engineering and exploratory analysis | Completed |
| Phase 2 | Predictive analytics and anomaly detection | Completed |
| Phase 3 | Road-network intelligence | Planned |
| Phase 4 | Mobility intelligence platform | Planned |

### 1. Data ingestion and preprocessing

The initial stage retrieves traffic measurements from the [Paris Open Data platform](https://opendata.paris.fr/).

The main data source is the permanent road traffic counters dataset, which provides hourly measurements from traffic sensors distributed across Paris.

The ingestion pipeline uses the public API to retrieve records through paginated requests. Raw observations are stored in JSON Lines (JSONL) format, together with metadata describing the download.

The preprocessing stage transforms the original dataset into a consistent analytical schema.

The pipeline includes:

- Inspection of source columns and inferred data types.
- Identification of relevant sensor, timestamp, and measurement fields.
- Normalization of traffic flow and occupancy measurements.
- Conversion of timestamps into timezone-aware datetime values.
- Removal of records without valid timestamps or sensor identifiers.
- Export of normalized datasets in compressed Parquet format.

The resulting dataset provides a common representation for subsequent analysis.

A simplified example of the normalized schema is:

| Column | Description |
|---|---|
| `timestamp` | Observation timestamp |
| `sensor_id` | Traffic sensor identifier |
| `flow_vehicles_per_hour` | Hourly vehicle count |
| `occupancy_pct` | Occupancy rate |
| `traffic_state` | Traffic-state information, when available |

### 2. Data quality assessment and exploratory analysis

Before applying machine learning techniques, the project evaluates the quality and coverage of the collected traffic measurements.

The data quality analysis includes:

- Missing-value counts and percentages.
- Duplicate sensor/timestamp combinations.
- Number of unique traffic sensors.
- Temporal coverage of the observations.
- Descriptive statistics for traffic flow and occupancy.
- Distribution of traffic-state measurements.

The exploratory analysis then examines the temporal and spatial characteristics of traffic.

Several analytical outputs are generated:

**Traffic flow by hour**

Calculate average and median traffic flow throughout the day to identify recurring daily traffic patterns.

**Traffic flow by weekday**

Compare traffic behavior across the seven days of the week to identify differences between working days and weekends.

**Missing measurements by sensor**

Evaluate the availability of traffic flow and occupancy observations for individual sensors.

**Hourly sensor availability**

Construct a sensor-hour completeness matrix to identify periods and locations with incomplete measurements.

These analyses provide an overview of the dataset and help identify potential limitations before model development.

### 3. Geographic integration and interactive visualization

An important component of OpenMobility is the integration of traffic measurements with geographic road-network information.

The project retrieves a geographic reference dataset from Paris Open Data and uses it to associate traffic sensors with their corresponding road segments.

The geographic processing pipeline:

1. Loads the road-network geographic reference.
2. Aggregates traffic measurements at sensor level.
3. Matches sensor identifiers with geographic reference identifiers.
4. Associates traffic statistics with road geometries.
5. Calculates the number and percentage of successfully matched segments.
6. Exports the resulting geographic dataset in Parquet format.

The project also generates interactive maps using [Folium](https://python-visualization.github.io/folium/).

These maps provide a spatial representation of traffic conditions across Paris.

Road segments can be visualized according to average traffic flow, with interactive tooltips displaying sensor and traffic statistics.

The resulting maps are exported as standalone HTML files, allowing the geographic analysis to be explored directly in a web browser.

### 4. Traffic forecasting with XGBoost

The second completed development phase introduces predictive analytics.

The objective is to move beyond descriptive analysis and estimate future traffic conditions using historical sensor measurements.

OpenMobility trains individual [XGBoost](https://xgboost.readthedocs.io/) regression models for eligible traffic sensors.

Each model uses historical observations and temporal features to predict future traffic flow.

The feature engineering process incorporates several types of information:

**Historical traffic measurements**

- Previous-hour traffic flow (`lag_1`).
- Traffic flow from the previous day (`lag_24`).
- Rolling 24-hour mean traffic flow.

**Temporal features**

- Hour of day.
- Day of week.
- Weekend indicator.
- Cyclical encoding of the hour.
- Cyclical encoding of the day of the week.

**Additional traffic information**

- Previous-hour occupancy, when available.

Timestamps are converted to the `Europe/Paris` timezone before temporal feature engineering, ensuring that the models account for local traffic patterns.

The models use histogram-based tree construction and are designed to run on CPU infrastructure.

### 5. Training strategy and predictive evaluation

To evaluate forecasting performance realistically, the project uses a chronological train/holdout split rather than randomly mixing observations from different time periods.

The default configuration uses:

- 80% of observations for training.
- 20% of observations for holdout evaluation.

The chronological split helps prevent future observations from leaking into the training dataset.

In addition to XGBoost, the project evaluates a seasonal-naive baseline based on the previous day's traffic measurement.

This provides a reference against which the machine learning models can be compared.

The evaluation includes several standard regression metrics:

- **Mean Absolute Error (MAE):** Measures the average absolute difference between actual and predicted traffic.
- **Root Mean Squared Error (RMSE):** Penalizes larger prediction errors more strongly.
- **Coefficient of Determination (R²):** Measures the proportion of variance explained by the model.

The project also generates visual diagnostics, including actual-versus-predicted traffic plots, residual distributions, and comparisons between model performance across sensors.

After evaluation, models are retrained using their available modeling history and used to generate configurable multi-hour forecasts.

The default forecasting horizon is 24 hours.

### 6. Traffic anomaly detection

In addition to forecasting, OpenMobility uses prediction errors to identify unusual traffic behavior.

An anomaly is defined through the residual between observed and predicted traffic:

```python
residual = actual_flow - predicted_flow
```

The project applies a robust statistical approach based on rolling medians and median absolute deviations to identify unusually large deviations from expected traffic patterns.

Observations with an absolute robust residual score greater than or equal to 3.5 are flagged as potential anomalies.

Two main categories are distinguished:

- **Traffic spikes:** Actual traffic is substantially higher than predicted.
- **Traffic drops:** Actual traffic is substantially lower than predicted.

The detected anomalies are exported for further investigation.

These observations are intended to highlight unusual traffic behavior rather than automatically identify confirmed incidents.

## Data Sources

The project primarily relies on open datasets published by the City of Paris.

### Paris permanent road traffic counters

**Dataset:** Comptage routier – Données trafic issues des capteurs permanents.

- Publisher: Ville de Paris, Direction de la Voirie et des Déplacements.
- Dataset identifier: `comptages-routiers-permanents`.
- Temporal resolution: Hourly.
- Coverage: Rolling 13-month dataset.
- License: Open Database License (ODbL).

The dataset provides traffic measurements from permanent road sensors, including:

- Traffic flow, expressed in vehicles per hour.
- Occupancy rate, expressed as a percentage.
- Traffic-state information, when available.

**Data source:** [Paris Open Data – Permanent road traffic counters](https://opendata.paris.fr/explore/dataset/comptages-routiers-permanents/)

### Geographic road-network reference

The project also uses the Paris road-network geographic reference:

- Dataset identifier: `referentiel-comptages-routiers`.
- Source: Paris Open Data.
- Format: GeoJSON.
- Geographic matching field: `iu_ac`.

This dataset provides the geographic information required to associate traffic measurements with road geometries.

Additional information about data provenance and licensing is available in the repository documentation.

## Software Engineering Practices

An important objective of OpenMobility is to build a reproducible and extensible data engineering and analytics pipeline rather than a collection of isolated analysis scripts.

The project incorporates several software engineering practices:

- **Modular architecture:** Separate ingestion, processing, geographic analysis, machine learning, and visualization components.
- **Reproducible data processing:** Preserve raw observations and download metadata.
- **Columnar data storage:** Use Parquet for efficient analytical data access.
- **Data validation:** Inspect source schemas and explicitly handle missing or inconsistent measurements.
- **Chronological model evaluation:** Preserve temporal ordering during training and holdout validation.
- **Baseline comparison:** Evaluate machine learning models against a simple seasonal forecasting method.
- **Structured outputs:** Export datasets, model metrics, forecasts, and anomaly reports in reusable formats.
- **CPU-first development:** Favor computationally efficient techniques that do not require dedicated GPU infrastructure.
- **Dependency management:** Maintain isolated Python environments and explicit project dependencies.
- **Automated testing:** Use pytest to validate individual components and data-processing workflows.

## Technologies

- **Programming language:** Python 3.11+
- **Data processing:** Polars, Pandas, NumPy, and PyArrow
- **Geospatial analysis:** GeoPandas and Shapely
- **Interactive mapping:** Folium
- **Machine learning:** XGBoost and Scikit-learn
- **Visualization:** Matplotlib
- **API communication:** Requests
- **Command-line interface:** Typer and Rich
- **Configuration:** YAML and environment variables
- **Testing:** pytest
- **Development tools:** Git, GitHub, Ruff, and mypy
- **Data formats:** JSONL, Parquet, GeoJSON, CSV, and HTML

## Roadmap

The project is being developed incrementally, with the long-term objective of moving from sensor-level traffic analysis toward network-level mobility intelligence.

**Phase 1 – Data engineering and exploratory analysis**

Completed:

- Automated traffic data ingestion.
- Data inspection and normalization.
- Data quality assessment.
- Exploratory traffic analysis.
- Geographic reference integration.
- Interactive traffic visualization.

**Phase 2 – Predictive analytics and anomaly detection**

Completed:

- Sensor-level XGBoost forecasting.
- Temporal and historical feature engineering.
- Chronological training and holdout evaluation.
