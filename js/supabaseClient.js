import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://jwqawmioyekbvfdglfps.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cWF3bWlveWVrYnZmZGdsZnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTMyNTksImV4cCI6MjA3NzAyOTI1OX0.KbtJFecm_Fu9ERf51CZGQlSzEqPckYgX09Rn8pZNBg0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Make supabase available globally
window.supabase = supabase;