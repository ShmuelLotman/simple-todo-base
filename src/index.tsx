import React from 'react'
import { createRoot } from 'react-dom/client'
//component file
import { Board } from './components/Board'
import './index.css'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ThemeProvider theme={theme}>
    <Board />
  </ThemeProvider>
)
