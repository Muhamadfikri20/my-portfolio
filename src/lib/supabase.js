import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
   
  console.warn(
    '[supabase] Missing env: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — auth will not function until configured in .env.local',
  )
}

export const supabase = createClient(url || 'http://localhost', anonKey || 'placeholder')
