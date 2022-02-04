import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  Observable,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@odst/helpers';
import { REFRESH_TOKEN } from './mutations';

// TODO Make this an environment variable, make sure this works
// just setting process.env.GQL_ENDPOINT doesn't work as expected (it will fail
// on the frontend)

// Consider undoing this as a component. If not feasible.
const uri = 'http://localhost:3333/graphql';

export function createApollo() {
  let isRefreshing = false;
  let pendingRequests: any = [];

  const resolvePendingRequests = () => {
    pendingRequests.map((callback: any) => callback());
    pendingRequests = [];
  };

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          switch (err.extensions?.['code']) {
            case 'UNAUTHENTICATED': {
              console.log("UNAUTHENTICATED")
              let forward$: Observable<boolean> | Observable<void>;

              if (!isRefreshing) {
                console.log("inside !refreshing")
                isRefreshing = true;
                forward$ = fromPromise(
                  client
                    .mutate({
                      mutation: REFRESH_TOKEN,
                      variables: {
                        refreshToken: getRefreshToken(),
                      },
                    })
                    .then(({ data: { refreshToken, accessToken } }) => {
                      console.log({refreshToken, accessToken})
                      if (refreshToken && accessToken) {
                        setAccessToken(accessToken);
                        setRefreshToken(refreshToken);
                      }
                      return true;
                    })
                    .then(() => {
                      resolvePendingRequests();
                      return true;
                    })
                    .catch(() => {
                      pendingRequests = [];
                      return false;
                    })
                    .finally(() => {
                      isRefreshing = false;
                    })
                );
              } else {
                forward$ = fromPromise(
                  new Promise<void>((resolve) => {
                    pendingRequests.push(() => resolve());
                  })
                );
              }

              return forward$.flatMap(() => forward(operation));
            }
            default:
              console.log(
                `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
              );
          }
        }
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }

      //Not sure if this is what we want, put this here to statify all paths return
      return forward(operation);
    }
  );

  const httpLink = createHttpLink({
    uri: uri,
    //credentials: 'include',
  });

  const authLink = setContext(async (operation, { headers }) => {
    const token = getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
  });

  return client;
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [],
    },
  ],
})
export class GQLModule {}
