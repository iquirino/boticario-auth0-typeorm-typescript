import './common/env';
import Server from './common/server';
import routes from './routes';
const typeormConfig = require('../ormconfig.json');

import { createConnection } from "typeorm";
createConnection();

const port = parseInt(process.env.PORT);
const app = new Server().router(routes);

export default app.listen(port);

const closeServer = app.getServer().close;
export { closeServer };
