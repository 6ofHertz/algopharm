
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CalendarIcon, Printer, Receipt } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

interface CustomerInfo {
  name: string;
  phone: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

const POS = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scannedMedication, setScannedMedication] = useState<Medication | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInteractionAlert, setShowInteractionAlert] = useState(false);
  const [interactionDetails, setInteractionDetails] = useState<string[]>([]);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    insuranceProvider: "",
    insuranceNumber: ""
  });
  const [receiptDate, setReceiptDate] = useState<Date>(new Date());
  
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
    },
    {
      id: "MED005",
      name: "Ibuprofen 400mg",
      generic: "Advil",
      price: 8.99,
      quantity: 50,
      batchNumber: "IBU202401",
      expiryDate: "2026-05-15",
      daysToExpiry: 400,
      interactions: ["Warfarin"]
    },
    {
      id: "MED006",
      name: "Paracetamol 500mg",
      generic: "Tylenol",
      price: 7.50,
      quantity: 100,
      batchNumber: "PCM202402",
      expiryDate: "2026-01-10",
      daysToExpiry: 280,
    }
  ];

  const handleBarcodeScan = (barcode: string) => {
    // Scan by barcode/ID
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

  const handleSearch = (query: string) => {
    // Search by medication name or generic name
    const searchResult = medicationDatabase.find(med => 
      med.name.toLowerCase().includes(query.toLowerCase()) ||
      (med.generic && med.generic.toLowerCase().includes(query.toLowerCase()))
    );
    
    if (searchResult) {
      setScannedMedication(searchResult);
      
      // Check for interactions with items already in cart
      const potentialInteractions = checkInteractions(searchResult);
      if (potentialInteractions.length > 0) {
        setInteractionDetails(potentialInteractions);
        setShowInteractionAlert(true);
      }
    } else {
      toast.error("Medication not found in database");
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
    
    toast.success(`Added ${medication.name} to cart`);
  };

  const handleContinueWithWarning = () => {
    if (scannedMedication) {
      addToCart(scannedMedication);
      setShowInteractionAlert(false);
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
    toast.info("Item removed from cart");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setShowReceiptDialog(true);
  };
  
  const handleCompleteTransaction = () => {
    // In a real app, this would save the transaction to a database
    console.log("Transaction completed:", {
      items: cartItems,
      customer: customerInfo,
      date: receiptDate,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal()
    });
    
    toast.success("Transaction completed successfully!");
    setShowReceiptDialog(false);
    setCartItems([]);
    setScannedMedication(null);
    setCustomerInfo({
      name: "",
      phone: "",
      insuranceProvider: "",
      insuranceNumber: ""
    });
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
                <BarcodeScanner onScan={handleBarcodeScan} onSearch={handleSearch} />
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
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full pill-gradient hover:opacity-90 transition-opacity" 
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  Complete Sale
                </Button>
              </div>
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
      
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Receipt</DialogTitle>
            <DialogDescription>
              Enter customer information and receipt details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Customer Name</label>
                <Input 
                  id="name" 
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input 
                  id="phone" 
                  value={customerInfo.phone}
                  onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="insurance" className="text-sm font-medium">Insurance Provider</label>
                <Input 
                  id="insurance" 
                  value={customerInfo.insuranceProvider}
                  onChange={e => setCustomerInfo({...customerInfo, insuranceProvider: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="insuranceNumber" className="text-sm font-medium">Insurance Number</label>
                <Input 
                  id="insuranceNumber" 
                  value={customerInfo.insuranceNumber}
                  onChange={e => setCustomerInfo({...customerInfo, insuranceNumber: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Receipt Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {receiptDate ? format(receiptDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={receiptDate}
                    onSelect={(date) => date && setReceiptDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Summary</h4>
              <div className="bg-muted p-3 rounded-md space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT/Tax (8%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setShowReceiptDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCompleteTransaction} className="pill-gradient hover:opacity-90">
              <Printer className="mr-2 h-4 w-4" />
              Generate & Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POS;
