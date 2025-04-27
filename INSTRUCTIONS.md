
# PillPulse Pharmacy POS System - Complete Project Instructions

## Project Overview

PillPulse is a comprehensive, modern Point of Sale (POS) system specifically designed for pharmacies. It combines powerful inventory management, prescription handling, and sales processing with an intuitive user interface to streamline pharmacy operations.

## Key Features Implemented

### 🏥 Core Pharmacy Features

1. **Barcode-Driven Workflow**
   - Scan medications to auto-fill product information
   - Display generic/brand names, batch numbers, and expiry dates
   - Automatic expiry alerts for items with less than 30 days shelf life
   - Drug interaction detection and warnings
   - Manual entry option for non-barcoded items with search-as-you-type functionality
   - Medication analysis feature for detailed component information

2. **AI-Powered Analytics Dashboard**
   - Real-time inventory and sales analytics
   - Natural language query system for data insights
   - Exportable reports in multiple formats (CSV, PDF)
   - Visual data representations for quick analysis

3. **Employee Hierarchy System**
   - Three-tier access control:
     - **Cashier**: Basic sales operations, clock in/out, personal sales history
     - **Pharmacist**: Override medication interactions, approve controlled substances, limited financial reporting
     - **Administrator**: Complete system access, user management, settings, financial reports, audit logs

4. **Receipt and Transaction Management**
   - Detailed receipt generation with taxes and VAT
   - Transaction tracking and history
   - Refund processing capability

### 🎮 Additional Features

- **Health Fact Generator**: Access health, science, history facts, or jokes
- **Dark Theme & Theme Options**: Customizable UI with dark and light themes featuring olive green accents with golden hover effects
- **User Profile Display**: Shows the currently logged-in user with their role and ID
- **Multi-Location Support**: Enterprise features for managing multiple pharmacy locations
- **Audit Logging**: Comprehensive tracking of all system activities

## Technical Architecture

### Frontend
- React with TypeScript
- Vite for fast development and optimized builds
- ShadCN UI components for consistent design
- Tailwind CSS for styling
- React Router for navigation
- React Query for efficient data fetching
- Framer Motion for animations

### Backend Architecture (Implementation Guide)
- Node.js with Express.js REST API
- PostgreSQL database with row-level security
- Authentication system with role-based access control
- Middleware for request validation and error handling

## Component Architecture Explained

### Core Components

1. **Layout Components**
   - `DashboardLayout.tsx`: Main layout wrapper that provides the sidebar, header, and content area for all dashboard pages
   - `UserMenu.tsx`: Dropdown menu showing the current user, their role, and logout functionality

2. **Dashboard Components**
   - `OverviewChart.tsx`: Displays sales and inventory data in visual chart format
   - `TopSellingItems.tsx`: Shows the most popular products based on sales volume
   - `RecentSales.tsx`: Lists recent transactions with details
   - `ExpiringMedications.tsx`: Alerts for medications nearing expiry
   - `AskAI.tsx`: Natural language interface for querying pharmacy data

3. **POS Components**
   - `BarcodeScanner.tsx`: Handles barcode scanning functionality
   - `MedicationInfoCard.tsx`: Displays medication details after scanning
   - `InteractionAlert.tsx`: Shows warnings for potential drug interactions
   - `PaymentSummary.tsx`: Processes payments and generates receipts

4. **Inventory Components**
   - `InventoryFilters.tsx`: Provides filtering options for inventory items
   - `InventoryTable.tsx`: Displays inventory items in a sortable, filterable table

5. **Theme Components**
   - `theme-provider.tsx`: Context provider for theme preferences
   - `theme-toggle.tsx`: Button for switching between light and dark themes

6. **Common Components**
   - `FactGenerator.tsx`: Generates interesting health and pharmacy facts

7. **AI Components**
   - `AskAI.tsx`: Provides natural language interface for data queries and insights

## User Roles & Permissions

### 1. Cashier
- **Access**:
  - Process sales transactions
  - Scan barcodes and process OTC sales
  - Basic customer lookup
  - Clock in/out functionality
  - Access personal sales history
