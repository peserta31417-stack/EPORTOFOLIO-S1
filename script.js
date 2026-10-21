// Page Navigation System
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');

        // Scroll to top of page
        window.scrollTo(0, 0);
    }
}

// Toggle Navigation Menu
function toggleNavMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Close nav menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Show specific reflection page
function showReflection(courseId) {
    const reflectionPageId = 'reflection-' + courseId;
    showPage(reflectionPageId);
}

// Initialize - ensure homepage is shown on load
document.addEventListener('DOMContentLoaded', function() {
    // Show homepage by default
    showPage('homepage');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Escape key to return to homepage
    if (event.key === 'Escape') {
        showPage('homepage');
    }

    // Arrow keys for reflection navigation
    const currentPage = document.querySelector('.page.active');
    if (currentPage && currentPage.id.includes('reflection-')) {
        const reflectionPages = [
            'reflection-filosofi',
            'reflection-ppl',
            'reflection-peserta-didik',
            'reflection-growth-mindset',
            'reflection-pembelajaran-mendalam',
            'reflection-computational-thinking'
        ];
        const currentIndex = reflectionPages.indexOf(currentPage.id);

        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            showPage(reflectionPages[currentIndex - 1]);
        } else if (event.key === 'ArrowRight' && currentIndex < reflectionPages.length - 1) {
            showPage(reflectionPages[currentIndex + 1]);
        }
    }
});

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add touch/swipe support for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartX - touchEndX;
    
    // Swipe right to go back to navigation
    if (diff < -swipeThreshold) {
        const currentPage = document.querySelector('.page.active');
        if (currentPage && currentPage.id.includes('reflection-')) {
            showPage('navigation');
        }
    }
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add hover effect for course cards
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Accessibility improvements
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-blue)';
        this.style.outlineOffset = '2px';
    });
    
    button.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Print-friendly styles
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});
