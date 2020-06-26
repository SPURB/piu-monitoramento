#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "dev/app" ]; then
	cd admin
	npm install
	npm run build
else
 echo 'this is not master branch or dev/app branch. Skipping app build test...'
fi