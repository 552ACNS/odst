import {
  LoginUserInput,
  OrgCreateInput,
  OrgGQL,
  PersonCreateInput,
  PersonGQL,
  TokensGQL,
} from '@odst/types';
import { gql } from 'apollo-angular';

export const SUBMIT_PERSON = gql<PersonGQL, PersonCreateInput>`
  mutation createPerson($personCreateInput: PersonCreateInput!) {
    createPerson(personCreateInput: $personCreateInput) {
      id
    }
  }
`;

export const SUBMIT_ORG = gql<OrgGQL, OrgCreateInput>`
  mutation createOrg($orgCreateInput: OrgCreateInput!) {
    createOrg(orgCreateInput: $orgCreateInput) {
      id
    }
  }
`;

export const LOGIN = gql<TokensGQL, LoginUserInput>`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      accessToken
      refreshToken
    }
  }
`;
