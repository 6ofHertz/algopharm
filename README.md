
# Apotheke - Modern Pharmacy POS System

<div align="center">
  <img src="https://raw.githubusercontent.com/6ofHertz/algopharm/main/logo2.png" alt="Apotheke Logo" width="600"/>
  <p>A comprehensive, modern Pharmacy Management System with advanced features for streamlined operations.</p>
</div>

## ✨ Features

### Core Pharmacy Workflow

- **Barcode-Driven Workflow**:
  - Scan medications to auto-fill product information
  - Display generic/brand names, batch numbers, and expiry dates
  - Automatic expiry alerts for items with less than 30 days shelf life
  - Real-time drug interaction detection and warnings

- **AI-Powered Analytics Dashboard**:
  - Real-time inventory and sales analytics
  - AI-driven insights and forecasting
  - Natural language query system for data insights
  - Exportable reports in multiple formats (CSV, PDF)
  - Visual data representations for quick analysis

- **Employee Hierarchy System**:
  - Three-tier access control (Cashier, Pharmacist, Administrator)
  - Role-specific interfaces and permissions
  - Activity tracking and audit logging
  - Clock in/out system with performance metrics
  - Integrated staff scheduling and leave management

- **Health Fact Generator**:
  - Provides interesting health, science, and history facts
  - Can also generate jokes for a bit of levity
  - Useful for engaging staff and customers
  - Offline fact generation capability (via Mistral 7B)

- **Shift Achievements**:
  - Gamified work experience with achievement badges
  - Performance-based recognition system

- **Dark Mode & Theme Options**:
  - Customizable UI with dark and light themes
  - Features an attractive olive green accent color with golden hover effects
  - Provides a comfortable user experience in varying lighting conditions

## 🏗️ Technical Architecture

Apotheke is built with a modern, scalable architecture designed for performance and maintainability.

### Frontend

The user interface is built using:

- **React with TypeScript**: Provides a robust and type-safe foundation.
- **Vite**: Offers a fast development server and optimized build process.
- **ShadCN UI**: A collection of re-usable components built with Radix UI and Tailwind CSS for a consistent and accessible design system.
- **Tailwind CSS**: A utility-first CSS framework for rapid styling.
- **React Router**: Handles declarative routing throughout the application.
- **React Query**: Manages data fetching, caching, and state synchronization.
- **Framer Motion**: Used for smooth and engaging animations.
- **Zustand**: A fast and scalable state-management solution.
- **Recharts**: For rendering interactive charts and data visualizations.

- React with TypeScript
- Vite for fast development and optimized builds
- ShadCN UI components for consistent design
- Tailwind CSS for styling
- React Router for navigation
- React Query for efficient data fetching

### Backend (Suggested Implementation)

The backend handles API requests, data persistence, and business logic. A suggested implementation includes:

- **Node.js with Express.js**: Provides a flexible and efficient environment for building RESTful APIs.
- **PostgreSQL**: A powerful open-source relational database.
- **Supabase**: Can be used for simplified authentication, real-time database features, and other backend services.
- **Redis**: An in-memory data structure store, useful for caching and improving response times.

### AI & Machine Learning

- Integration with OpenAI GPT-4 for natural language queries
- Mistral 7B (or similar) for local, offline fact generation capabilities.
- Potential for integrating machine learning models for inventory optimization, sales forecasting, and personalized recommendations (future development).

## 🚀 Getting Started

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
<<<<<<< HEAD
git clone https://github.com/6ofHertz/pillpulse.git
=======
git clone https://github.com/6ofHertz/Apotheke.git
>>>>>>> gemini-edits

# Navigate to the project directory
cd Apotheke

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

### Configuration

1. Create a `.env` file in the root directory of the project based on `.env.example`.
2. Configure your database connection settings
3. Set up your API keys for OpenAI and other external services you plan to use.
4. Configure any other environment-specific variables as needed.

## 🔐 User Roles & Permissions

Apotheke implements a tiered access control system to ensure data security and appropriate functionality for different users.
## User Roles & Permissions

### Cashier
- Process sales transactions
- View basic inventory information
- Clock in/out functionality
- Access personal sales history

### Pharmacist
### Pharmacist
- All Cashier permissions
- Override medication interactions
- Approve controlled substance sales
- View limited financial reports
- Full medication management

### Administrator
### Administrator
- All Pharmacist permissions
- Add/remove users
- Change system settings
- View complete financial reports
- Track employee activities
- Access audit logs

## ⚙️ Deployment

## Deployment

Apotheke is designed to be deployed in various environments:

- **Cloud Deployment**: AWS, Google Cloud, or Azure
- **On-Premises**: Easily deployable in on-premises environments, potentially using Docker containers for simplified setup and management.
- **Offline Mode**: Progressive Web App (PWA) capabilities can be explored to enable essential functionalities even without a stable internet connection (future development).


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- ShadCN UI for the component library
- Tailwind CSS for the styling framework
- The open-source community for inspiration and tools

---

© 2025 Apotheke. All Rights Reserved.
