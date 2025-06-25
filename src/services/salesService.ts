
import { supabase } from '@/lib/supabaseClient'

export interface Sale {
  id?: string
  product_name: string
  amount: number
  quantity: number
  timestamp?: string
  cashier_id?: string
}

export interface Product {
  id?: string
  name: string
  price: number
  stock: number
  created_at?: string
}

export const salesService = {
  // Insert a new sale
  async createSale(sale: Omit<Sale, 'id' | 'timestamp'>) {
    const { data, error } = await supabase
      .from('sales')
      .insert([{
        ...sale,
        timestamp: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      console.error('Error creating sale:', error)
      throw error
    }
    
    return data[0]
  },

  // Fetch recent sales
  async getRecentSales(limit = 10) {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching sales:', error)
      throw error
    }
    
    return data
  },

  // Get sales for a specific date range
  async getSalesByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .gte('timestamp', startDate)
      .lte('timestamp', endDate)
      .order('timestamp', { ascending: false })
    
    if (error) {
      console.error('Error fetching sales by date:', error)
      throw error
    }
    
    return data
  },

  // Get total sales amount for today
  async getTodaysSales() {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('sales')
      .select('amount')
      .gte('timestamp', `${today}T00:00:00`)
      .lte('timestamp', `${today}T23:59:59`)
    
    if (error) {
      console.error('Error fetching today\'s sales:', error)
      throw error
    }
    
    return data.reduce((total, sale) => total + sale.amount, 0)
  }
}

export const productService = {
  // Get all products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching products:', error)
      throw error
    }
    
    return data
  },

  // Update product stock
  async updateProductStock(productId: string, newStock: number) {
    const { data, error } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', productId)
      .select()
    
    if (error) {
      console.error('Error updating product stock:', error)
      throw error
    }
    
    return data[0]
  },

  // Add new product
  async createProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    
    if (error) {
      console.error('Error creating product:', error)
      throw error
    }
    
    return data[0]
  }
}
