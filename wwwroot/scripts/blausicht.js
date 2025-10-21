window.addScrollListener = function (dotNetHelper) {
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        dotNetHelper.invokeMethodAsync('OnWindowScroll', scrollTop);
    });
}

// Event Listener für Navigation Links
document.addEventListener('click', function (e) {
    // Prüfe ob das geklickte Element ein Link mit data-scroll-target ist
    const link = e.target.closest('a[data-scroll-target]');

    if (link) {
        e.preventDefault(); // Verhindere die Standard-Navigation

        bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNav'))?.hide();

        const scrollTarget = link.getAttribute('data-scroll-target');
        console.log('Navigation Link Clicked - Scroll to:', scrollTarget);

        if (scrollTarget) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            // Prüfe ob mobiles Menü sichtbar ist
            if (navbarToggler &&
                window.getComputedStyle(navbarToggler).display !== 'none' &&
                navbarCollapse &&
                navbarCollapse.classList.contains('show')
            ) {
                // Schließe das mobile Menü
                navbarToggler.click();

                // Warte bis das Menü geschlossen ist, dann scrolle
                setTimeout(() => {
                    window.smoothScrollToSection(scrollTarget);
                }, 150);
            } else {
                // Desktop - scrolle sofort
                window.smoothScrollToSection(scrollTarget);
            }
        }
    }
});

// Smooth scrollinG
window.smoothScrollToSection = function (sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}