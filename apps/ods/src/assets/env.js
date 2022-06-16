(function (window) {
  window['env'] = window['env'] || {};
  console.log(window['env']);
  // Environment variables
  window['env']['NX_GQL_ENDPOINT'] = 'http://localhost:3343/graphql';
  window['env']['production'] = true;
})(this);
