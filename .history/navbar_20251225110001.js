document.addEventListener("DOMContentLoaded", () => {

  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);

      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      const navItems = document.querySelectorAll("#nav-links a");

      /* ================= BACKDROP ================= */
      const backdrop = document.createElement("div");
      backdrop.className = "mobile-backdrop";
      document.body.appendChild(backdrop);

      /* ================= TOGGLE MENU ================= */
      menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        backdrop.classList.toggle("active");
      });

      const closeMenu = () => {
        navLinks.classList.remove("active");
        backdrop.classList.remove("active");
      };

      backdrop.addEventListener("click", closeMenu);

      /* ================= ACTIVE LINK HANDLING ================= */
    const navItems = document.querySelectorAll("#nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navItems.forEach(link => {
  const href = link.getAttribute("href");

  link.classList.remove("active");

  if (href === currentPage) {
    link.classList.add("active");
  }

  link.addEventListener("click", () => {
    navItems.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    document.getElementById("nav-links")?.classList.remove("active");
    document.querySelector(".mobile-backdrop")?.classList.remove("active");
  });
});


      /* ================= PRODUCT SEARCH ================= */
      const searchInput = document.getElementById("productSearch");

      if (searchInput && window.location.pathname.includes("products")) {
        searchInput.addEventListener("input", () => {
          const query = searchInput.value.toLowerCase().trim();

          const catalog = document.querySelector(".catalog");
          const cards = document.querySelectorAll(".catalog .card");
          const categories = document.querySelectorAll(".category");

          if (!catalog || !cards.length) return;

          categories.forEach(sec => (sec.style.display = "none"));
          catalog.style.display = "block";

          cards.forEach(card => {
            const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
            const tag = card.querySelector(".tag")?.innerText.toLowerCase() || "";

            card.style.display =
              title.includes(query) || tag.includes(query)
                ? "block"
                : "none";
          });

          if (query === "") {
            cards.forEach(card => (card.style.display = "block"));
          }
        });
      }
    });

  /* ================= FOOTER ================= */
  if (!document.querySelector(".footer")) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => document.body.insertAdjacentHTML("beforeend", html))
      .catch(err => console.error("Footer load error:", err));
  }
});
