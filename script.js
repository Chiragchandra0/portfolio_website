document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Typing Animation
    const typingTextElement = document.getElementById('typing-text');
    const textToType = "I build cool things for the web.";
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }
    type();

    // Starfield Background
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let numStars;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Adjust star density based on screen size
        numStars = Math.floor((canvas.width * canvas.height) / 7000);
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.5, // Stars are not too transparent
                speed: Math.random() * 0.2 + 0.1,
                twinkleSpeed: Math.random() * 0.015,
                twinkleDirection: 1,
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < numStars; i++) {
            let star = stars[i];
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        }
    }

    function updateStars() {
        for (let i = 0; i < numStars; i++) {
            let star = stars[i];
            // Drifting effect
            star.y -= star.speed;
            if (star.y < 0) {
                star.x = Math.random() * canvas.width;
                star.y = canvas.height;
            }

            // Twinkling effect
            star.alpha += star.twinkleSpeed * star.twinkleDirection;
            if (star.alpha > 1 || star.alpha < 0.2) {
                star.twinkleDirection *= -1;
            }
        }
    }

    function animateStars() {
        updateStars();
        drawStars();
        requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', () => {
        setCanvasSize();
        createStars();
    });

    setCanvasSize();
    createStars();
    animateStars();

    // Animate on Scroll
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll behavior
    const body = document.body;
    const homeSection = document.getElementById('home');
    window.addEventListener('scroll', () => {
        if (window.scrollY > homeSection.offsetHeight - 50) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
        }
    });

    // Project Slider
    const sliderWrapper = document.getElementById('project-slider-wrapper');
    const slides = document.querySelectorAll('#projects .slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    document.getElementById('next-slide').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSliderPosition();
    });

    document.getElementById('prev-slide').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
    });

    function updateSliderPosition() {
        const offset = -currentSlide * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    }

    // Education Slider
    const eduContentSlides = document.querySelectorAll('.education-content');
    const totalEduSlides = eduContentSlides.length;
    let currentEduSlide = 0;

    document.getElementById('next-edu-slide').addEventListener('click', () => {
        currentEduSlide = (currentEduSlide + 1) % totalEduSlides;
        updateEduSliderContent();
    });

    document.getElementById('prev-edu-slide').addEventListener('click', () => {
        currentEduSlide = (currentEduSlide - 1 + totalEduSlides) % totalEduSlides;
        updateEduSliderContent();
    });

    function updateEduSliderContent() {
        eduContentSlides.forEach((slide, index) => {
            if (index === currentEduSlide) {
                slide.classList.remove('hidden');
                setTimeout(() => slide.classList.add('active'), 10);
            } else {
                slide.classList.remove('active');
                // Wait for fade out before hiding
                setTimeout(() => slide.classList.add('hidden'), 500);
            }
        });
    }
    
    // Initialize first education slide
    updateEduSliderContent();


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});