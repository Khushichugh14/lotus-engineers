document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);

      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");

      if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
      }

      const setActiveLink = () => {
        const links = document.querySelectorAll('#nav-links a');
        if (!links.length) return;
        const path = window.location.pathname;
        let current = path.split('/').pop();
        if (!current || current === '') current = 'index.html';
        links.forEach(a => {
          const href = a.getAttribute('href');
          const last = (href || '').split('/').pop();
          if (last === current) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      };

      setActiveLink();
    })
    .catch(err => console.error("Error loading navbar:", err));

  const existingFooter = document.querySelector(".footer");
  if (!existingFooter) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => {
        document.body.insertAdjacentHTML("beforeend", html);
      })
      .catch(err => console.error("Error loading footer:", err));
  }
});
