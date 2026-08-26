import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

// The global layer first: the shared palette, then this page's own chrome
// — the non-scrolling screen and the floral backdrop. useSceneReady reads
// that backdrop's URL back off the computed style, so it has to be applied
// before the app mounts.
import './styles/tokens.css'
import './styles/std-page.css'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Missing #root — check app/index.html.')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
