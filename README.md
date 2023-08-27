## Description

An example of a NestJS application that uses GraphQL with TypeORM.

## Installation

```bash
$ npm install
```

## Environment variables

```bash
mv .env.example .env
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Showcases

* Using code first approach to define GraphQL schema
* Reduce duplicated code and define everything at one place
* One mutation / query per file
* Field resolvers between entities

## Sample queries / mutations

Open http://localhost:3000/graphql

### Create a new user

```graphql
mutation {
  createUser(createUserInput: {
    email: "brian@example.com",
    name: "Brian Nguyen"
  }) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

### Create a new recipe


```graphql
mutation {
  createRecipe(createRecipeInput: {
    title: "Rep 01",
    ingredients: ["4", "5", "6"],
    description: "Wow! The second one",
    userId: "<<TAKE_USER_ID_FROM_PREV_STEP>>"
  }) {
    id
    title
    createdAt
    updatedAt
    description
  }
}
```

### Query recipes with user

```graphql
query {
  recipes {
    id
    title
    user {
      email
    }
  }
}
```

### Query users with recipes
```graphql
{
  users {
    id
    email
    recipes {
      title
    }
  }
}
```
