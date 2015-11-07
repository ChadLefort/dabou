# README #

* Dabou is an web app that allows World of Warcraft fans to track their tabard collections.
* Version 0.0.1

### How do I get set up? ###

* Make sure you have Node.js and NPM installed.
* MySQL
* Open up your terminal to where you want it installed and use npm to install all of the dependencies:

```
npm install
```

* Navigate to the directory which you cloned this repo to and start the app with:

```
node app.js
```
* Setup various environment variables:
  * General:
    * NODE_ENV
    * PORT
    * ROOT_URL
    * SESSION_SECERT
  * For Passport Support:
    * TWITTER_KEY
    * TWITTER_SECRET
    * FACEBOOK_KEY
    * FACEBOOK_SECERT
    * GOOGLE_KEY
    * GOOGLE_SECERT
    * BNET_KET
    * BNET_SECERT
  * For AWS Support
    * AWS_ACCESS_KEY_ID
    * AWS_SECRET_ACCESS_KEY
    * S3_BUCKET_NAME
    * S3_BUCKET_URL
  * Redis:
    * PROD_REDIS_HOST
    * PROD_REDIS_PASSWORD
    * PROD_REDIS_PORT
  * Database (Replace **DEV** with **PROD** for production database):
    * DEV_DB_HOST
    * DEV_DB_PORT
    * DEV_DB_USER
    * DEV_DB_PASSWORD
    * DEV_DB_DATABASE
