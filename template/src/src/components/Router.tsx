import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import RouteWithSubRoutes from './RouteWithSubRoutes'
import { config } from '../config'

const AppRouter = () => {
  return (
    <Router>
      <div>
        {config.router.map((route, i) => (
          <RouteWithSubRoutes key={i} route={route} />
        ))}
      </div>
    </Router>
  )
}

export default AppRouter
