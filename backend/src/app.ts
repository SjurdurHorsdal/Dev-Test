import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import Controller from './interfaces/controller.interface';

class App {
    public app: express.Application;
    public options: cors.CorsOptions = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
            'Authorization'
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: 'http://127.0.0.1:5173',
        preflightContinue: false
    };

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(Number(process.env.PORT) || 3001, () => {
            console.log(`Server listening on the port ${Number(process.env.PORT) || 3001}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use((cors(this.options)));
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}

export default App;
