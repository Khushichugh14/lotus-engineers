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
     // ================= ACTIVE LINK HANDLING =================
navItems.forEach(link => {
  link.addEventListener("click", () => {
    // remove active from all
    navItems.forEach(l => l.classList.remove("active"));

    // add active only to clicked
    link.classList.add("active");

    
  });
});

// On page load (refresh / direct URL)
const path = window.location.pathname.split("/").pop() || "index.html";
navItems.forEach(link => {
  const href = link.getAttribute("href")?.split("/").pop();
  if (href === path) {
    link.classList.add("active");
  }
});
    })

  // Footer (unchanged)
  if (!document.querySelector(".footer")) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => document.body.insertAdjacentHTML("beforeend", html))
      .catch(err => console.error("Error loading footer:", err));
  }
});
