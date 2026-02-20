import './style.css'
import '@radix-ui/themes/styles.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import { App } from './App'

const container = document.getElementById('app')
if (!container) throw new Error('Root element not found')

const root = createRoot(container)
root.render(
  React.createElement(
    Theme,
    { appearance: 'inherit', accentColor: 'jade', grayColor: 'slate', radius: 'large' },
    React.createElement(App)
  )
)
