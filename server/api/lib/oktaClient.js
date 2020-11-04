const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-1701617.okta.com',
  token: '005IViMyo7AJfVKije0NoyK8kp6-n5i-cCaq8Wwzuq'
});

module.exports = client;