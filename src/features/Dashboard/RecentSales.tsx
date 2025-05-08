
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentSales = [
  {
    id: 1,
    customer: "Jane Doe",
    email: "jane.doe@example.com",
    amount: "$129.99",
    initials: "JD",
    time: "3 mins ago"
  },
  {
    id: 2,
    customer: "Michael Johnson",
    email: "michael.j@example.com",
    amount: "$78.50",
    initials: "MJ",
    time: "12 mins ago"
  },
  {
    id: 3,
    customer: "Sarah Williams",
    email: "s.williams@example.com",
    amount: "$234.75",
    initials: "SW",
    time: "43 mins ago"
  },
  {
    id: 4,
    customer: "Robert Brown",
    email: "r.brown@example.com",
    amount: "$42.25",
    initials: "RB",
    time: "1 hour ago"
  },
  {
    id: 5,
    customer: "Emma Davis",
    email: "emma.d@example.com",
    amount: "$165.00",
    initials: "ED",
    time: "2 hours ago"
  }
];

export const RecentSales = () => {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
            <p className="text-xs text-muted-foreground">{sale.time}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
};
