// Main page interactions
document.addEventListener('DOMContentLoaded', () => {
    // Button click handler
    const discoverBtn = document.querySelector('.hero button');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', () => {
            window.location.href = 'activities.html';
        });
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#login' && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .activity-card, .event-box').forEach(el => {
        observer.observe(el);
    });
});
