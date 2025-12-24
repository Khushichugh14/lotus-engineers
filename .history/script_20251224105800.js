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



  