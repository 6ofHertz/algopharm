
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { BarcodeScanner } from "@/components/pos/BarcodeScanner";
import { MedicationInfoCard } from "@/components/pos/MedicationInfoCard";
import { PaymentSummary } from "@/components/pos/PaymentSummary";
import { InteractionAlert } from "@/components/pos/InteractionAlert";

export interface Medication {
  id: string;
  name: string;
  generic?: string;
  price: number;
  quantity: number;
  batchNumber: string;
  expiryDate: string;
  daysToExpiry: number;
  interactions?: string[];
}

interface CartItem extends Medication {
  quantity: number;
}

const POS = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scannedMedication, setScannedMedication] = useState<Medication | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInteractionAlert, setShowInteractionAlert] = useState(false);
  const [interactionDetails, setInteractionDetails] = useState<string[]>([]);
  
  // Sample medication database
  const medicationDatabase: Medication[] = [
    {
      id: "MED001",
      name: "Lipitor 20mg",
      generic: "Atorvastatin",
      price: 45.99,
      quantity: 30,
      batchNumber: "LIP202401",
      expiryDate: "2025-12-20",
      daysToExpiry: 240,
      interactions: ["Warfarin", "Azithromycin"]
    },
    {
      id: "MED002",
      name: "Amoxicillin 500mg",
      price: 15.50,
      quantity: 20,
      batchNumber: "AMX202402",
      expiryDate: "2025-06-15",
      daysToExpiry: 50,
    },
    {
      id: "MED003",
      name: "Azithromycin 250mg",
      price: 22.75,
      quantity: 6,
      batchNumber: "AZI202401",
      expiryDate: "2026-03-10",
      daysToExpiry: 320,
      interactions: ["Lipitor"]
    },
    {
      id: "MED004",
      name: "Warfarin 5mg",
      price: 18.25,
      quantity: 30,
      batchNumber: "WAR202402",
      expiryDate: "2025-09-22",
      daysToExpiry: 150,
      interactions: ["Lipitor", "Ibuprofen"]
    }
  ];

  const handleBarcodeScan = (barcode: string) => {
    // Simulate barcode scanning by matching against medication IDs
    const medication = medicationDatabase.find(med => med.id === barcode);
    
    if (medication) {
      setScannedMedication(medication);
      
      // Check for interactions with items already in cart
      const potentialInteractions = checkInteractions(medication);
      if (potentialInteractions.length > 0) {
        setInteractionDetails(potentialInteractions);
        setShowInteractionAlert(true);
      } else {
        addToCart(medication);
      }
    }
  };

  const checkInteractions = (medication: Medication): string[] => {
    if (!medication.interactions) return [];
    
    const interactions: string[] = [];
    
    cartItems.forEach(item => {
      if (medication.interactions?.includes(item.name.split(' ')[0])) {
        interactions.push(`${medication.name} may interact with ${item.name}`);
      }
      
      if (item.interactions?.includes(medication.name.split(' ')[0])) {
        interactions.push(`${item.name} may interact with ${medication.name}`);
      }
    });
    
    return interactions;
  };

  const addToCart = (medication: Medication) => {
    // Check if the item is already in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === medication.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...medication, quantity: 1 }]);
    }
  };

  const handleContinueWithWarning = () => {
    if (scannedMedication) {
      addToCart(scannedMedication);
      setShowInteractionAlert(false);
    }
  };

  const handleSearch = () => {
    // Simple search by medication name
    const searchResult = medicationDatabase.find(med => 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (med.generic && med.generic.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    if (searchResult) {
      setScannedMedication(searchResult);
      
      // Check for interactions with items already in cart
      const potentialInteractions = checkInteractions(searchResult);
      if (potentialInteractions.length > 0) {
        setInteractionDetails(potentialInteractions);
        setShowInteractionAlert(true);
      }
    }
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="flex-1 space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan Medication</CardTitle>
              <CardDescription>Scan barcode or search by name</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <BarcodeScanner onScan={handleBarcodeScan} />
                
                <Separator />
                
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Search medication name..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Search</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {scannedMedication && (
            <MedicationInfoCard 
              medication={scannedMedication} 
              onAddToCart={() => {
                const potentialInteractions = checkInteractions(scannedMedication);
                if (potentialInteractions.length > 0) {
                  setInteractionDetails(potentialInteractions);
                  setShowInteractionAlert(true);
                } else {
                  addToCart(scannedMedication);
                }
              }} 
            />
          )}
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Transaction</CardTitle>
              <CardDescription>{cartItems.length} items in cart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          Cart is empty. Scan or search for medications to add.
                        </TableCell>
                      </TableRow>
                    ) : (
                      cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span>{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-muted-foreground"
                              onClick={() => removeCartItem(item.id)}
                            >
                              ×
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <Separator className="my-4" />
              
              <PaymentSummary 
                subtotal={calculateTotal()} 
                tax={calculateTotal() * 0.08} 
                total={calculateTotal() * 1.08} 
                itemCount={cartItems.length}
                onCheckout={() => {
                  console.log("Processing checkout...");
                  setCartItems([]);
                  setScannedMedication(null);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showInteractionAlert && (
        <InteractionAlert 
          interactions={interactionDetails}
          onContinue={handleContinueWithWarning}
          onCancel={() => setShowInteractionAlert(false)}
        />
      )}
    </div>
  );
};

export default POS;
