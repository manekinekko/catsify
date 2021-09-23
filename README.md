![Azure Static Web Apps CI/CD](https://github.com/manekinekko/catsify/workflows/Azure%20Static%20Web%20Apps%20CI/CD/badge.svg)

<p align="center">
    <img src="./docs/header.png"/>
</p>

### What is Catsify?

Catsify is a Cat names generator, hosted on Azure Static Web Apps. The tech stack consists of:

- An [UI](./app) written in Angular v10 (preview).
- An [API](./api) written in Rust, compiled to WASM and exposed through a Node.js serverless Azure Function.

### Bazel dependency graph

<p align="center">
    <img src="./api/docs/graph.png"/>
</p>
