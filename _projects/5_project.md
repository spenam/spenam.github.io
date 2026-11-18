---
layout: page
title: AdventOfCode2025 – Algorithmic Problem Solving with Python
description: A collection of Python solutions to Advent of Code 2025, emphasizing algorithms, clean code, automated testing, and reusable development tools
img: assets/img/7.jpg
importance: 5
category: fun
related_publications: false
---

## Overview

**AdventOfCode2025** is a Python project containing solutions to the programming challenges from [Advent of Code 2025](https://adventofcode.com/2025).

I try to solve the puzzles every year, but 2025 was my first time making a repo out of the solutions.

Advent of Code is an annual programming challenge featuring a series of algorithmic puzzles designed to develop problem-solving skills and explore different computational techniques.

The project focuses on developing efficient, readable, and maintainable Python solutions while following good software engineering practices.

Beyond solving individual puzzles, the repository is structured as a reusable software project, incorporating automated input retrieval, modular solution implementations, type hints, and unit testing.

## Key Features

- **Algorithmic problem solving:** Implement solutions to Advent of Code challenges using efficient algorithms and data structures.
- **Modular architecture:** Organize individual daily solutions into independent Python modules.
- **Automated input retrieval:** Download and cache puzzle inputs using a shared input-fetching utility.
- **Type annotations:** Use Python type hints to improve code readability, maintainability, and static analysis.
- **Unit testing:** Validate solutions using pytest and the official example inputs.
- **Reusable templates:** Establish a common structure that can be adapted for future Advent of Code editions.
- **Dependency management:** Maintain a lightweight Python environment using a requirements file.
- **Continuous integration:** Use GitHub Actions to automate testing and code-quality checks.

## Implementation and Methodology

The project is developed in Python and follows a modular structure that separates input management, problem parsing, algorithmic implementations, and testing.

Each Advent of Code challenge is implemented independently, with dedicated functions for parsing the input and solving the two parts of the problem.

A typical solution follows three main steps:

### 1. Input retrieval and parsing

Puzzle inputs are retrieved automatically using a shared input-fetching utility.

The application uses an Advent of Code session cookie stored in an environment variable, avoiding the need to manually download input files.

```python
from aoc2025.input_fetcher import get_input

# Retrieve the puzzle input
raw = get_input(year=2025, day=1)

# Parse the input
def parse_input(text: str):
    return text.splitlines()
```

### 2. Algorithm implementation

Each daily module implements the logic required to solve both parts of the corresponding challenge.

The implementation separates input parsing from the computational logic, making individual functions easier to test and reuse.

```python
def part1(data):
    # Implement the solution for part one
    ...

def part2(data):
    # Implement the solution for part two
    ...

if __name__ == "__main__":
    raw = get_input(year=2025, day=1)
    data = parse_input(raw)

    print("Part 1:", part1(data))
    print("Part 2:", part2(data))
```

### 3. Testing and validation

The project uses pytest to validate the implementations against the official examples provided in the Advent of Code problem descriptions.

Tests cover input parsing and expected outputs, helping detect regressions and ensure the correctness of individual solutions.

```bash
# Run the complete test suite
pytest

# Run tests for a specific challenge
pytest tests/test_day01.py
```

## Algorithms and Computational Techniques

The Advent of Code challenges provide opportunities to explore a variety of computational approaches.

Depending on the problem, solutions can involve:

- **Graph algorithms:** Represent relationships between elements and explore connected structures.
- **Graph traversal:** Apply breadth-first search and depth-first search to explore possible paths and configurations.
- **Dynamic programming:** Break complex problems into smaller subproblems and reuse intermediate results.
- **Combinatorial algorithms:** Explore possible configurations and optimize search strategies.
- **Parsing and data processing:** Transform structured textual inputs into computational representations.
- **Mathematical optimization:** Use mathematical properties to reduce computational complexity.
- **Efficient data structures:** Select appropriate representations to improve execution time and memory usage.

## Software Engineering Practices

An important objective of the project is to treat algorithmic challenges as a structured software development exercise rather than isolated scripts.

The repository incorporates several software engineering practices:

- Modular and reusable Python code.
- Separation between input parsing and algorithmic logic.
- Automated unit testing with pytest.
- Type annotations and readable interfaces.
- Input caching and secure handling of authentication credentials.
- Dependency management and environment isolation.
- Continuous integration through GitHub Actions.

## Technologies

- **Programming language:** Python
- **Testing framework:** pytest
- **Development tools:** Git and GitHub Actions
- **Input management:** Automated HTTP-based input retrieval and local caching
- **Code quality:** Type hints and modular software design
- **Environment management:** Python virtual environments

## Repository and Documentation

The source code, daily solutions, installation instructions, and development documentation are available online:

- [GitHub repository – spenam/AdventOfCode2025](https://github.com/spenam/AdventOfCode2025)
- [Advent of Code 2025](https://adventofcode.com/2025)

The repository also provides reusable templates and infrastructure for future editions of Advent of Code.