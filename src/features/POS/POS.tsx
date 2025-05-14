import React, { useState, useEffect, useMemo } from "react";
import { getProducts, Product } from "../../firebase/firestore/productService";
import { collection, doc, runTransaction } from 'firebase/firestore'; // Import Firestore functions
import { db } from "../../firebase-config"; // Import db
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook

const POS: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [cartItems, setCartItems] = useState<{ product: Product, quantity: number }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  const { user } = useAuth(); // Get the authenticated user

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === productId);

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        if (newItems[existingItemIndex].quantity > 1) {
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity - 1,
          };
        } else {
          newItems.splice(existingItemIndex, 1);
        }
        return newItems;
      }
      return prevItems; // Should not happen if button is only on items in cart
    });
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
 product.name.toLowerCase().includes(searchTerm.toLowerCase())
 );
  }, [products, searchTerm]);
  const handleCheckout = async () => {
    // Ensure user is authenticated before proceeding
    if (!user) {
      alert("You must be logged in to checkout.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // Use Firestore Transaction for atomic updates
    try {
      await runTransaction(db, async (transaction) => {
        // Check stock and update inventory within the transaction
        for (const item of cartItems) {
          const productRef = doc(db, "products", item.product.id!);
          const productDoc = await transaction.get(productRef);

          if (!productDoc.exists()) {
            throw new Error(`Product with ID ${item.product.id} not found.`);
          }

          const currentQuantity = productDoc.data()!.quantity;
          const newQuantity = currentQuantity - item.quantity;

          if (newQuantity < 0) {
            throw new Error(`Insufficient stock for ${item.product.name}. Available: ${currentQuantity}`);
          }

          // Update quantity within the transaction
          transaction.update(productRef, { quantity: newQuantity });
        }

        // Add the sale document within the transaction
        const salesRef = collection(db, "sales");
        transaction.set(doc(salesRef), {
          items: cartItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total: total,
          cashierId: user.uid, // Add the cashier's user ID
          timestamp: new Date(),
        });
      });

      setCartItems([]); // Clear the cart on successful checkout
      alert("Checkout successful!"); // Provide user feedback
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(`Checkout failed: ${error.message}`); // Provide user feedback
    }
  };

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
 <div>
      <h1>Point of Sale</h1>

      <input type="text" placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} /> {/* Search input field */}
      <h2>Available Products</h2> {/* Consider adding search functionality here */}
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}{' '}
 <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul> {/* Map over filteredProducts */}

      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product.id}> {/* Use item.product.id directly as it's guaranteed to exist here */}
            {item.product.name} x {item.quantity} - ${(item.product.price * item.quantity).toFixed(2)}
 <button onClick={() => removeFromCart(item.product.id!)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>

 <button onClick={handleCheckout}>Checkout</button>
 </div>
  );
};

export default POS;