//pull vales from window['env'] to use docker-compose environment variable values

export const environment = {
  production: true,
  NX_GQL_ENDPOINT: window['env']['NX_GQL_ENDPOINT'],
};
