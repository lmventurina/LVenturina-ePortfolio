// Initialize Icons
lucide.createIcons();

// Set Current Year
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
let isMenuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Scroll Logic
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
    // Close mobile menu if open
    if(isMenuOpen) {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
}

// Active Section Highlighter
const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education'];
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
            current = section;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'font-bold');
        link.classList.add('text-slate-600');
        if (link.getAttribute('data-target') === current) {
            link.classList.remove('text-slate-600');
            link.classList.add('text-blue-600', 'font-bold');
        }
    });

    mobileNavLinks.forEach(link => {
        link.classList.remove('border-blue-600', 'text-blue-600', 'bg-blue-50');
        link.classList.add('border-transparent', 'text-slate-600');
        if (link.getAttribute('data-target') === current) {
            link.classList.remove('border-transparent', 'text-slate-600');
            link.classList.add('border-blue-600', 'text-blue-600', 'bg-blue-50');
        }
    });
});
