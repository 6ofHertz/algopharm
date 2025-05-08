import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";

interface InventoryItem {
  id: string;
  name: string;
  generic?: string;
  category: string;
  stock: number;
  price: number;
  batchNumber: string;
  expiryDate: string;
  daysToExpiry: number;
  supplier: string;
  lastOrdered: string;
  reorderLevel: number;
}

const inventoryData: InventoryItem[] = [
  {
    id: "MED001",
    name: "Lipitor 20mg",
    generic: "Atorvastatin",
    category: "Prescription",
    stock: 145,
    price: 45.99,
    batchNumber: "LIP202401",
    expiryDate: "2025-12-20",
    daysToExpiry: 240,
    supplier: "Pfizer Inc.",
    lastOrdered: "2025-03-01",
    reorderLevel: 50
  },
  {
    id: "MED002",
    name: "Amoxicillin 500mg",
    generic: "Amoxicillin",
    category: "Prescription",
    stock: 78,
    price: 15.50,
    batchNumber: "AMX202402",
    expiryDate: "2025-06-15",
    daysToExpiry: 50,
    supplier: "GSK",
    lastOrdered: "2025-02-15",
    reorderLevel: 40
  },
  {
    id: "MED003",
    name: "Advil 200mg",
    generic: "Ibuprofen",
    category: "OTC",
    stock: 234,
    price: 8.99,
    batchNumber: "ADV202401",
    expiryDate: "2026-01-10",
    daysToExpiry: 260,
    supplier: "Pfizer Inc.",
    lastOrdered: "2025-03-10",
    reorderLevel: 100
  },
  {
    id: "MED004",
    name: "Tylenol Extra Strength",
    generic: "Acetaminophen",
    category: "OTC",
    stock: 186,
    price: 9.49,
    batchNumber: "TYL202402",
    expiryDate: "2026-02-28",
    daysToExpiry: 310,
    supplier: "Johnson & Johnson",
    lastOrdered: "2025-03-05",
    reorderLevel: 80
  },
  {
    id: "MED005",
    name: "Azithromycin 250mg",
    generic: "Azithromycin",
    category: "Prescription",
    stock: 42,
    price: 22.75,
    batchNumber: "AZI202401",
    expiryDate: "2026-03-10",
    daysToExpiry: 320,
    supplier: "Sandoz",
    lastOrdered: "2025-02-20",
    reorderLevel: 30
  },
  {
    id: "MED006",
    name: "Vitamin D3 1000IU",
    category: "Supplements",
    stock: 95,
    price: 12.99,
    batchNumber: "VTD202401",
    expiryDate: "2026-08-15",
    daysToExpiry: 480,
    supplier: "Nature's Bounty",
    lastOrdered: "2025-01-15",
    reorderLevel: 40
  },
  {
    id: "MED007",
    name: "Metformin 1000mg",
    generic: "Metformin",
    category: "Prescription",
    stock: 112,
    price: 14.25,
    batchNumber: "MET202402",
    expiryDate: "2025-05-02",
    daysToExpiry: 5,
    supplier: "Teva",
    lastOrdered: "2025-02-28",
    reorderLevel: 60
  },
  {
    id: "MED008",
    name: "Sertraline 50mg",
    generic: "Sertraline",
    category: "Prescription",
    stock: 67,
    price: 18.50,
    batchNumber: "SER202401",
    expiryDate: "2025-05-10",
    daysToExpiry: 13,
    supplier: "Sandoz",
    lastOrdered: "2025-03-15",
    reorderLevel: 40
  }
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>(inventoryData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expiryFilter, setExpiryFilter] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState<string | null>(null);

  const handleSearch = () => {
    applyFilters(searchQuery, selectedCategory, expiryFilter, stockFilter);
  };

  const applyFilters = (
    search: string,
    category: string | null,
    expiry: string | null,
    stock: string | null
  ) => {
    let filtered = inventoryData;
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        (item.generic && item.generic.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }
    
    // Apply expiry filter
    if (expiry) {
      switch (expiry) {
        case "expiring-soon":
          filtered = filtered.filter(item => item.daysToExpiry <= 30);
          break;
        case "expiring-medium":
          filtered = filtered.filter(item => item.daysToExpiry > 30 && item.daysToExpiry <= 90);
          break;
        case "expiring-far":
          filtered = filtered.filter(item => item.daysToExpiry > 90);
          break;
      }
    }
    
    // Apply stock filter
    if (stock) {
      switch (stock) {
        case "low-stock":
          filtered = filtered.filter(item => item.stock <= item.reorderLevel * 1.2);
          break;
        case "medium-stock":
          filtered = filtered.filter(item => item.stock > item.reorderLevel * 1.2 && item.stock <= item.reorderLevel * 3);
          break;
        case "high-stock":
          filtered = filtered.filter(item => item.stock > item.reorderLevel * 3);
          break;
      }
    }
    
    setFilteredItems(filtered);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    applyFilters(searchQuery, category, expiryFilter, stockFilter);
  };

  const handleExpiryFilterChange = (filter: string | null) => {
    setExpiryFilter(filter);
    applyFilters(searchQuery, selectedCategory, filter, stockFilter);
  };

  const handleStockFilterChange = (filter: string | null) => {
    setStockFilter(filter);
    applyFilters(searchQuery, selectedCategory, expiryFilter, filter);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setExpiryFilter(null);
    setStockFilter(null);
    setFilteredItems(inventoryData);
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleCategoryChange(null)}>All Items</TabsTrigger>
          <TabsTrigger value="prescription" onClick={() => handleCategoryChange("Prescription")}>Prescription</TabsTrigger>
          <TabsTrigger value="otc" onClick={() => handleCategoryChange("OTC")}>OTC</TabsTrigger>
          <TabsTrigger value="supplements" onClick={() => handleCategoryChange("Supplements")}>Supplements</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Search</CardTitle>
            <CardDescription>
              Search by medication name, ID, or generic name
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input 
                placeholder="Search inventory..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
            
            <InventoryFilters 
              onExpiryChange={handleExpiryFilterChange}
              onStockChange={handleStockFilterChange}
              selectedExpiry={expiryFilter}
              selectedStock={stockFilter}
            />
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Supplier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No inventory items found matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          {item.name}
                          {item.generic && (
                            <div className="text-xs text-muted-foreground">
                              {item.generic}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.stock}
                            {item.stock <= item.reorderLevel && (
                              <Badge variant="outline" className="text-xs text-danger border-danger">
                                Low
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.expiryDate}
                            {item.daysToExpiry <= 30 && (
                              <Badge variant="outline" className="text-xs text-warning border-warning">
                                {item.daysToExpiry} days left
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.supplier}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default Inventory;
