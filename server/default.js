import 'babel-register';
import server from './server/server';
server.listen(process.env.PORT || 5000);
