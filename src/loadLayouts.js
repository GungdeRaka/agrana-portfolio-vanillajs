// Logika Mobile Menu
export function initMobileMenu() {
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
}

// Layout Loader Mechanism
export async function loadLayouts() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    const navbarRoot = navbarPlaceholder ? (navbarPlaceholder.getAttribute('data-root') || './') : './';
    const footerRoot = footerPlaceholder ? (footerPlaceholder.getAttribute('data-root') || './') : './';

    const loadNavbar = async () => {
        if (!navbarPlaceholder) return;
        try {
            const response = await fetch(`${navbarRoot}components/navbar.html`);
            if (!response.ok) throw new Error('Failed to fetch navbar');
            let html = await response.text();
            
            // Adjust paths if page is in a subdirectory
            if (navbarRoot !== './') {
                html = html.replace(/src="src\//g, `src="${navbarRoot}src/`);
                html = html.replace(/href="#/g, `href="${navbarRoot}index.html#/`);
            }
            
            navbarPlaceholder.outerHTML = html;
            initMobileMenu();
        } catch (error) {
            console.error('Error loading navbar layout:', error);
        }
    };

    const loadFooter = async () => {
        if (!footerPlaceholder) return;
        try {
            const response = await fetch(`${footerRoot}components/footer.html`);
            if (!response.ok) throw new Error('Failed to fetch footer');
            let html = await response.text();
            footerPlaceholder.outerHTML = html;
        } catch (error) {
            console.error('Error loading footer layout:', error);
        }
    };

    await Promise.all([loadNavbar(), loadFooter()]);
}
