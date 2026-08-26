/* =====================================================================
   Put the built save-the-date where GitHub Pages will serve it.

   Pages serves this repo's root off `main` — there's a CNAME and a
   .nojekyll and no Actions workflow — so the page has to BE a file in the
   root, at the URL guests already have:

       dist/app/index.html    →  save-the-date.html
       dist/assets/std/*      →  assets/std/*

   Vite can't emit straight there: its outDir is wiped on every build, and
   the repo root holds the main site, the artwork and the git metadata.
   So it builds into dist/ (gitignored) and this moves the two pieces out.

   Both destinations are fully derived from this file's own location, and
   the only thing ever deleted is assets/std/ — the directory this script
   owns. Nothing else in the repo is touched.
   ===================================================================== */

import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const BUILT_PAGE = path.join(repoRoot, 'dist', 'app', 'index.html')
const BUILT_BUNDLE = path.join(repoRoot, 'dist', 'assets', 'std')
const PAGE = path.join(repoRoot, 'save-the-date.html')
const BUNDLE = path.join(repoRoot, 'assets', 'std')

const BANNER = [
  '<!-- ============================================================',
  '     GENERATED FILE — do not edit.',
  '',
  '     Built from app/ by `npm run build`, then placed here by',
  '     scripts/postbuild.mjs so GitHub Pages serves it at the URL',
  '     guests already have. Edit app/index.html or app/src/ instead,',
  '     and rebuild.',
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
  if (!(await exists(BUILT_PAGE))) {
    throw new Error(
      `No build output at ${path.relative(repoRoot, BUILT_PAGE)}. Run \`npm run build\`, not this script on its own.`,
    )
  }

  // The bundle directory is replaced wholesale rather than merged, so the
  // previous build's hashed files don't pile up alongside the new ones.
  await rm(BUNDLE, { recursive: true, force: true })
  await mkdir(BUNDLE, { recursive: true })
  if (await exists(BUILT_BUNDLE)) {
    await cp(BUILT_BUNDLE, BUNDLE, { recursive: true })
  }

  const html = await readFile(BUILT_PAGE, 'utf8')
  await writeFile(PAGE, html.replace(/^(<!doctype html>|<!DOCTYPE html>)/, `$1\n${BANNER}`), 'utf8')

  const shipped = (await readdir(BUNDLE)).sort()
  console.log(`\n  save-the-date.html  ←  ${path.relative(repoRoot, BUILT_PAGE)}`)
  for (const file of shipped) {
    console.log(`  assets/std/${file}`)
  }
  console.log(`\n  Commit those ${shipped.length + 1} files to publish.\n`)
}

main().catch((error) => {
  console.error(`\npostbuild failed: ${error.message}\n`)
  process.exitCode = 1
})
