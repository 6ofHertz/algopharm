
import { salesService, productService } from '@/services/salesService'

export const seedSampleData = async () => {
  try {
    // Insert sample products first
    const sampleProducts = [
      { name: "Paracetamol 500mg", price: 5.99, stock: 100 },
      { name: "Ibuprofen 400mg", price: 8.50, stock: 75 },
      { name: "Amoxicillin 250mg", price: 12.99, stock: 50 }
    ];

    console.log('Creating sample products...');
    for (const product of sampleProducts) {
      await productService.createProduct(product);
    }

    // Insert sample sales
    const sampleSales = [
      {
        product_name: "Paracetamol 500mg",
        amount: 5.99,
        quantity: 1,
        cashier_id: "sample-cashier-1"
      },
      {
        product_name: "Ibuprofen 400mg", 
        amount: 17.00,
        quantity: 2,
        cashier_id: "sample-cashier-1"
      },
      {
        product_name: "Amoxicillin 250mg",
        amount: 12.99,
        quantity: 1,
        cashier_id: "sample-cashier-2"
      }
    ];

    console.log('Creating sample sales...');
    for (const sale of sampleSales) {
      await salesService.createSale(sale);
    }

    console.log('Sample data inserted successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding sample data:', error);
    return false;
  }
}
