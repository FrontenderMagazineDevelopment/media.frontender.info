import 'babel-polyfill';
import Twitter from './lib/twitter/twitter';
import { resolve } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';

try {
  const { name, version } = require('../package.json');
  const ENV_PATH = resolve(__dirname, '../../.env');

  if (!fs.existsSync(ENV_PATH)) throw new Error('Envirnment files not found');
  dotenv.config({ path: ENV_PATH });


  (async function() {

    const result = await fetch(`https://graph.facebook.com/v2.11/oauth/access_token?client_id=${process.env.FACEBOOK_API}&client_secret=${process.env.FACEBOOK_CLIENT}&grant_type=client_credentials`);
    const json = await result.json();
    console.log('json: ', json);
    const userToken = json.access_token;

    // const result = await fetch(`https://graph.facebook.com/v2.11/me/accounts`, {
    //   headers: {
    //     Authorization: `${process.env.FACEBOOK_TOKEN}`
    //   }
    // });
    // const json = await result.json();
    // console.log(json);

    const r = await fetch(`https://graph.facebook.com/1385684418362322/feed?message=Hello&access_token=${userToken}`, {
      method: 'POST',
      headers: {
        Authorization: `${userToken}`,
      }});
    const accountsJSON = await r.json();
    console.log(accountsJSON);

    // const twitter = new Twitter();
    //
    // const result = await twitter.tweet('Это тестовый твит. Нечего смотреть, проходите мимо.');
    // console.log(result);
  })();


} catch (error) {
  console.log(error);
}
