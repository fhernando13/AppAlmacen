import {Request, Response} from 'express';

import pool from '../conexion';

class MovimientosController{

    public list (req: Request, res: Response){
        pool.query("SELECT * FROM almacen.Movimientos ", (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }

    public getOne (req: Request, res: Response){
        const {id} = req.params;
        pool.query("SELECT * FROM almacen.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Movimiento no existe!!');
                return res.status(400).send('Movimiento no existe!!'); 
            }
            return res.status(200).send(results); 
        });      
    }

    public create(req: Request, res:Response){
        const { Movimiento } = req.body;
        const data={
            Movimiento
        };
        pool.query("INSERT INTO almacen.Movimientos set ?",[data], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send('Movimiento registrado'); 
        });
    }
  
    public delete(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Movimiento no existe');
                return res.status(500).send('Movimiento no existe');
            }else{
                pool.query("DELETE FROM almacen.Movimientos where Idrol = ?", [id]);
                return res.status(200).send('Movimiento borrado');
            }
        });
    }

    public update(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Movimiento no existe');
                return res.status(500).send('Rol no existe');
            }else{
                const { Movimiento } = req.body;
                pool.query("UPDATE almacen.Movimientos SET ? WHERE Idmovimiento=?", [req.body, id]);
                return res.status(200).send('Movimiento actualizado');
            }
        });
    }

};

const movimientosController = new MovimientosController();
export default movimientosController;