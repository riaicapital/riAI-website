import { supabase } from './supabaseClient.js';

export async function handleSignUp() {
  const name = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const password = document.getElementById('su-pass').value;

  const msg = document.getElementById('su-msg');
  
  if (!email || !password) {
    msg.textContent = 'Please fill in all fields';
    msg.style.color = '#ff0000';
    return;
  }

  msg.textContent = 'Creating account...';
  msg.style.color = '#ff6600';

  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: name
      }
    }
  });
  
  if (error) {
    msg.textContent = error.message;
    msg.style.color = '#ff0000';
    return;
  }

  msg.textContent = 'Success! Check your email to verify your account.';
  msg.style.color = '#00ff00';
  
  // Redirect after 3 seconds
  setTimeout(() => {
    window.location.href = './log-in.html';
  }, 3000);
}
