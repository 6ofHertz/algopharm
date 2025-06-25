import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Receipt,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Wallet
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const PaymentProcessing = () => {
  const [payments, setPayments] = useState([
    { id: 1, date: '2024-03-15', customer: 'John Doe', amount: 150.00, status: 'Completed' },
    { id: 2, date: '2024-03-14', customer: 'Jane Smith', amount: 200.00, status: 'Pending' },
    { id: 3, date: '2024-03-13', customer: 'Alice Brown', amount: 75.00, status: 'Completed' },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <CardTitle>Payment Processing</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button><RefreshCw className="w-4 h-4 mr-2" /> Refresh</Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Input type="text" placeholder="Search payments..." className="w-1/3" />
        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.status === 'Completed' ? (
                    <Badge variant="secondary">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge>
                      <Clock className="w-4 h-4 mr-2" />
                      Pending
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { PaymentProcessing };
