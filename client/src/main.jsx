import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider, Spinner } from '@nextui-org/react'
import './i18n'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <NextUIProvider>
          <BrowserRouter>
            <Suspense fallback={<Spinner/>}>
              <App />
            </Suspense>
          </BrowserRouter>
      </NextUIProvider>
  </React.StrictMode>,
)