- **Restrictions**:
  - Cannot make inventory adjustments
  - No access to controlled substances
  - Cannot view reports or financial data

### 2. Pharmacist
- **Access**:
  - All Cashier permissions
  - Approve controlled substance sales
  - Override medication interactions
  - Access full patient histories
  - View limited financial reports
  - Full medication management
  - Audit trail signing
- **Restrictions**:
  - No payroll/finance access
  - Cannot disable compliance logs

### 3. Administrator
- **Access**:
  - All Pharmacist permissions
  - Add/remove users and set permissions
  - Change system settings
  - View complete financial reports
  - Track employee activities
  - Generate location reports
  - Handle refunds/voids
  - Override pricing/discounts
  - Manage vendors & orders
- **Restrictions**:
  - Cannot override clinical decisions

## Enterprise Features (Premium Tier)

### Multi-Location Management
- Centralized inventory tracking across stores
- Transfer stock between pharmacies
- Compare location performance metrics

### Advanced Analytics
- Franchise-wide sales trends
- Drug category performance analysis
- Patient adherence reports

### Corporate Controls
- Standardized pricing rules
- Bulk discount configurations
- Compliance enforcement (HIPAA/DEA)

### Supply Chain Integration
- Auto-reorder triggers for low stock
- Vendor price negotiation tools
- Wholesale purchase history

### Staff Management
- Cross-location scheduling
- Role templates (pre-configured permissions)
- Labor cost analytics

## Backend Implementation Guide

### Setting Up the Backend

To handle 50,000+ inventory items efficiently, follow these implementation steps:

1. **Database Setup**:
   ```bash
   # Create PostgreSQL database
   CREATE DATABASE pillpulse;
   
   # Connect to database
   \c pillpulse
   
   # Create essential tables (examples below)
   CREATE TABLE users (...);
   CREATE TABLE medications (...);
   CREATE TABLE inventory (...);
   CREATE TABLE transactions (...);
   ```

2. **Node.js + Express Backend**:
   ```javascript
   // Example Express setup
   const express = require('express');
   const cors = require('cors');
   const app = express();
   
   app.use(cors());
   app.use(express.json());
   
   // API Routes
   app.use('/api/auth', authRoutes);
   app.use('/api/inventory', inventoryRoutes);
   app.use('/api/sales', salesRoutes);
   
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

3. **Database Connection**:
   ```javascript
   // Example using node-postgres
   const { Pool } = require('pg');
   
   const pool = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'pillpulse',
     password: 'your_password',
     port: 5432,
   });
   
   module.exports = {
     query: (text, params) => pool.query(text, params),
   };
   ```

### API Endpoints Implementation

For a system handling 50,000+ inventory items, implement these essential endpoints:

#### Authentication API
```javascript
// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const auth = require('../middleware/auth');

