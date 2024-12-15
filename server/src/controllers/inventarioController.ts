import {Request, Response} from 'express';

import pool from '../conexion';

class InventarioController{

    //join
    //historico
    public async getall (req: Request, res: Response){
        await pool.query(`SELECT Idinventario, NombreProducto ,NombreUsuario, Movimiento, Cantidad, FechaInventario 
                          FROM almacen.Inventarios i
                               JOIN almacen.Productos p  
                          ON i.ProductoId  = p.Idproducto 
                               JOIN almacen.Movimientos m
                          ON i.MovimientoId  = m.Idmovimiento 
                               left JOIN almacen.Usuarios u 
                          ON m.Idmovimiento = u.Idusuario order by Idinventario `, (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }  

    //Aumentar existencia de u producto
    public update(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT Existencia FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => { 
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

    //Crear inventario de producto
    public async create(req: Request, res:Response){        
        const { FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId } = req.body;        
        const data={
            FechaInventario,
            Cantidad,
            UsuarioId,
            ProductoId,
            MovimientoId
        };       
        await pool.query("INSERT INTO almacen.Inventarios set ?",[data], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send('Movimiento de producto actualizado'); 
        });
    }
   
}

const inventarioController = new InventarioController();
export default inventarioController;