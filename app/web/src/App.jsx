import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import PurchaseSuccess from './pages/PurchaseSuccess.jsx'
import Store from './pages/Store.jsx'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Store></Store> 
    },
    {
      path: '/success',
      element: <PurchaseSuccess></PurchaseSuccess>
    },
    {
      path: '/cancel',
      element: <Store></Store>
    }
  ])

  return (
    <div>
      {routes}
    </div>
  )
}

export default App
