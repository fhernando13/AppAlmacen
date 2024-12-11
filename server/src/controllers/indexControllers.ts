import {Request, Response} from 'express';

class IndexController{

    index (req: Request, res: Response){
        res.json({'message':'Api Almacen'})
    }

};

const indexController = new IndexController();
export default indexController;