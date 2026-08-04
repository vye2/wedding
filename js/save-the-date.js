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
  fitLetter();
  // Re-measure once the web fonts load (they change the letter's height) and on
  // resize, so the sandwiched letter always fits the pocket.
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(fitLetter); }
  window.addEventListener('resize', fitLetter);

  if (reduceMotion) {
    // No theatrics — present the card straight away.
    revealInstant();
  } else {
    makePetals();
    initOpener();
  }

  // Hold the scene until the backdrop is actually decoded, so it and the envelope
  // appear together. Re-measure the letter first: by now the web fonts have
  // settled, so this is the scale the card is first seen at.
  whenBackdropReady(function () {
    fitLetter();
    document.body.classList.add('is-ready');
  });
});

/* Resolve once the body's backdrop image has decoded AND the web fonts are in —
   the two things that change what the first painted frame looks like. Falls
   through on a timer so a slow or failed image can never leave the page blank. */
function whenBackdropReady(done) {
  var fired = false;
  function go() { if (fired) return; fired = true; done(); }

  setTimeout(go, 3000);                      // safety net

  var waits = [];

  // Read the URL back off the computed style rather than repeating it here, so
  // this can't drift out of sync with the stylesheet (or its ?v= cache buster).
  var url = null;
  try {
    var m = /url\(["']?([^"')]+)/.exec(window.getComputedStyle(document.body).backgroundImage);
    if (m) { url = m[1]; }
  } catch (e) { /* fall through to the timer */ }

  if (url) {
    waits.push(new Promise(function (resolve) {
      var img = new Image();
      img.onload = img.onerror = resolve;    // errors resolve too — show the page
      img.src = url;
    }));
  }
  if (document.fonts && document.fonts.ready) { waits.push(document.fonts.ready); }

  if (!waits.length) { go(); return; }
  Promise.all(waits).then(go, go);
}

/* How small the card is held while sandwiched. Two things decide it:

   1. It MUST fit the band the flap and front cover (~52% of the stage), or it
      pokes out past the sealed envelope.
   2. It should be visibly smaller than its revealed size, so the reveal has that
      growth to it rather than the card simply appearing at full size.

   Rule 1 alone isn't enough for rule 2. On a portrait screen the envelope AND the
   card are both sized from viewport height, so the ratio between them is fixed —
   the first rule lands on 0.93 on every phone regardless of its size, which is a
   7% growth: real, but too small to read as anything. Landscape doesn't have the
   problem (the card is far taller than the band there, so it lands near 0.6).

   Hence the ceiling: hold the card at 0.85 even when it would be free to sit
   larger. It's still comfortably inside the covered band, and the reveal gains a
   ~18% growth on phones. */
var SEALED_MAX = 0.85;

function fitLetter() {
  var std = document.getElementById('std-main');
  var stage = document.querySelector('.stage');
  if (!std || !stage) return;
  var coverable = stage.offsetHeight * 0.52;
  var natural = std.offsetHeight;               // layout height — unaffected by the scale transform
  var fit = natural > 0 ? Math.min(SEALED_MAX, coverable / natural) : SEALED_MAX;
  std.style.setProperty('--fit', fit.toFixed(3));
}

/* ------------------------------------------------------------------ *
 * The opener — tap the envelope, the flap hinges open, the envelope
 * slides away to uncover the letter that was tucked inside.
 * ------------------------------------------------------------------ */
function initOpener() {
  var opener = document.getElementById('opener');
  var btn = document.getElementById('open-btn');
  if (!opener || !btn) return;

  var opened = false;

  function open() {
    if (opened) return;
    opened = true;

    btn.setAttribute('aria-hidden', 'true');
    btn.tabIndex = -1;

    // 1) The top flap hinges open in 3D, revealing the letter tucked inside.
    opener.classList.add('is-open');

    // 2) A beat to take in the open envelope, then the whole envelope slides
    //    straight down and out of frame, uncovering the letter. This lands just
    //    after the flap's 1.7s swing has visually settled (it eases out), so the
    //    envelope reads as fully open before it drops.
    setTimeout(function () {
      opener.classList.add('is-sliding');
    }, 1400);

    // 3) The envelope has cleared the frame (1.15s slide) and the letter stands
    //    alone. Move focus to it.
    setTimeout(function () {
      var main = document.getElementById('std-main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }, 2900);
  }

  // The whole envelope is the control — a generous, obvious hit area.
  btn.addEventListener('click', open);
}

/* Reduced-motion path: skip the theatrics — send the envelope pieces away at
   once so the letter (sandwiched inside) is shown outright. */
function revealInstant() {
  var opener = document.getElementById('opener');
  if (opener) { opener.classList.add('is-open', 'is-sliding'); }
}

/* ------------------------------------------------------------------ *
 * Petals — drifting blossoms for ambient life (organic randomness).
 * ------------------------------------------------------------------ */
function makePetals() {
  var field = document.getElementById('petals');
  if (!field) return;

  // Shape mix — more blossoms than leaves, a few pale ones for lightness.
  var shapes = ['petal--leaf', 'petal--bloom', 'petal--bloom', 'petal--leaf', 'petal--pale'];

  // Three depth layers: farther pieces are smaller, fainter, blurrier and slower.
  // The leaves and petals drift in front of the envelope, so they carry the
  // ambience. Counts halved from 12/14/12 — sparse enough to read as the odd
  // petal falling past rather than weather. Sizes are unchanged.
  var layers = [
    { n: 6, sz: [11, 14], op: 0.26, bl: 1.4,  fall: [26, 34], sway: [8, 11] },
    { n: 7, sz: [15, 20], op: 0.46, bl: 0.35, fall: [19, 25], sway: [6, 8] },
    { n: 6, sz: [21, 28], op: 0.68, bl: 0,    fall: [13, 18], sway: [4.5, 6.5] }
  ];

  function rnd(a, b) { return a + Math.random() * (b - a); }
  var frag = document.createDocumentFragment();

  layers.forEach(function (L) {
    for (var i = 0; i < L.n; i++) {
      var p = document.createElement('span');
      p.className = 'petal ' + shapes[Math.floor(Math.random() * shapes.length)];

      var fall = rnd(L.fall[0], L.fall[1]);
      p.style.left = rnd(-2, 100).toFixed(2) + 'vw';
      p.style.setProperty('--sz', rnd(L.sz[0], L.sz[1]).toFixed(1) + 'px');
      p.style.setProperty('--op', L.op.toFixed(2));
      p.style.setProperty('--bl', L.bl + 'px');
      p.style.setProperty('--fall', fall.toFixed(1) + 's');
      p.style.setProperty('--sway', rnd(L.sway[0], L.sway[1]).toFixed(1) + 's');
      p.style.animationDelay = (-Math.random() * fall).toFixed(1) + 's';   // start mid-flight

      var inner = document.createElement('i');
      inner.style.animationDelay = (-Math.random() * 8).toFixed(1) + 's';   // desync the sway
      p.appendChild(inner);
      frag.appendChild(p);
    }
  });
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
