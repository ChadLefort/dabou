/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FACEBOOK_SECERT,
      scope: ['email']
    }
  },

  google: {
    name: 'Google',
    protocol: 'oauth',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECERT,
      scope: ['email', 'profile']
    }
  },

  bnet: {
    name: 'Battle.nat',
    protocol: 'oauth2',
    strategy: require('passport-bnet').Strategy,
    options: {
      clientID: process.env.BNET_KET,
      clientSecret: process.env.BNET_SECERT,
      scope: ['wow.profile']
    }
  }
};
