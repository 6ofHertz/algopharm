import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { salesService } from "@/services/salesService";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Sale {
  items: SaleItem[];
  total: number;
}

export const POS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [scannedCode, setScannedCode] = useState("");
  const [currentSale, setCurrentSale] = useState<Sale>({ items: [], total: 0 });
  const { user } = useAuth();

  useEffect(() => {
    // Mock product data for demonstration
    const mockProducts: Product[] = [
      { id: "1", name: "Paracetamol", price: 5.00, stock: 100 },
      { id: "2", name: "Bandage", price: 2.50, stock: 50 },
      { id: "3", name: "Antiseptic", price: 7.50, stock: 75 },
    ];
    setProducts(mockProducts);
  }, []);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScannedCode(e.target.value);
  };

  const addItemToSale = () => {
    const product = products.find((p) => p.id === scannedCode);
    if (product) {
      const existingItem = currentSale.items.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedItems = currentSale.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCurrentSale({
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        });
      } else {
        const newItem: SaleItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        };
        setCurrentSale({
          items: [...currentSale.items, newItem],
          total: currentSale.total + newItem.price,
        });
      }
      setScannedCode("");
    } else {
      toast.error("Product not found");
    }
  };

  const removeItem = (id: string) => {
    const itemToRemove = currentSale.items.find((item) => item.id === id);
    if (itemToRemove) {
      const updatedItems = currentSale.items.filter((item) => item.id !== id);
      setCurrentSale({
        items: updatedItems,
        total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });
    }
  };

  const handleSale = async () => {
    if (!currentSale || currentSale.items.length === 0) {
      toast.error("No items in cart");
      return;
    }

    try {
      for (const item of currentSale.items) {
        await salesService.createSale({
          product_name: item.name,
          amount: item.price * item.quantity,
          quantity: item.quantity,
          cashier_id: user?.id || 'unknown' // Use user.id instead of user.uid
        });
      }

      toast.success("Sale completed successfully!");
      setCurrentSale({ items: [], total: 0 });
      setScannedCode("");
    } catch (error) {
      console.error("Error processing sale:", error);
      toast.error("Failed to process sale");
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/2 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Point of Sale</CardTitle>
            <CardDescription>Scan or enter product code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Scan product code"
                  value={scannedCode}
                  onChange={handleScan}
                />
                <Button className="ml-2" onClick={addItemToSale}>
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 p-4">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Current Sale</CardTitle>
            <CardDescription>Items in current sale</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <ScrollArea className="h-[50vh] w-full rounded-md border">
              <div className="p-4">
                {currentSale.items.length === 0 ? (
                  <p>No items in cart</p>
                ) : (
                  currentSale.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between mb-2">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${item.price * item.quantity}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span>Total:</span>
              <span>${currentSale.total.toFixed(2)}</span>
            </div>
            <Button className="w-full" onClick={handleSale}>
              Complete Sale
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
