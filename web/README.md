# aurora - web
## Getting Started
1. Install node v0.10.37
2. Install npm
3. npm install - this will install dependencies in ./node_modules
4. Check your node install
  - node -v
  - Is it installed? Skip to 5
  - If not...
    - nodejs -v
    - Is it installed?
      - sudo ln -s /usr/bin/nodejs /usr/bin/node
5. Install forever globally
  - sudo npm install forever -g
6. cd /path/to/aurora/web
7. chmod +x ./scripts/startLocal.sh
8. ./scripts/startLocal.sh
9. browse to http://localhost:8888

# project structure
- ./web.js - main node server
- ./public - resources publically available
  - css
  - images
  - js
  - lib
- ./views - this is where the jade views go for generating the html pages
  - Noteworthy directories
    - ./views/layouts - this is where the main page templates go
    - ./views/partials
      - these are partial html pages rendered via http requests
      - they need to have a route setup in web.js
- ./node_modules
  - node dependencies are stored here
  - git should ignore this directory
