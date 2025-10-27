import { supabase } from './supabaseClient.js';
import { requireAuth } from './authGuard.js';

export async function initUpdatePassword() {
  try {
    await requireAuth();
  } catch (e) {
    // If not authenticated, allow password reset from email link
    console.log('Using password reset flow');
  }
}

export async function updatePassword() {
  const newPass = document.getElementById('up-new').value;
  const msgEl = document.getElementById('up-msg');
  
  if (!newPass) {
    msgEl.textContent = 'Please enter a new password';
    msgEl.style.color = '#ff0000';
    return;
  }
  
  const { error } = await supabase.auth.updateUser({ password: newPass });
  
  if (error) {
    msgEl.textContent = error.message;
    msgEl.style.color = '#ff0000';
  } else {
    msgEl.textContent = 'Password updated successfully!';
    msgEl.style.color = '#00ff00';
    setTimeout(() => {
      window.location.href = './user-account.html';
    }, 2000);
  }
}