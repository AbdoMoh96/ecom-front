import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Routes/Router';


// import.meta.env.VITE_API_URL

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
)
