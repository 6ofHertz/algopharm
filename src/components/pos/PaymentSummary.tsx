
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaymentSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
  onCheckout: () => void;
}

export const PaymentSummary = ({ 
  subtotal, 
  tax, 
  total, 
  itemCount,
  onCheckout 
}: PaymentSummaryProps) => {
  const [processing, setProcessing] = React.useState(false);

  const handleCheckout = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onCheckout();
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full pill-gradient hover:opacity-90 transition-opacity" 
        onClick={handleCheckout} 
        disabled={processing || itemCount === 0}
      >
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Complete Sale"
        )}
      </Button>
    </div>
  );
};
