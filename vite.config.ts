import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* =====================================================================
   Build config — Victor & Ashley, save-the-date SPA.

   THE SHAPE OF THIS IS DICTATED BY HOW THE SITE IS HOSTED. GitHub Pages
   serves this repo's root directly off `main` (there's a CNAME and a
   .nojekyll, and no Actions workflow), so the built page has to LAND in
   the repo root as `save-the-date.html` — the URL guests already have.
   That's what scripts/postbuild.mjs does after this config runs.

   `root` is the REPO root, not app/. That's deliberate: it means the dev
   server serves /assets/* — the couple's envelope artwork, the portrait,
   the floral backdrop — off disk at the same absolute paths the built
   page uses. Point `root` at app/ instead and every image 404s in dev
   while working in production, which is the worst way to find a bug.
   ===================================================================== */
export default defineConfig(({ command, mode }) => ({
  // Served from the domain root (ashleyhuynh.victorye.me), so absolute
  // asset paths resolve the same in dev and in production.
  base: '/',

  plugins: [react()],

  /* THE ARTWORK IS NOT BUILD INPUT — and this is the setting that says so.

     The envelope pieces, the portrait and the floral backdrop are already
     optimised, already committed, and already served from /assets/ — by
     this page and by the main site both. Left alone, Vite treats every
     url(/assets/…) in the stylesheets as something to fingerprint and
     re-emit, forking 1.8MB of PNG into hashed copies that then have to be
     committed a second time. Vite skips exactly one class of URL: files it
     considers PUBLIC. Naming the repo as the public directory is what puts
     the artwork in that class.

     BUT ONLY FOR THE BUILD. In dev the public directory is served by a
     middleware that runs BEFORE the transform pipeline, so pointing it at
     the repo means /app/src/main.tsx and Vite's own client are handed over
     as raw files — the page loads, nothing compiles, and the console fills
     with `__DEFINES__ is not defined`. Dev doesn't need the setting
     anyway: root is the repo, so the static middleware serves /assets/*
     from disk regardless.

     copyPublicDir turns off the other half of the build-time deal, so Vite
     doesn't try to copy the whole repo into dist/ on the way out. */
  publicDir: command === 'build' ? '.' : false,

  build: {
    // Staging only — postbuild moves the pieces into place. Gitignored.
    outDir: 'dist',
    emptyOutDir: true,

    // See the publicDir note above: the public directory is the repo, and
    // the repo must not be copied into the build.
    copyPublicDir: false,

    // Hashed JS/CSS live under assets/std/ so they never collide with the
    // hand-made artwork sitting in assets/.
    assetsDir: 'assets/std',

    // Only the save-the-date is a React app. The main site (index.html)
    // is still hand-written static HTML and must not be swept into the
    // bundle — naming the input explicitly is what keeps it out.
    rollupOptions: {
      input: 'app/index.html',
    },

    // The artwork is already optimised WebP sitting in assets/; inlining
    // anything would duplicate bytes the browser can otherwise cache.
    assetsInlineLimit: 0,

    // Off on purpose: the build output is committed, and maps would add a
    // few hundred kilobytes of churn to every diff to reveal source that
    // is already sitting in app/ in the same repo.
    sourcemap: false,
    target: 'es2020',
  },

  css: {
    modules: {
      // Readable in dev tools, short in the shipped bundle.
      generateScopedName: mode === 'production' ? '[hash:base64:6]' : '[name]__[local]',
    },
  },

  server: {
    open: '/app/',
  },
}))
