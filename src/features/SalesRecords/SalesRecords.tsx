
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, query, getDocs, orderBy, where, Timestamp, QuerySnapshot, limit, startAfter, DocumentSnapshot } from 'firebase/firestore';

interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  timestamp: Timestamp;
  cashierId: string;
  // Add other fields as needed (payment method, customer ID, etc.)
}

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const SalesRecords: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterGranularity, setFilterGranularity] = useState<'day' | 'month' | 'year'>('day');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [salesPerPage] = useState<number>(10); // Number of sales per page
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;
    if (dateString) {
      setSelectedDate(new Date(dateString));
    } else {
      setSelectedDate(null);
    }
  };

  const handleFilterGranularityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterGranularity(event.target.value as 'day' | 'month' | 'year');
  };

  useEffect(() => {
    setLoading(true); // Set loading to true at the beginning

    const fetchSales = async () => {
      try {
        let salesQuery = query(collection(db, 'sales'), orderBy('timestamp', 'desc'));

        if (selectedDate) {
          let startDate = new Date(selectedDate);
          let endDate = new Date(selectedDate);

          if (filterGranularity === 'day') {
            endDate.setHours(23, 59, 59, 999);
          } else if (filterGranularity === 'month') {
            startDate.setDate(1);
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 999);
          } else if (filterGranularity === 'year') {
            startDate.setMonth(0, 1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setMonth(11, 31);
            endDate.setHours(23, 59, 59, 999);
          }

          salesQuery = query(salesQuery, where('timestamp', '>=', startDate), where('timestamp', '<=', endDate));
        }

        // Add pagination
        salesQuery = query(salesQuery, limit(salesPerPage));
        if (currentPage > 1 && lastVisible) {
          salesQuery = query(salesQuery, startAfter(lastVisible));
        }

        const querySnapshot: QuerySnapshot = await getDocs(salesQuery);
        const salesData: Sale[] = [];
        querySnapshot.forEach((doc) => {
          salesData.push({ id: doc.id, ...doc.data() as Omit<Sale, 'id'> });
        });

        setSales(salesData);
        // Update lastVisible for pagination
        if (querySnapshot.docs.length > 0) {
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        } else {
          setLastVisible(null); // No more documents
        }
      } catch (error) {
        console.error('Error fetching sales records:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching (or on error)
      }
    };

    fetchSales(); // Fetch sales data whenever selectedDate or filterGranularity changes
  }, [selectedDate, filterGranularity, currentPage]); // Re-run effect when dependencies change

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    // Implementing going back requires storing previous lastVisible values, which is more complex.
    // For simplicity, we'll just decrement the page number for now.
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h1>Sales Records</h1>

      <div>
        <label htmlFor="saleDate">Select Date:</label>
        <input
          type="date" 
          id="saleDate" 
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
          onChange={handleDateChange}
        />
      </div>

      <div>
        <label htmlFor="filterGranularity">Filter By: </label>
        <select id="filterGranularity" value={filterGranularity} onChange={handleFilterGranularityChange}>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total</th>
            <th>Cashier ID</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>Loading...</td> {/* Span all columns for loading message */}
            </tr>
          ) : sales.length === 0 ? (
            <tr>
              <td colSpan={4}>No sales records found.</td> {/* Span all columns */}
            </tr>
          ) : (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>{formatDate(sale.timestamp.toDate())}</td>
                <td>${sale.total.toFixed(2)}</td>
                <td>{sale.cashierId}</td>
                <td>
                  <ul>
                    {sale.items.map((item, index) => (
                      <li key={index}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add pagination controls */}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1 || loading}>Previous</button>
        <button onClick={handleNextPage} disabled={!lastVisible || loading}>Next</button>
      </div>
    </div>
  );
};

export default SalesRecords;
