pkill -f web.js
npm install
forever -w --watchIgnore '{scripts,views,public,storage,deployment,worker,.git}/**' web.js
