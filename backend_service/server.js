import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});