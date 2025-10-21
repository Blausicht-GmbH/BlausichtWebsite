window.addScrollListener = function (dotNetHelper) {
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        dotNetHelper.invokeMethodAsync('OnWindowScroll', scrollTop);
    });
}

// Smooth scrolling für mobile Navigation
window.smoothScrollToSection = function (sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event Listener für Navigation Links
document.addEventListener('click', function (e) {
    // Prüfe ob das geklickte Element ein Link mit # href ist
    const link = e.target.closest('a[href^="#"]');

    if (link) {
        console.log('Navigation Link Clicked:', link.getAttribute('href'));

        const href = link.getAttribute('href');

        if (href && href !== '#' && href.length > 1) {
            e.preventDefault();

            // Einfach: Immer den Toggler-Button "klicken" um Menü zu schließen
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            // Prüfe ob mobiles Menü sichtbar ist
            if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                navbarToggler.click();
            }

            // Smooth scroll zur Section
            setTimeout(() => {
                window.smoothScrollToSection(href);
            }, 300);
        }
    }
});