// =========================================
// PersonalBrand | Identidad Profesional
// Lógica de navegación y animaciones
// =========================================

// Enhanced smooth scrolling with offset for fixed nav and small animations
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

function updateNavActive(hash) {
    navLinks.forEach(l => {
        l.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
        l.classList.add('text-secondary');
        if (hash && l.getAttribute('href') === hash) {
            l.classList.replace('text-secondary', 'text-primary');
            l.classList.add('font-bold', 'border-b-2', 'border-primary', 'pb-1');
            // brief pulse for visual feedback
            l.classList.add('nav-pulse');
            l.addEventListener('animationend', () => l.classList.remove('nav-pulse'), { once: true });
        }
    });
}

// Intercept internal anchor clicks to apply offset and animations
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });

        // add a short highlight to the target section
        target.classList.add('animate-highlight');
        window.setTimeout(() => target.classList.remove('animate-highlight'), 900);

        // update nav active state immediately
        updateNavActive(href);
    });
});

// Update nav active on scroll (consider nav height)
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll('section[id]');
    const navHeight = nav ? nav.offsetHeight : 0;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - (navHeight + 20);
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    updateNavActive(current ? '#' + current : null);
});

// Scroll to top when clicking the brand title
const brandReload = document.querySelector('#brand-reload');
if (brandReload) {
    brandReload.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        desktopMenu.classList.add('hidden'); // Close desktop menu if open
    });
    
    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Desktop "Más" menu toggle
const desktopMenuBtn = document.querySelector('#desktop-menu-btn');
const desktopMenu = document.querySelector('#desktop-menu');
if (desktopMenuBtn && desktopMenu) {
    desktopMenuBtn.addEventListener('click', () => {
        desktopMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking on a link
    desktopMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            desktopMenu.classList.add('hidden');
        });
    });
}



