import { supabase } from './supabaseClient.js';

export async function setNewPass() {
  const pw = document.getElementById('np-pass').value;
  const { error } = await supabase.auth.updateUser({ password: pw });
  document.getElementById('np-msg').textContent = error ? error.message : 'Password reset! You can log in now.';
}