//Pretty sure the values here are never being read - either in prod or dev.
//Since dev doesn't reference them, and prod overwrites this file based on docker-compose env vars specified in env.template.js

(function (window) {
  window['env'] = window['env'] || {};
  // Environment variables
  window['env']['NX_GQL_ENDPOINT'] = 'http://localhost:3343/graphql';
})(this);
