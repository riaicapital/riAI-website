import { supabase } from './supabaseClient.js';
import { requireAuth } from './authGuard.js';

export async function initAccountPage() {
  await requireAuth();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const emailField = document.getElementById('ua-email');
    if (emailField) emailField.value = user.email;
    
    const nameField = document.getElementById('ua-name');
    if (nameField && user.user_metadata?.full_name) {
      nameField.value = user.user_metadata.full_name;
    }
  }
}

export async function saveProfile() {
  const nameField = document.getElementById('ua-name');
  const msgField = document.getElementById('ua-msg');
  
  if (!nameField || !msgField) return;
  
  const full_name = nameField.value.trim();
  const { data: { user } } = await supabase.auth.getUser();
  
  const { error } = await supabase.auth.updateUser({
    data: { full_name }
  });
  
  if (error) {
    msgField.textContent = error.message;
    msgField.style.color = '#ff0000';
  } else {
    msgField.textContent = 'Profile updated successfully!';
    msgField.style.color = '#00ff00';
  }
}
