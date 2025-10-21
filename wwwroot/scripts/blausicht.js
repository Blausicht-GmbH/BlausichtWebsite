window.addScrollListener = function (dotNetHelper) {
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        dotNetHelper.invokeMethodAsync('OnWindowScroll', scrollTop);
    });
}

// Smooth scrolling f�r mobile Navigation
window.smoothScrollToSection = function (sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event Listener f�r Navigation Links
document.addEventListener('click', function (e) {
    // Pr�fe ob das geklickte Element ein Link mit # href ist
    const link = e.target.closest('a[href^="#"]');

    if (link) {
        console.log('Navigation Link Clicked:', link.getAttribute('href'));

        const href = link.getAttribute('href');

        if (href && href !== '#' && href.length > 1) {
            e.preventDefault();

            // Einfach: Immer den Toggler-Button "klicken" um Men� zu schlie�en
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            // Pr�fe ob mobiles Men� sichtbar ist
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