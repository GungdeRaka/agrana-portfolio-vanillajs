// Import CSS agar Vite tahu file ini perlu di-build
import './style.css'

// Logika Mobile Menu
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');

if (btn && menu) {
    const toggleMenu = () => {
        // Toggle animasi menu dropdown (Slide down + Fade in)
        menu.classList.toggle('opacity-0');
        menu.classList.toggle('invisible');
        menu.classList.toggle('-translate-y-4');
        menu.classList.toggle('opacity-100');
        menu.classList.toggle('visible');
        menu.classList.toggle('translate-y-0');

        // Toggle animasi ikon Hamburger menghilang
        iconMenu.classList.toggle('rotate-90');
        iconMenu.classList.toggle('scale-0');
        iconMenu.classList.toggle('opacity-0');

        // Toggle animasi ikon Silang (X) muncul
        iconClose.classList.toggle('rotate-0');
        iconClose.classList.toggle('scale-100');
        iconClose.classList.toggle('opacity-100');
    };

    // Eksekusi saat tombol diklik
    btn.addEventListener('click', toggleMenu);

    // Otomatis menutup menu saat salah satu link diklik
    const mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Cek apakah menu sedang terbuka
            if (menu.classList.contains('opacity-100')) {
                toggleMenu();
            }
        });
    });
}

const typewriterElement = document.getElementById('typewriter');
const words = ["Kecantikan", "Travel", "Property", "Restaurant", "Kesehatan", "Otomotif", "Fashion", "E-commerce"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Hapus karakter
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Lebih cepat saat menghapus
    } else {
        // Ketik karakter
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; // Kecepatan mengetik normal
    }

    // Logika pergantian kata
    if (!isDeleting && charIndex === currentWord.length) {
        // Jika selesai mengetik satu kata, tunggu sebentar sebelum menghapus
        isDeleting = true;
        typeSpeed = 2000; // Pause 2 detik agar teks terbaca
    } else if (isDeleting && charIndex === 0) {
        // Jika selesai menghapus, pindah ke kata berikutnya
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Loop kembali ke awal jika sudah habis
        typeSpeed = 500; // Pause sedikit sebelum mengetik kata baru
    }

    setTimeout(type, typeSpeed);
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', type);