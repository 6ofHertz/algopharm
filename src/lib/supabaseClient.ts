
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cjfsxckewpwmkwhvyeoy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZnN4Y2tld3B3bWt3aHZ5ZW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDE0MDMsImV4cCI6MjA2NjQxNzQwM30.Ib9n7lEiBmqVhEkOkooyKxARN4ueeoOlP_7EdlpfDCE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
