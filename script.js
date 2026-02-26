/* ═══════════════════════════════════════════════
   ANTHONEX TECHNOLOGY — script.js
   ═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. STICKY HEADER — adds shadow on scroll
   ───────────────────────────────────────────── */
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ─────────────────────────────────────────────
   2. MOBILE MENU — toggle open/close
   ───────────────────────────────────────────── */
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('mobileMenu').classList.toggle('open');
});

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ─────────────────────────────────────────────
   3. SCROLL REVEAL — fade-in elements on scroll
   ───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

/* ─────────────────────────────────────────────
   4. DASHBOARD NAV TABS — active tab switching
   ───────────────────────────────────────────── */
document.querySelectorAll('.dash-nav span').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.dash-nav span').forEach(function (t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');
  });
});

/* ─────────────────────────────────────────────
   5. CONTACT FORM — validation + success message
   ───────────────────────────────────────────── */
function submitForm() {
  var name  = document.getElementById('fname').value.trim();
  var email = document.getElementById('femail').value.trim();

  // Basic validation
  if (!name || !email) {
    showFormError('Please fill in your name and email address.');
    return;
  }
  if (!isValidEmail(email)) {
    showFormError('Please enter a valid email address.');
    return;
  }

  // Show success message
  var success = document.getElementById('formSuccess');
  success.style.display = 'block';

  // Clear all fields
  var fieldIds = ['fname', 'femail', 'fbiz', 'fmsg', 'fphone', 'fstores'];
  fieldIds.forEach(function (id) {
    document.getElementById(id).value = '';
  });

  // Hide success after 6 seconds
  setTimeout(function () {
    success.style.display = 'none';
  }, 6000);
}

function showFormError(message) {
  alert(message);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─────────────────────────────────────────────
   6. NEWSLETTER — email subscribe
   ───────────────────────────────────────────── */
function subscribeNewsletter() {
  var email = document.getElementById('nlEmail').value.trim();

  if (!email || !isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Clear input and show confirmation
  document.getElementById('nlEmail').value = '';
  alert("✅ You're subscribed! Welcome to the Anthonex community.");
}

/* ─────────────────────────────────────────────
   7. ACTIVE NAV HIGHLIGHTING — highlight
      current section link in the navbar
   ───────────────────────────────────────────── */
var sections  = document.querySelectorAll('section[id]');
var navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  var current = '';

  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === '#' + current) {
      link.style.color      = 'var(--navy)';
      link.style.fontWeight = '600';
    } else {
      link.style.color      = '';
      link.style.fontWeight = '';
    }
  });
}, { passive: true });

/* ─────────────────────────────────────────────
   8. CLOSE MOBILE MENU on outside click
   ───────────────────────────────────────────── */
document.addEventListener('click', function (e) {
  var menu      = document.getElementById('mobileMenu');
  var hamburger = document.getElementById('hamburger');

  if (
    menu.classList.contains('open') &&
    !menu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menu.classList.remove('open');
  }
});

/* ─────────────────────────────────────────────
   9. SMOOTH ANCHOR SCROLL with offset for
      fixed header height
   ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var headerHeight = document.getElementById('header').offsetHeight;
      var targetTop    = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});
