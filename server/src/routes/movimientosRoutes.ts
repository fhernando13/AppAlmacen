import { Router } from 'express';

import movimientosController from '../controllers/movimientosController';

class MovimientosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/listamovimientos', movimientosController.list);
        this.router.get('/:id', movimientosController.getOne);
        this.router.post('/', movimientosController.create);
        this.router.delete('/:id', movimientosController.delete);
        this.router.put('/:id', movimientosController.update);
    }

}
const movimientosRoutes = new MovimientosRoutes();
export default movimientosRoutes.router;