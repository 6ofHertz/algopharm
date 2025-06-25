import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/UI/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/features/UI/button';
import { Barcode, Search } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const [barcode, setBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScanning) {
        if (event.key === 'Enter') {
          onScan(barcode);
          setBarcode('');
          setIsScanning(false);
        } else {
          setBarcode((prevBarcode) => prevBarcode + event.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScanning, barcode, onScan]);

  const handleStartScan = () => {
    setIsScanning(true);
    setBarcode('');
  };

  const handleSearch = () => {
    if (barcode) {
      onScan(barcode);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Barcode Scanner</CardTitle>
        <CardDescription>Scan or enter a barcode to search for a medication</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            disabled={!isScanning}
          />
          <Button variant="outline" size="icon" onClick={handleSearch} disabled={isScanning}>
            <Search className="h-5 w-5" />
          </Button>
        </div>
        {!isScanning && (
          <Button className="w-full" onClick={handleStartScan}>
            <Barcode className="h-4 w-4 mr-2" />
            Start Scan
          </Button>
        )}
        {isScanning && (
          <p className="text-sm text-muted-foreground">Scanning... Press Enter to submit.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BarcodeScanner;
