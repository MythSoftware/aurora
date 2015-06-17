pkill -f web.js
forever -w --watchIgnore '{views,public,storage,deployment,worker,.git}/**' web.js
