
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

const sidebarTrigger = document.getElementById('sidebar-trigger');
const sidebarCloser = document.getElementById('sidebar-closer');

function openSidebar() {
  sidebar.classList.add('sidebar-mobile-opened');
  overlay.style.display = 'block';
}

sidebarTrigger.addEventListener('click', openSidebar);

function closeSidebar() {
  overlay.style.display = 'none';
  sidebar.classList.remove('sidebar-mobile-opened');
}

sidebarCloser.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) closeSidebar();
});