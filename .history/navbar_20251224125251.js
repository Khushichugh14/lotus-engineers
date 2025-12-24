document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);

      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      const navItems = document.querySelectorAll("#nav-links a");

      if (!menuToggle || !navLinks) return;

      /* ==========================
         INITIAL STATE
      ========================== */
      navLinks.classList.remove("active");

      /* ==========================
         BACKDROP (CREATE ONCE)
      ========================== */
      let backdrop = document.querySelector(".mobile-backdrop");
      if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "mobile-backdrop";
        document.body.appendChild(backdrop);
      }

      /* ==========================
         OPEN / CLOSE SIDEBAR
      ========================== */
      const openMenu = () => {
        navLinks.classList.add("active");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden"; // lock scroll
      };

      const closeMenu = () => {
        navLinks.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = ""; // unlock scroll
      };

      /* ==========================
         EVENTS
      ========================== */
      menuToggle.addEventListener("click", () => {
        navLinks.classList.contains("active") ? closeMenu() : openMenu();
      });

      backdrop.addEventListener("click", closeMenu);
      navItems.forEach(link => link.addEventListener("click", closeMenu));

      /* ==========================
         ACTIVE LINK HIGHLIGHT
      ========================== */
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

      navItems.forEach(link => {
        const href = link.getAttribute("href")?.split("/").pop();
        link.classList.toggle("active", href === currentPage);
      });
    })
    .catch(err => console.error("Error loading navbar:", err));

  /* ==========================
     FOOTER LOAD (UNCHANGED)
  ========================== */
  if (!document.querySelector(".footer")) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => {
        document.body.insertAdjacentHTML("beforeend", html);
      })
      .catch(err => console.error("Error loading footer:", err));
  }
});
