import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ktzqfbweaqdasiprnvng.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0enFmYndlYXFkYXNpcHJudm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MDQ3MDEsImV4cCI6MjA0ODE4MDcwMX0.YxtKtjXL5Q4RKgNQDas5CFDHXtn5AnysaYTCm7ECld4' // Your anon key will be a long string starting with 'eyJ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

