import { Router } from 'express';

import productosController from '../controllers/productosController';

class UsuarioRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/listaproductos', productosController.list);
        this.router.get('/producto/:id', productosController.getOne);
        this.router.post('/registrar', productosController.create);
        this.router.delete('/eliminar/:id', productosController.delete);
        this.router.put('/actualizar/:id', productosController.update);
    }

}
const productosRoutes = new UsuarioRoutes();
export default productosRoutes.router;