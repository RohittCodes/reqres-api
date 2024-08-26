[![Reqres.in API](https://img.shields.io/badge/Reqres.in-API-blue)](https://reqres.in/api)
[![NestJS](https://img.shields.io/badge/NestJS-v10.0.0^-red)](https://nestjs.com/)

# Uses [Reqres.in](https://reqres.in/api) API Endpoints

A RESTful API built using [NestJS](https://nestjs.com/).


## Running the API

### Prerequisites

- Node.js
- npm or yarn (yarn is recommended)
- Docker (optional)
- RabbitMQ (docker image is available or you can install it locally)

### Installation

```bash
# Install dependencies
$ npm install # or yarn
```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables from the `.env.example` file.

```bash
# .env
REQRES_API_URL=https://reqres.in/api
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster-url/?retryWrites=true&w=majority&appName=your-app-name
USER_SERVICE_URL=amqp://localhost:5672
```

### Running the API 

> Note: Make sure you have RabbitMQ running locally or you can use the docker image.

```bash
# Run the API in watch mode
$ npm run start:dev # or yarn start:dev
```

## Test

### Unit Tests
```bash
# unit tests
$ npm run test # or yarn test
```

## API Endpoints

### Users

- GET `/user/:id` - Get a user by ID
- POST `/users` - Create a new user and send a welcome email using RabbitMQ
- GET `/users/:id/avatar` - Get a user's avatar and store it in the database and the file system (if it doesn't exist)
- DELETE `/users/:id/avatar` - Delete a user's avatar from the database and the file system