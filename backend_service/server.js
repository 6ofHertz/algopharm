import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/seed-pharmaceuticals', async (req, res) => {
  const mockPharmaceuticals = [];
  const startDate = new Date();

  for (let i = 0; i < 10; i++) {
    const expiryDate = new Date(startDate);
    expiryDate.setDate(startDate.getDate() + Math.floor(Math.random() * 365 * 3)); // Random expiry within 3 years

    mockPharmaceuticals.push({
      name: `Pharmaceutical ${i + 1}`,
      price: parseFloat((Math.random() * 100).toFixed(2)),
      stock: Math.floor(Math.random() * 500) + 10,
      expiry_date: expiryDate.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
      description: `This is a mock description for Pharmaceutical ${i + 1}.`,
    });
  }

  const { data, error } = await supabase
    .from('products') // Assuming your table is named 'products'
    .insert(mockPharmaceuticals);

  if (error) {
    console.error('Error seeding pharmaceuticals:', error);
    return res.status(500).json({
      error: 'Failed to seed pharmaceuticals',
      details: error.message
    });
  }

  res.status(201).json({
    message: '10 mock pharmaceuticals seeded successfully',
    data: data
  });
});

app.get('/pharmaceuticals', async (req, res) => {
  const {
    data,
    error
  } = await supabase
    .from('products') // Assuming your table is named 'products'
    .select('*');

  if (error) {
    console.error('Error fetching pharmaceuticals:', error);
    return res.status(500).json({
      error: 'Failed to fetch pharmaceuticals',
      details: error.message
    });
  }
  res.status(200).json(data);
});

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});