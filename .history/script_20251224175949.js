// Mobile menu toggle

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}



const testimonials = document.querySelector('.testimonials');
if ('IntersectionObserver' in window && testimonials) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        testimonials.classList.add('visible');
      } else {
        testimonials.classList.remove('visible');
      }
    });
  }, { threshold: 0.3 });
  io.observe(testimonials);
}

// Back to Top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

  