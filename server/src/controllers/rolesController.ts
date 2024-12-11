import {Request, Response} from 'express';

import pool from '../conexion';


class RolesController{

    public list (req: Request, res: Response){
        pool.query("SELECT * FROM almacen.Roles ", (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }

    public getOne (req: Request, res: Response){
        const {id} = req.params;
        pool.query("SELECT * FROM almacen.Roles where Idrol = ?", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Rol no existe!!');
                return res.status(400).send('Rol no existe!!'); 
            }
            return res.status(200).send(results); 
        });      
    }

    public create(req: Request, res:Response){
        const { Rolusuario } = req.body;
        const data={
            Rolusuario
        };
        pool.query("INSERT INTO almacen.Roles set ?",[data], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send('Rol registrado'); 
        });
    }

    public delete(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Roles where Idrol = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Rol no existe');
                return res.status(500).send('Rol no existe');
            }else{
                pool.query("DELETE FROM almacen.Roles where Idrol = ?", [id]);
                return res.status(200).send('Rol borrado');
            }
        });
    }

    public update(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Roles where Idrol = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Rol no existe');
                return res.status(500).send('Rol no existe');
            }else{
                const { Rol } = req.body;
                pool.query("UPDATE almacen.Roles SET ? WHERE Idrol=?", [req.body, id]);
                return res.status(200).send('Rol actualizado');
            }
        });
    }

}

const rolesController = new RolesController();
export default rolesController;