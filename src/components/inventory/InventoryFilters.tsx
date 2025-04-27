
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface InventoryFiltersProps {
  onExpiryChange: (filter: string | null) => void;
  onStockChange: (filter: string | null) => void;
  selectedExpiry: string | null;
  selectedStock: string | null;
}

export const InventoryFilters = ({ 
  onExpiryChange, 
  onStockChange,
  selectedExpiry,
  selectedStock
}: InventoryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="overflow-hidden">
        <div className="bg-muted px-4 py-2 font-medium text-sm">
          Expiry Date Filter
        </div>
        <CardContent className="p-4 grid grid-cols-3 gap-2">
          <Badge
            variant="outline"
            className={cn(
              "hover:bg-pill-100 cursor-pointer justify-center",
              selectedExpiry === "expiring-soon" && "bg-pill-100 border-pill-500"
            )}
            onClick={() => onExpiryChange(selectedExpiry === "expiring-soon" ? null : "expiring-soon")}
          >
            <span className="w-3 h-3 rounded-full bg-danger mr-1"></span>
            0-30 days
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "hover:bg-pill-100 cursor-pointer justify-center",
              selectedExpiry === "expiring-medium" && "bg-pill-100 border-pill-500"
            )}
            onClick={() => onExpiryChange(selectedExpiry === "expiring-medium" ? null : "expiring-medium")}
          >
            <span className="w-3 h-3 rounded-full bg-warning mr-1"></span>
            31-90 days
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "hover:bg-pill-100 cursor-pointer justify-center",
              selectedExpiry === "expiring-far" && "bg-pill-100 border-pill-500"
            )}
            onClick={() => onExpiryChange(selectedExpiry === "expiring-far" ? null : "expiring-far")}
          >
            <span className="w-3 h-3 rounded-full bg-success mr-1"></span>
            90+ days
          </Badge>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="bg-muted px-4 py-2 font-medium text-sm">
          Stock Level Filter
        </div>
        <CardContent className="p-4 grid grid-cols-3 gap-2">
          <Badge
            variant="outline"
            className={cn(
              "hover:bg-pill-100 cursor-pointer justify-center",
              selectedStock === "low-stock" && "bg-pill-100 border-pill-500"
            )}
            onClick={() => onStockChange(selectedStock === "low-stock" ? null : "low-stock")}
          >
            <span className="w-3 h-3 rounded-full bg-danger mr-1"></span>
            Low Stock
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "hover:bg-pill-100 cursor-pointer justify-center",
              selectedStock === "medium-stock" && "bg-pill-100 border-pill-500"
            )}
            onClick={() => onStockChange(selectedStock === "medium-stock" ? null : "medium-stock")}
          >
            <span className="w-3 h-3 rounded-full bg-warning mr-1"></span>
            Medium
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "hover:bg-pill-100 cursor-pointer justify-center",
              selectedStock === "high-stock" && "bg-pill-100 border-pill-500"
            )}
            onClick={() => onStockChange(selectedStock === "high-stock" ? null : "high-stock")}
          >
            <span className="w-3 h-3 rounded-full bg-success mr-1"></span>
            Well Stocked
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};
