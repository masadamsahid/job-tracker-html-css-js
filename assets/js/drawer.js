const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
function openDrawer() {
  drawer.classList.add('opened');
  drawerOverlay.style.display = 'block';
}
function closeDrawer() {
  drawer.classList.remove('opened');
  drawerOverlay.style.display = 'none';
}

drawerOverlay.addEventListener('click', closeDrawer);