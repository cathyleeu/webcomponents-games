#!/bin/bash
rm -rf bundle
cd webapp
meteor build --directory ..
cd ../bundle/programs/server/
npm install
cd ../../..
