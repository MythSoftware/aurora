FROM ubuntu:14.04

# Update packages
RUN apt-get update

# Install some packages we need
RUN apt-get install -y curl

# Install Node.JS
RUN cd /usr/local && curl http://nodejs.org/dist/v0.10.37/node-v0.10.37-linux-x64.tar.gz | tar --strip-components=1 -zxf- && cd
RUN npm -g update npm
RUN npm install -g forever
RUN npm install apidoc -g

# Copy files and run
ADD . /opt/apps/aurora
RUN cd /opt/apps/aurora && npm install
EXPOSE 8888
CMD pkill -f web.js
CMD cd /opt/apps/aurora && ./scripts/generateApiDocs.sh
CMD cd /opt/apps/aurora && forever web.js
