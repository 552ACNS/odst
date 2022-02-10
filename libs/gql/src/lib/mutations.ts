import { gql } from '@apollo/client/core';

export const REFRESH_TOKEN = gql`
  mutation Refresh($refreshToken: String!) {
    refreshTokensVar(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;
