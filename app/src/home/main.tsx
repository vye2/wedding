import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './Home'

// Shared palette first, then this page's own chrome — a long scrolling
// page on plain paper, as opposed to the save-the-date's one fixed
// screen on the floral backdrop.
import '../styles/tokens.css'
import '../styles/home-page.css'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Missing #root — check app/home.html.')
}

createRoot(container).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
