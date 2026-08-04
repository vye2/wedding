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
});

/* Scale the letter down just enough to hide inside the pocket while sandwiched;
   it grows back to full size (scale 1) as it rises out on reveal. */
function fitLetter() {
  var std = document.getElementById('std-main');
  var stage = document.querySelector('.stage');
  if (!std || !stage) return;
  // the letter must fit within the flap/front-covered band (~52% of the stage).
  var coverable = stage.offsetHeight * 0.52;
  var natural = std.offsetHeight;               // layout height — unaffected by the scale transform
  var fit = natural > 0 ? Math.min(1, coverable / natural) : 1;
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

    // 2) A short beat to take in the open envelope, then the whole envelope
    //    slides straight down and out of frame, uncovering the letter.
    //    The flap's 1.7s swing is ~85% done by now (it eases out, so it already
    //    reads as open); it finishes on the way down rather than sitting still.
    setTimeout(function () {
      opener.classList.add('is-sliding');
    }, 1000);

    // 3) The envelope has cleared the frame (1.15s slide) and the letter stands
    //    alone. Fade in the footer and move focus to the letter.
    setTimeout(function () {
      document.body.classList.add('is-revealed');
      var main = document.getElementById('std-main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }, 2500);
  }

  // The whole envelope is the control — a generous, obvious hit area.
  btn.addEventListener('click', open);
}

/* Reduced-motion path: skip the theatrics — send the envelope pieces away at
   once so the letter (sandwiched inside) is shown outright. */
function revealInstant() {
  var opener = document.getElementById('opener');
  if (opener) { opener.classList.add('is-open', 'is-sliding'); }
  document.body.classList.add('is-revealed');
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
  // The leaves now drift in front of the envelope, so they carry the ambience —
  // enough of them to feel alive, sheer enough not to fight the letter.
  var layers = [
    { n: 6, sz: [9, 12],  op: 0.26, bl: 1.4,  fall: [26, 34], sway: [8, 11] },
    { n: 7, sz: [13, 17], op: 0.46, bl: 0.35, fall: [19, 25], sway: [6, 8] },
    { n: 6, sz: [18, 24], op: 0.68, bl: 0,    fall: [13, 18], sway: [4.5, 6.5] }
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
