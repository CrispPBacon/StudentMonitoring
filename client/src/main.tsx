import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'
import "@/index.css"
import App from '@/App'
import store from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
)
