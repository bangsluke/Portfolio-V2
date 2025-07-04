# Portfolio Site V2

[![Netlify Status](https://api.netlify.com/api/v1/badges/267ef8c1-6dae-4fae-bc37-680c3f02ebfd/deploy-status)](https://app.netlify.com/sites/bangsluke-mytraveljournal/deploys)

<!-- TODO - Update above -->

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

- **Development**: Uses `DEV_NEXT_PUBLIC_APP_BACKEND_URL`
- **Production**: Uses `PROD_NEXT_PUBLIC_APP_BACKEND_URL`

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