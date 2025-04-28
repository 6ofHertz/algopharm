
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

## Comprehensive Backend Setup Guide for 50,000+ Item Pharmaceutical System

### 1. Database Setup (PostgreSQL)

#### Installation
```bash
# Linux/macOS:
sudo apt-get install postgresql postgresql-contrib  # Debian/Ubuntu
brew install postgresql                            # macOS
# Windows: Download from PostgreSQL Official Site.
```

#### Configuration
```bash
sudo -u postgres psql  # Access PostgreSQL shell
CREATE DATABASE algopharm;
CREATE USER pharmadmin WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE algopharm TO pharmadmin;
```

#### Optimized Schema Design for 50,000+ Items
```sql
-- Drugs Table (Core)
CREATE TABLE drugs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    barcode VARCHAR(50) UNIQUE,       -- For quick scans
    generic_name VARCHAR(100),
    dosage_form VARCHAR(50),
    stock_quantity INT DEFAULT 0,
    min_stock_threshold INT,          -- Alerts when low
    expiry_date DATE,
    batch_number VARCHAR(50),
    image_url TEXT,                   -- Store drug image paths
    location_id INT,                  -- For multi-location support
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Locations Table (Multi-location support)
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    manager_id INT,                   -- References users.id
    created_at TIMESTAMP DEFAULT NOW()
);

-- Users Table (Staff/Access Control)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,   -- Store hashed passwords
    full_name VARCHAR(100),
    role VARCHAR(20) NOT NULL,        -- 'cashier', 'pharmacist', 'admin'
    location_id INT,                  -- Primary location
    active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Suppliers
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Inventory Transactions (Audit Trail)
CREATE TABLE inventory_logs (
    id SERIAL PRIMARY KEY,
    drug_id INT REFERENCES drugs(id),
    action_type VARCHAR(20),          -- "ADD", "REMOVE", "ADJUST"
    quantity INT,
    before_quantity INT,
    after_quantity INT,
    user_id INT REFERENCES users(id), -- Who performed the action?
    location_id INT REFERENCES locations(id),
    notes TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Sales Transactions
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE,
    cashier_id INT REFERENCES users(id),
    customer_name VARCHAR(100),
    customer_phone VARCHAR(20),
    subtotal DECIMAL(10, 2),
    tax DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    total DECIMAL(10, 2),
    payment_method VARCHAR(20),
    location_id INT REFERENCES locations(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sales Items (Individual items in a sale)
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id) ON DELETE CASCADE,
    drug_id INT REFERENCES drugs(id),
    quantity INT,
    unit_price DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    prescription_required BOOLEAN DEFAULT FALSE
);

-- Drug Interactions (AI-Powered)
CREATE TABLE drug_interactions (
    id SERIAL PRIMARY KEY,
    drug1_id INT REFERENCES drugs(id),
    drug2_id INT REFERENCES drugs(id),
    risk_level VARCHAR(20),          -- "High", "Medium", "Low"
    description TEXT,
    UNIQUE(drug1_id, drug2_id)
);

-- Audit Logs (General System Audit)
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action VARCHAR(50),
    entity_type VARCHAR(50),         -- What object type was affected
    entity_id INT,                   -- ID of the affected object
    details JSONB,                   -- Additional audit details
    ip_address VARCHAR(50),
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

#### Indexes for Performance with 50,000+ Items
```sql
-- Critical performance indexes
CREATE INDEX idx_drugs_barcode ON drugs(barcode);
CREATE INDEX idx_drugs_name ON drugs(name);
CREATE INDEX idx_drugs_generic_name ON drugs(generic_name);
CREATE INDEX idx_drugs_expiry ON drugs(expiry_date);
CREATE INDEX idx_drugs_category ON drugs(category);
CREATE INDEX idx_drugs_location_id ON drugs(location_id);

CREATE INDEX idx_inventory_logs_drug_id ON inventory_logs(drug_id);
CREATE INDEX idx_inventory_logs_timestamp ON inventory_logs(timestamp);
CREATE INDEX idx_inventory_logs_location_id ON inventory_logs(location_id);

