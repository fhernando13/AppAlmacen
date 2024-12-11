import {Request, Response} from 'express';
import handleBCrypt from '../helpers/handleBcrypt';

import pool from '../conexion';

class UsuarioController{    

    //lista de usuarios
    public async  list (req: Request, res: Response){
        await pool.query("SELECT * FROM almacen.Usuarios ", (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }

    //obtener usuario
    public async getOne (req: Request, res: Response){        
        const {id} = req.params;
        await pool.query("SELECT * FROM almacen.Usuarios where Idusuario = ?", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Usuario no existe!!');
                return res.status(400).send('Usuario no existe!!'); 
            }
            return res.status(200).send(results); 
        });      
    }   

    //crear usuario
    public async create(req: Request, res:Response){        
        const { NombreUsuario, CorreoUsuario, PasswordUsuario, EstatusUsuario, RolId } = req.body;
        var paswordHash = await handleBCrypt.encrypt(PasswordUsuario);
        const data={
            NombreUsuario,
            CorreoUsuario,
            PasswordUsuario: paswordHash,
            EstatusUsuario,
            RolId
        };       
        await pool.query("INSERT INTO almacen.Usuarios set ?",[data], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send('Usuario registrado'); 
        });
    }

    //borrar usuario
    public delete(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Usuarios where Idusuario = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }else{
                pool.query("DELETE FROM almacen.Usuarios where Idusuario = ?", [id]);
                return res.status(200).send('Usuario borrado');
            }
        });
    }

    //actualizar usuario
    public update(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM almacen.Usuarios where Idusuario = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }else{
                const { NombreUsuario, CorreoUsuario, PasswordUsuario, EstatusUsuario, RolId } = req.body;
                pool.query("UPDATE almacen.Usuarios SET ? WHERE Idusuario=?", [req.body, id]);
                return res.status(200).send('Usuario actualizado');
            }
        });
    }



}

const usuarioController = new UsuarioController();
export default usuarioController;
