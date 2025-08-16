// ================= Dynamic Year =================
document.getElementById("year").textContent = new Date().getFullYear();

// ================= Skills Graph Animation =================
document.addEventListener("DOMContentLoaded", function () {
  const bars = document.querySelectorAll(".bar");
  const skillsSection = document.querySelector("#skills");

  function animateBars() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;
    if (sectionPos < screenPos - 100) {
      bars.forEach(bar => {
        let percent = bar.getAttribute("data-percent");
        bar.style.height = percent + "%";
      });
      window.removeEventListener("scroll", animateBars);
    }
  }
  window.addEventListener("scroll", animateBars);
});

// =================  Hero Section Animation =================


 document.addEventListener("DOMContentLoaded", function () {
  const lines = [
    { text: "It's me", id: "line1", speed: 20 },
    { text: "        Sunil Shinde", id: "line2", speed: 20 }, // spaces before text
    { text: "                Java Developer", id: "line3", speed: 20 } // more spaces
  ];

  let currentLine = 0;

  function typeLine(lineIndex) {
    const line = lines[lineIndex];
    const el = document.getElementById(line.id);
    let i = 0;

    function typing() {
      if (i < line.text.length) {
        el.textContent += line.text.charAt(i);
        i++;
        setTimeout(typing, line.speed);
      } else {
        el.classList.add("finished"); // remove cursor
        currentLine++;
        if (currentLine < lines.length) {
          setTimeout(() => typeLine(currentLine), 500); // start next line
        }
      }
    }
    typing();
  }

  typeLine(currentLine); // start typing first line
});


// ================= Fade-In Sections =================
const faders = document.querySelectorAll(".fade-in-section");
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => { appearOnScroll.observe(fader); });

// ================= Navbar Scroll Effect =================
window.addEventListener("scroll", function () {
  const nav = document.getElementById("topNav");
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

// ================= Typing Animation =================
const typingElement = document.querySelector(".typing");
const words = ["Welcome...", "Hello!", "नमस्ते!", "Welcome back!"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  const visibleText = currentWord.substring(0, charIndex);
  typingElement.textContent = visibleText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 80);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 200);
    }
  }
}
if (typingElement) typeEffect();

// Fade-in on scroll effect
const sections = document.querySelectorAll('.fade-in-section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});
