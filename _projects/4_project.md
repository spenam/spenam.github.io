---
layout: page
title: Diving Club Manager – Equipment Inventory and Loan Management
description: A locally hosted web application for managing diving club equipment, inventory, and equipment loans
img: assets/img/diving.jpg
importance: 4
category: fun
related_publications: false
---

## Overview

**Diving Club Manager** is a web application designed to simplify the management of equipment and inventory within a diving club.

I developped this app as I love diving and wanted to simplify the process of equipment managing in my club.

The project aims to provide a centralized platform for registering equipment, managing member records, tracking equipment availability, and handling equipment loans and returns.

Developed with a modular architecture, the application is designed to run locally on a club-managed server, providing a practical solution for everyday equipment management without relying on external cloud services.

A key aspect of the project is the integration of QR-code-based equipment identification, allowing individual pieces of equipment to be uniquely identified and facilitating future scanning-based checkout and return workflows.

## Key Features

- **Equipment inventory:** Register and manage equipment categories and individual equipment records.
- **Member management:** Maintain member records and associate equipment loans with individual members.
- **Equipment availability:** Track the availability status of individual equipment items.
- **QR-code identification:** Generate stable QR-code payloads using unique UUID identifiers for equipment tracking.
- **Equipment checkout and returns:** Provide API endpoints for registering equipment loans and returns.
- **Loan history:** Maintain equipment loan records to facilitate tracking and management.
- **Web dashboard:** Provide a web interface for viewing and managing equipment and member information.
- **Database persistence:** Store application data in PostgreSQL with version-controlled database migrations.
- **Containerized deployment:** Deploy the application using Docker Compose.

## Architecture and Implementation

The application follows a modular monolithic architecture, separating backend services, database management, and frontend components.

This design provides a maintainable foundation while allowing additional modules to be introduced as the project evolves.

### 1. Backend

The backend is developed in Python using FastAPI.

It provides REST API endpoints for managing equipment, members, equipment availability, and loan operations.

SQLAlchemy is used for database interaction, while Alembic handles database schema migrations.

### 2. Database Management

PostgreSQL is used as the persistent storage layer.

The database manages:

- Equipment categories and individual equipment records.
- Club member information.
- Equipment availability states.
- Equipment checkout and return records.
- Historical loan information.

### 3. Frontend

The frontend uses server-rendered HTML fragments and HTMX to provide an interactive web interface.

This approach keeps the application lightweight while enabling dynamic interactions without requiring a complex standalone JavaScript frontend.

### 4. QR-Code Identification

Each equipment item is assigned a persistent UUID, independently of its database primary key or equipment name.

The intended QR-code payload follows the format:

```text
DCM:<uuid>
```

This provides a stable identification mechanism for future integration with camera-based QR scanners and USB barcode/QR readers.

### 5. Deployment and Infrastructure

The application is designed for local deployment using Docker Compose.

The deployment includes:

- A FastAPI backend.
- A PostgreSQL database.
- An nginx web server and reverse proxy.
- Database migrations through Alembic.
- Persistent database storage through Docker volumes.

This architecture allows the club to operate the application on its own infrastructure and access it through a local network.

## Technologies

- **Programming language:** Python 3.12+
- **Backend framework:** FastAPI
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Database migrations:** Alembic
- **Frontend:** HTML, HTMX
- **Web server:** nginx
- **Containerization:** Docker and Docker Compose
- **Testing:** pytest
- **Code quality:** Ruff
- **Continuous integration:** GitHub Actions

## Future Developments

The modular architecture provides a foundation for expanding the application with additional club-management functionality.

Potential developments include:

- **QR-code scanning:** Integrate camera-based and USB QR scanners for faster equipment checkout and returns.
- **Member management:** Introduce authentication, user accounts, and role-based permissions.
- **Dive-event management:** Manage diving activities, schedules, locations, and participant registrations.
- **Equipment maintenance:** Introduce inspection records, maintenance schedules, and safety-related equipment status management.
- **Incident reporting:** Implement workflows for reporting equipment damage and resolving safety-related issues.
- **Financial management:** Add modules for membership fees, expenses, and club finances.
- **Audit logging:** Maintain detailed records of equipment transactions and administrative actions.

## Repository

The source code, installation instructions, deployment configuration, and development documentation are available online:

- [GitHub repository – spenam/diving_club](https://github.com/spenam/diving_club)

The project is designed as a locally hosted, modular application for diving-club inventory and equipment management.
