(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById("hamburgerBtn");
  var mobileNav = document.getElementById("mobileNav");
  var body = document.body;

  function closeMenu() {
    mobileNav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Abrir menú");
    body.classList.remove("nav-locked");
  }

  function toggleMenu() {
    var isOpen = mobileNav.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    body.classList.toggle("nav-locked", isOpen);
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", toggleMenu);
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    // Only now do we opt into the animated (initially-hidden) state —
    // content already rendered visible by default in CSS.
    document.documentElement.classList.add("js-reveal");

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });

    // Safety net: if something goes wrong, never leave content hidden.
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }, 4000);
  }

  /* ---------- Active nav link on scroll (index sections) ---------- */
  var sectionIds = ["servicios", "nosotros", "contacto"];
  var navLinks = document.querySelectorAll('.nav-desktop a[href^="#"]');

  if ("IntersectionObserver" in window && navLinks.length) {
    var sectionEls = sectionIds
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var navIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navLinks.forEach(function (link) {
              var match = link.getAttribute("href") === "#" + id;
              link.classList.toggle("is-active", match);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionEls.forEach(function (el) { navIO.observe(el); });
  }
})();
