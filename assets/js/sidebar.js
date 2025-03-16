const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

const sidebarTrigger = document.getElementById('sidebar-trigger');
const sidebarCloser = document.getElementById('sidebar-closer');

function openSidebar() {
  sidebar.classList.add('sidebar-mobile-opened'); // Menambahkan kelas untuk membuka sidebar
  overlay.style.display = 'block'; // Menampilkan overlay
}

sidebarTrigger.addEventListener('click', openSidebar); // Menambahkan event listener untuk membuka sidebar

function closeSidebar() {
  overlay.style.display = 'none'; // Menyembunyikan overlay
  sidebar.classList.remove('sidebar-mobile-opened'); // Menghapus kelas untuk menutup sidebar
}

sidebarCloser.addEventListener('click', closeSidebar); // Menambahkan event listener untuk menutup sidebar
overlay.addEventListener('click', closeSidebar); // Menambahkan event listener untuk menutup sidebar saat overlay diklik

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) closeSidebar(); // Menutup sidebar jika lebar jendela >= 1024px
});