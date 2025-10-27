import { supabase } from './supabaseClient.js';

export async function sendReset() {
  const email = document.getElementById('rp-email').value.trim();
  
  if (!email) {
    document.getElementById('rp-msg').textContent = 'Please enter your email';
    return;
  }
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password.html`
  });
  
  const msgEl = document.getElementById('rp-msg');
  if (error) {
    msgEl.textContent = error.message;
    msgEl.style.color = '#ff0000';
  } else {
    msgEl.textContent = 'Check your email for the reset link.';
    msgEl.style.color = '#00ff00';
  }
}