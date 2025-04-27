
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, FlaskConical } from "lucide-react";
import { Medication } from "@/pages/POS";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MedicationInfoCardProps {
  medication: Medication;
  onAddToCart: () => void;
}

export const MedicationInfoCard = ({ medication, onAddToCart }: MedicationInfoCardProps) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  // Mock medication components for analysis
  const components = [
    { name: "Active Ingredient", value: medication.generic || medication.name.split(' ')[0], percentage: "85%" },
    { name: "Binding Agent", value: "Microcrystalline Cellulose", percentage: "8%" },
    { name: "Coating", value: "Hypromellose", percentage: "3%" },
    { name: "Colorant", value: "Titanium Dioxide", percentage: "2%" },
    { name: "Other Excipients", value: "Various", percentage: "2%" }
  ];

  return (
    <>
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

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => setShowAnalysis(true)}
          >
            <FlaskConical className="h-4 w-4 mr-2" />
            Analyze Components
          </Button>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Medication Analysis</DialogTitle>
            <DialogDescription>
              Component breakdown for {medication.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {components.map((component, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{component.name}: {component.value}</span>
                  <span className="text-sm text-muted-foreground">{component.percentage}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-pill-500 h-2 rounded-full" 
                    style={{ width: component.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
