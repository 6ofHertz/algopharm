
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  CreditCard, 
  Receipt, 
  Plus, 
  MinusCircle, 
  Check, 
  AlertTriangle, 
  ArrowRight 
} from "lucide-react";
import { cn } from '@/lib/utils';

interface MultiPaymentProps {
  total: number;
  onComplete: (payments: Payment[]) => void;
  onCancel: () => void;
}

export type PaymentMethod = 'cash' | 'card' | 'mpesa' | 'insurance';

export interface Payment {
  id: string;
  method: PaymentMethod;
  amount: number;
  reference?: string;
  details?: string;
}

export const MultiPayment: React.FC<MultiPaymentProps> = ({ 
  total, 
  onComplete, 
  onCancel 
}) => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: '1', method: 'cash', amount: total }
  ]);
  
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remaining = parseFloat((total - totalPaid).toFixed(2));
  const overpaid = remaining < 0;

  const addPayment = () => {
    if (remaining <= 0) return;
    
    setPayments([
      ...payments, 
      { 
        id: `${payments.length + 1}`, 
        method: 'cash', 
        amount: remaining 
      }
    ]);
  };

  const removePayment = (id: string) => {
    if (payments.length === 1) return;
    
    const removedPayment = payments.find(p => p.id === id);
    const updatedPayments = payments.filter(p => p.id !== id);
    
    // Add the removed amount to the first payment
    if (removedPayment && updatedPayments.length > 0) {
      updatedPayments[0] = {
        ...updatedPayments[0],
        amount: updatedPayments[0].amount + removedPayment.amount
      };
    }
    
    setPayments(updatedPayments);
  };

  const updatePayment = (id: string, field: string, value: any) => {
    setPayments(payments.map(payment => 
      payment.id === id 
        ? { ...payment, [field]: value } 
        : payment
    ));
  };

  const handlePaymentAmountChange = (id: string, amount: number) => {
    // Find current payment
    const paymentIndex = payments.findIndex(p => p.id === id);
    if (paymentIndex === -1) return;
    
    const oldAmount = payments[paymentIndex].amount;
    const amountChange = amount - oldAmount;
    
    // If there's only one payment, just update it
    if (payments.length === 1) {
      updatePayment(id, 'amount', amount);
      return;
    }
    
    // Find another payment to adjust
    const otherPaymentIndex = paymentIndex === 0 ? 1 : 0;
    const otherPayment = payments[otherPaymentIndex];
    const newOtherAmount = otherPayment.amount - amountChange;
    
    // Only allow the change if the other payment doesn't go negative
    if (newOtherAmount >= 0) {
      const updatedPayments = [...payments];
      updatedPayments[paymentIndex] = { ...updatedPayments[paymentIndex], amount };
      updatedPayments[otherPaymentIndex] = { ...updatedPayments[otherPaymentIndex], amount: newOtherAmount };
      setPayments(updatedPayments);
    }
  };

  const handleNextStep = () => {
    if (currentStep < payments.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      processPayments();
    }
  };

  const processPayments = () => {
    setProcessing(true);
    setError(null);
    
    // Simulate payment processing
    setTimeout(() => {
      // In a real app, you would process each payment method
      // and handle failures appropriately
      
      setProcessing(false);
      onComplete(payments);
    }, 1500);
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'cash':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
            <path fill="white" d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'card':
        return <CreditCard className="h-5 w-5" />;
      case 'mpesa':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 22a10 10 0 110-20 10 10 0 010 20zm5-10a5 5 0 11-10 0 5 5 0 0110 0z" />
          </svg>
        );
      case 'insurance':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            <path d="M7 12h10v2H7z" />
            <path d="M10 8h4v8h-4z" />
          </svg>
        );
    }
  };

  const renderPaymentForm = (payment: Payment) => {
    return (
      <div key={payment.id} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getPaymentIcon(payment.method)}
            <span className="ml-2 font-medium">
              Payment Method {parseInt(payment.id)} of {payments.length}
            </span>
          </div>
          {payments.length > 1 && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => removePayment(payment.id)}
            >
              <MinusCircle className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`method-${payment.id}`}>Payment Method</Label>
            <Select
              value={payment.method}
              onValueChange={(value) => updatePayment(payment.id, 'method', value as PaymentMethod)}
            >
              <SelectTrigger id={`method-${payment.id}`}>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="mpesa">M-PESA</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`amount-${payment.id}`}>Amount</Label>
            <Input
              id={`amount-${payment.id}`}
              type="number"
              value={payment.amount}
              step="0.01"
              min="0"
              max={total}
              onChange={(e) => handlePaymentAmountChange(payment.id, parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        
        {payment.method === 'mpesa' && (
          <div className="space-y-2">
            <Label htmlFor={`phone-${payment.id}`}>M-PESA Phone Number</Label>
            <Input
              id={`phone-${payment.id}`}
              placeholder="e.g. 254712345678"
              value={payment.reference || ''}
              onChange={(e) => updatePayment(payment.id, 'reference', e.target.value)}
            />
          </div>
        )}
        
        {payment.method === 'insurance' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`provider-${payment.id}`}>Insurance Provider</Label>
              <Select
                value={payment.reference || ''}
                onValueChange={(value) => updatePayment(payment.id, 'reference', value)}
              >
                <SelectTrigger id={`provider-${payment.id}`}>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nhif">NHIF</SelectItem>
                  <SelectItem value="britam">Britam</SelectItem>
                  <SelectItem value="jubilee">Jubilee</SelectItem>
                  <SelectItem value="aaa">AAA Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`policy-${payment.id}`}>Policy Number</Label>
              <Input
                id={`policy-${payment.id}`}
                placeholder="Enter policy number"
                value={payment.details || ''}
                onChange={(e) => updatePayment(payment.id, 'details', e.target.value)}
              />
            </div>
          </div>
        )}
        
        {payment.method === 'card' && (
          <div className="space-y-2">
            <Label htmlFor={`card-${payment.id}`}>Last 4 Digits</Label>
            <Input
              id={`card-${payment.id}`}
              placeholder="e.g. 1234"
              maxLength={4}
              value={payment.reference || ''}
              onChange={(e) => updatePayment(payment.id, 'reference', e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>
          Total amount due: ${total.toFixed(2)}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {!processing ? (
            renderPaymentForm(payments[currentStep])
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-center">Processing payment...</p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Please do not refresh the page.
              </p>
            </div>
          )}
          
          {error && (
            <div className="bg-destructive/10 p-3 rounded-md flex items-start">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Payment Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm mb-1">
              <span>Total Due:</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span>Amount Paid:</span>
              <span className={cn(
                "font-medium",
                overpaid ? "text-red-500" : "text-green-500"
              )}>
                ${totalPaid.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm font-bold">
              <span>{overpaid ? "Overpayment:" : "Remaining:"}</span>
              <span className={cn(
                overpaid ? "text-red-500" : "text-primary"
              )}>
                ${Math.abs(remaining).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={processing}
          >
            Cancel
          </Button>
          
          {payments.length < 4 && !processing && remaining > 0 && (
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={addPayment}
            >
              <Plus className="h-4 w-4 mr-2" />
              Split Payment
            </Button>
          )}
          
          <Button 
            onClick={handleNextStep} 
            disabled={processing || (remaining > 0 && currentStep === payments.length - 1)}
          >
            {currentStep < payments.length - 1 ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Complete
              </>
            )}
          </Button>
        </div>
        
        {payments.length > 1 && (
          <div className="w-full flex justify-center gap-1 mt-2">
            {payments.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full w-4",
                  index === currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
