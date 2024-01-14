import { supabase } from "./env.mjs"

// Создаём клиент Supabase
const { createClient } = window.supabase
const client = createClient(supabase.url, supabase.anon_key)

export default client