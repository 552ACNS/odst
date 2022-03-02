import { gql } from 'apollo-angular';
import { TokensGQL, RefreshLoginInput } from '@odst/types';

export const REFRESH_TOKEN = gql<TokensGQL, RefreshLoginInput>`
  mutation Refresh($refreshLoginInput: RefreshLoginInput!) {
    refreshTokensVar(refreshLoginInput: $refreshLoginInput) {
      accessToken
      refreshToken
    }
  }
`;
