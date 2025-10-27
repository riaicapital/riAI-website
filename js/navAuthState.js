import { supabase } from './supabaseClient.js';

supabase.auth.onAuthStateChange((_event, session) => {
  const show = (id, visible) => {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? '' : 'none';
  };
  const loggedIn = !!session;
  
  // Hide Get Started button on sign-up and log-in pages
  const isAuthPage = window.location.pathname.includes('sign-up.html') || window.location.pathname.includes('log-in.html');
  if (isAuthPage) {
    show('nav-get-started', false);
    show('nav-user-menu', false);
  } else {
    show('nav-get-started', !loggedIn);
    show('nav-user-menu', loggedIn);
  }
  
  // Hide/show center Get Started button on index page
  const centerGetStarted = document.querySelector('.hero-form');
  if (centerGetStarted) {
    centerGetStarted.style.display = !loggedIn ? '' : 'none';
  }
});

// Toggle menu on click
document.addEventListener('click', (e) => {
  const menuDropdown = document.querySelector('.user-menu-dropdown');
  const menuButton = e.target.closest('.user-menu-button');
  
  if (menuButton) {
    menuDropdown?.classList.toggle('active');
  } else if (!e.target.closest('.user-menu-dropdown-content')) {
    menuDropdown?.classList.remove('active');
  }
});

// Redirect center Get Started button to sign-up with email pre-filled
document.addEventListener('DOMContentLoaded', () => {
  const centerGetStartedBtn = document.querySelector('.hero-form .submit-button');
  if (centerGetStartedBtn) {
    centerGetStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.querySelector('#Early-Access-Emails');
      const email = emailInput?.value.trim();
      if (email) {
        window.location.href = `./sign-up.html?email=${encodeURIComponent(email)}`;
      } else {
        window.location.href = './sign-up.html';
      }
    });
  }
});

export async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = './index.html';
}