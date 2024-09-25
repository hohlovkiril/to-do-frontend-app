# To-Do Frontend App

This project is a **To-Do List Frontend Application** that interacts with a **To-Do REST API** built on NestJS. The frontend allows users to manage their tasks by sending requests to the API to create, read, update, and delete tasks.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Configuration](#api-configuration)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Task Management**: Create, view, edit, and delete tasks.
- **Task Status**: Update the status of tasks to mark them as completed or pending.

## Technologies

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - For type-safe JavaScript development.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-frontend-app.git
cd todo-frontend-app
```

2. Install the dependencies:

```bash
npm install
```

3. Set up environment variables:

Update a data.ts file in the src/common directory and update following variables to configure the API endpoint and other settings:

```bash
SERVER_DEBUG_URI=http://localhost:3030/api
SERVER_PROD_URI=https://example.com
```

Ensure that the API URL points to your running **To-Do Backend App**.

## Running the Application

### Development

To start the application in development mode with hot-reloading, run:

```bash
npm start
```

### Production

To build the app for production:

```bash
npm run build
```

The production build will be outputted in the build/ folder.

You can then deploy it to your web server or a cloud service like serve.

## Project Structure

The project follows a common React project structure. Here's an overview of the main directories and files:

```bash
todo-frontend-app/
├── public/                     # Static files like index.html and favicon
├── src/                        # Main source code directory
│   ├── api/                    # API interaction files
│   │   ├── list.api.ts         # API calls for task lists
│   │   └── task.api.ts         # API calls for individual tasks
│   ├── common/                 # Common utilities and data types
│   │   ├── data.ts             # Static data used throughout the app
│   │   ├── enums.ts            # Enum definitions
│   │   ├── props.ts            # Component props types
│   │   ├── types.ts            # General type definitions
│   │   └── utils.ts            # Utility functions
│   ├── components/             # Reusable UI components
│   ├── context/                # React context for state management
│   ├── hooks/                  # Custom React hooks
│   ├── providers/              # Providers for wrapping components with context
```