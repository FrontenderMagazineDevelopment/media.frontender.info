'use strict';require('babel-polyfill');var _twitter=require('./lib/twitter/twitter');var _twitter2=_interopRequireDefault(_twitter);var _path=require('path');var _fs=require('fs');var _fs2=_interopRequireDefault(_fs);var _dotenv=require('dotenv');var _dotenv2=_interopRequireDefault(_dotenv);var _isomorphicFetch=require('isomorphic-fetch');var _isomorphicFetch2=_interopRequireDefault(_isomorphicFetch);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}try{var _require=require('../package.json'),name=_require.name,version=_require.version;var ENV_PATH=(0,_path.resolve)(__dirname,'../../.env');if(!_fs2.default.existsSync(ENV_PATH))throw new Error('Envirnment files not found');_dotenv2.default.config({path:ENV_PATH});_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(){var result,json,userToken,r,accountsJSON;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return(0,_isomorphicFetch2.default)('https://graph.facebook.com/v2.11/oauth/access_token?client_id='+process.env.FACEBOOK_API+'&client_secret='+process.env.FACEBOOK_CLIENT+'&grant_type=client_credentials');case 2:result=_context.sent;_context.next=5;return result.json();case 5:json=_context.sent;console.log('json: ',json);userToken=json.access_token;// const result = await fetch(`https://graph.facebook.com/v2.11/me/accounts`, {
//   headers: {
//     Authorization: `${process.env.FACEBOOK_TOKEN}`
//   }
// });
// const json = await result.json();
// console.log(json);
_context.next=10;return(0,_isomorphicFetch2.default)('https://graph.facebook.com/1385684418362322/feed?message=Hello&access_token='+userToken,{method:'POST',headers:{Authorization:''+userToken}});case 10:r=_context.sent;_context.next=13;return r.json();case 13:accountsJSON=_context.sent;console.log(accountsJSON);// const twitter = new Twitter();
//
// const result = await twitter.tweet('Это тестовый твит. Нечего смотреть, проходите мимо.');
// console.log(result);
case 15:case'end':return _context.stop();}}},_callee,this)}))()}catch(error){console.log(error)}
//# sourceMappingURL=index.js.map