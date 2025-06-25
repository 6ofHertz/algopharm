
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock product interface since the firebase service is not available
interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductQuantity, setNewProductQuantity] = useState(0);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data for demonstration
  useEffect(() => {
    setProducts([
      { id: '1', name: 'Aspirin', description: 'Pain reliever', price: 9.99, quantity: 100 },
      { id: '2', name: 'Bandages', description: 'First aid supplies', price: 5.99, quantity: 50 },
    ]);
  }, []);

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newProductName.trim() || newProductPrice <= 0 || newProductQuantity < 0) {
      alert('Please fill in all required fields and ensure price and quantity are valid.');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: newProductName,
      description: newProductDescription,
      price: newProductPrice,
      quantity: newProductQuantity,
    };

    setProducts(prev => [...prev, newProduct]);
    setNewProductName('');
    setNewProductDescription('');
    setNewProductPrice(0);
    setNewProductQuantity(0);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductDescription(product.description || '');
    setNewProductPrice(product.price);
    setNewProductQuantity(product.quantity);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProductName('');
    setNewProductDescription('');
    setNewProductPrice(0);
    setNewProductQuantity(0);
  };

  const handleUpdateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingProduct || !newProductName.trim() || newProductPrice <= 0 || newProductQuantity < 0) {
      alert('Please fill in all required fields and ensure price and quantity are valid.');
      return;
    }

    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id 
        ? { ...p, name: newProductName, description: newProductDescription, price: newProductPrice, quantity: newProductQuantity }
        : p
    ));
    handleCancelEdit();
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id!)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
            <div>
              <label htmlFor="newProductName" className="block text-sm font-medium mb-1">Name:</label>
              <Input
                id="newProductName"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="newProductDescription" className="block text-sm font-medium mb-1">Description:</label>
              <Input
                id="newProductDescription"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newProductPrice" className="block text-sm font-medium mb-1">Price:</label>
              <Input
                type="number"
                id="newProductPrice"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(parseFloat(e.target.value))}
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="newProductQuantity" className="block text-sm font-medium mb-1">Quantity:</label>
              <Input
                type="number"
                id="newProductQuantity"
                value={newProductQuantity}
                onChange={(e) => setNewProductQuantity(parseInt(e.target.value, 10))}
                required
                min="0"
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</Button>
              {editingProduct && (
                <Button type="button" variant="outline" onClick={handleCancelEdit}>Cancel Edit</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