// Login endpoint
router.post('/login', async (req, res) => {
  const { employeeId, password } = req.body;
  
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE employee_id = $1',
      [employeeId]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        employeeId: user.employee_id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user info
router.get('/me', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, employee_id, name, role FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

#### Inventory API (Optimized for 50,000+ items)
```javascript
// src/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Get paginated inventory with filters
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const expiryFilter = req.query.expiry || '';
    
    // Build query with filters
    let query = 'SELECT * FROM medications WHERE 1=1';
    const queryParams = [];
    let paramIndex = 1;
    
    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR generic_name ILIKE $${paramIndex} OR barcode = $${paramIndex+1})`;
      queryParams.push(`%${search}%`);
      queryParams.push(search);
      paramIndex += 2;
    }
    
    if (category) {
      query += ` AND category = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }
    
    if (expiryFilter === 'expiring') {
      query += ` AND expiry_date < CURRENT_DATE + INTERVAL '30 days'`;
    }
    
    // Add pagination
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
    const countResult = await db.query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].count);
    
    // Add sorting and pagination to main query
    query += ` ORDER BY ${req.query.sort || 'name'} ${req.query.order || 'ASC'}`;
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex+1}`;
    queryParams.push(limit);
    queryParams.push(offset);
    
    const result = await db.query(query, queryParams);
    
    res.json({
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get medication by barcode
router.get('/barcode/:code', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM medications WHERE barcode = $1',
      [req.params.code]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Additional endpoints for inventory management
// Add medication (admin/pharmacist only)
router.post('/', auth, roleCheck(['admin', 'pharmacist']), async (req, res) => {
  // Implementation details
});

// Update medication (admin/pharmacist only)
router.put('/:id', auth, roleCheck(['admin', 'pharmacist']), async (req, res) => {
  // Implementation details
});

module.exports = router;
```

#### Transaction API
```javascript
// src/routes/salesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Process new transaction
router.post('/', auth, async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Insert transaction record
    const transactionResult = await client.query(
      `INSERT INTO transactions 
       (cashier_id, pharmacist_id, customer_id, total, tax, discount, payment_method) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        req.user.id, 
        req.body.pharmacistId || null, 
        req.body.customerId || null,
        req.body.total,
        req.body.tax,
        req.body.discount || 0,
        req.body.paymentMethod
      ]
    );
    
    const transactionId = transactionResult.rows[0].id;
    
    // Insert transaction items
    for (const item of req.body.items) {
      await client.query(
        `INSERT INTO transaction_items 
         (transaction_id, medication_id, quantity, price, subtotal) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          transactionId,
          item.medicationId,
          item.quantity,
          item.price,
          item.subtotal
        ]
      );
      
      // Update inventory
      await client.query(
        `UPDATE medications 
         SET quantity = quantity - $1
         WHERE id = $2`,
        [item.quantity, item.medicationId]
      );
    }
    
    await client.query('COMMIT');
    
    res.status(201).json({ 
      id: transactionId,
      message: 'Transaction processed successfully' 
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
});

// Get transactions with pagination and filtering
router.get('/', auth, roleCheck(['admin', 'pharmacist']), async (req, res) => {
  // Implementation with pagination and filtering
});

module.exports = router;
```

### Database Schema for 50,000+ Items

For optimal performance with large inventories, implement these optimized schemas:

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('cashier', 'pharmacist', 'admin')),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

CREATE INDEX idx_users_employee_id ON users(employee_id);
CREATE INDEX idx_users_role ON users(role);

-- Medications Table (Optimized for 50,000+ items)
CREATE TABLE medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255),
  barcode VARCHAR(100) UNIQUE,
  batch_number VARCHAR(100),
  expiry_date DATE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(100),
  description TEXT,
  interactions TEXT[],
  requires_prescription BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  location_id UUID REFERENCES locations(id)
);

-- Indexes for fast querying of large inventory
CREATE INDEX idx_medications_name ON medications(name);
CREATE INDEX idx_medications_generic_name ON medications(generic_name);
CREATE INDEX idx_medications_barcode ON medications(barcode);
CREATE INDEX idx_medications_category ON medications(category);
CREATE INDEX idx_medications_expiry_date ON medications(expiry_date);
CREATE INDEX idx_medications_location ON medications(location_id);

-- Locations Table (for multi-location support)
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  manager_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cashier_id UUID NOT NULL REFERENCES users(id),
  pharmacist_id UUID REFERENCES users(id),
  customer_id UUID REFERENCES customers(id),
  total DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) DEFAULT 0,
  payment_method VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('completed', 'voided', 'refunded')),
  location_id UUID REFERENCES locations(id)
);

CREATE INDEX idx_transactions_cashier ON transactions(cashier_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_location ON transactions(location_id);

-- Transaction Items Table
CREATE TABLE transaction_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  medication_id UUID NOT NULL REFERENCES medications(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transaction_items_transaction ON transaction_items(transaction_id);

-- Audit Logs Table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
```

## AI Integration Configuration

The PillPulse system uses multiple AI capabilities that can be configured and extended:

### 1. Natural Language Query System

The `AskAI` component uses a natural language processing system to interpret user queries about pharmacy data. To integrate with a production backend:

```javascript
// Example backend API endpoint for AI queries
app.post('/api/ai/query', auth, async (req, res) => {
  const { query } = req.body;
  
  try {
    // Connect to OpenAI or other LLM provider
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for a pharmacy POS system. Answer questions about inventory, sales, and business metrics based on the following data."
        },
        {
          role: "user",
          content: `Database context: ${JSON.stringify(dbContext)}\n\nUser query: ${query}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    res.json({
      response: response.choices[0].message.content,
      type: determineResponseType(response.choices[0].message.content)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing query" });
  }
});
```

### 2. Drug Interaction Detection

Configure the medication interaction detection system:

```javascript
// Example implementation for drug interaction detection API
app.post('/api/medications/check-interactions', auth, async (req, res) => {
  const { medicationIds } = req.body;
  
  try {
    // Get medication details
    const medications = await db.query(
      'SELECT id, name, interactions FROM medications WHERE id = ANY($1)',
      [medicationIds]
    );
    
    // Algorithm to check for interactions
    const interactions = detectInteractions(medications.rows);
    
    res.json({ interactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking interactions" });
  }
});
```

## Scaling the System

To ensure PillPulse can handle 50,000+ inventory items and high transaction volumes:

### 1. Database Optimization

- Use proper indexing on commonly queried fields
- Implement database partitioning for historical transaction data
- Configure connection pooling for optimal performance
- Implement query caching for frequently accessed data

### 2. API Performance

- Implement pagination for all list endpoints
- Use efficient filtering and sorting techniques
- Enable compression for API responses
- Implement rate limiting to prevent abuse

### 3. Caching Strategy

```javascript
// Example Redis caching implementation
const redis = require('redis');
const client = redis.createClient();
const CACHE_DURATION = 60 * 15; // 15 minutes

// Middleware to cache responses
function cacheResponse(key, duration) {
  return async (req, res, next) => {
    try {
      const cacheKey = `${key}:${JSON.stringify(req.query)}`;
      const cachedData = await client.get(cacheKey);
      
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      // Store original res.json method
      const originalJson = res.json;
      
      // Override res.json method to cache response
      res.json = function(data) {
        client.set(cacheKey, JSON.stringify(data), 'EX', duration);
        return originalJson.call(this, data);
      };
      
      next();
    } catch (err) {
      next();
    }
  };
}

// Usage in routes
router.get('/inventory', cacheResponse('inventory', CACHE_DURATION), async (req, res) => {
  // Implementation
});
```

### 4. Horizontal Scaling

For deployment across multiple servers:

```javascript
// app.js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Replace dead worker
  });
} else {
  // Workers share the TCP connection
  require('./server');
  console.log(`Worker ${process.pid} started`);
}
```

## Authorization & Security Implementation

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// src/middleware/roleCheck.js
module.exports = function(roles) {
  return function(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: 'No authentication' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};
```

## Testing Strategy

To ensure the system works correctly with large data volumes:

1. **Unit Testing**:
   ```javascript
   const { expect } = require('chai');
   const sinon = require('sinon');
   const inventoryController = require('../controllers/inventoryController');

   describe('Inventory Controller', () => {
     it('should return paginated results', async () => {
       // Test implementation
     });

     // More tests
   });
   ```

2. **Load Testing**:
   ```bash
   # Using k6 for load testing API endpoints
   k6 run --vus 100 --duration 30s load-tests/inventory-api.js
   ```

## Deployment Strategy

For a system handling 50,000+ items:

```
# Docker Compose configuration for deployment
version: '3'

services:
  api:
    build: ./backend
    restart: always
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_USER=postgres
      - DB_PASSWORD=your_password
      - DB_NAME=pillpulse
      - JWT_SECRET=your_jwt_secret
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis
    deploy:
      replicas: 4

  postgres:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=your_password
      - POSTGRES_DB=pillpulse
    ports:
      - "5432:5432"

  redis:
    image: redis:6
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/build:/usr/share/nginx/html
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
```

---

This document serves as the comprehensive guide to the PillPulse Pharmacy POS System, detailing its features, architecture, implementation plan, and backend integration. It provides a roadmap for development and a reference for understanding the system's capabilities.

© 2025 PillPulse. All Rights Reserved.
