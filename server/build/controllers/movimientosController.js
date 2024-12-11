"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_1 = __importDefault(require("../conexion"));
class MovimientosController {
    list(req, res) {
        conexion_1.default.query("SELECT * FROM almacen.Movimientos ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    getOne(req, res) {
        const { id } = req.params;
        conexion_1.default.query("SELECT * FROM almacen.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Movimiento no existe!!');
                return res.status(400).send('Movimiento no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    create(req, res) {
        const { Movimiento } = req.body;
        const data = {
            Movimiento
        };
        conexion_1.default.query("INSERT INTO almacen.Movimientos set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('Movimiento registrado');
        });
    }
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Movimiento no existe');
                return res.status(500).send('Movimiento no existe');
            }
            else {
                conexion_1.default.query("DELETE FROM almacen.Movimientos where Idrol = ?", [id]);
                return res.status(200).send('Movimiento borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Movimiento no existe');
                return res.status(500).send('Rol no existe');
            }
            else {
                const { Movimiento } = req.body;
                conexion_1.default.query("UPDATE almacen.Movimientos SET ? WHERE Idmovimiento=?", [req.body, id]);
                return res.status(200).send('Movimiento actualizado');
            }
        });
    }
}
;
const movimientosController = new MovimientosController();
exports.default = movimientosController;
