import { Inject, NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
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
  isJwtChainExpired,
  setAccessToken,
  setRefreshToken,
  isJwtExpired,
} from '@odst/helpers';
import {
  RefreshDocument,
  RefreshMutation,
  RefreshMutationVariables,
} from '../graphql-generated';
import { removeTokens } from '@odst/helpers';

let environment: { NX_GQL_ENDPOINT: string };

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [],
    },
  ],
})
export class GQLModule {
  constructor(@Inject('environment') incomingEnv: { NX_GQL_ENDPOINT: string }) {
    environment = incomingEnv;
  }
}

export function createApollo() {
  let isRefreshing = false;
  let pendingRequests: any = [];

  const resolvePendingRequests = () => {
    pendingRequests.map((callback: any) => callback());
    pendingRequests = [];
  };

  //TODO refactor for complexity
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          switch (err.extensions?.['code']) {
            case 'UNAUTHENTICATED': {
              //Token is malformed. Delete them and have user relogin
              if (err.message == 'Token malformed') {
                removeTokens();
                // Could be better than just reloading page. Navigate to login page?
                location.reload();
                //TODO display error to user
                //currently it just pushes them to login page with no reason why
                break;
              }
              const refreshToken = getRefreshToken();
              //TODO 16 check if refresh token is expired before getting an error from api request?
              //TODO check if access token is expired before getting an error from api request?
              //TODO check if refresh token chain is expired before getting an error from api request?
              //TODO user is logged out if they havn't made api calls recently
              //So need to make it so if theyre active but not making calls, they arent needlessly logged out
              if (
                !refreshToken ||
                isJwtExpired(refreshToken) ||
                isJwtChainExpired(refreshToken)
              ) {
                console.log('No valid refresh token');
                //TODO [ODST-134] push to login
                continue;
              }
              let forward$: Observable<boolean> | Observable<void>;

              if (!isRefreshing) {
                isRefreshing = true;
                forward$ = fromPromise(
                  client
                    .mutate<RefreshMutation, RefreshMutationVariables>({
                      mutation: RefreshDocument,
                      variables: {
                        refreshLoginInput: {
                          refreshToken,
                        },
                      },
                    })
                    .then(({ data, errors }) => {
                      if (errors) {
                        console.log(`errors ${errors}`);
                      }
                      if (data) {
                        setAccessToken(data.refreshTokens.accessToken);
                        setRefreshToken(data.refreshTokens.refreshToken);
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
      //TODO implement handle other error in frontend
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }

      //Not sure if this is what we want, put this here to statify all paths return
      return forward(operation);
    }
  );

  const httpLink = createHttpLink({
    uri: environment.NX_GQL_ENDPOINT,
    //credentials: 'include',
  });

  const authLink = setContext(async (operation, { headers }) => {
    const accessToken = getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
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
