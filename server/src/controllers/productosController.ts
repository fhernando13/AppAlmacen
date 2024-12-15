import {Request, Response} from 'express';

import pool from '../conexion';

class ProductosController{

    //listar productos
    public list (req: Request, res: Response){
        pool.query("SELECT * FROM almacen.Productos ", (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }

    //existencia de producto
    public getAll (req: Request, res: Response){
        const {id} = req.params;
        pool.query("SELECT * FROM almacen.Productos where EstatusProducto = 1", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Producto no existe!!');
                return res.status(400).send('Producto no existe!!'); 
            }
            return res.status(200).send(results); 
        });      
    }
    
    //obtener un producto
    public getOne (req: Request, res: Response){
        const {id} = req.params;
        pool.query("SELECT * FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Producto no existe!!');
                return res.status(400).send('Producto no existe!!'); 
            }
            return res.status(200).send(results); 
        });      
    }

    //Registrar un producto
    public create(req: Request, res:Response){
        const { NombreProducto, PrecioProducto, EstatusProducto, ExistenciaProducto } = req.body;
        const data={
            NombreProducto,
            PrecioProducto,
            EstatusProducto,
            ExistenciaProducto
        };
        pool.query("INSERT INTO almacen.Productos set ?",[data], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send('Producto registrado'); 
        });
    }   

    //Borrar un producto
    public delete(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Producto no existe');
                return res.status(500).send('Producto no existe');
            }else{
                pool.query("DELETE FROM almacen.Productos where Idproducto = ?", [id]);
                return res.status(200).send('Rol borrado');
            }
        });
    }

    //actualizar un producto
    public update(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Producto no existe');
                return res.status(500).send('Producto no existe');
            }else{
                const { NombreProducto, PrecioProducto, EstatusProducto, ExistenciaProducto  } = req.body;
                pool.query("UPDATE almacen.Productos SET ? WHERE Idproducto=?", [req.body, id]);
                return res.status(200).send('Producto actualizado');
            }
        });
    }

    //Obtener la existencia del producto
    public get (req: Request, res: Response){
        const {id} = req.params;
        pool.query("SELECT ExistenciaProducto FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Producto no existe!!');
                return res.status(400).send('Producto no existe!!'); 
            }
            return res.status(200).send(results);             
        });      
    }
}

const productosController = new ProductosController();
export default productosController;
