
import React from "react";
import { useRealtimeSales } from "@/hooks/useRealtimeSales";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Receipt } from "lucide-react";
import { format } from "date-fns";

export const RecentSales = () => {
  const { sales, loading, error } = useRealtimeSales();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Recent Sales
          </CardTitle>
          <CardDescription>Live sales data from Supabase</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Recent Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Recent Sales
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-auto">
            Live
          </span>
        </CardTitle>
        <CardDescription>Real-time sales data from Supabase</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sales.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No sales recorded yet</p>
        ) : (
          sales.slice(0, 5).map((sale) => (
            <div key={sale.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium">{sale.product_name}</p>
                <p className="text-sm text-muted-foreground">
                  Qty: {sale.quantity} • {sale.timestamp ? format(new Date(sale.timestamp), "MMM dd, HH:mm") : "N/A"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${sale.amount.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
