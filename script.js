(function () {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navMobile.hidden = open;
    document.body.style.overflow = open ? "" : "hidden";
  });

  navMobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMobile.hidden = true;
      document.body.style.overflow = "";
    });
  });

  document.querySelectorAll(".reveal").forEach((el) => {
    const delay = el.dataset.delay;
    if (delay) {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
  );

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewHeight * 0.95 && rect.bottom > 0) {
      el.classList.add("is-visible");
    }
    observer.observe(el);
  });

  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        const photo = heroVisual.querySelector(".hero-photo");
        if (photo && y < window.innerHeight) {
          const rotate = 6 - (y / window.innerHeight) * 5;
          photo.style.transform = `rotateX(${rotate}deg) translateY(${y * 0.06}px)`;
        }
      },
      { passive: true }
    );
  }
})();
