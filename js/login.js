import { supabase } from './supabaseClient.js';

export async function handleLogin() {
  const email = document.getElementById('li-email').value.trim();
  const password = document.getElementById('li-pass').value;

  const msg = document.getElementById('li-msg');
  
  if (!email || !password) {
    msg.textContent = 'Please enter both email and password';
    msg.style.color = '#ff0000';
    return;
  }

  msg.textContent = 'Logging in...';
  msg.style.color = '#ff6600';

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    msg.textContent = error.message;
    msg.style.color = '#ff0000';
    return;
  }

  msg.textContent = 'Login successful! Redirecting...';
  msg.style.color = '#00ff00';
  
  window.location.href = './user-account.html';
}