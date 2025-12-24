document.addEventListener("DOMContentLoaded", () => {

  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);

      /* ================= NAVBAR LOGIC ================= */
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      const navItems = document.querySelectorAll("#nav-links a");

      navLinks.classList.remove("active");

      const backdrop = document.createElement("div");
      backdrop.className = "mobile-backdrop";
      document.body.appendChild(backdrop);

      menuToggle.addEventListener("click", () => {
        navLinks.classList.add("active");
        backdrop.classList.add("active");
      });

      const closeMenu = () => {
        navLinks.classList.remove("active");
        backdrop.classList.remove("active");
      };

      backdrop.addEventListener("click", closeMenu);
      navItems.forEach(link => link.addEventListener("click", closeMenu));

      navItems.forEach(link => {
        link.addEventListener("click", () => {
          navItems.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        });
      });

      const path = window.location.pathname.split("/").pop() || "index.html";
      navItems.forEach(link => {
        const href = link.getAttribute("href")?.split("/").pop();
        if (href === path) link.classList.add("active");
      });

      /* ================= PRODUCT SEARCH (FIXED) ================= */
      const searchInput = document.getElementById("productSearch");

      if (searchInput && window.location.pathname.includes("products")) {
        searchInput.addEventListener("input", () => {
          const query = searchInput.value.toLowerCase().trim();

          const catalog = document.querySelector(".catalog");
          const cards = document.querySelectorAll(".catalog .card");
          const categories = document.querySelectorAll(".category");

          if (!catalog || !cards.length) return;

          // Hide all category sections
          categories.forEach(sec => sec.style.display = "none");

          // Always show catalog during search
          catalog.style.display = "block";

          cards.forEach(card => {
            const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
            const tag = card.querySelector(".tag")?.innerText.toLowerCase() || "";

            if (title.includes(query) || tag.includes(query)) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });

          // Reset when cleared
          if (query === "") {
            cards.forEach(card => card.style.display = "block");
            window.location.hash = "";
          }
        });
      }
    });

  /* ================= FOOTER ================= */
  if (!document.querySelector(".footer")) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => document.body.insertAdjacentHTML("beforeend", html))
      .catch(err => console.error("Error loading footer:", err));
  }

});
