<p align="center">
  <img src="https://i.imgur.com/QL72TPw.png" alt="bangsluke Logo" width="200"/>
</p>

# Portfolio Site V2

> A personal portfolio website for displaying my skills and past projects.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9ed7eb9-789c-4a7c-b069-b9aebb73c553/deploy-status)](https://app.netlify.com/projects/bangsluke-portfolio/deploys)

> Also see the backend server repo <https://github.com/bangsluke/bangsluke-backend-server> for more details and instructions

## Table of Contents

- Introduction
- Quick Start
  - Development Start
  - Production Start

## Introduction

The front end Next.js repository for MyTravelJournal

> [Back to Table of Contents](#table-of-contents)

## Quick start

### Development Start

- Use `npm run dev` to start the development server
- Open `localhost:4321` to see the development site

<!-- TODO: Update list -->

> [Back to Table of Contents](#table-of-contents)

### Production Start

To quickly get started in production mode, do the following steps:

<!-- TODO: Update list -->

> [Back to Table of Contents](#table-of-contents)

## How it Works

### GraphQL Connection

The GraphQL client (`src/utils/graphql-client.ts`) automatically detects the environment:

- **Development**: Uses `PUBLIC_APP_BACKEND_URL_DEV`
- **Production**: Uses `PUBLIC_APP_BACKEND_URL_PROD`

### Example Usage

```typescript
import { graphqlClient } from '../utils/graphql-client';
import { fetchCompanies } from '../utils/companies';

// Make GraphQL requests
const companies = await fetchCompanies({ limit: 10, offset: 0 });
```

### Error Handling

If the environment variables are not set, the client will throw a descriptive error indicating which variable is missing.

> [Back to Table of Contents](#table-of-contents)

## Debugging Problems

### Connection Problems

If the problem is a connection issue between the backend server and front end website, navigate to `http://localhost:4321/debug` to see a connection test

> [Back to Table of Contents](#table-of-contents)