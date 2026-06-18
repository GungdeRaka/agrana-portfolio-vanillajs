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
const words = ["Villa", "Hotel", "Guesthouse", "Penginapan", "Homestay"];
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

// Logika Hero Carousel Slider
function initCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('opacity-0', 'pointer-events-none');
                slide.classList.add('opacity-100', 'z-10');
            } else {
                slide.classList.remove('opacity-100', 'z-10');
                slide.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-white/40', 'w-2');
                dot.classList.add('bg-white', 'w-4');
            } else {
                dot.classList.remove('bg-white', 'w-4');
                dot.classList.add('bg-white/40', 'w-2');
            }
        });

        currentSlide = index;
    };

    const nextSlide = () => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };

    const prevSlide = () => {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    };

    const startAutoPlay = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 800); // Ganti slide setiap 0.8 detik
    };

    const stopAutoPlay = () => {
        clearInterval(slideInterval);
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(index);
            startAutoPlay();
        });
    });

    // Mulai auto play
    startAutoPlay();

    // Pause auto play ketika mouse di atas carousel
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Set slide awal
    showSlide(0);
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    type();
    initCarousel();
});