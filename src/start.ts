

import * as express from 'express';
const port: number|string = process.env.PORT || 4123;
const app = express();
import { MenuController } from './menu-controller';

app.all('/menu', MenuController.get);

app.use((err: any, req: express.Request, res: express.Response, next: Function ) => {
    res.json(`got here: ${err}`);
});

app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Enterprise online at port: ${port}`);
});
