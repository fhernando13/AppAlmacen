import {Request, Response} from 'express';
import handleBCrypt from '../helpers/handleBcrypt';
import pool from '../conexion';

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY || 'secrete_key';

class LoginController{

    public async create(req: Request, res:Response){        
        var email = req.body.CorreoUsuario;
        var pass = req.body.PasswordUsuario; 
        pool.query("Select * from almacen.Usuarios where CorreoUsuario = ?", [email], async (error, results) => {
            
            if (results.length <= 0) {
                console.log(error);
                return res.status(400).send('Usuario no existe');
            }
            else {
                var rol = ''
                results.forEach((element: any) => rol = element.RolId);
                if (await handleBCrypt.comparePass(pass, results[0].PasswordUsuario)) {                
                    const token = jwt.sign({ unique_name: email, role: rol.toString() }, secretKey, { expiresIn: "1h" });
                    return res.status(200).json({ token });
                }
                else {
                    return res.status(401).send('pass incorrecto');
                }
            }
        });
    }
}

const loginController = new LoginController();
export default loginController;