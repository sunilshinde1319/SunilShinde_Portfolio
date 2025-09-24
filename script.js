document.addEventListener("DOMContentLoaded", function () {
    
    // 1. THEME SWITCHER LOGIC
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Function to apply the saved theme on page load
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('light-mode');
            themeToggle.checked = false;
        }
    };

    // Event listener for the theme toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Apply theme when the page loads
    applySavedTheme();

    // 2. CUSTOM CURSOR
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 3. DYNAMIC YEAR IN FOOTER
    document.getElementById("year").textContent = new Date().getFullYear();

    // 4. NAVBAR SCROLL EFFECT
    const nav = document.getElementById("topNav");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // 5. DUAL TYPING ANIMATIONS
    function setupTypingEffect(elementSelector, words) {
        const typingElement = document.querySelector(elementSelector);
        if (!typingElement) return;

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const visibleText = isDeleting 
                ? currentWord.substring(0, charIndex--) 
                : currentWord.substring(0, charIndex++);

            typingElement.textContent = visibleText;

            if (!isDeleting && charIndex === currentWord.length + 1) {
                isDeleting = true;
                setTimeout(type, 2000); // Wait before deleting
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Wait before typing next word
            } else {
                const typingSpeed = isDeleting ? 75 : 120;
                setTimeout(type, typingSpeed);
            }
        }
        type();
    }

    // Initialize Hero Typing Effect
    setupTypingEffect(".hero-typing-effect", ["Java Developer", "Backend Engineer", "Full Stack Developer"]);
    
    // Initialize Navbar Typing Effect
    setupTypingEffect(".nav-typing-effect", ["Welcome...", "Hello!", "नमस्ते!", "Sunil Shinde"]);

    // 6. FADE-IN ANIMATION ON SCROLL
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // 7. VANILLA-TILT.JS FOR SKILL CARDS
    VanillaTilt.init(document.querySelectorAll(".skill-card"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
    
    // 8. SCROLLSPY FOR NAVBAR ACTIVE LINK
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#navMenu .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

});