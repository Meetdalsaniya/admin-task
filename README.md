# Admin Panel with React, Vite, Redux Toolkit

## Project Overview

This project is a full-featured admin panel built using **React with Vite**, **Redux Toolkit**, and **Material UI** as the design tool. It implements **CRUD operations** using a mock API.

The application consists of several modules:

- **Authentication**: Basic Login, Register, and Forgot Password forms.
- **Dashboard**: A visual overview of data.
- **Projects**: Manage projects with CRUD operations and filtering.
- **Estimation**: Handle estimations, add/remove sections and items, and calculate totals.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Running the Mock API](#running-the-mock-api)
- [Design Choices](#design-choices)
- [Utilities and Helpers](#utilities-and-helpers)
- [Notes](#notes)
- [Submission](#submission)

---

## Setup and Installation

### Prerequisites

- **Node.js v20.18.0** (via nvm)
- **npm or yarn**
- **json-server** for mock API

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-folder>

# Switch to Node version 20.18.0
nvm use 20.18.0

# Install dependencies
npm install  # or yarn install

# Start the development server
npm run dev  # or yarn dev

# Start the mock server
npx json-server mock/db.json --port 8080
```

### JSON Server (Mock API)

- The mock API is powered by **json-server**.
- The API runs on port **8080**.
- Mock database file is located at `mock/db.json`.

**Start the server**:

```bash
npm run server
```

Mock API URL: `http://localhost:8080`

---

## Project Structure

```
MY-REACT-VITE-APP/
│
├── mock/                  # Mock data or API
│   └── db.json            # Mock database for json-server
├── node_modules/          # Dependencies (auto-generated)
├── public/                # Static public files
│   └── index.html         # Main HTML file
├── src/                   # Source code
│   ├── assets/            # Static assets (images, icons, etc.)
│   ├── components/        # Reusable React components
│   │   ├── EmptyData/     # Placeholder or no data components
│   │   ├── iconify/       # Icon components or utilities
│   │   ├── Layout/        # Layout-related components
│   │   └── ProtectedRoute # Route protection components
│   ├── redux/             # Redux state management
│   │   ├── slices/        # State slices
│   │   └── thunks/        # Async thunks for API calls
│   │   ├── ClientProvider.jsx # API client provider
│   │   ├── custom_store.jsx   # Custom Redux store setup
│   │   └── store.jsx          # Main Redux store configuration
│   ├── routes/            # Routing configurations
│   ├── sections/          # Page sections or modules
│   ├── theme/             # Theme configurations (CSS/JS)
│   ├── utils/             # Utility functions and helpers
│   ├── App.css            # Global CSS
│   ├── App.jsx            # Main React component
│   ├── index.css          # Base CSS
│   ├── main.jsx           # Application entry point
│
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── package.json           # Project dependencies
├── package-lock.json      # Dependency lock file
├── yarn.lock              # Yarn lock file
├── vite.config.js         # Vite configuration file
└── README.md              # Project documentation
```

---

## Features

### 1. Authentication

- Basic **Login**, **Register**, and **Forgot Password** forms with validation.
- Mock authentication implementation.

### 2. Navigation

- A navigation bar with links to:
  - **Dashboard**
  - **Projects**
  - **Estimations**

### 3. Dashboard Module

- Display of key metrics and charts.
- Responsive and visually appealing layout.

### 4. Projects Module

- Full **CRUD operations** for managing projects.
- Filtering capabilities.
- Data fetched from the mock API.

### 5. Estimation Module

- Add and remove sections/items dynamically.
- Fields per item:
  - **Title, Description, Unit, Quantity, Price, Margin, Total**
- **Total Calculation**:
  ```
  Item Total = (Quantity × Price) + (Margin % of (Quantity × Price))
  ```

---

## Running the Mock API

- The **json-server** mock API is configured to run on port **8080**.
- Database file: `mock/db.json`

Start the mock API:

```bash
npm run server
```

Example API endpoints:

- `GET /projects`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`

---

## Design Choices

- **Design Tool**: Material UI for consistent and modern UI design.
- **Component-Driven Architecture**: Reusable components for forms, tables, and modals.
- **State Management**: Redux Toolkit for efficient and scalable global state management.
- **Routing**: React Router for navigation.

---

## Notes

- This project is modular and scalable for future features.
- Validation and error handling are implemented across all forms.

---

## Submission

- **GitHub Repository**: Submit the GitHub link with the complete project.
- Ensure the repository includes:
  - Source code
  - `mock/db.json` for mock data
  - Full documentation (README.md)

---

Thank you for your time and effort!
