//this file is for production environment variables - which are pulled from docker-compose environment variables

(function (window) {
  window.env = window.env || {};
  // Environment variables
  window['env']['NX_GQL_ENDPOINT'] = '${NX_GQL_ENDPOINT}';
})(this);
