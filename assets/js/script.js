
        // Initialize AOS
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        });

        // Preloader
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 1000);
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');

        if (localStorage.getItem('theme') === 'dark' ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
            document.body.classList.add('dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark');

            if (document.body.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });

        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Back to Top
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            const backToTop = document.querySelector('.back-to-top');

            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                if (document.body.classList.contains('dark')) {
                    header.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
                }
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                if (document.body.classList.contains('dark')) {
                    header.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
                }
            }

            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        document.querySelector('.back-to-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ============================================================
        // SWIPER - PROJECTS
        // ============================================================
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            navigation: {
                nextEl: '.next-arrow',
                prevEl: '.prev-arrow',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
            on: {
                init: function() { toggleProjectArrows(this); },
                slideChange: function() { toggleProjectArrows(this); }
            }
        });

        function toggleProjectArrows(swiper) {
            const prev = document.querySelector('.prev-arrow');
            const next = document.querySelector('.next-arrow');
            prev.style.opacity = swiper.isBeginning ? '0.3' : '1';
            next.style.opacity = swiper.isEnd ? '0.3' : '1';
        }

        // ============================================================
        // SWIPER - CERTIFICATIONS
        // ============================================================
        const certSwiper = new Swiper('.myCertSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            navigation: {
                nextEl: '.next-cert',
                prevEl: '.prev-cert',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
            on: {
                init: function() { toggleCertArrows(this); },
                slideChange: function() { toggleCertArrows(this); }
            }
        });

        function toggleCertArrows(swiper) {
            const prev = document.querySelector('.prev-cert');
            const next = document.querySelector('.next-cert');
            prev.style.opacity = swiper.isBeginning ? '0.3' : '1';
            next.style.opacity = swiper.isEnd ? '0.3' : '1';
        }

        // ============================================================
        // PDF MODAL - Professional Certificate Viewer
        // ============================================================
        let currentPDFUrl = '';

        function openPDFModal(pdfUrl, title) {
            currentPDFUrl = pdfUrl;
            const modal = document.getElementById('pdfModalOverlay');
            const viewer = document.getElementById('pdfViewer');
            const titleEl = document.getElementById('pdfModalTitle');
            const downloadBtn = document.getElementById('pdfDownloadBtn');
            const openBtn = document.getElementById('pdfOpenNewTab');

            // Set title
            titleEl.textContent = title || 'Certificate';

            // Set PDF viewer
            viewer.src = pdfUrl;

            // Set download link
            downloadBtn.href = pdfUrl;

            // Set open in new tab link
            openBtn.href = pdfUrl;

            // Show modal
            modal.classList.add('active');
            document.body.classList.add('modal-open');

            // Disable body scroll
            document.body.style.overflow = 'hidden';
        }

        function closePDFModal(event) {
            // If event is passed and target is overlay, close
            if (event && event.target !== event.currentTarget) return;

            const modal = document.getElementById('pdfModalOverlay');
            const viewer = document.getElementById('pdfViewer');

            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';

            // Clear viewer after animation
            setTimeout(() => {
                viewer.src = '';
            }, 300);
        }

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePDFModal();
            }
        });

        // Close on overlay click (handled by onclick on overlay)

        // ============================================================
        // CONTACT FORM
        // ============================================================
        const contactForm = document.getElementById('contactForm');
        const toast = document.getElementById('toastMessage');

        function showToast(message, isSuccess = true) {
            toast.textContent = message;
            toast.style.backgroundColor = isSuccess ? '#28a745' : '#dc3545';
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
            toast.style.pointerEvents = 'auto';

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-20px)';
                toast.style.pointerEvents = 'none';
            }, 4000);
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showToast('✅ Your message has been sent successfully!', true);
                    contactForm.reset();
                } else {
                    showToast('❌ Oops! Something went wrong. Try again.', false);
                }
            } catch (error) {
                showToast('❌ Oops! Something went wrong. Try again.', false);
            }
        });

        // Logo click refresh
        document.querySelector('.logo').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = window.location.origin + window.location.pathname;
        });
   