CREATE INDEX idx_sales_transaction_id ON sales(transaction_id); 
CREATE INDEX idx_sales_cashier_id ON sales(cashier_id);
CREATE INDEX idx_sales_created_at ON sales(created_at);
CREATE INDEX idx_sales_location_id ON sales(location_id);

CREATE INDEX idx_sale_items_sale_id ON sale_items(sale_id);
CREATE INDEX idx_sale_items_drug_id ON sale_items(drug_id);

-- Add partial indexes for common queries
CREATE INDEX idx_drugs_expiring_soon ON drugs(expiry_date) 
WHERE expiry_date < NOW() + INTERVAL '90 days';

CREATE INDEX idx_drugs_low_stock ON drugs(id) 
WHERE stock_quantity < min_stock_threshold;
```

### 2. Backend API (FastAPI Implementation)

#### Basic Setup
```bash
# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-multipart python-jose[cryptography] passlib[bcrypt] pillow
```

#### Project Structure
```
algopharm-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database connection
│   ├── config.py            # Configuration
│   ├── middleware/          # Middleware components
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── crud/                # Database operations
│   ├── api/                 # API routes
│   │   ├── __init__.py
│   │   ├── auth.py         # Authentication
│   │   ├── drugs.py        # Drug endpoints
│   │   ├── inventory.py    # Inventory management
│   │   ├── sales.py        # Sales operations
│   │   ├── reports.py      # Reporting endpoints
│   │   └── users.py        # User management
│   ├── services/            # Business logic
│   │   ├── ai_service.py   # AI integrations
│   │   ├── barcode.py      # Barcode processing
│   │   └── ocr.py          # OCR for drug images
│   └── utils/               # Utility functions
├── tests/                   # Test suite
├── alembic/                 # Database migrations
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

#### Database Configuration (`database.py`)
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

DATABASE_URL = settings.DATABASE_URL

