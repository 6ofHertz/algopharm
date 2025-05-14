import { db } from '../firebase-config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';

export interface Product {
  id?: string; // Firestore document ID
  name: string;
  sku: string;
  description?: string;
  price: number;
  cost: number;
  quantity: number;
  category?: string;
  supplier?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  } catch (e) {
    console.error(`Error deleting document with ID ${id}: `, e);
    throw e; // Re-throw the error for handling in the component
  }
};
// Placeholder for other functions
export const getProducts = async (): Promise<Product[]> => {
  const productsCollectionRef = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollectionRef);
  const productsList = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<Product, 'id'> // Cast to Product excluding id, as id is added manually
  })) as Product[];
  return productsList;
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...product,
      updatedAt: Timestamp.now(),
    });
  } catch (e) {
    console.error(`Error updating document with ID ${id}: `, e);
    throw e; // Re-throw the error for handling in the component
  }
};

// export const deleteProduct = async (id: string): Promise<void> => { ... };
