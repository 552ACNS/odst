import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import authLink from './auth.link';

// TODO Make this an environment variable, make sure this works
// just setting process.env.GQL_ENDPOINT doesn't work as expected (it will fail
// on the frontend)

// Consider undoing this as a component. If not feasible.
const uri = "http://localhost:3333/graphql";
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));



  return {
    link: ApolloLink.from([basic, authLink, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GQLModule {}
