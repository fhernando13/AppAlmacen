"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_1 = __importDefault(require("../conexion"));
class ProductosController {
    //listar productos
    list(req, res) {
        conexion_1.default.query("SELECT * FROM almacen.Productos ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    //obtener un producto
    getOne(req, res) {
        const { id } = req.params;
        conexion_1.default.query("SELECT * FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Producto no existe!!');
                return res.status(400).send('Producto no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    //Registrar un producto
    create(req, res) {
        const { NombreProducto, PrecioProducto, EstatusProducto, ExistenciaProducto } = req.body;
        const data = {
            NombreProducto,
            PrecioProducto,
            EstatusProducto,
            ExistenciaProducto
        };
        conexion_1.default.query("INSERT INTO almacen.Productos set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('Producto registrado');
        });
    }
    //Borrar un producto
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Producto no existe');
                return res.status(500).send('Producto no existe');
            }
            else {
                conexion_1.default.query("DELETE FROM almacen.Productos where Idproducto = ?", [id]);
                return res.status(200).send('Rol borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Productos where Idproducto = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Producto no existe');
                return res.status(500).send('Producto no existe');
            }
            else {
                const { NombreProducto, PrecioProducto, EstatusProducto, ExistenciaProducto } = req.body;
                conexion_1.default.query("UPDATE almacen.Productos SET ? WHERE Idproducto=?", [req.body, id]);
                return res.status(200).send('Producto actualizado');
            }
        });
    }
}
const productosController = new ProductosController();
exports.default = productosController;
