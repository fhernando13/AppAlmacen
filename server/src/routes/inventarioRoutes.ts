import { Router } from 'express';

import inventarioController from '../controllers/inventarioController';

class InventariosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{        
        this.router.get('/historicocompleto', inventarioController.getall);
        this.router.post('/entrada', inventarioController.create);
    }

}
const inventariosRoutes = new InventariosRoutes();
export default inventariosRoutes.router;