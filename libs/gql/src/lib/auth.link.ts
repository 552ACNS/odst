import { ApolloLink } from '@apollo/client/core';

import { getAccessToken } from '@odst/helpers'

type Headers = {
  authorization?: string
}

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();

  operation.setContext(({ headers }: { headers: Headers }) => ({
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }))

  return forward(operation)
})

export default authLink
