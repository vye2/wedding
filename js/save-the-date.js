/* =====================================================================
   Ashley & Victor — Save the Date
   A one-moment "open the envelope" experience, then a slim reveal.
   Everything guest-facing is driven by CONFIG below. No build step.
   ===================================================================== */

var CONFIG = {
  coupleNames: { partnerA: 'Victor', partnerB: 'Ashley' },

  // The wedding day. ISO 8601, local time. Drives the live countdown.
  weddingDate: '2027-05-15T15:00:00',

  region: 'San Francisco Bay Area',
  hashtag: '#HappilyEverHuynh'
};

document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep the tab title tidy if the names ever change.
  if (CONFIG.coupleNames) {
    document.title = CONFIG.coupleNames.partnerA + ' & ' + CONFIG.coupleNames.partnerB + ' · Save the Date';
  }

  initCountdown();

  if (reduceMotion) {
    // No theatrics — present the card straight away.
    revealInstant();
  } else {
    makePetals();
    initOpener();
  }
});

/* ------------------------------------------------------------------ *
 * The opener — tap the envelope, the flap hinges open, the envelope
 * slides away to uncover the letter that was tucked inside.
 * ------------------------------------------------------------------ */
function initOpener() {
  var opener = document.getElementById('opener');
  var btn = document.getElementById('open-btn');
  if (!opener || !btn) return;

  document.body.classList.add('is-sealed');

  var opened = false;

  function open() {
    if (opened) return;
    opened = true;

    btn.setAttribute('aria-hidden', 'true');
    btn.tabIndex = -1;

    // 1) The top flap hinges open in 3D, revealing the letter tucked inside.
    opener.classList.add('is-open');

    // 2) A beat to take in the open envelope + the letter inside, then the
    //    whole envelope slides straight down, uncovering the letter from the top.
    setTimeout(function () {
      opener.classList.add('is-sliding');
      document.body.classList.remove('is-sealed');
    }, 2000);

    // 3) The envelope is gone; the letter stays on screen. Move focus to it.
    //    (The opener is NOT hidden — the letter lives inside it.)
    setTimeout(function () {
      var main = document.getElementById('std-main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }, 3500);
  }

  // The whole envelope is the control — a generous, obvious hit area.
  btn.addEventListener('click', open);
}

/* Reduced-motion path: skip the theatrics — send the envelope pieces away at
   once so the letter (sandwiched inside) is shown outright. */
function revealInstant() {
  var opener = document.getElementById('opener');
  if (opener) { opener.classList.add('is-open'); opener.classList.add('is-sliding'); }
  document.body.classList.remove('is-sealed');
}

/* ------------------------------------------------------------------ *
 * Petals — drifting blossoms for ambient life (organic randomness).
 * ------------------------------------------------------------------ */
function makePetals() {
  var field = document.getElementById('petals');
  if (!field) return;

  var COUNT = 16;
  var kinds = ['', 'petal--sage', 'petal--pale', ''];
  var frag = document.createDocumentFragment();

  for (var i = 0; i < COUNT; i++) {
    var p = document.createElement('span');
    p.className = 'petal ' + kinds[i % kinds.length];

    var size = 8 + Math.random() * 12;          // 8–20px
    var dur = 11 + Math.random() * 12;           // 11–23s fall
    var delay = -Math.random() * 22;             // negative = mid-flight on load

    p.style.left = (Math.random() * 100).toFixed(2) + 'vw';
    p.style.width = size.toFixed(1) + 'px';
    p.style.height = (size * 0.9).toFixed(1) + 'px';
    p.style.animationDuration = dur.toFixed(1) + 's';
    p.style.animationDelay = delay.toFixed(1) + 's';
    p.style.opacity = (0.45 + Math.random() * 0.4).toFixed(2);

    frag.appendChild(p);
  }
  field.appendChild(frag);
}

/* ------------------------------------------------------------------ *
 * Countdown — ticks every second toward CONFIG.weddingDate.
 * ------------------------------------------------------------------ */
function initCountdown() {
  var root = document.getElementById('countdown');
  var done = document.getElementById('countdown-done');
  if (!root) return;

  var target = new Date(CONFIG.weddingDate).getTime();
  if (isNaN(target)) return;              // bad date — leave the dashes

  var units = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]')
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  var timer;
  function tick() {
    var diff = target - Date.now();

    if (diff <= 0) {
      if (units.days) units.days.textContent = '0';
      if (units.hours) units.hours.textContent = '00';
      if (units.minutes) units.minutes.textContent = '00';
      if (units.seconds) units.seconds.textContent = '00';
      if (done) { done.hidden = false; }
      root.hidden = true;
      clearInterval(timer);
      return;
    }

    var d = Math.floor(diff / 86400000); diff -= d * 86400000;
    var h = Math.floor(diff / 3600000);  diff -= h * 3600000;
    var m = Math.floor(diff / 60000);    diff -= m * 60000;
    var s = Math.floor(diff / 1000);

    if (units.days) units.days.textContent = String(d);
    if (units.hours) units.hours.textContent = pad(h);
    if (units.minutes) units.minutes.textContent = pad(m);
    if (units.seconds) units.seconds.textContent = pad(s);
  }

  tick();
  timer = setInterval(tick, 1000);
}
