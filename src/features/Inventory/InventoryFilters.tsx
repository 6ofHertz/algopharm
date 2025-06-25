
import React from 'react';
import { Card, CardContent } from '@/features/UI/card';
import { Badge } from '@/features/UI/badge';
import { cn } from '@/features/lib/utils';

// Interface for the properties of the InventoryFilters component
interface InventoryFiltersProps {
  onExpiryChange: (filter: string | null) => void;
  onStockChange: (filter: string | null) => void;
  selectedExpiry: string | null;
  selectedStock: string | null;
}

// InventoryFilters component for filtering inventory items by expiry date and stock level
export const InventoryFilters = ({
  onExpiryChange,
  onStockChange,
  selectedExpiry,
  selectedStock,
}: InventoryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
      {/* Card for filtering by expiry date */}
      <Card className="overflow-hidden shadow-md">
        <div className="bg-muted px-4 py-2 font-medium text-sm">Expiry Date Filter</div>
        <CardContent className="p-4 grid grid-cols-3 gap-2">
          {/* Badge for items expiring in 0-30 days */}
          <Badge
            variant="default"
            className={cn(
              'hover:bg-primary-100 cursor-pointer justify-center transition-colors duration-200 ease-in-out',
              selectedExpiry === 'expiring-soon' &&
                'bg-primary text-white border-primary-500 shadow-md hover:bg-primary-600',
              'border', // Ensure there's a border for all states
            )}
            onClick={() =>
              onExpiryChange(selectedExpiry === 'expiring-soon' ? null : 'expiring-soon')
            }
          >
            <span className="w-3 h-3 rounded-full bg-danger mr-1"></span>
            0-30 days
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              'hover:bg-primary-100 cursor-pointer justify-center transition-colors duration-200 ease-in-out',
              selectedExpiry === 'expiring-medium' &&
                'bg-primary text-white border-primary-500 shadow-md hover:bg-primary-600',
              'border',
            )}
            onClick={() =>
              onExpiryChange(selectedExpiry === 'expiring-medium' ? null : 'expiring-medium')
            }
          >
            31-90 days
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              'hover:bg-primary-100 cursor-pointer justify-center transition-colors duration-200 ease-in-out',
              selectedExpiry === 'expiring-far' &&
                'bg-primary text-white border-primary-500 shadow-md hover:bg-primary-600',
              'border',
            )}
            onClick={() => onExpiryChange(selectedExpiry === "expiring-far" ? null : "expiring-far")}
          >
            <span className="w-3 h-3 rounded-full bg-success mr-1"></span>
            90+ days
          </Badge>
        </CardContent>
      </Card>

      {/* Card for filtering by stock level */}
      <Card className="overflow-hidden shadow-md">
        <div className="bg-muted px-4 py-2 font-medium text-sm">Stock Level Filter</div>
        <CardContent className="p-4 grid grid-cols-3 gap-2">
          <Badge
            variant="default"
            className={cn(
              'hover:bg-primary-100 cursor-pointer justify-center transition-colors duration-200 ease-in-out',
              selectedStock === 'low-stock' && 'bg-primary text-white border-primary-500 shadow-md hover:bg-primary-600',
              'border',
            )}
            onClick={() => onStockChange(selectedStock === "low-stock" ? null : "low-stock")}
          >
            <span className="w-3 h-3 rounded-full bg-danger mr-1"></span>
            Low Stock
          </Badge>
          <Badge
            variant="default"
            className={cn(
              'hover:bg-primary-100 cursor-pointer justify-center transition-colors duration-200 ease-in-out',
              selectedStock === 'medium-stock' &&
                'bg-primary text-white border-primary-500 shadow-md hover:bg-primary-600',
              'border',
            )}
            onClick={() => onStockChange(selectedStock === "medium-stock" ? null : "medium-stock")}
          >
            <span className="w-3 h-3 rounded-full bg-warning mr-1"></span>
            Medium
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              'hover:bg-primary-100 cursor-pointer justify-center transition-colors duration-200 ease-in-out',
              selectedStock === 'high-stock' &&
                'bg-primary text-white border-primary-500 shadow-md hover:bg-primary-600',
              'border',
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
