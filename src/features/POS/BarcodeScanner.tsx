
import { Button } from "@/features/UI/button";
import { Input } from "@/features/UI/input";
import { Barcode, Search } from "lucide-react";
import React, { useRef, useState } from "react";

// Define the interface for the component's props
interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onSearch: (query: string) => void;
}

export const BarcodeScanner = ({ onScan, onSearch }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Function to initiate the scanning process
  const startScanning = () => {
    setIsScanning(true);
    setCountdown(3);
    
    // Simulate the scanning process with a countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setTimeout(() => {
            // Play the beep sound upon successful scan
            if (audioRef.current) {
              audioRef.current.play().catch(err => console.error("Error playing scan sound:", err));
            }
            
            // Simulate a successful scan by selecting a random barcode
            const barcodes = ["MED001", "MED002", "MED003", "MED004"];
            const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
            // Notify the parent component of the scanned barcode
            onScan(randomBarcode);
            setIsScanning(false);
          }, 500);
          // Reset countdown to 0
          return 0;
        }
        // Decrement the countdown
        return prev - 1;
      });
    }, 1000);
  };

  // Function to handle the search query
  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };
  
  // Function to handle the 'Enter' key press for searching
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Render the component UI
  return (
    <div className="space-y-3">
      {/* Hidden audio element for scan beep */}
      <audio ref={audioRef} src="https://soundbible.com/mp3/Scanner%20Beep-SoundBible.com-519765062.mp3" preload="auto" />
      
      <div 
        className={`border-2 ${isScanning ? 'border-primary animate-pulse' : 'border-muted'} rounded-lg h-[200px] relative flex items-center justify-center overflow-hidden bg-muted/30`}
        style={{ boxShadow: isScanning ? '0 0 10px #4338ca' : 'none' }} // Add a blue glow effect during scanning
      >
        {isScanning && <div className="scanner-line"></div>}
        
        {isScanning ? (
          <div className="text-center transition-opacity duration-500">
             {/* Display the countdown */}
            <div className="text-3xl font-bold text-primary animate-bounce">{countdown}</div>
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
      
      {/* Start Scan button */}
      <Button 
        onClick={startScanning} 
        disabled={isScanning} 
        className="w-full pill-gradient hover:opacity-90 transition-opacity"
      >
        {isScanning ? "Scanning..." : "Start Scan"}
      </Button>
      
      {/* Search Input and Button */}
        <div className="flex space-x-2 mt-2">
          <Input
            placeholder="Type medication name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch} variant="outline" className="flex-shrink-0 hover:blue-glow transition-colors duration-300">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
      </div>
    </div>
  );
};
