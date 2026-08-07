/* ==========================================================================
                          Transport Logistic — main.js
   Dynamic header height (exact-fit hero) · Page loader · Nav behaviour
   GSAP scroll reveals · counters · accordion · carousel · ripple · forms
   project filter · pricing toggle
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---------------- Dynamic header height (drives the exact-fit hero) ---------------- */
  const announceBar = document.getElementById("announce-bar");
  const siteNav = document.getElementById("site-nav");
  const setHeaderHeightVar = () => {
    const h =
      (announceBar ? announceBar.offsetHeight : 0) +
      (siteNav ? siteNav.offsetHeight : 0);
    if (h > 0)
      document.documentElement.style.setProperty("--header-h", h + "px");
  };
  setHeaderHeightVar();
  window.addEventListener("resize", setHeaderHeightVar);
  if (window.ResizeObserver) {
    const headerObserver = new ResizeObserver(setHeaderHeightVar);
    if (announceBar) headerObserver.observe(announceBar);
    if (siteNav) headerObserver.observe(siteNav);
  }

  /* ---------------- Page loader ---------------- */
  const loader = document.getElementById("page-loader");
  if (loader) {
    const hideAfter = reduceMotion ? 150 : 1100;
    window.setTimeout(() => {
      loader.classList.add("is-hidden");
      window.setTimeout(
        () => {
          loader.style.display = "none";
        },
        reduceMotion ? 0 : 450,
      );
    }, hideAfter);
  }

  /* ---------------- Sticky nav + scroll progress + back to top ---------------- */
  const nav = document.getElementById("site-nav");
  const progress = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (nav) nav.classList.toggle("scrolled", scrollTop > 24);
    if (progress) progress.style.width = pct + "%";
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  /* ---------------- Mobile menu ---------------- */
  const menuBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  menuBtn?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
    document.getElementById("icon-burger")?.classList.toggle("hidden", isOpen);
    document.getElementById("icon-close")?.classList.toggle("hidden", !isOpen);
  });
  mobileMenu?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
    }),
  );

  /* ---------------- Active nav link (highlight current page) ---------------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .mobile-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---------------- GSAP setup ---------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);

    if (!reduceMotion) {
      /* Generic reveal system: any element with data-reveal="up|fade|scale|left|right|blur" */
      const map = {
        up: "reveal-up",
        fade: "reveal-fade",
        scale: "reveal-scale",
        left: "reveal-left",
        right: "reveal-right",
        blur: "reveal-blur",
      };
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        const type = el.getAttribute("data-reveal") || "up";
        el.classList.add(map[type] || "reveal-up");
      });

      document.querySelectorAll("[data-reveal]").forEach((el, i) => {
        const groupDelay = el.hasAttribute("data-stagger") ? (i % 6) * 0.1 : 0;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          delay: groupDelay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      /* Hero load-in sequence */
      gsap.timeline({ defaults: { ease: "power3.out" } }).to(
        "[data-hero-item]",
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.14,
        },
        0.15,
      );

      /* Parallax hero background */
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* Route line draw-on-scroll */
      document.querySelectorAll(".route-line-path").forEach((path) => {
        const len = path.getTotalLength ? path.getTotalLength() : 1000;
        gsap.set(path, { strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: path.closest("svg") || path,
            start: "top 85%",
            end: "bottom 40%",
            scrub: true,
          },
        });
      });

      /* Route node glide (small plane/ship icon travels along a motion path) */
      document.querySelectorAll("[data-route-node]").forEach((node) => {
        const pathEl = node.closest("svg")?.querySelector(".route-line-path");
        if (pathEl && window.MotionPathPlugin) {
          gsap.to(node, {
            motionPath: {
              path: pathEl,
              align: pathEl,
              alignOrigin: [0.5, 0.5],
            },
            scrollTrigger: {
              trigger: pathEl,
              start: "top 85%",
              end: "bottom 40%",
              scrub: true,
            },
          });
        }
      });
    } else {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
    }
  } else {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = 1;
    });
  }

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll("[data-counter]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter"));
        const decimals = el.getAttribute("data-decimals")
          ? parseInt(el.getAttribute("data-decimals"))
          : 0;
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1800;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = val.toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.4 },
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------------- Skill / progress bars ---------------- */
  const bars = document.querySelectorAll("[data-skill]");
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const fill = entry.target.querySelector(".skill-fill");
        if (fill)
          fill.style.width = entry.target.getAttribute("data-skill") + "%";
        barObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );
  bars.forEach((b) => barObserver.observe(b));

  /* ---------------- Accordion (FAQ) ---------------- */
  document.querySelectorAll(".accordion-item").forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    trigger?.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      item
        .closest("[data-accordion-group]")
        ?.querySelectorAll(".accordion-item")
        .forEach((i) => {
          i.classList.remove("open");
          i.querySelector(".accordion-trigger")?.setAttribute(
            "aria-expanded",
            "false",
          );
        });
      if (!wasOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------------- Testimonial carousel ---------------- */
  const track = document.querySelector(".testi-track");
  if (track) {
    const slides = track.querySelectorAll(".testi-slide");
    let index = 0;
    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      document
        .querySelectorAll("[data-testi-dot]")
        .forEach((d, di) => d.classList.toggle("bg-orange-500", di === index));
    };
    document
      .querySelector("[data-testi-next]")
      ?.addEventListener("click", () => go(index + 1));
    document
      .querySelector("[data-testi-prev]")
      ?.addEventListener("click", () => go(index - 1));
    document
      .querySelectorAll("[data-testi-dot]")
      .forEach((d, di) => d.addEventListener("click", () => go(di)));
    let auto = setInterval(() => go(index + 1), 6000);
    track
      .closest("[data-testi-wrap]")
      ?.addEventListener("mouseenter", () => clearInterval(auto));
  }

  /* ---------------- Ripple effect on buttons ---------------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      const fromPointer = (e.clientX || e.clientY) && rect.width > 0;
      const originX = fromPointer ? e.clientX - rect.left : rect.width / 2;
      const originY = fromPointer ? e.clientY - rect.top : rect.height / 2;
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = originX - size / 2 + "px";
      ripple.style.top = originY - size / 2 + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ---------------- Project filter ---------------- */
  const filterBtns = document.querySelectorAll("[data-filter]");
  const filterItems = document.querySelectorAll("[data-category]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const val = btn.getAttribute("data-filter");
      filterItems.forEach((item) => {
        const match =
          val === "all" || item.getAttribute("data-category") === val;
        if (window.gsap) {
          gsap.to(item, {
            opacity: match ? 1 : 0,
            scale: match ? 1 : 0.9,
            duration: 0.35,
            onStart: () => {
              if (match) item.style.display = "";
            },
            onComplete: () => {
              if (!match) item.style.display = "none";
            },
          });
        } else {
          item.style.display = match ? "" : "none";
        }
      });
    });
  });

  /* ---------------- Pricing monthly/yearly toggle ---------------- */
  const priceToggle = document.getElementById("pricing-toggle");
  priceToggle?.addEventListener("click", () => {
    priceToggle.classList.toggle("yearly");
    const yearly = priceToggle.classList.contains("yearly");
    document.querySelectorAll("[data-price-monthly]").forEach((el) => {
      const monthly = el.getAttribute("data-price-monthly");
      const yearlyPrice = el.getAttribute("data-price-yearly");
      el.textContent = yearly ? yearlyPrice : monthly;
    });
    document.querySelectorAll("[data-price-period]").forEach((el) => {
      el.textContent = yearly ? "/year" : "/month";
    });
  });

  /* ---------------- Newsletter + contact form validation ---------------- */
  document.querySelectorAll("[data-validate-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[data-required]").forEach((field) => {
        const errorEl = field.parentElement.querySelector(".field-error");
        const isEmail = field.type === "email";
        const filled = field.value.trim().length > 0;
        const emailOk =
          !isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        const ok = filled && emailOk;
        field.classList.toggle("border-red-400", !ok);
        field.classList.toggle("border-gray-200", ok);
        if (errorEl) errorEl.classList.toggle("hidden", ok);
        if (!ok) valid = false;
      });
      const successEl = form.querySelector("[data-form-success]");
      if (valid) {
        form.reset();
        if (successEl) {
          successEl.classList.remove("hidden");
          setTimeout(() => successEl.classList.add("hidden"), 4000);
        }
      }
    });
  });

  /* ---------------- Current year in footer ---------------- */
  document
    .querySelectorAll("[data-year]")
    .forEach((el) => (el.textContent = new Date().getFullYear()));
});
