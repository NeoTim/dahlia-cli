import React from 'react'
import { render } from 'react-dom'
import { requestHooks } from 'request-hooks'
import { createStore } from 'stamen'
import gql from 'gql-tag'
import { useQuery, useMutate, useFetch, useUpdate } from 'request-hooks'

import { config, Options } from './config'
import Router from './components/Router'

function configure(options: Options): void {
  const { router, graphql, rest } = options
  config.router = router
  requestHooks.config({ graphql, rest })
}

function bootstrap(selector: string) {
  render(<Router />, document.querySelector(selector))
}

const Dahlia = {
  config: configure,
  bootstrap,
}

export { gql, useQuery, useMutate, useFetch, useUpdate, createStore }

export default Dahlia
