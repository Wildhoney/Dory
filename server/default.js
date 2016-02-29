import 'babel-register';
import 'css-modules-require-hook/preset';
import server from './server/server';
server.listen(process.env.PORT || 5000);
