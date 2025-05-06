// controllers/dataController.js

exports.getSalesData = (req, res) => {
  // TODO: Implement logic to fetch sales data from the database
  // Use req.query to access query parameters (e.g., date range, user)
  console.log('Fetching sales data...');

  const mockSalesData = [
    { id: 1, product: 'Product A', quantity: 10, price: 25.00, date: '2023-10-26', cashier: 'Cashier 1' },
    { id: 2, product: 'Product B', quantity: 5, price: 15.00, date: '2023-10-26', cashier: 'Cashier 2' },
    { id: 3, product: 'Product A', quantity: 7, price: 25.00, date: '2023-10-25', cashier: 'Cashier 1' },
  ];

  res.json(mockSalesData);
};

exports.getInventoryData = (req, res) => {
  // TODO: Implement logic to fetch inventory data from the database
  // Use req.query to access query parameters (e.g., product name, stock level)
  console.log('Fetching inventory data...');

  const mockInventoryData = [
    { id: 101, product: 'Product A', stock: 50, expiryDate: '2024-12-31' },
    { id: 102, product: 'Product B', stock: 30, expiryDate: '2025-06-15' },
    { id: 103, product: 'Product C', stock: 0, expiryDate: '2024-01-20' },
  ];

  res.json(mockInventoryData);
};

exports.getShiftData = (req, res) => {
  // TODO: Implement logic to fetch shift data from the database
  // Use req.query to access query parameters (e.g., user, date)
  console.log('Fetching shift data...');

  const mockShiftData = [
    { id: 201, user: 'Cashier 1', role: 'Cashier', startTime: '2023-10-26T08:00:00Z', endTime: '2023-10-26T16:00:00Z' },
    { id: 202, user: 'Pharmacist 1', role: 'Pharmacist', startTime: '2023-10-26T09:00:00Z', endTime: '2023-10-26T17:00:00Z' },
  ];

  res.json(mockShiftData);
};

exports.getUserPerformanceData = (req, res) => {
  // TODO: Implement logic to fetch user performance data from the database
  // This might involve aggregating sales and shift data per user
  console.log('Fetching user performance data...');

  const mockUserPerformanceData = [
    { id: 301, user: 'Cashier 1', role: 'Cashier', totalSales: 500.00, shiftsWorked: 10 },
    { id: 302, user: 'Cashier 2', role: 'Cashier', totalSales: 200.00, shiftsWorked: 8 },
    { id: 303, user: 'Pharmacist 1', role: 'Pharmacist', consultations: 25, shiftsWorked: 12 },
  ];

  res.json(mockUserPerformanceData);
};