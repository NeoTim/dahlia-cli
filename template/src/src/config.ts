export interface Options {
  router: any[]
  graphql?: {
    endpoint: string
  }
  rest?: {
    endpoint: string
  }
}

export const config: Options = {} as Options
