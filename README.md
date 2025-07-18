# Admin Dashboard

A modern, responsive admin dashboard built with React, Material-UI, and Redux Toolkit. This application provides a comprehensive interface for managing projects, estimates, and dashboard analytics with support for internationalization and theme switching.

## 🚀 Features

### Core Features

- **Dashboard Analytics**: Interactive charts and statistics cards showing key metrics
- **Project Management**: Complete CRUD operations for projects with filtering and search
- **Estimate Management**: Create, edit, and manage project estimates with detailed sections and items
- **User Authentication**: Login, registration, and password recovery functionality
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

### UI/UX Features

- **Dark/Light Theme**: Toggle between dark and light themes with persistent storage
- **Internationalization (i18n)**: Multi-language support with React i18next
- **Collapsible Sidebar**: Smooth animated sidebar that can be hidden/shown via hamburger menu
- **Material-UI Components**: Modern, accessible UI components with consistent design
- **Interactive Charts**: Data visualization using Recharts library
- **Form Validation**: Comprehensive form validation using Formik and Yup

### Technical Features

- **Redux State Management**: Centralized state management with Redux Toolkit
- **Persistent Storage**: State persistence using Redux Persist
- **Protected Routes**: Route protection based on authentication status
- **Mock API**: Simulated API calls with loading states and error handling
- **Code Splitting**: Optimized bundle size with lazy loading

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git**

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
admin-dashboard/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ProtectedRoutes.jsx
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── data/               # Mock data and constants
│   │   ├── constants.js    # Estimates data and dashboard data
│   │   └── projectsData.js # Projects mock data
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Main dashboard layout
│   │   ├── DashboardContent.jsx # Dashboard content with charts
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Projects.jsx
│   │   ├── AddProject.jsx
│   │   ├── EditProject.jsx
│   │   ├── Estimates.jsx
│   │   ├── AddEstimate.jsx
│   │   └── EditEstimate.jsx
│   ├── redux/              # State management
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── projectsSlice.js
│   │   │   ├── estimatesSlice.js
│   │   │   └── themeSlice.js
│   │   └── store.js
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx           # Application entry point
│   ├── theme.jsx          # Material-UI theme configuration
│   ├── i18n.js           # i18next configuration
│   └── index.css         # Global styles
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🎯 Implemented Features

### 1. Authentication System

- **Login Page**: User authentication with form validation
- **Registration**: New user registration with validation
- **Password Recovery**: Forgot password functionality
- **Protected Routes**: Automatic redirection for unauthorized access
- **Persistent Sessions**: Login state maintained across browser sessions

### 2. Dashboard

- **Analytics Cards**: Display key metrics (Total Users, Orders, Sales, Pending)
- **Interactive Charts**: Area chart showing sales data over time
- **Recent Orders Table**: Tabular display of recent transactions
- **Responsive Layout**: Adapts to different screen sizes

### 3. Project Management

- **Project Listing**: Paginated table with search and filter capabilities
- **Add Project**: Form to create new projects with validation
- **Edit Project**: Modify existing project details
- **Delete Project**: Remove projects with confirmation
- **Status Management**: Track project status (completed, processing, on-hold)

### 4. Estimate Management

- **Estimate Creation**: Multi-section estimates with line items
- **Dynamic Sections**: Add/remove sections and items dynamically
- **Automatic Calculations**: Real-time total calculations with margins
- **Edit Estimates**: Modify existing estimates
- **Status Tracking**: Monitor estimate status (Created, Processing, On Hold)

### 5. UI/UX Features

- **Theme Switching**: Toggle between light and dark themes
- **Sidebar Navigation**: Collapsible sidebar with smooth animations
- **Language Support**: Switch between English and Spanish
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Visual feedback during API operations

## 🔧 Running the Mock API

This application uses mock data to demonstrate real-world behavior:

### Mock Data Sources:

- **Projects**: `src/data/projectsData.js`
- **Estimates**: `src/data/constants.js`
- **Dashboard Data**: `src/data/constants.js`

## 🏗️ Design Choices & Architecture

### State Management

- **Redux Toolkit**: Chosen for its simplified Redux usage and built-in best practices
- **Redux Persist**: Maintains application state across browser sessions
- **Async Thunks**: Handle asynchronous operations with proper loading states

### UI Framework

- **Material-UI (MUI)**: Provides consistent, accessible, and customizable components
- **Custom Theme**: Centralized theme configuration supporting light/dark modes
- **Responsive Design**: Mobile-first approach using MUI's breakpoint system

### Internationalization

- **React i18next**: Robust internationalization framework
- **Namespace Organization**: Logical grouping of translations
- **Persistent Language**: User's language preference saved in localStorage

### Form Management

- **Formik**: Handles form state and validation logic
- **Yup**: Schema-based form validation
- **Custom Components**: Reusable form components with consistent styling

### Routing

- **React Router v6**: Modern routing with nested routes and protected routes
- **Dynamic Routes**: Parameter-based routing for edit pages
- **Route Protection**: Authentication-based route access control

### Performance Optimizations

- **Vite**: Fast build tool with hot module replacement
- **Code Splitting**: Lazy loading for optimal bundle sizes
- **Memoization**: Strategic use of React.memo and useMemo
- **Efficient Re-renders**: Optimized Redux selectors

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

```
