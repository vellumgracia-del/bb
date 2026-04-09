// Function untuk menangani interaksi awal di halaman
function initLibrAspire() {
    console.log("Welcome to LibrAspire!");
    
    // Contoh menambahkan event listener sederhana untuk menu
    const menuItems = document.querySelectorAll('.menu');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            console.log("Menu yang diklik: " + this.textContent);
            // Tambahkan logika interaktif lainnya di sini jika diperlukan
        });
    });
}

// Menjalankan fungsi setelah struktur DOM selesai dimuat
document.addEventListener('DOMContentLoaded', initLibrAspire);
