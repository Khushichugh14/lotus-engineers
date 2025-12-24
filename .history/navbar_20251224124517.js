document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);

      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      const navItems = document.querySelectorAll("#nav-links a");

      // Ensure menu is closed initially
      navLinks.classList.remove("active");

      // Backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "mobile-backdrop";
      document.body.appendChild(backdrop);

      // Open sidebar
      menuToggle.addEventListener("click", () => {
        navLinks.classList.add("active");
        backdrop.classList.add("active");
      });

      // Close sidebar
      const closeMenu = () => {
        navLinks.classList.remove("active");
        backdrop.classList.remove("active");
      };

      backdrop.addEventListener("click", closeMenu);
      navItems.forEach(link => link.addEventListener("click", closeMenu));

      // Active link highlight
      const path = window.location.pathname.split("/").pop() || "index.html";
      navItems.forEach(a => {
        const href = a.getAttribute("href")?.split("/").pop();
        a.classList.toggle("active", href === path);
      });
    })
    .catch(err => console.error("Error loading navbar:", err));

  // Footer (unchanged)
  if (!document.querySelector(".footer")) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => document.body.insertAdjacentHTML("beforeend", html))
      .catch(err => console.error("Error loading footer:", err));
  }
});
