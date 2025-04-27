
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Barcode } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const startScanning = () => {
    setIsScanning(true);
    setCountdown(3);
    
    // Simulate scanning process with countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setTimeout(() => {
            // Simulate successful scan with random medication
            const barcodes = ["MED001", "MED002", "MED003", "MED004"];
            const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
            onScan(randomBarcode);
            setIsScanning(false);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-3">
      <div 
        className={`border-2 ${isScanning ? 'border-pill-500 animate-pulse-glow' : 'border-muted'} rounded-lg h-[200px] relative flex items-center justify-center overflow-hidden bg-muted/30`}
      >
        {isScanning && <div className="scanner-line"></div>}
        
        {isScanning ? (
          <div className="text-center">
            <div className="text-3xl font-bold text-pill-500">{countdown}</div>
            <p className="text-sm text-muted-foreground mt-2">Scanning...</p>
          </div>
        ) : (
          <div className="text-center p-6">
            <Barcode className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click "Start Scan" to scan medication barcode
            </p>
          </div>
        )}
      </div>
      
      <Button 
        onClick={startScanning} 
        disabled={isScanning} 
        className="w-full pill-gradient hover:opacity-90 transition-opacity"
      >
        {isScanning ? "Scanning..." : "Start Scan"}
      </Button>
    </div>
  );
};
