
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const topItems = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    quantity: 453,
    amount: "$4,532.50",
    increase: 12,
  },
  {
    id: 2,
    name: "Lipitor 20mg",
    quantity: 367,
    amount: "$7,340.00",
    increase: 8,
  },
  {
    id: 3,
    name: "Metformin 1000mg",
    quantity: 312,
    amount: "$2,184.00",
    increase: 5,
  },
  {
    id: 4,
    name: "Advil 200mg",
    quantity: 245,
    amount: "$1,225.00",
    increase: -3,
  },
  {
    id: 5,
    name: "Vitamin D3 1000IU",
    quantity: 201,
    amount: "$1,005.00",
    increase: 15,
  },
];

export const TopSellingItems = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{item.name}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{item.quantity} units • {item.amount}</span>
                </div>
              </div>
              <div className={`flex items-center text-sm ${item.increase > 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {item.increase > 0 ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                )}
                {Math.abs(item.increase)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
