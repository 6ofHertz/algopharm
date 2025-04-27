
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Medication } from "@/pages/POS";

interface MedicationInfoCardProps {
  medication: Medication;
  onAddToCart: () => void;
}

export const MedicationInfoCard = ({ medication, onAddToCart }: MedicationInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{medication.name}</CardTitle>
            {medication.generic && (
              <p className="text-sm text-muted-foreground">{medication.generic}</p>
            )}
          </div>
          <Badge variant="outline" className="bg-muted/50">
            #{medication.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Batch Number</p>
            <p className="font-medium">{medication.batchNumber}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Expiry Date</p>
            <p className="font-medium flex items-center gap-2">
              {medication.expiryDate}
              {medication.daysToExpiry < 30 && (
                <Badge variant="outline" className="text-xs text-warning border-warning">
                  {medication.daysToExpiry} days left
                </Badge>
              )}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-medium text-lg">${medication.price.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">In Stock</p>
            <p className="font-medium flex items-center gap-2">
              <span className="bg-success/20 text-success p-0.5 rounded-full">
                <Check className="h-3 w-3" />
              </span>
              {medication.quantity} units
            </p>
          </div>
        </div>
        
        {medication.interactions && medication.interactions.length > 0 && (
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">Known Interactions</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {medication.interactions.map((interaction, index) => (
                <Badge key={index} variant="outline" className="text-xs text-warning border-warning">
                  {interaction}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
