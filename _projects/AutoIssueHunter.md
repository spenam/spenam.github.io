---
layout: page
title: AutoIssueHunter – AI-Assisted GitHub Issue Analysis
description: A Python tool for identifying open-source contribution opportunities and analyzing GitHub issues using locally hosted large language models, repository inspection, and structured investigation reports
img: assets/img/7.jpg
importance: 5
category: fun
related_publications: false
---

## Overview

**AutoIssueHunter** is a Python project designed to assist developers in discovering and understanding contribution opportunities in open-source repositories.

Finding a suitable issue in an unfamiliar project can be challenging. Developers must understand the project's architecture, identify the components involved, investigate the reported behavior, and estimate the complexity of a potential solution.

AutoIssueHunter aims to simplify this process by combining GitHub issue information, automated repository inspection, and locally hosted large language models.

The application uses [Ollama](https://ollama.com/) to run language models locally, allowing it to analyze issue descriptions alongside relevant source code and generate structured investigation reports.

Rather than automatically modifying source code or claiming that a proposed solution has been verified, the project focuses on providing developers with a starting point for investigation: possible root causes, relevant files, implementation plans, estimated difficulty, and potential regression tests.

The main objective is to reduce the initial effort required to understand an unfamiliar codebase and help developers make more informed decisions about contributing to open-source software.

## Key Features

- **GitHub issue analysis:** Use GitHub issue information as the starting point for investigating potential contributions.
- **Automated repository inspection:** Clone and inspect approved repositories to identify relevant source files and project structure.
- **Local LLM integration:** Use Ollama to perform AI-assisted code analysis without relying on a hosted LLM API.
- **Root-cause investigation:** Generate hypotheses about the underlying causes of reported issues, supported by evidence from the inspected code.
- **Relevant file identification:** Identify source files and components that may be involved in the reported behavior.
- **Implementation planning:** Generate structured implementation plans and suggested changes to guide further development.
- **Difficulty estimation:** Estimate issue complexity, implementation effort, and confidence in the analysis.
- **Regression test suggestions:** Identify potential tests that could help validate a future implementation.
- **Structured analysis reports:** Organize the results into machine-readable data models for consistent processing.
- **Repository safety controls:** Apply repository screening and inspection safeguards before analyzing source code.

## Implementation and Methodology

The project is developed in Python and follows a modular architecture that separates configuration, GitHub interaction, repository inspection, AI-based analysis, and data storage.

The analysis process combines information from two main sources:

1. The GitHub issue description, which provides the reported problem and its context.
2. The repository source code, which provides the implementation details needed to investigate the issue.

The application then uses a locally hosted language model to produce a structured report that can support the developer's investigation.

### 1. Repository inspection and preparation

Before analyzing an issue, AutoIssueHunter checks the repository and prepares its source code for inspection.

The repository inspection component is responsible for retrieving the project and examining its structure. It identifies relevant source files while applying safeguards such as avoiding symbolic links, excluding common generated or vendor directories, and disabling Git hooks during cloning.

Repository analysis is restricted to repositories that have passed the project's screening process.

This stage provides the code context required by the language model while limiting unnecessary file access.

### 2. Source-code analysis with a local language model

Once the repository has been approved and inspected, the analysis component selects files that are potentially relevant to the issue.

AutoIssueHunter integrates with [Ollama](https://ollama.com/) through its HTTP API. The default configuration uses the `qwen2.5-coder:7b` model, although the model can be changed through the application configuration.

The selected source files and issue description are provided as context to the language model.

The model is instructed to distinguish confirmed observations from hypotheses and to return a structured analysis rather than an unverified implementation.

The resulting report includes information such as:

- Issue summary and suspected root cause.
- Evidence supporting the investigation.
- Relevant files and software components.
- Investigation notes and confidence level.
- Estimated difficulty and implementation effort.
- Proposed implementation steps.
- Suggested code changes.
- Potential regression tests and risks.

### 3. Structured results and validation

The analysis output is validated using Pydantic data models.

This ensures that the generated report follows a predefined structure and that relevant information can be processed consistently by other components.

The application also distinguishes between a proposed investigation and a verified solution. In particular, generating an implementation plan does not imply that the issue has been reproduced, that tests have been executed, or that a suggested fix is correct.

This distinction is important when using AI-generated analysis to support real software development.

### 4. Configuration and persistence

Application settings are managed through a centralized configuration module using Pydantic Settings.

Configuration options include:

- GitHub API credentials and endpoint.
- Ollama server address and model name.
- Local database and workspace paths.
- Request timeout and logging level.
- Default programming language and developer experience level.
- Maximum number of issues considered during a scan.

The project uses SQLite for local data storage, allowing application data to be maintained without requiring an external database server.

## AI-Assisted Software Engineering

A central aspect of AutoIssueHunter is the use of large language models as tools for software engineering assistance.

Instead of asking a model to solve an issue based only on its description, the project provides additional context extracted from the actual repository.

This approach is intended to make the analysis more grounded in the project's implementation and architecture.

The investigation focuses on several complementary tasks:

- **Code understanding:** Interpret source files and identify relationships between software components.
- **Root-cause analysis:** Develop and assess hypotheses about the origin of reported problems.
- **Context retrieval:** Select source files that are relevant to the issue description.
- **Implementation planning:** Translate an investigation into actionable development steps.
- **Testing strategy:** Suggest regression tests that could validate a future change.
- **Uncertainty assessment:** Communicate confidence, evidence, and unresolved questions instead of presenting every model-generated conclusion as fact.

Using a locally hosted model also makes the architecture more flexible and reduces dependence on external inference services.

## Repository Safety and Reliability

Since AutoIssueHunter inspects source code from external repositories, repository handling is an important part of its design.

The project incorporates several safeguards:

- Repository screening before source-code analysis.
- Inspection restricted to approved repositories.
- Shallow Git cloning to limit unnecessary retrieval.
- Disabled Git hooks and submodule initialization during cloning.
- Exclusion of common generated, dependency, and vendor directories.
- Safe handling of regular files and symbolic links.
- Limits on the number and size of source files included in an analysis.
- Explicit separation between repository content and trusted analysis instructions.

The application does not need to execute repository source code to perform its static inspection. This reduces the risks associated with analyzing unfamiliar projects.

AI-generated results are treated as investigative suggestions rather than automatically verified facts.

## Technologies

- **Programming language:** Python
- **Language models:** Ollama and locally hosted LLMs
- **Default model:** Qwen 2.5 Coder 7B
- **GitHub integration:** GitHub API and Git
- **HTTP communication:** httpx
- **Data validation:** Pydantic and Pydantic Settings
- **Database:** SQLite
- **Repository analysis:** Automated source-code inspection and file selection
- **Testing:** pytest
- **Development tools:** Git and GitHub

## Repository and Documentation

The source code and project development are available online:

- [GitHub repository – spenam/AutoIssueHunter](https://github.com/spenam/AutoIssueHunter)
- [Ollama – Local LLM runtime](https://ollama.com/)
- [Qwen 2.5 Coder – Model family](https://ollama.com/library/qwen2.5-coder)

AutoIssueHunter explores how locally hosted language models can be integrated into practical software engineering workflows, particularly the discovery and investigation of open-source contribution opportunities.

The broader goal is to make contributing to unfamiliar codebases more approachable by automating part of the initial investigation while keeping developers responsible for reviewing, validating, and implementing changes.