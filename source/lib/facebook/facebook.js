import fetch from 'isomorphic-fetch';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import urlencode from 'urlencode';
import FormData from 'formdata';
const request = require('request');
const qs = require('qs');

//api token
//https://graph.facebook.com/v2.11/oauth/access_token?client_id=302140436578036&client_secret=bccb07ea4329d9bd9171fd5ee98b31d7&grant_type=client_credentials

/**
 * @class Twitter — set of methods to work with twitter api using promises
 */
export default class Facebook {
  /**
     * @constructor
     */
  constructor() {

    this.config = {
      consumer_key: process.env.TWITTER_CUSTOMER_KEY,
      consumer_key_secret: process.env.TWITTER_CUSTOMER_KEY_SECRET,
      access_tocken: process.env.TWITTER_TOKEN,
      access_tocken_secret: process.env.TWITTER_TOKEN_SECRET,
    };

    this.oauth = OAuth({
      consumer: {
        key: this.config.consumer_key,
        secret: this.config.consumer_key_secret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function: (baseString, key) =>
        crypto
          .createHmac('sha1', key)
          .update(baseString)
          .digest('base64'),
    });

    this.token = {
      key: this.config.access_tocken,
      secret: this.config.access_tocken_secret,
    };

    this.urls = {
      api: 'https://graph.facebook.com/v2.11/',
      publish: 'page-id/feed',
    };
  }

  /**
   * Tweet your message
   * @param  {string} status  - The text of the status update. URL encode as necessary. t.co link wrapping will affect character counts.
   * @return {Promise}        - promise with tweeting process
   */
  async publish(message) {

    const request_data = {
      url: this.urls.api + this.urls.publish,
      method: 'POST',
      data: { message },
    };

    const options = {
      url: request_data.url,
      method: request_data.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        ...this.oauth.toHeader(this.oauth.authorize(request_data, this.token)),
      },
      body: encodeURIComponent('message') + '=' + encodeURIComponent(message),
    };

    const response = await fetch(request_data.url, options);

    if (response.ok) {
      const json = await response.json();
      return json;
    }

    throw new Error(`${response.status} ${response.statusText}`);
  }

}
