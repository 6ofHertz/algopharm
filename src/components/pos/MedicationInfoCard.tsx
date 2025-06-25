
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Medication {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface MedicationInfoCardProps {
  medication: Medication;
}

export const MedicationInfoCard: React.FC<MedicationInfoCardProps> = ({ medication }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{medication.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Price:</span>
            <span>${medication.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Stock:</span>
            <Badge variant={medication.quantity > 10 ? 'default' : 'destructive'}>
              {medication.quantity} units
            </Badge>
          </div>
          {medication.description && (
            <div>
              <span className="font-medium">Description:</span>
              <p className="text-sm text-muted-foreground">{medication.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
