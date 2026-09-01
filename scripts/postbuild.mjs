/* =====================================================================
   Put the built pages where GitHub Pages will serve them.

   Pages serves this repo's root off `main` — there's a CNAME and a
   .nojekyll and no Actions workflow — so each page has to BE a file in
   the root, at the URL guests already have:

       dist/app/index.html    →  save-the-date.html
       dist/app/home.html     →  wedding/index.html
       dist/assets/std/*      →  assets/std/*

   (The crossover in those first two names is deliberate. `app/index.html`
   was the save-the-date's source before there was a second page, and
   renaming it would have churned every path for no gain. The OUTPUT
   names are the ones guests see, and those are right.)

   THE MAIN PAGE LIVES AT /wedding, NOT AT THE ROOT. Pages serves a
   directory's index.html for a bare path, so wedding/index.html is what
   answers ashleyhuynh.victorye.me/wedding. The root index.html is NOT
   built — it's a hand-written redirect to /wedding/, committed once and
   left alone. This script must never overwrite it.

   Vite can't emit straight to the root: its outDir is wiped on every
   build, and the root holds the artwork, the git metadata and the pages
   themselves. So it builds into dist/ (gitignored) and this moves the
   pieces out.

   Everything is derived from this file's own location, and the only
   directory ever deleted is assets/std/ — the one this script owns.
   ===================================================================== */

import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Built page → where it has to land for Pages to serve it. */
const PAGES = [
  { from: path.join('dist', 'app', 'index.html'), to: 'save-the-date.html' },
  { from: path.join('dist', 'app', 'home.html'), to: path.join('wedding', 'index.html') },
]

const BUILT_BUNDLE = path.join(repoRoot, 'dist', 'assets', 'std')
const BUNDLE = path.join(repoRoot, 'assets', 'std')

const BANNER = [
  '<!-- ============================================================',
  '     GENERATED FILE — do not edit.',
  '',
  '     Built from app/ by `npm run build`, then placed here by',
  '     scripts/postbuild.mjs so GitHub Pages serves it at the URL',
  '     guests already have. Edit app/ instead, and rebuild.',
  '     ============================================================ -->',
].join('\n')

async function exists(target) {
  try {
    await stat(target)
    return true
  } catch {
    return false
  }
}

async function main() {
  for (const page of PAGES) {
    if (!(await exists(path.join(repoRoot, page.from)))) {
      throw new Error(
        `No build output at ${page.from}. Run \`npm run build\`, not this script on its own.`,
      )
    }
  }

  // The bundle directory is replaced wholesale rather than merged, so the
  // previous build's hashed files don't pile up alongside the new ones.
  await rm(BUNDLE, { recursive: true, force: true })
  await mkdir(BUNDLE, { recursive: true })
  if (await exists(BUILT_BUNDLE)) {
    await cp(BUILT_BUNDLE, BUNDLE, { recursive: true })
  }

  for (const page of PAGES) {
    const html = await readFile(path.join(repoRoot, page.from), 'utf8')
    // /wedding is a directory now, and it isn't there on a fresh clone.
    await mkdir(path.dirname(path.join(repoRoot, page.to)), { recursive: true })
    await writeFile(
      path.join(repoRoot, page.to),
      html.replace(/^(<!doctype html>|<!DOCTYPE html>)/, `$1\n${BANNER}`),
      'utf8',
    )
  }

  const shipped = (await readdir(BUNDLE)).sort()

  console.log('')
  for (const page of PAGES) {
    console.log(`  ${page.to.padEnd(20)}←  ${page.from}`)
  }
  for (const file of shipped) {
    console.log(`  assets/std/${file}`)
  }
  console.log(`\n  Commit those ${shipped.length + PAGES.length} files to publish.\n`)
}

main().catch((error) => {
  console.error(`\npostbuild failed: ${error.message}\n`)
  process.exitCode = 1
})
