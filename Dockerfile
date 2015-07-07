FROM ubuntu:14.04

# Update packages
RUN apt-get update

# Install some packages we need
RUN apt-get install -y curl

# Install Node.JS
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN sudo apt-get install -y nodejs
RUN npm -g update npm
RUN npm install -g nightwatch
RUN npm install -g gulp
RUN npm install -g phantomjs
RUN npm install -g forever
RUN npm install apidoc -g

# Copy files and run
ADD . /opt/apps/aurora
RUN cd /opt/apps/aurora && npm install
EXPOSE 8888
CMD pkill -f web.js
WORKDIR /opt/apps/aurora
CMD ./scripts/generateApiDocs.sh
CMD forever web.js
