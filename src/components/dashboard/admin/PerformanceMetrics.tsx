
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, UserCheck, Clock, CreditCard } from "lucide-react";

export const PerformanceMetrics = () => {
  // Mock data for staff performance
  const staffData = [
    { 
      name: "John Doe", 
      role: "Cashier", 
      metrics: {
        salesPerHour: 14,
        avgTransactionTime: "3:25",
        customerSatisfaction: 4.8,
        accuracy: 99.2
      }
    },
    { 
      name: "Dr. Sarah Johnson", 
      role: "Pharmacist", 
      metrics: {
        prescriptionsPerDay: 45,
        avgConsultationTime: "8:15",
        customerSatisfaction: 4.9,
        accuracy: 99.9
      }
    },
    { 
      name: "Emily Rodriguez", 
      role: "Pharmacist", 
      metrics: {
        prescriptionsPerDay: 42,
        avgConsultationTime: "7:45",
        customerSatisfaction: 4.7,
        accuracy: 99.8
      }
    },
    { 
      name: "Michael Lee", 
      role: "Inventory Manager", 
      metrics: {
        stockAccuracy: 98.5,
        orderFulfillment: 99.1,
        stockturnover: 4.2,
        warehouseEfficiency: 96.3
      }
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Staff Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cashier Metrics */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-blue-500" />
                  <h4 className="font-semibold">{staffData[0].name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{staffData[0].role}</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">Top Performer</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <CreditCard className="h-3 w-3 mr-1 text-muted-foreground" />
                  Sales Per Hour
                </span>
                <span className="font-medium">{staffData[0].metrics.salesPerHour}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                  Avg Transaction Time
                </span>
                <span className="font-medium">{staffData[0].metrics.avgTransactionTime}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Satisfaction Rating</span>
                <span className="font-medium">{staffData[0].metrics.customerSatisfaction}/5</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Transaction Accuracy</span>
                <span className="font-medium">{staffData[0].metrics.accuracy}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pharmacist Metrics */}
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-purple-500" />
                  <h4 className="font-semibold">{staffData[1].name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{staffData[1].role}</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">Senior</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Prescriptions Per Day</span>
                <span className="font-medium">{staffData[1].metrics.prescriptionsPerDay}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                  Avg Consultation Time
                </span>
                <span className="font-medium">{staffData[1].metrics.avgConsultationTime}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Patient Satisfaction</span>
                <span className="font-medium">{staffData[1].metrics.customerSatisfaction}/5</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Prescription Accuracy</span>
                <span className="font-medium">{staffData[1].metrics.accuracy}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="pt-4">
        <h4 className="font-medium mb-3">Comparative Performance</h4>
        <div className="bg-muted p-4 rounded-md">
          <div className="flex items-center mb-2">
            <BarChart className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">May 2025 Performance Trends</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>John Doe</span>
                <span>Sales: $32,450</span>
              </div>
              <div className="h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Dr. Sarah Johnson</span>
                <span>Prescriptions: 920</span>
              </div>
              <div className="h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Emily Rodriguez</span>
                <span>Prescriptions: 845</span>
              </div>
              <div className="h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Michael Lee</span>
                <span>Inventory: 98.5% accuracy</span>
              </div>
              <div className="h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
