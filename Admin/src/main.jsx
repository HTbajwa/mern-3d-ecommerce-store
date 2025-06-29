import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './store/store'
import { ProSidebarProvider } from 'react-pro-sidebar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ProSidebarProvider>
    <App />
    </ProSidebarProvider>
   
    </Provider>
    
  </StrictMode>,
)
