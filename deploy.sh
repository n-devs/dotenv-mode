# publish yarn package
cd ../node
yarn global add npm-cli-login
npm-cli-login
yarn version $TRAVIS_TAG --allow-same-version
yarn publish --access public 