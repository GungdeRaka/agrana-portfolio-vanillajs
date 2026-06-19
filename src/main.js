// Import CSS agar Vite tahu file ini perlu di-build
import './style.css'
import { loadLayouts } from './loadLayouts.js'

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
        slideInterval = setInterval(nextSlide, 1000); // Ganti slide setiap 0.8 detik
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

// Logika Portfolio Carousel (Main & Small states dengan pergeseran posisi kiri-ke-kanan berulang)
function initPortfolioCarousel() {
    const track = document.getElementById('portfolio-track');
    if (!track) return;

    const cards = track.querySelectorAll('.portfolio-card');
    const displayTitle = document.getElementById('portfolio-display-title');
    const displayDesc = document.getElementById('portfolio-display-desc');
    
    // Portfolio Data
    const portfolioData = [
        {
            title: "Kuda Putih Pandawa",
            desc: "Website booking mandiri untuk Guesthouse di Bali. Pengunjung dapat melakukan reservasi kamar secara langsung dan diarahkan ke WhatsApp Admin. Bebas dari potongan biaya komisi OTA."
        },
        {
            title: "MARI Stitch & Garment",
            desc: "Website Company Profile dengan fitur Bilingual (Multi-Bahasa) untuk produsen garmen ekspor internasional. Menampilkan portofolio pengerjaan dan galeri produk premium, terintegrasi dengan formulir inquiry klien luar negeri."
        },
        {
            title: "Sistem Inventaris Sekolah",
            desc: "Solusi digital custom untuk menggantikan pencatatan inventaris manual (buku tulis). Sistem informasi ini sukses mengurangi risiko kehilangan data dan barang, serta mencatat setiap riwayat peminjaman aset secara real-time."
        }
    ];

    // Petakan ke 6 posisi untuk 6 kartu
    const positionClasses = ['pos-out-left', 'pos-left', 'pos-middle', 'pos-right', 'pos-out-right', 'pos-out-right'];
    let currentStep = 0; // 0 sampai 5
    let autoplayInterval;

    const updateCarousel = (step) => {
        currentStep = (step + 6) % 6;

        cards.forEach((card, i) => {
            // Hapus kelas posisi sebelumnya
            card.classList.remove('pos-out-left', 'pos-left', 'pos-middle', 'pos-right', 'pos-out-right');

            // Hitung indeks posisi berdasarkan langkah s
            const posIndex = (i + currentStep) % 6;
            card.classList.add(positionClasses[posIndex]);

            // Jika posisinya pos-right (indeks 3), kartu ini menjadi Main Card dan teksnya di-update
            if (posIndex === 3) {
                const dataIndex = i % 3;
                if (displayTitle && displayDesc) {
                    displayTitle.style.opacity = '0';
                    displayDesc.style.opacity = '0';

                    setTimeout(() => {
                        displayTitle.textContent = portfolioData[dataIndex].title;
                        displayDesc.textContent = portfolioData[dataIndex].desc;
                        displayTitle.style.opacity = '1';
                        displayDesc.style.opacity = '1';
                    }, 300);
                }
            }
        });
    };

    const nextPortfolio = () => {
        // Pindah ke langkah berikutnya untuk menggeser kartu dari kiri ke kanan
        updateCarousel(currentStep + 1);
    };

    const startAutoplay = () => {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextPortfolio, 5000); // ganti setiap 5 detik
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    // Ketika sebuah kartu di-klik, pindah ke langkah yang menempatkan kartu tersebut di pos-right
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            const targetStep = (3 - i + 6) % 6;
            updateCarousel(targetStep);
            startAutoplay(); // Reset timer autoplay
        });
    });

    // Pause autoplay saat hover pada container carousel
    const container = track.parentElement;
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    // Set awal
    updateCarousel(0);
    startAutoplay();
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
    await loadLayouts();
    type();
    initCarousel();
    initPortfolioCarousel();
});