#!/bin/bash

sudo apt-get install -y libc6:i386 npm
exit 0
# install nodeJS
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

# install compiler
sudo rm /usr/local/bin/compile
sudo ln -s $(pwd)/compiler/compile.js /usr/local/bin/compile

git clone https://github.com/1024sparrow/compiler.git
cd compiler
npm install
cd ..
