document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('heroNav');
    const compact = document.getElementById('compactNav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    /**
     * Toggles the visibility and position of the hero and compact navbars
     * based on scroll position.
     */
    function toggleNavbar() {
        const scrollY = window.scrollY;
        // If scrolled past 150px and compact nav is not active
        if (scrollY > 150 && !compact.classList.contains('active')) {
            compact.classList.add('active'); // Show compact nav
            hero.classList.add('hidden-hero'); // Hide hero section with transition
        } 
        // If scrolled back up and compact nav is active
        else if (scrollY <= 150 && compact.classList.contains('active')) {
            compact.classList.remove('active'); // Hide compact nav
            hero.classList.remove('hidden-hero'); // Show hero section with transition
        }
        lastScrollY = scrollY;
        ticking = false;
    }

    // Debounce scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                window.requestAnimationFrame(toggleNavbar);
                ticking = true;
            }, 50); // Adjust debounce time as needed
        }
    });

    // Mobile menu toggle for both navbars
    document.querySelectorAll('.mobile-menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Find the closest parent nav and then its menu
            const menu = btn.closest('nav').querySelector('.menu');
            if (menu) {
                menu.classList.toggle('active');
            }
        });
    });

    // Slider functionality
    const slider = document.getElementById('slider');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    /**
     * Displays the specified slide and updates the active dot.
     * @param {number} index - The index of the slide to show.
     */
    function showSlide(index) {
        // Calculate the translation percentage based on the slide index and total slides (3)
        slider.style.transform = `translateX(-${index * 100 / 3}%)`;
        // Remove 'active' class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        // Add 'active' class to the current dot
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Add click event listeners to slider dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-slide'), 10);
            showSlide(index);
        });
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % dots.length;
        showSlide(nextSlide);
    }, 5000);


    // FAQ Section Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-question-toggle');
        const answer = item.querySelector('.faq-answer');
        const icon = toggle.querySelector('span');

        toggle.addEventListener('click', () => {
            // Toggle the 'active' class to expand/collapse the answer
            answer.classList.toggle('active');

            // Change the icon from '+' to '-' and vice-versa
            if (answer.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });
});
  document.addEventListener('DOMContentLoaded', () => {
            const tabs = document.querySelectorAll('.search-tabs .tab');

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove 'active' class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));

                    // Add 'active' class to the clicked tab
                    this.classList.add('active');

                    // You can add more logic here later, e.g., to load content
                    console.log(`Clicked on: ${this.textContent}`);
                });
            });
        });