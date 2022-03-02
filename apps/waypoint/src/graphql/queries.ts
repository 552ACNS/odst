import { OrgGQL, PersonGQL } from '@odst/types';
import { gql } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';

export const GET_PERSONS = gql<PersonGQL[],EmptyObject>`
  query {
    findManyPersons {
      firstName
      lastName
      dodId
      ssn
    }
  }
`;

export const GET_ORGS = gql<OrgGQL[],EmptyObject>`
  query {
    findManyOrgs {
      id
      name
      aliases
      orgTier
    }
  }
`;
