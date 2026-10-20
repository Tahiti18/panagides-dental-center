document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                // Keep scrolled layout for pages like blog/post if they have scrolled class hardcoded
                if (!header.classList.contains('header-blog-fixed')) {
                    // Check if it's not index.html
                    const path = window.location.pathname;
                    if (path.includes('blog.html') || path.includes('blog-post.html')) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
            }
        });
        
        // Initial check for non-home pages
        const path = window.location.pathname;
        if (path.includes('blog.html') || path.includes('blog-post.html')) {
            header.classList.add('scrolled');
        }
    }

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
        
        // Close menu on link click (mobile)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fa-solid fa-bars';
                    }
                }
            });
        });
    }

    // 3. Hero Slider (Home Page Only)
    const slides = document.querySelectorAll('#hero .slide');
    const dotsContainer = document.getElementById('dots-container');
    if (slides.length > 0 && dotsContainer) {
        let currentSlide = 0;
        let slideInterval;

        // Generate Dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }

        startSlideInterval();
    }

    // 4. Testimonials Carousel Autoplay
    const carouselTrack = document.getElementById('carousel-track');
    const carouselDotsContainer = document.getElementById('carousel-dots');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    
    if (carouselTrack && carouselDotsContainer && testimonialSlides.length > 0) {
        let currentTrackSlide = 0;
        let trackInterval;

        // Generate dots
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Testimonial slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToTrackSlide(index);
                resetTrackInterval();
            });
            carouselDotsContainer.appendChild(dot);
        });

        const trackDots = document.querySelectorAll('.carousel-dot');

        function goToTrackSlide(index) {
            currentTrackSlide = (index + testimonialSlides.length) % testimonialSlides.length;
            carouselTrack.style.transform = `translateX(-${currentTrackSlide * 100}%)`;
            
            trackDots.forEach((dot, idx) => {
                if (idx === currentTrackSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextTrackSlide() {
            goToTrackSlide(currentTrackSlide + 1);
        }

        function startTrackInterval() {
            trackInterval = setInterval(nextTrackSlide, 6000);
        }

        function resetTrackInterval() {
            clearInterval(trackInterval);
            startTrackInterval();
        }

        startTrackInterval();
    }

    // 5. Biography Accordion Toggles
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // 6. Request Appointment Form Validator & Toast Alert
    const appointmentForm = document.getElementById('appointment-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (appointmentForm && toast && toastMessage) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const surname = document.getElementById('surname').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (!name || !surname || !telephone) {
                showToast("Please fill in all required fields marked with an asterisk (*).", "error");
                return;
            }
            
            // Simple Phone validation
            if (telephone.length < 8) {
                showToast("Please enter a valid telephone contact number.", "error");
                return;
            }
            
            // Simple Email validation if provided
            if (email && !validateEmail(email)) {
                showToast("Please enter a valid email address structure.", "error");
                return;
            }

            // Success trigger
            showToast(`Thank you ${name}! Appointment request submitted successfully. We will contact you soon.`, "success");
            appointmentForm.reset();
        });
        
        function showToast(message, type = "success") {
            toastMessage.textContent = message;
            const toastIcon = toast.querySelector('i');
            
            if (type === "error") {
                toast.style.borderLeftColor = "#ef4444";
                if(toastIcon) toastIcon.className = "fa-solid fa-circle-exclamation";
                if(toastIcon) toastIcon.style.color = "#ef4444";
            } else {
                toast.style.borderLeftColor = "var(--secondary)";
                if(toastIcon) toastIcon.className = "fa-solid fa-circle-check";
                if(toastIcon) toastIcon.style.color = "var(--secondary)";
            }
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
        
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }

    // 7. Scroll Reveal Trigger
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 8. Hash Scroll Corrector on Page Load
    if (window.location.hash) {
        const targetHash = window.location.hash;
        const scrollToHash = () => {
            const targetElement = document.querySelector(targetHash);
            if (targetElement) {
                // Force reveal target element if it has reveal class so height is computed correctly
                if (targetElement.classList.contains('reveal')) {
                    targetElement.classList.add('active');
                }
                
                // Also force reveal elements above it if they are reveal elements, to prevent layout shifts
                let sibling = targetElement.previousElementSibling;
                while (sibling) {
                    if (sibling && sibling.classList && sibling.classList.contains('reveal')) {
                        sibling.classList.add('active');
                    }
                    sibling = sibling.previousElementSibling;
                }

                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };

        // Scroll on load after layout settles
        window.addEventListener('load', () => {
            setTimeout(scrollToHash, 250);
        });
    }
});
