# Money Management App

## Overview

The Money Management App is a comprehensive solution to help users manage their finances efficiently. The application allows users to track their daily expenses, categorize spending, and manage their financial data securely.

## Table of Contents
1. Features
2. Technology Stack
3. Frontend
4. Backend
6. Usage
7. Contributing

## Features
- User Authentication (Sign up, Login)
- Secure JWT-based authentication
- Day-wise expense tracking
- CRUD operations on expense data
- Responsive and interactive user interface

## Technology Stack
 ### Frontend
- ReactJS
- Redux & Redux Toolkit (State Management)
- Zod (Form Validation)
- CSS & Material-UI (Styling)
 ### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT (JSON Web Tokens for Authentication)

## Frontend
The frontend of the application is built using ReactJS. The application state is managed using Redux and Redux Toolkit, ensuring a predictable and maintainable state architecture. Form validation is handled using Zod, providing a robust schema validation for user inputs. The styling is accomplished using plain CSS and Material-UI, offering a responsive and aesthetically pleasing user interface.

### Key Libraries
- ReactJS: A JavaScript library for building user interfaces.
- Redux & Redux Toolkit: Libraries for managing and centralizing application state.
- Zod: A TypeScript-first schema declaration and validation library.
- CSS & Material-UI: Tools for styling the application and ensuring it is visually 
                     appealing.
## Backend
The backend is developed using Spring Boot, providing a robust and scalable server-side application. Spring Security and JWT are used for securing the application, ensuring that only authenticated users can access certain endpoints. Spring Data JPA is utilized for database interactions, simplifying data management.

### Key Libraries
- Spring Boot: A framework for building production-ready applications.
- Spring Security: A framework that focuses on providing authentication and authorization.
- Spring Data JPA: A part of the Spring Data project that simplifies data access.
- JWT: A compact, URL-safe means of representing claims to be transferred between two parties.

## Usage
1. Sign Up: Create a new account.
2. Login: Log in using your credentials. A JWT token will be generated.
3. Expense Tracking: Use the provided interface to log, view, and delete your daily expenses.


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

We welcome contributions to enhance the functionality of this app. To contribute, follow these steps:

- Fork the repository.
- Create a new branch.
- Make your changes.
- Submit a pull request.