engine = create_engine(
    DATABASE_URL, pool_size=20, max_overflow=0
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

#### Authentication System with JWT (`api/auth.py`)
```python
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app import schemas, models, crud
from app.database import get_db
from app.config import settings

# Security setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db: Session, username: str, password: str):
    user = crud.get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    # Update last login time
    user.last_login = datetime.utcnow()
    db.commit()
    return user

async def get_current_active_user(current_user = Depends(get_current_user)):
    if not current_user.active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Role-based access control
def require_role(roles: list):
    async def role_checker(current_user = Depends(get_current_active_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker
```

#### Drug Management API (`api/drugs.py`)
```python
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from datetime import date

from app import crud, models, schemas
from app.database import get_db
from app.api.auth import get_current_active_user, require_role
from app.services import ocr, barcode

router = APIRouter(
    prefix="/drugs",
    tags=["drugs"],
    dependencies=[Depends(get_current_active_user)]
)

@router.post("/", response_model=schemas.Drug)
async def create_drug(
    drug: schemas.DrugCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(["admin", "pharmacist"]))
):
    # Check if drug with same barcode exists
    db_drug = crud.get_drug_by_barcode(db, barcode=drug.barcode)
    if db_drug:
        raise HTTPException(status_code=400, detail="Drug with this barcode already exists")
    return crud.create_drug(db=db, drug=drug, user_id=current_user.id)

@router.get("/", response_model=schemas.PaginatedDrugs)
async def read_drugs(
    skip: int = 0, 
    limit: int = 100,
    search: Optional[str] = None,
    category: Optional[str] = None,
    expiring_soon: bool = False,
    low_stock: bool = False,
    location_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """
    Get drugs with pagination and filtering.
    Optimized for large inventory (50,000+ items).
    """
    # Build query with filters
    query_filters = {}
    
    if search:
        query_filters["search"] = search
    if category:
        query_filters["category"] = category
    if expiring_soon:
        query_filters["expiring_soon"] = True
    if low_stock:
        query_filters["low_stock"] = True
    if location_id:
        query_filters["location_id"] = location_id
    
    # Get total count for pagination
    total = crud.count_drugs(db, filters=query_filters)
    
    # Get drugs with filters and pagination
    drugs = crud.get_drugs(
        db, 
        skip=skip, 
        limit=limit,
        filters=query_filters
    )
    
    return {
        "items": drugs,
        "total": total,
        "page": skip // limit + 1,
        "pages": (total + limit - 1) // limit
    }

@router.get("/{drug_id}", response_model=schemas.Drug)
async def read_drug(
    drug_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    db_drug = crud.get_drug(db, drug_id=drug_id)
    if db_drug is None:
        raise HTTPException(status_code=404, detail="Drug not found")
    return db_drug

@router.post("/barcode-scan")
async def scan_barcode(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Process barcode image and return drug info"""
    # Save temp file
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    # Scan barcode
    try:
        barcode_value = barcode.scan_barcode(file_path)
        # Clean up
        os.remove(file_path)
        
        # Lookup drug by barcode
        drug = crud.get_drug_by_barcode(db, barcode_value)
        if not drug:
            return {"status": "not_found", "barcode": barcode_value}
            
        return {"status": "success", "drug": drug}
    except Exception as e:
        # Clean up on error
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=422, detail=f"Failed to process barcode: {str(e)}")

@router.post("/ocr-scan")
async def scan_drug_packaging(
    file: UploadFile = File(...),
    current_user: models.User = Depends(require_role(["admin", "pharmacist"]))
):
    """Extract drug info from packaging via OCR"""
    # Save temp file
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
        
    # Process with OCR
    try:
        drug_info = ocr.extract_drug_info(file_path)
        # Clean up
        os.remove(file_path)
        return drug_info
    except Exception as e:
        # Clean up on error
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=422, detail=f"Failed to process image: {str(e)}")
```

#### Inventory Management (`api/inventory.py`) - Optimized for High Volume
```python
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app import crud, models, schemas
from app.database import get_db
from app.api.auth import get_current_active_user, require_role

router = APIRouter(
    prefix="/inventory",
    tags=["inventory"],
    dependencies=[Depends(get_current_active_user)]
)

@router.post("/transaction", response_model=schemas.InventoryLog)
async def create_inventory_transaction(
    transaction: schemas.InventoryTransaction,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(["admin", "pharmacist"]))
):
    """
    Create inventory transaction: add, remove, or adjust stock.
    Designed to handle high transaction volume.
    """
    # Get current stock
    drug = crud.get_drug(db, drug_id=transaction.drug_id)
    if not drug:
        raise HTTPException(status_code=404, detail="Drug not found")
    
    before_quantity = drug.stock_quantity
    after_quantity = before_quantity
    
    # Update quantity based on action type
    if transaction.action_type == "ADD":
        after_quantity = before_quantity + transaction.quantity
    elif transaction.action_type == "REMOVE":
        if before_quantity < transaction.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        after_quantity = before_quantity - transaction.quantity
    elif transaction.action_type == "ADJUST":
        after_quantity = transaction.quantity
    else:
        raise HTTPException(status_code=400, detail="Invalid action type")
    
    # Create log entry
    log = crud.create_inventory_log(
        db=db,
        drug_id=transaction.drug_id,
        action_type=transaction.action_type,
        quantity=transaction.quantity,
        before_quantity=before_quantity,
        after_quantity=after_quantity,
        user_id=current_user.id,
        location_id=transaction.location_id,
        notes=transaction.notes
    )
    
    # Update drug stock quantity
    crud.update_drug_stock(db, drug.id, after_quantity)
    
    # Add background task for low stock notifications
    if after_quantity <= drug.min_stock_threshold:
        background_tasks.add_task(
            crud.create_low_stock_notification, 
            db=db, 
            drug_id=drug.id, 
            current_stock=after_quantity
        )
    
    return log

@router.get("/logs", response_model=schemas.PaginatedInventoryLogs)
async def get_inventory_logs(
    skip: int = 0,
    limit: int = 100,
    drug_id: Optional[int] = None,
    location_id: Optional[int] = None,
    action_type: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(["admin", "pharmacist"]))
):
    """
    Get paginated inventory logs with filters.
    Optimized for querying large datasets.
    """
    filters = {
        "drug_id": drug_id,
        "location_id": location_id,
        "action_type": action_type,
        "start_date": start_date,
        "end_date": end_date
    }
    
    # Remove None values
    filters = {k: v for k, v in filters.items() if v is not None}
    
    # Get count for pagination
    total = crud.count_inventory_logs(db, filters=filters)
    
    # Get logs with pagination
    logs = crud.get_inventory_logs(db, skip=skip, limit=limit, filters=filters)
    
    return {
        "items": logs,
        "total": total,
        "page": skip // limit + 1,
        "pages": (total + limit - 1) // limit
    }

@router.get("/expiring", response_model=List[schemas.ExpiringDrug])
async def get_expiring_drugs(
    days: int = 90,
    location_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Get drugs expiring within specified days"""
    return crud.get_expiring_drugs(db, days=days, location_id=location_id)

@router.get("/low-stock", response_model=List[schemas.LowStockDrug])
async def get_low_stock_drugs(
    location_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Get drugs below minimum stock threshold"""
    return crud.get_low_stock_drugs(db, location_id=location_id)
```

#### Sales API for POS Operations (`api/sales.py`)
```python
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, status
from sqlalchemy.orm import Session
from typing import List, Optional
from sqlalchemy import text

from app import crud, models, schemas
from app.database import get_db, engine
from app.api.auth import get_current_active_user, require_role
from app.services.ai_service import check_drug_interactions

router = APIRouter(
    prefix="/sales",
    tags=["sales"],
    dependencies=[Depends(get_current_active_user)]
)

@router.post("/", response_model=schemas.SaleResponse)
async def create_sale(
    sale: schemas.SaleCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """
    Process a complete sale transaction.
    Handles inventory updates and calculates totals.
    """
    # Check drug interactions
    drug_ids = [item.drug_id for item in sale.items]
    if len(drug_ids) > 1:
        interactions = check_drug_interactions(db, drug_ids)
        if interactions:
            # Return interactions but still allow the sale
            return {
                "status": "warning",
                "message": "Potential drug interactions detected",
                "interactions": interactions
            }
    
    # Begin transaction (using context manager)
    conn = engine.connect()
    trans = conn.begin()
    try:
        # Create sale
        db_sale = crud.create_sale(
            db=db,
            sale=sale,
            cashier_id=current_user.id
        )
        
        # Process each item and update inventory
        for item in sale.items:
            # Check if enough stock
            drug = crud.get_drug(db, item.drug_id)
            if drug.stock_quantity < item.quantity:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Insufficient stock for {drug.name}. Available: {drug.stock_quantity}"
                )
            
            # Add sale item
            crud.add_sale_item(
                db=db,
                sale_id=db_sale.id,
                drug_id=item.drug_id,
                quantity=item.quantity,
                unit_price=item.unit_price
            )
            
            # Update inventory (optimized bulk update)
            new_quantity = drug.stock_quantity - item.quantity
            conn.execute(
                text("UPDATE drugs SET stock_quantity = :new_qty WHERE id = :drug_id"),
                {"new_qty": new_quantity, "drug_id": item.drug_id}
            )
            
            # Log inventory change in background
            background_tasks.add_task(
                crud.create_inventory_log,
                db=db,
                drug_id=item.drug_id,
                action_type="REMOVE",
                quantity=item.quantity,
                before_quantity=drug.stock_quantity,
                after_quantity=new_quantity,
                user_id=current_user.id,
                location_id=db_sale.location_id,
                notes=f"Sale #{db_sale.transaction_id}"
            )
        
        # Commit transaction
        trans.commit()
        
        return {
            "status": "success",
            "message": "Sale completed successfully",
            "sale": db_sale
        }
    except Exception as e:
        trans.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@router.get("/", response_model=schemas.PaginatedSales)
async def get_sales(
    skip: int = 0,
    limit: int = 100,
    cashier_id: Optional[int] = None,
    location_id: Optional[int] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    min_total: Optional[float] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """
    Get sales with pagination and filtering.
    Access control based on user role.
    """
    # Role-based access restrictions
    if current_user.role == "cashier" and (cashier_id is None or cashier_id != current_user.id):
        # Cashiers can only see their own sales
        cashier_id = current_user.id
    
    filters = {
        "cashier_id": cashier_id,
        "location_id": location_id,
        "start_date": start_date,
        "end_date": end_date,
        "min_total": min_total
    }
    
    # Remove None values
    filters = {k: v for k, v in filters.items() if v is not None}
    
    # Get count for pagination
    total = crud.count_sales(db, filters=filters)
    
    # Get sales with pagination
    sales = crud.get_sales(db, skip=skip, limit=limit, filters=filters)
    
    return {
        "items": sales,
        "total": total,
        "page": skip // limit + 1,
        "pages": (total + limit - 1) // limit
    }

@router.get("/{sale_id}", response_model=schemas.SaleDetail)
async def get_sale(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Get detailed information about a specific sale"""
    sale = crud.get_sale(db, sale_id=sale_id)
    
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    
    # Access control: cashiers can only view their own sales
    if current_user.role == "cashier" and sale.cashier_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this sale")
        
    return sale
```

### 3. AI Integration Code Examples

#### Drug Interaction Detection (`services/ai_service.py`)
```python
from typing import List, Dict, Any
import os
from sqlalchemy.orm import Session
from app import crud, models

# For demo, we'll use a rule-based approach
# In production, use pretrained ML models from huggingface transformers

def check_drug_interactions(db: Session, drug_ids: List[int]) -> List[Dict[str, Any]]:
    """Check for potential interactions between drugs"""
    if len(drug_ids) < 2:
        return []
    
    interactions = []
    
    # Get all drug details
    drugs = [crud.get_drug(db, drug_id) for drug_id in drug_ids]
    
    # Check for interactions in our database
    for i, drug1 in enumerate(drugs):
        for j, drug2 in enumerate(drugs):
            if i >= j:  # Skip self-comparisons and duplicates
                continue
                
            # Check our interaction database
            db_interaction = crud.get_drug_interaction(
                db, drug1_id=drug1.id, drug2_id=drug2.id
            )
            
            if db_interaction:
                interactions.append({
                    "drug1": drug1.name,
                    "drug2": drug2.name,
                    "risk_level": db_interaction.risk_level,
                    "description": db_interaction.description
                })
    
    return interactions

# Setup for a more sophisticated ML-based approach
# (For demonstration - actual implementation would use a real model)
def setup_interaction_model():
    """Initialize the drug interaction prediction model"""
    try:
        from transformers import AutoTokenizer, AutoModelForSequenceClassification
        import torch
        
        # In production, use a real fine-tuned model for drug interactions
        tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
        model = AutoModelForSequenceClassification.from_pretrained(
            "distilbert-base-uncased", num_labels=3
        )
        
        return {"tokenizer": tokenizer, "model": model}
    except ImportError:
        print("Transformers library not installed. Using rule-based interactions only.")
        return None

# Global model instance (initialize only once)
interaction_model = setup_interaction_model()

def predict_interaction(drug1_name: str, drug2_name: str) -> Dict[str, Any]:
    """Predict interaction between two drugs using ML model"""
    if not interaction_model:
        return {"risk_level": "unknown", "confidence": 0.0}
    
    try:
        import torch
        
        # Create input text
        text = f"Interaction between {drug1_name} and {drug2_name}"
        
        # Tokenize
        inputs = interaction_model["tokenizer"](
            text, return_tensors="pt", truncation=True, padding=True
        )
        
        # Predict
        with torch.no_grad():
            outputs = interaction_model["model"](**inputs)
            predictions = outputs.logits.softmax(dim=1)
        
        # Map prediction to risk level
        risk_levels = ["low", "medium", "high"]
        predicted_class = torch.argmax(predictions, dim=1).item()
        confidence = predictions[0][predicted_class].item()
        
        return {
            "risk_level": risk_levels[predicted_class],
            "confidence": round(confidence, 4)
        }
    except Exception as e:
        print(f"Error in interaction prediction: {str(e)}")
        return {"risk_level": "unknown", "confidence": 0.0}
```

#### OCR for Drug Label Recognition (`services/ocr.py`)
```python
import cv2
import pytesseract
import re
from PIL import Image
from typing import Dict, Any

# Configure Tesseract path if needed
# pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

def preprocess_image(image_path: str):
    """Image preprocessing for better OCR results"""
    # Read image
    img = cv2.imread(image_path)
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold to get black and white image
    _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    
    # Apply image filters to enhance text
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
    processed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
    
    return processed

def extract_drug_info(image_path: str) -> Dict[str, Any]:
    """Extract drug information from packaging image"""
    # Preprocess image
    processed_img = preprocess_image(image_path)
    
    # Perform OCR
    text = pytesseract.image_to_string(processed_img)
    lines = text.split('\n')
    lines = [line.strip() for line in lines if line.strip()]
    
    # Extract information using regex patterns
    drug_info = {}
    
    # Extract drug name (usually first line or line with largest font)
    drug_info['name'] = lines[0] if lines else ""
    
    # Extract dosage (pattern like 500mg, 10mg/ml)
    dosage_pattern = r'(\d+\s*(?:mg|mcg|g|ml|mg/ml))'
    dosage_matches = re.findall(dosage_pattern, text, re.IGNORECASE)
    if dosage_matches:
        drug_info['dosage'] = dosage_matches[0]
    
    # Extract expiry date (format like Exp: MM/YYYY or Expiry: DD/MM/YYYY)
    exp_pattern = r'(?:exp|expiry|expiration)(?:\s*date|\s*):?\s*(\d{1,2}/\d{1,2}/\d{4}|\d{1,2}/\d{4}|\d{2}-\d{2}-\d{2,4})'
    exp_matches = re.findall(exp_pattern, text, re.IGNORECASE)
    if exp_matches:
        drug_info['expiry_date'] = exp_matches[0]
    
    # Extract batch number
    batch_pattern = r'(?:batch|lot)(?:\s*no|\s*number|\s*):?\s*([A-Za-z0-9-]+)'
    batch_matches = re.findall(batch_pattern, text, re.IGNORECASE)
    if batch_matches:
        drug_info['batch_number'] = batch_matches[0]
    
    # Extract barcode if visible (assuming EAN-13)
    barcode_pattern = r'(?:barcode|ean|gtin):?\s*(\d{8,14})'
    barcode_matches = re.findall(barcode_pattern, text, re.IGNORECASE)
    if barcode_matches:
        drug_info['barcode'] = barcode_matches[0]
    
    return {
        "extracted_text": text,
        "structured_info": drug_info
    }
```

#### Barcode Scanning Service (`services/barcode.py`)
```python
from pyzbar.pyzbar import decode
from PIL import Image
import cv2
import numpy as np

def scan_barcode(image_path: str) -> str:
    """Scan barcode from image and return decoded value"""
    # Read the image
    img = cv2.imread(image_path)
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply some image processing to improve barcode detection
    # Increase contrast
    enhanced = cv2.convertScaleAbs(gray, alpha=1.5, beta=0)
    
    # Apply adaptive threshold
    binary = cv2.adaptiveThreshold(
        enhanced, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY, 11, 2
    )
    
    # Try to decode with pyzbar
    barcodes = decode(binary)
    
    # If no barcodes found, try with original image
    if not barcodes:
        barcodes = decode(Image.open(image_path))
    
    # Check if any barcode was detected
    if not barcodes:
        raise ValueError("No barcode found in the image")
    
    # Return the first barcode value
    return barcodes[0].data.decode('utf-8')
```

### 4. Deployment Configuration

#### Docker Compose Setup
```yaml
# docker-compose.yml
version: '3'

services:
  # Database
  postgres:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=pharmadmin
      - POSTGRES_PASSWORD=securepassword
      - POSTGRES_DB=algopharm
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pharmadmin"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis for caching
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    restart: unless-stopped
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  # Backend API
  api:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://pharmadmin:securepassword@postgres/algopharm
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY}
      - ALGORITHM=HS256
      - ACCESS_TOKEN_EXPIRE_MINUTES=60
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  # Frontend
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - api
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

#### FastAPI Main Application (`main.py`)
```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session

from app import models
from app.database import engine, get_db
from app.api import auth, drugs, inventory, sales, reports, users
from app.config import settings

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up PillPulse API...")
    
    # Possible startup tasks:
    # - Initialize ML models
    # - Prepare caches
    
    yield
    
    # Shutdown
    print("Shutting down PillPulse API...")

# Initialize FastAPI app
app = FastAPI(
    title="PillPulse API",
    description="API for PillPulse Pharmacy Management System",
    version="1.0.0",
    lifespan=lifespan
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(drugs.router, prefix="/api")
app.include_router(inventory.router, prefix="/api")
app.include_router(sales.router, prefix="/api")
app.include_router(reports.router, prefix="/api")
app.include_router(users.router, prefix="/api")

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
```

### 5. Performance Optimization for 50,000+ Items

#### Database Performance Tuning
```sql
-- PostgreSQL configuration recommendations
-- (Add to postgresql.conf)

# Memory settings
shared_buffers = 2GB               # 25% of available RAM
effective_cache_size = 6GB         # 75% of available RAM
work_mem = 64MB                    # For complex queries
maintenance_work_mem = 256MB       # For maintenance operations

# Query planner settings
random_page_cost = 1.1             # For SSD storage
effective_io_concurrency = 200     # For SSD storage

# Write-ahead log settings
wal_buffers = 16MB                 # 1/32 of shared_buffers
synchronous_commit = off           # Only for non-critical deployments

# Background writer settings
bgwriter_delay = 200ms             # Background writer sleep time
bgwriter_lru_maxpages = 100        # Max pages per round
bgwriter_lru_multiplier = 2.0      # Multiple of average requirement
```

#### API Query Optimization
```python
# Example of optimized query for large inventory
def get_drugs_optimized(db, skip=0, limit=100, filters=None):
    """
    Optimized query for retrieving drugs from large inventory.
    Uses pagination, selective column fetching, and query optimization.
    """
    from sqlalchemy import select, func
    from sqlalchemy.orm import selectinload
    
    if filters is None:
        filters = {}
    
    # Start with the base query 
    query = select(models.Drug)
    
    # Apply filters
    if "search" in filters:
        search = f"%{filters['search']}%"
        query = query.where(
            (models.Drug.name.ilike(search)) | 
            (models.Drug.generic_name.ilike(search)) |
            (models.Drug.barcode == filters['search'])
        )
    
    if "category" in filters:
        query = query.where(models.Drug.category == filters["category"])
    
    if "expiring_soon" in filters:
        query = query.where(
            models.Drug.expiry_date <= func.current_date() + 30
        )
    
    if "low_stock" in filters:
        query = query.where(
            models.Drug.stock_quantity <= models.Drug.min_stock_threshold
        )
    
    if "location_id" in filters:
        query = query.where(models.Drug.location_id == filters["location_id"])
    
    # Add sorting and pagination
    query = query.order_by(models.Drug.name)
    query = query.offset(skip).limit(limit)
    
    # Execute query
    result = db.execute(query)
    return result.scalars().all()
```

#### Caching Strategy with Redis
```python
import redis
import json
from functools import wraps
from fastapi import Depends
from app.database import get_db
from app.config import settings

# Redis connection
redis_client = redis.Redis.from_url(settings.REDIS_URL)

def cache_response(key_prefix, expire=300):
    """Cache decorator for API responses"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate cache key
            cache_key = f"{key_prefix}:{json.dumps(kwargs, sort_keys=True)}"
            
            # Try to get from cache
            cached_data = redis_client.get(cache_key)
            if cached_data:
                return json.loads(cached_data)
            
            # Execute function if not cached
            response = await func(*args, **kwargs)
            
            # Cache the response
            redis_client.setex(
                cache_key,
                expire,
                json.dumps(response)
            )
            
            return response
        return wrapper
    return decorator

# Usage example
@router.get("/popular")
@cache_response("popular_drugs", expire=3600)
async def get_popular_drugs(db: Session = Depends(get_db)):
    """Get most popular drugs (cached for 1 hour)"""
    # Expensive query that shouldn't run frequently
    return crud.get_popular_drugs(db, limit=20)
```

#### Connection Pooling for Concurrent Users
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool

# Optimized engine for high concurrency
engine = create_engine(
    settings.DATABASE_URL,
    poolclass=QueuePool,
    pool_size=20,              # Max connections in pool
    max_overflow=30,           # Max overflow connections
    pool_timeout=30,           # Seconds to wait for connection
    pool_recycle=1800,         # Recycle connections every 30 min
    pool_pre_ping=True         # Check connection validity
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

### 6. Scaling Strategy

#### Horizontal Scaling with Kubernetes
```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pillpulse-api
spec:
  replicas: 3  # Scale horizontally with multiple pods
  selector:
    matchLabels:
      app: pillpulse-api
  template:
    metadata:
      labels:
        app: pillpulse-api
    spec:
      containers:
      - name: api
        image: pillpulse/api:latest
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: pillpulse-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: pillpulse-secrets
              key: redis-url
        livenessProbe:
          httpGet:
            path: /api/health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 15
        readinessProbe:
          httpGet:
            path: /api/health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 10

---

# kubernetes/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: pillpulse-api
spec:
  selector:
    app: pillpulse-api
  ports:
  - port: 80
    targetPort: 8000
  type: ClusterIP

---

# kubernetes/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pillpulse-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.pillpulse.com
    secretName: pillpulse-tls
  rules:
  - host: api.pillpulse.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: pillpulse-api
            port:
              number: 80

---

# kubernetes/hpa.yaml (Horizontal Pod Autoscaler)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: pillpulse-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: pillpulse-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### 7. Data Protection & Compliance

#### Audit Logging Service
```python
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from app.database import SessionLocal
import json
import time

class AuditMiddleware(BaseHTTPMiddleware):
    """Middleware to log all API actions for compliance"""
    
    async def dispatch(self, request: Request, call_next):
        # Start timer
        start_time = time.time()
        
        # Get request details
        path = request.url.path
        method = request.method
        
        # Skip audit for non-sensitive paths
        if path in ["/api/health", "/docs", "/openapi.json"]:
            return await call_next(request)
            
        # Get user from request state if available
        user_id = None
        try:
            if hasattr(request.state, "user"):
                user_id = request.state.user.id
        except:
            pass
            
        # Process the request
        response = await call_next(request)
        
        # Audit log for sensitive operations
        if path.startswith("/api/") and method in ["POST", "PUT", "DELETE", "PATCH"]:
            # Get request body for sensitive operations
            request_body = {}
            if method != "GET":
                try:
                    # Clone the request body stream
                    body = await request.body()
                    request_body = json.loads(body)
                    
                    # Mask sensitive data
                    if "password" in request_body:
                        request_body["password"] = "********"
                except:
                    request_body = {"error": "Could not parse request body"}
            
            # Log the audit entry
            db = SessionLocal()
            try:
                from app import models
                
                # Create audit log
                audit_log = models.AuditLog(
                    user_id=user_id,
                    action=f"{method} {path}",
                    entity_type=path.split("/")[-2] if len(path.split("/")) > 2 else "unknown",
                    entity_id=path.split("/")[-1] if path.split("/")[-1].isdigit() else None,
                    details={
                        "request": request_body,
                        "status_code": response.status_code,
                        "duration_ms": round((time.time() - start_time) * 1000, 2),
                        "ip_address": request.client.host if request.client else None,
                        "user_agent": request.headers.get("user-agent")
                    },
                    ip_address=request.client.host if request.client else None
                )
                db.add(audit_log)
                db.commit()
            except Exception as e:
                print(f"Audit logging error: {str(e)}")
            finally:
                db.close()
                
        return response
```

---

This comprehensive guide provides everything needed to set up and optimize a backend system capable of handling 50,000+ inventory items for the PillPulse Pharmacy management system. The implementation includes database design, API endpoints, AI integration, and deployment strategies optimized for performance and scalability.

© 2025 PillPulse. All Rights Reserved.

