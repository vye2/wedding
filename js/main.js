/* =====================================================================
   Victor & Ashley — Wedding Site
   Edit EVERYTHING editable from the CONFIG object below. No build step.
   ===================================================================== */

/* ------------------------------------------------------------------ *
 * CONFIG — the single source of truth. Change these values only.
 * ------------------------------------------------------------------ */
const CONFIG = {
  coupleNames: { partnerA: 'Victor', partnerB: 'Ashley' },
  fullNames: 'Victor Ye & Ashley Huynh',

  // PLACEHOLDER wedding date. Use ISO 8601 (local time). Update when confirmed.
  // The countdown below reads from this value.
  weddingDate: '2027-08-21T15:00:00',

  // Human-friendly label shown in the hero (date is officially TBD).
  dateLabel: 'Summer 2027 · Date to be confirmed',

  region: 'San Francisco Bay Area',
  hashtag: '#HappilyEverHuynh',

  // Placeholder contact only — replace with your own (never commit a real address you don't want public).
  rsvpEmail: 'hello@yewedding.example',

  // Venues are TBD. mapsQuery builds a generic Google Maps search link.
  venues: {
    ceremony: {
      name: 'Ceremony venue — to be announced',
      address: 'A Bay Area church · address coming soon',
      mapsQuery: 'San Francisco Bay Area church'
    },
    reception: {
      name: 'Reception venue — to be announced',
      address: 'Milpitas-area Chinese banquet · address coming soon',
      mapsQuery: 'Milpitas Chinese banquet restaurant'
    }
  }
};

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  applyConfig();
  initNav();
  initCountdown();
  initReveal();
  initFaq();
  initRsvp();

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});

/* ------------------------------------------------------------------ *
 * Apply CONFIG to the DOM (keeps HTML editable in ONE place)
 *   [data-config="a.b.c"]      -> textContent
 *   [data-config-href="a.b.c"] -> Google Maps search href (+ mailto for email)
 * ------------------------------------------------------------------ */
function resolvePath(path) {
  return path.split('.').reduce(function (obj, key) {
    return obj == null ? undefined : obj[key];
  }, CONFIG);
}

function applyConfig() {
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var value = resolvePath(el.getAttribute('data-config'));
    if (value != null) el.textContent = value;
  });

  // The "Questions?" link points at the placeholder email.
  document.querySelectorAll('a[data-config="rsvpEmail"]').forEach(function (a) {
    a.setAttribute('href', 'mailto:' + CONFIG.rsvpEmail);
  });

  // Build Google Maps links from each venue's mapsQuery.
  document.querySelectorAll('[data-config-href]').forEach(function (el) {
    var query = resolvePath(el.getAttribute('data-config-href'));
    if (query) {
      el.setAttribute('href',
        'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query));
    }
  });

  // Keep document title and hashtag in sync if names change.
  if (CONFIG.coupleNames) {
    document.title = CONFIG.coupleNames.partnerA + ' & ' + CONFIG.coupleNames.partnerB +
      " · We're Getting Married";
  }
}

/* ------------------------------------------------------------------ *
 * Nav — mobile hamburger toggle
 * ------------------------------------------------------------------ */
function initNav() {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close the menu after choosing a destination (mobile).
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // Close on Escape for keyboard users.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
}

/* ------------------------------------------------------------------ *
 * Countdown — ticks every second toward CONFIG.weddingDate
 * ------------------------------------------------------------------ */
function initCountdown() {
  var root = document.getElementById('countdown');
  var done = document.getElementById('countdown-done');
  if (!root) return;

  var target = new Date(CONFIG.weddingDate).getTime();
  if (isNaN(target)) {
    // Bad/empty date — leave the placeholder dashes, don't crash.
    return;
  }

  var units = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]')
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var diff = target - Date.now();

    if (diff <= 0) {
      if (units.days) units.days.textContent = '0';
      if (units.hours) units.hours.textContent = '00';
      if (units.minutes) units.minutes.textContent = '00';
      if (units.seconds) units.seconds.textContent = '00';
      if (done) {
        done.hidden = false;
        root.hidden = true;
      }
      clearInterval(timer);
      return;
    }

    var d = Math.floor(diff / 86400000); diff -= d * 86400000;
    var h = Math.floor(diff / 3600000); diff -= h * 3600000;
    var m = Math.floor(diff / 60000); diff -= m * 60000;
    var s = Math.floor(diff / 1000);

    if (units.days) units.days.textContent = String(d);
    if (units.hours) units.hours.textContent = pad(h);
    if (units.minutes) units.minutes.textContent = pad(m);
    if (units.seconds) units.seconds.textContent = pad(s);
  }

  tick();
  var timer = setInterval(tick, 1000);
}

/* ------------------------------------------------------------------ *
 * Scroll reveal — IntersectionObserver, respects prefers-reduced-motion
 * ------------------------------------------------------------------ */
function initReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
}

/* ------------------------------------------------------------------ *
 * FAQ accordion — accessible (aria-expanded + animated panel height)
 * ------------------------------------------------------------------ */
function initFaq() {
  var questions = document.querySelectorAll('.faq__q');
  if (!questions.length) return;

  function close(btn, panel) {
    btn.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';
  }
  function open(btn, panel) {
    btn.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  questions.forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;

    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        close(btn, panel);
      } else {
        open(btn, panel);
      }
    });
  });

  // Keep an open panel's height correct on resize (text may rewrap).
  window.addEventListener('resize', function () {
    questions.forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') === 'true') {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* ------------------------------------------------------------------ *
 * RSVP — STATELESS. Posts NOWHERE. Shows a thank-you state.
 *
 * TODO (connect a backend later):
 *   Option A — Formspree:
 *     1. Create a form at https://formspree.io and copy your endpoint.
 *     2. In index.html add: action="https://formspree.io/f/XXXXXXer" method="post"
 *     3. Remove the e.preventDefault() below (or let Formspree AJAX handle it).
 *   Option B — Google Form:
 *     1. Make a Google Form with matching fields; get the prefilled/response URL.
 *     2. Point the form `action` at the formResponse URL and map the entry.* names.
 *   Until then, nothing leaves the browser.
 * ------------------------------------------------------------------ */
function initRsvp() {
  var form = document.getElementById('rsvp-form');
  var success = document.getElementById('rsvp-success');
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // <-- stateless: never submit to a server

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Personalize the confirmation. (Data stays in the browser — sent nowhere.)
    var nameField = form.elements['name'];
    var fullName = nameField && nameField.value ? nameField.value.trim() : '';
    var firstName = fullName ? fullName.split(/\s+/)[0] : 'friend';

    var nameSlot = document.getElementById('rsvp-success-name');
    if (nameSlot) nameSlot.textContent = firstName;

    form.hidden = true;
    success.hidden = false;

    // Move focus to the confirmation for screen-reader + keyboard users.
    success.setAttribute('tabindex', '-1');
    success.focus();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
