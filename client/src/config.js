import pkg from '../package.json';

const config = {
  development: {
    endpoint: pkg.proxy
  },
  production: {
    endpoint: window.location.hostname
  }
}

export default config
