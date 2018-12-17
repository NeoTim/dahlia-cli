import React from 'react'
import { Route } from 'react-router-dom'

interface RouteItem {
  path: string
  exact: boolean
  // component: () => JSX.Element
  component: any
  routes?: RouteItem[]
}

interface Props {
  key: number
  route: RouteItem
}

const RouteWithSubRoutes: React.SFC<Props> = ({ route }) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}
export default RouteWithSubRoutes
