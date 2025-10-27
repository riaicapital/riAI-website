import { supabase } from './supabaseClient.js';

export async function requireAuth() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (!session || error) {
    window.location.href = './log-in.html?redirect=' + encodeURIComponent(window.location.pathname);
    throw new Error('Not authenticated');
  }
  return session;
}