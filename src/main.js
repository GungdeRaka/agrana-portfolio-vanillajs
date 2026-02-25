// Import CSS agar Vite tahu file ini perlu di-build
import './style.css'

// Logika Mobile Menu
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close menu on link click (mobile)
    const mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
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