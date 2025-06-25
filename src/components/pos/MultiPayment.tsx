
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export interface Payment {
  id: string;
  method: 'cash' | 'card' | 'mpesa' | 'insurance';
  amount: number;
  reference?: string;
}

interface MultiPaymentProps {
  total: number;
  onComplete: (payments: Payment[]) => void;
  onCancel: () => void;
}

export const MultiPayment: React.FC<MultiPaymentProps> = ({ total, onComplete, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payments: Payment[] = [];
    
    if (paymentMethod === 'cash' || paymentMethod === 'mixed') {
      const cash = parseFloat(cashAmount) || 0;
      if (cash > 0) {
        payments.push({
          id: '1',
          method: 'cash',
          amount: cash
        });
      }
    }
    
    if (paymentMethod === 'card' || paymentMethod === 'mixed') {
      const card = parseFloat(cardAmount) || 0;
      if (card > 0) {
        payments.push({
          id: '2',
          method: 'card',
          amount: card
        });
      }
    }
    
    if (paymentMethod === 'cash' && !cashAmount) {
      payments.push({
        id: '1',
        method: 'cash',
        amount: total
      });
    }
    
    if (paymentMethod === 'card' && !cardAmount) {
      payments.push({
        id: '1',
        method: 'card',
        amount: total
      });
    }
    
    onComplete(payments);
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

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Complete Payment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
