// script.js
// JavaScript to toggle sidebar navigation

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');

  // Open sidebar
  navToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
  });

  // Close sidebar
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !navToggle.contains(e.target)) {
      sidebar.classList.remove('active');
      sidebar.setAttribute('aria-hidden', 'true');
    }
  });
});