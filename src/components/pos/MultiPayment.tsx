
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface MultiPaymentProps {
  total: number;
  onPaymentComplete: (paymentDetails: any) => void;
}

export const MultiPayment: React.FC<MultiPaymentProps> = ({ total, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = {
      method: paymentMethod,
      cash: parseFloat(cashAmount) || 0,
      card: parseFloat(cardAmount) || 0,
      total,
    };
    onPaymentComplete(details);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mixed" id="mixed" />
              <Label htmlFor="mixed">Mixed Payment</Label>
            </div>
          </RadioGroup>

          {(paymentMethod === 'cash' || paymentMethod === 'mixed') && (
            <div>
              <Label htmlFor="cashAmount">Cash Amount</Label>
              <Input
                id="cashAmount"
                type="number"
                step="0.01"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          )}

          {(paymentMethod === 'card' || paymentMethod === 'mixed') && (
            <div>
              <Label htmlFor="cardAmount">Card Amount</Label>
              <Input
                id="cardAmount"
                type="number"
                step="0.01"
                value={cardAmount}
                onChange={(e) => setCardAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            Complete Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
