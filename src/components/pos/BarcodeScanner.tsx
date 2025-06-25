
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scan } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onSearch?: (query: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onSearch }) => {
  const [manualCode, setManualCode] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      setManualCode('');
    }
  };

  const handleSearch = () => {
    if (manualCode.trim() && onSearch) {
      onSearch(manualCode.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          Barcode Scanner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <Input
            placeholder="Enter barcode manually"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
          />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add Product
            </Button>
            {onSearch && (
              <Button type="button" variant="outline" onClick={handleSearch}>
                Search
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
