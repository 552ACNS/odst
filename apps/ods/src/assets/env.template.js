(function (window) {
  window.env = window.env || {};

  // Environment variables
  window['env']['production'] = '${production}';
  window['env']['NX_GQL_ENDPOINT'] = '${NX_GQL_ENDPOINT}';
})(this);
