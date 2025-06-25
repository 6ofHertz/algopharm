
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Sale, salesService } from '@/services/salesService'

export const useRealtimeSales = () => {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch initial sales data
    const fetchInitialSales = async () => {
      try {
        const initialSales = await salesService.getRecentSales(20)
        setSales(initialSales)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch initial sales data')
        setLoading(false)
      }
    }

    fetchInitialSales()

    // Set up real-time subscription
    const salesSubscription = supabase
      .channel('sales_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sales'
        },
        (payload) => {
          console.log('New sale received:', payload.new)
          setSales(currentSales => [payload.new as Sale, ...currentSales].slice(0, 20))
        }
      )
      .subscribe()

    // Cleanup subscription
    return () => {
      salesSubscription.unsubscribe()
    }
  }, [])

  return { sales, loading, error, refetch: () => salesService.getRecentSales(20).then(setSales) }
}
