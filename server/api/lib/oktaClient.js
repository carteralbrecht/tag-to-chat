const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-1701617.okta.com',
  token: process.env.OKTA_TOKEN
});

module.exports = client;