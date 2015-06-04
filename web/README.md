# aurora - web
## Getting Started
1. Install node v0.10.37
2. Install npm
3. npm install - this will install dependencies in ./node_modules
4. Install forever globally - sudo npm install forever -g
5. forever web.js
6. browse to http://localhost:8888
# project structure
- ./web.js - main node server
- ./public - resources publically available
  - icons
  - images
  - js
  - css
- ./views - this is where the jade templates goes for generating the html pages
- ./node_modules
  - node dependencies are stored here
  - git should ignore this directory
