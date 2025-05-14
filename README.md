# Fullstack Authentication Application

This project is a full-stack authentication application that allows users to sign up and sign in. It is built using Vue.js for the front-end and NestJS for the back-end, with MongoDB as the database.

## Project Structure

```
user-auth-module
├── client                # Front-end application
│   ├── src
│   │   ├── components    # Vue components
│   │   │   ├── Auth      # Authentication components
│   │   │   │   ├── SignIn.vue
│   │   │   │   └── SignUp.vue
│   │   │   └── UserDashboard.vue
│   │   ├── assets        # Static assets
│   │   ├── App.vue       # Main application component
│   │   └── main.js       # Entry point for Vue application
│   ├── package.json      # Client dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration for client
│   └── README.md         # Client documentation
├── server                # Back-end application
│   ├── src
│   │   ├── logger        # Logging module
│   │   │   ├── logger.module.ts
│   │   │   └── logger.service.ts
│   │   ├── auth          # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   ├── users         # User management module
│   │   │   ├── user.model.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   └── users.service.ts
│   │   ├── app.module.ts  # Main application module
│   │   └── main.ts       # Entry point for NestJS application
│   ├── package.json      # Server dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration for server
│   └── README.md         # Server documentation
└── README.md             # Overall project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/mahmag9348/user-auth-module.git
   cd user-auth-module
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the MongoDB server (if using a local instance).

2. Start the server:
   ```
   cd server
   npm run start
   ```

3. Start the client:
   ```
   cd client
   npm start
   ```

### Usage

- Navigate to `http://localhost:8081` to access the application.
- Use the sign-up form to create a new account.
- Use the sign-in form to log in to your account.
- After logging in, you will be redirected to the UserDashboard.

### Logging

The application implements comprehensive logging for better monitoring and debugging:

#### Backend Logging
- Authentication attempts (successful and failed logins)
- User registration events
- API endpoint access and errors
- Database operations
- JWT token generation and validation

#### Frontend Logging
- User interactions (login, signup, logout)
- API request/response errors
- State management changes
- Route navigation events
- Form validation errors

Logging Output:
- Backend: Console output and NestJS built-in logger (configurable for production)
- Frontend: Browser console and error tracking in Vuex store

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

### License

This project is licensed under the MIT License.