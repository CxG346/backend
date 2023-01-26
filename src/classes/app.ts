import express, { Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'

import indexRoutes from '../routes/index_routes'
import apiRoutes from '../routes/api_routes'

export default class Server{
    private static _instance: Server;

    public app: Application;

    private constructor() {
        this.app = express()
        this.config();
        this.routes();
    }

    public static get instance() {
        return this._instance ||  (this._instance = new this());
    }

    config():void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors({origin: true, credentials: true}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))
    }

    routes():void{
        this.app.use(indexRoutes);
        this.app.use('/api/data/', apiRoutes)
    }

    start():void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        })
    }
}