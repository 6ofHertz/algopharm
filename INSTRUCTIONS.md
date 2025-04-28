
# AlgoPharm (PillPulse) - Comprehensive Pharmacy Management System

Welcome to AlgoPharm (PillPulse) - a modern pharmacy management system designed to optimize inventory management, streamline sales, and improve financial tracking for pharmacies of any size. This document provides detailed instructions for using and extending the system.

## Table of Contents
- [Component Overview](#component-overview)
- [Role-Based Access](#role-based-access)
- [Backend Setup Guide](#backend-setup-guide)
- [AI Integration](#ai-integration)
- [Scaling for 50,000+ Items](#scaling-for-50000-items)
- [Technical Configuration](#technical-configuration)

## Component Overview

### Core Components

#### 1. Dashboard
The Dashboard provides a real-time overview of key pharmacy metrics including:
- Total sales and prescription counts
- Active patients
- Expiring medications notifications
- Sales trends by department
- Inventory status

**Key Files:**
- `src/pages/Dashboard.tsx` - Main dashboard layout
- `src/components/dashboard/OverviewChart.tsx` - Sales visualization
- `src/components/dashboard/RecentSales.tsx` - Latest transactions
- `src/components/dashboard/ExpiringMedications.tsx` - Medications nearing expiry
- `src/components/dashboard/TopSellingItems.tsx` - Popular products

#### 2. Point of Sale (POS)
The POS system handles all customer transactions with features for:
- Barcode scanning
- Medication search
- Drug interaction detection
- Split payment processing
- Receipt generation

**Key Files:**
- `src/pages/POS.tsx` - Main POS interface
- `src/components/pos/BarcodeScanner.tsx` - Scan medication barcodes
- `src/components/pos/MedicationInfoCard.tsx` - Display medication details
- `src/components/pos/PaymentSummary.tsx` - Handle payment calculations
- `src/components/pos/InteractionAlert.tsx` - Drug interaction warnings

#### 3. Inventory Management
The inventory system tracks all medications and supplies with:
- Stock level monitoring
- Expiry date tracking
- Automated reordering thresholds
- Batch and lot tracking

**Key Files:**
- `src/pages/Inventory.tsx` - Inventory management interface
- `src/components/inventory/InventoryFilters.tsx` - Filter and search inventory

#### 4. Accounting System
The accounting module manages all financial aspects of the pharmacy:
- Sales & transaction tracking
- Payment processing
- Financial reporting
- Insurance billing
- Inventory-ledger synchronization
- Audit compliance
- Predictive accounting

**Key Files:**
- `src/pages/Accounting.tsx` - Main accounting interface
- `src/components/accounting/SalesReport.tsx` - Sales transaction records
- `src/components/accounting/PaymentProcessing.tsx` - Payment handling
- `src/components/accounting/FinancialReporting.tsx` - Financial analysis
- `src/components/accounting/InsuranceBilling.tsx` - Insurance claims tracking
- `src/components/accounting/InventoryLedger.tsx` - Inventory financial tracking
- `src/components/accounting/AuditCompliance.tsx` - Regulatory compliance
- `src/components/accounting/PredictiveAccounting.tsx` - AI-powered forecasting

### Utility Components

#### Theme System
The application supports both light and dark modes with a blue-focused theme.

**Key Files:**
- `src/components/theme/theme-provider.tsx` - Theme context provider
- `src/components/theme/theme-toggle.tsx` - Theme switching button
- `src/index.css` - Theme variables and styling

#### Layout Components
- `src/components/layout/DashboardLayout.tsx` - Main application layout
- `src/components/ui/sidebar.tsx` - Navigation sidebar
- `src/components/layout/UserMenu.tsx` - User account menu

## Role-Based Access

AlgoPharm implements role-based access control for three primary user types:

### 1. Cashier Dashboard
Primary Focus: Fast transactions, basic sales, and customer service.

**Key Features:**
- Quick sales panel with barcode scanning
- Active transaction management
- Basic customer lookup
- Inventory shortcuts for alternatives
- Shift management tools
- Safety alerts for expiring items

### 2. Pharmacist Dashboard
Primary Focus: Medication safety, oversight, and clinical decisions.

**Key Features:**
- Prescription management
- Drug interaction checking
- Override center for approvals
- Patient profiles with medication history
- Clinical reference tools
- Regulatory compliance reporting

### 3. Administrator Dashboard
Primary Focus: Business operations, staff management, and system control.

**Key Features:**
- Business analytics and reporting
- Employee management and scheduling
- System configuration and integrations
- Advanced inventory control
- Security center and audit logs
- AI-powered business insights

## Backend Setup Guide

### 1. Database Setup (PostgreSQL)

#### Installation
**Linux/macOS:**
```bash
sudo apt-get install postgresql postgresql-contrib  # Debian/Ubuntu
brew install postgresql                            # macOS
```

**Windows:**
Download from PostgreSQL Official Site.

#### Configuration
```bash
sudo -u postgres psql  # Access PostgreSQL shell
CREATE DATABASE algopharm;
CREATE USER pharmadmin WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE algopharm TO pharmadmin;
```

#### Optimized Schema Design
```sql
-- Drugs Table (Core)
CREATE TABLE drugs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    barcode VARCHAR(50) UNIQUE,
    dosage_form VARCHAR(50),
    stock_quantity INT DEFAULT 0,
    min_stock_threshold INT,
    expiry_date DATE,
    batch_number VARCHAR(50),
    image_url TEXT
);

-- Inventory Transactions (Audit Trail)
CREATE TABLE inventory_logs (
    id SERIAL PRIMARY KEY,
    drug_id INT REFERENCES drugs(id),
    action_type VARCHAR(20),
    quantity INT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_id INT
);

-- Drug Interactions (AI-Powered)
CREATE TABLE drug_interactions (
    drug1_id INT REFERENCES drugs(id),
    drug2_id INT REFERENCES drugs(id),
    risk_level VARCHAR(20),
    description TEXT
);

-- Sales Transactions
CREATE TABLE sales (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    cashier_id UUID REFERENCES users(id),
    pharmacist_id UUID REFERENCES users(id),
    subtotal DECIMAL(10,2),
    tax DECIMAL(10,2),
    discount DECIMAL(10,2),
    total DECIMAL(10,2),
    payment_method VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20)
);

-- Accounting Tables
CREATE TABLE accounting_entries (
    id SERIAL PRIMARY KEY,
    transaction_id UUID,
    account_code VARCHAR(20),
    description TEXT,
    amount DECIMAL(10,2),
    entry_type VARCHAR(10), -- DEBIT or CREDIT
    entry_date TIMESTAMPTZ DEFAULT NOW()
);
```

#### Indexes for Speed:
```sql
CREATE INDEX idx_drugs_barcode ON drugs(barcode);
CREATE INDEX idx_drugs_expiry ON drugs(expiry_date);
CREATE INDEX idx_inventory_logs_drug_id ON inventory_logs(drug_id);
CREATE INDEX idx_sales_created_at ON sales(created_at);
```

### 2. Backend API (FastAPI)

#### Installation
```bash
pip install fastapi uvicorn sqlalchemy psycopg2 python-multipart
```

#### Core Endpoints
```python
from fastapi import FastAPI, UploadFile, File
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import shutil
import os

app = FastAPI()
DATABASE_URL = "postgresql://pharmadmin:securepassword@localhost/algopharm"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, bind=engine)
Base = declarative_base()

# API Endpoints
@app.post("/drugs/")
async def add_drug(name: str, barcode: str, quantity: int):
    db = SessionLocal()
    drug = Drug(name=name, barcode=barcode, stock_quantity=quantity)
    db.add(drug)
    db.commit()
    return {"message": "Drug added successfully"}

@app.post("/upload_drug_image/")
async def upload_drug_image(barcode: str, file: UploadFile = File(...)):
    UPLOAD_DIR = "drug_images"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = f"{UPLOAD_DIR}/{barcode}.jpg"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"image_path": file_path}
```

#### Run with:
```bash
uvicorn main:app --reload
```

#### Production Deployment:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### 3. Authentication & Security
Implement JWT-based authentication:

```python
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

# Security configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "your-secure-secret-key"  # Use environment variables in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Authentication endpoints
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role}, 
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
```

## AI Integration

### 1. Drug Interaction Checker
```python
# Use a pre-trained model or medical API
from transformers import pipeline

interaction_checker = pipeline("text-classification", model="bert-drug-interactions")

def check_interaction(drug1_name: str, drug2_name: str):
    result = interaction_checker(f"Interaction between {drug1_name} and {drug2_name}")
    return {"risk": result["label"], "confidence": result["score"]}
```

### 2. Expiry Date Predictor
```python
from sklearn.ensemble import RandomForestRegressor
import pandas as pd

# Load historical expiry data
data = pd.read_csv("expiry_history.csv")
model = RandomForestRegressor()
model.fit(data[["stock_age", "storage_temp"]], data["days_until_expiry"])

def predict_expiry(stock_age: int, storage_temp: float):
    return model.predict([[stock_age, storage_temp]])
```

### 3. Barcode/QR Scanning
```python
from pyzbar.pyzbar import decode
from PIL import Image

def scan_barcode(image_path):
    return decode(Image.open(image_path))[0].data.decode("utf-8")
```

### 4. OCR for Drug Information
```python
import pytesseract
from PIL import Image

def extract_drug_info(image_path):
    text = pytesseract.image_to_string(Image.open(image_path))
    lines = text.split("\n")
    return {
        "name": lines[0] if lines else "",
        "manufacturer": lines[1] if len(lines) > 1 else "",
        "dosage": lines[2] if len(lines) > 2 else ""
    }
```

### 5. Predictive Sales Analysis
The application includes an AI-powered predictive accounting module that:
- Forecasts cash flow based on seasonal trends
- Identifies inventory with high expiry risk
- Recommends supplier payment timing for maximum discounts
- Detects unusual patterns in sales and inventory movement

## Scaling for 50,000+ Items

To efficiently manage over 50,000 inventory items, the system employs several optimization techniques:

### 1. Database Optimization

#### Partitioning
For large tables like `inventory_logs`:
```sql
CREATE TABLE inventory_logs (
    id SERIAL,
    drug_id INT,
    action_type VARCHAR(20),
    quantity INT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_id INT
) PARTITION BY RANGE (timestamp);

-- Create monthly partitions
CREATE TABLE inventory_logs_y2025m01 PARTITION OF inventory_logs
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE inventory_logs_y2025m02 PARTITION OF inventory_logs
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
```

#### Materialized Views
For frequently accessed reports:
```sql
CREATE MATERIALIZED VIEW inventory_summary AS
SELECT 
    drug_id,
    SUM(CASE WHEN action_type = 'ADD' THEN quantity ELSE 0 END) as total_added,
    SUM(CASE WHEN action_type = 'REMOVE' THEN quantity ELSE 0 END) as total_removed,
    SUM(CASE WHEN action_type = 'ADD' THEN quantity ELSE -quantity END) as current_quantity
FROM inventory_logs
GROUP BY drug_id;

-- Refresh on schedule
CREATE FUNCTION refresh_inventory_summary()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW inventory_summary;
    RETURN NULL;
END $$ LANGUAGE plpgsql;

CREATE TRIGGER refresh_inventory_summary_trigger
AFTER INSERT OR UPDATE OR DELETE ON inventory_logs
EXECUTE PROCEDURE refresh_inventory_summary();
```

### 2. API Optimization

#### Pagination
All list endpoints implement cursor-based pagination:
```python
@app.get("/drugs/")
async def list_drugs(cursor: str = None, limit: int = 100):
    query = "SELECT * FROM drugs"
    if cursor:
        query += f" WHERE id > '{cursor}'"
    query += f" ORDER BY id LIMIT {limit}"
    
    db = SessionLocal()
    drugs = db.execute(query).fetchall()
    next_cursor = drugs[-1].id if drugs else None
    
    return {
        "data": drugs,
        "next_cursor": next_cursor
    }
```

#### Caching
Redis cache implementation for read-heavy data:
```python
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_cached_drug(drug_id: str):
    cache_key = f"drug:{drug_id}"
    cached_data = redis_client.get(cache_key)
    
    if cached_data:
        return json.loads(cached_data)
    
    # If not in cache, fetch from database
    db = SessionLocal()
    drug = db.query(Drug).filter(Drug.id == drug_id).first()
    
    if drug:
        # Cache for 30 minutes
        redis_client.setex(cache_key, 1800, json.dumps(drug.__dict__))
        
    return drug
```

### 3. Frontend Optimization

#### Virtual Lists
For performance when rendering large inventory lists:
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

const InventoryList = ({ items }) => {
  const parentRef = React.useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div 
      ref={parentRef} 
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index].name} - {items[virtualItem.index].quantity}
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### Chunked Data Loading
For initial data loading of large inventories:
```typescript
const fetchInventoryInChunks = async () => {
  let allItems = [];
  let cursor = null;
  let hasMore = true;
  
  while (hasMore) {
    const response = await api.get('/drugs', { 
      params: { cursor, limit: 1000 } 
    });
    
    allItems = [...allItems, ...response.data.data];
    cursor = response.data.next_cursor;
    hasMore = cursor !== null;
    
    // Update state incrementally to show progress
    setInventoryItems(allItems);
    setLoadingProgress(allItems.length);
  }
};
```

### 4. Distributed Systems

For truly massive installations, implement a distributed architecture:

#### Message Queue System
Using RabbitMQ for inventory updates:
```python
import pika

def publish_inventory_update(drug_id, action_type, quantity, user_id):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    channel.queue_declare(queue='inventory_updates')
    
    message = json.dumps({
        'drug_id': drug_id,
        'action_type': action_type,
        'quantity': quantity,
        'user_id': user_id,
        'timestamp': datetime.now().isoformat()
    })
    
    channel.basic_publish(exchange='',
                          routing_key='inventory_updates',
                          body=message)
    
    connection.close()
```

#### Worker Processes
```python
def start_inventory_worker():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    channel.queue_declare(queue='inventory_updates')
    
    def callback(ch, method, properties, body):
        update = json.loads(body)
        db = SessionLocal()
        log = InventoryLog(**update)
        db.add(log)
        db.commit()
        
    channel.basic_consume(queue='inventory_updates',
                          auto_ack=True,
                          on_message_callback=callback)
    
    channel.start_consuming()
```

#### Content Delivery Network
For serving drug images and documents:
```python
@app.get("/drug_image/{barcode}")
async def get_drug_image(barcode: str):
    cdn_base_url = "https://cdn.algopharm.com/drug-images/"
    return RedirectResponse(url=f"{cdn_base_url}{barcode}.jpg")
```

## Technical Configuration

### Environment Configuration
Configure the application with environment variables:
```bash
# Database connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=algopharm
DB_USER=pharmadmin
DB_PASSWORD=securepassword

# API settings
API_URL=https://api.algopharm.com
API_VERSION=v1

# Authentication
JWT_SECRET=your-secure-secret-key
JWT_EXPIRE_MINUTES=30

# Feature flags
ENABLE_AI_FEATURES=true
ENABLE_PREDICTIVE_ACCOUNTING=true

# Scale settings
MAX_CONNECTIONS=100
POOL_SIZE=20
```

### Monitoring & Logging
Implement comprehensive monitoring:
```python
import logging
from prometheus_client import Counter, Gauge, start_http_server

# Metrics
inventory_transactions = Counter('inventory_transactions_total', 
                                'Total number of inventory transactions')
active_users = Gauge('active_users', 'Number of active users')

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("algopharm.log"),
        logging.StreamHandler()
    ]
)

# Start metrics server
start_http_server(8000)
```

### Backup & Recovery
Configure automated database backups:
```bash
#!/bin/bash
# backup_script.sh

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/algopharm"
DB_NAME="algopharm"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform backup
pg_dump -Fc $DB_NAME > "$BACKUP_DIR/$DB_NAME-$TIMESTAMP.dump"

# Keep only the last 7 backups
ls -tp $BACKUP_DIR/*.dump | grep -v '/$' | tail -n +8 | xargs -I {} rm -- {}

# Sync to off-site storage
aws s3 cp "$BACKUP_DIR/$DB_NAME-$TIMESTAMP.dump" s3://algopharm-backups/
```

### Security Measures
Implement robust security practices:
- All database passwords are hashed using bcrypt
- All API endpoints use HTTPS
- JWT tokens with limited lifespans
- Role-based access control (RBAC)
- Input validation and parameterized queries
- Regular security audits and penetration testing

---

## Getting Started

1. **Development Setup:**
   ```bash
   # Clone the repository
   git clone https://github.com/your-org/algopharm.git
   cd algopharm
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

2. **Production Build:**
   ```bash
   # Build the frontend
   npm run build
   
   # Deploy API
   cd backend
   docker-compose up -d
   ```

3. **Access the application:**
   - Development: http://localhost:5173
   - Production: https://your-domain.com

## Need Help?
Contact the AlgoPharm support team at support@algopharm.com or refer to the detailed API documentation at http://api.algopharm.com/docs.
