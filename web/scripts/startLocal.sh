pkill -f web.js
npm install
forever -w --watchIgnore '{views,public,storage,deployment,worker,.git}/**' web.js
