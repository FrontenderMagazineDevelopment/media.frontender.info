#!/usr/bin/env bash

export RESULT_DIR=media.frontender.info.${TRAVIS_BUILD_NUMBER}
export SSHPASS=${SSH_PASS}
export ARCH_NAME=media.package.tgz
export SYMLINK_NAME=media.frontender.info
export PROCESS_NAME=media.frontender.info

mkdir ${RESULT_DIR}
shopt -s extglob
mv -f -v !(${RESULT_DIR}) ./${RESULT_DIR}
mv -f -v ./{.[!.],}* ./${RESULT_DIR}
tar -czf ${ARCH_NAME} ${RESULT_DIR}
sshpass -e scp -C -o StrictHostKeyChecking=no ${ARCH_NAME} ${SSH_USER}@${SSH_IP}:${WEB_PATH}
sshpass -e ssh -C ${SSH_USER}@${SSH_IP} << EOF
cd ${WEB_PATH};
tar -xzf ./${ARCH_NAME} -C ./;
rm ./${ARCH_NAME};
ls -dt ${WEB_PATH}*/ | tail -n +5 | xargs rm -rf;
rm ./.env
if [ ! -f ".env" ]; then
  echo TWITTER_CUSTOMER_KEY=${TWITTER_CUSTOMER_KEY} >> .env
  echo TWITTER_CUSTOMER_KEY_SECRET=${TWITTER_CUSTOMER_KEY_SECRET} >> .env
  echo TWITTER_TOKEN=${TWITTER_TOKEN} >> .env
  echo TWITTER_TOKEN_SECRET=${TWITTER_TOKEN_SECRET} >> .env
  echo FACEBOOK_API=${FACEBOOK_API} >> .env
  echo FACEBOOK_TOKEN=${FACEBOOK_TOKEN} >> .env
  echo FACEBOOK_CLIENT=${FACEBOOK_CLIENT} >> .env
  echo JWT_SECRET=${JWT_SECRET} >> .env
  echo COOKIE_SECRET=${COOKIE_SECRET} >> .env
fi
cd ${RESULT_DIR};
export NODE_ENV=production;
npm i;
cd ..
rm -dRf ${SYMLINK_NAME}
ln -ds ${RESULT_DIR} ./${SYMLINK_NAME}
cd ./${SYMLINK_NAME}
npm run build
pm2 stop ${PROCESS_NAME}
pm2 delete ${PROCESS_NAME}
pm2 start ./build/server.js --watch --name="${PROCESS_NAME}"
EOF
