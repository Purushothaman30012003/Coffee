/* ===== Coffee Bliss – JavaScript ===== */
document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.getElementById("mainNav");
  const navMenu = document.getElementById("navMenu");
  const backToTop = document.getElementById("backToTop");

  /* 1. Smooth scrolling is handled by CSS (scroll-behavior: smooth).
        Here we also close the mobile menu after a link is clicked. */
  document.querySelectorAll("#navMenu .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

  /* 2. Shrink navbar + show back-to-top button while scrolling.
        (Active link highlighting is done by Bootstrap ScrollSpy in index.html.) */
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 50);
    backToTop.classList.toggle("show", y > 400);
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* 3. Back-to-top button */
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* 4. Scroll animations: fade elements in when they enter the screen */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("visible"); });
  }

  /* 5. "Order Now" buttons show a small confirmation toast */
  const toastEl = document.getElementById("orderToast");
  const toastText = document.getElementById("orderToastText");
  document.querySelectorAll(".order-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toastText.textContent = btn.dataset.item + " added to your order!";
      bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2500 }).show();
    });
  });

  /* 6. Contact form validation */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  form.addEventListener("submit", function (event) {
    event.preventDefault();          // stop the page from reloading
    success.classList.add("d-none");

    let valid = true;
    form.querySelectorAll("input, textarea").forEach(function (field) {
      // checkValidity() uses the required / minlength / pattern / type rules in the HTML
      const ok = field.checkValidity() && field.value.trim() !== "";
      field.classList.toggle("is-invalid", !ok);
      field.classList.toggle("is-valid", ok);
      if (!ok) valid = false;
    });

    if (valid) {
      success.classList.remove("d-none");   // success message
      success.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();
      form.querySelectorAll(".is-valid").forEach(function (f) { f.classList.remove("is-valid"); });
    }
  });

  // Clear the red/green state as the user types again
  form.querySelectorAll("input, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.classList.contains("is-invalid") && field.checkValidity()) {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      }
    });
  });
});
