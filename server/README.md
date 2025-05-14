# Project Title: Full Stack Authentication Application

## Overview
This project implements a full stack authentication module that allows users to sign up and sign in to the application. It is built using React for the front-end and NestJS for the back-end, with MongoDB as the database.

## Technologies Used
- **Front-end**: React, TypeScript
- **Back-end**: NestJS, TypeScript, MongoDB
- **Additional Libraries**: (Specify any additional libraries used)

## Getting Started

### Prerequisites
- Node.js (version X.X.X)
- MongoDB (version X.X.X)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

### Running the Application

#### Front-end
1. Navigate to the client directory:
   ```
   cd client
   ```

2. Start the development server:
   ```
   npm start
   ```

#### Back-end
1. Navigate to the server directory:
   ```
   cd server
   ```

2. Start the NestJS application:
   ```
   npm run start:dev
   ```

### API Endpoints
- **Sign Up**: `POST /auth/signup`
- **Sign In**: `POST /auth/signin`
- **Protected Endpoint**: (Specify any protected endpoints)

## Usage
- Visit the front-end application in your browser at `http://localhost:3000`.
- Use the sign-up form to create a new account.
- Use the sign-in form to log in to your account.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.