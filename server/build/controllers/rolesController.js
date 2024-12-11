"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_1 = __importDefault(require("../conexion"));
class RolesController {
    list(req, res) {
        conexion_1.default.query("SELECT * FROM almacen.Roles ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    getOne(req, res) {
        const { id } = req.params;
        conexion_1.default.query("SELECT * FROM almacen.Roles where Idrol = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Rol no existe!!');
                return res.status(400).send('Rol no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    create(req, res) {
        const { Rolusuario } = req.body;
        const data = {
            Rolusuario
        };
        conexion_1.default.query("INSERT INTO almacen.Roles set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('Rol registrado');
        });
    }
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Roles where Idrol = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Rol no existe');
                return res.status(500).send('Rol no existe');
            }
            else {
                conexion_1.default.query("DELETE FROM almacen.Roles where Idrol = ?", [id]);
                return res.status(200).send('Rol borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Roles where Idrol = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Rol no existe');
                return res.status(500).send('Rol no existe');
            }
            else {
                const { Rol } = req.body;
                conexion_1.default.query("UPDATE almacen.Roles SET ? WHERE Idrol=?", [req.body, id]);
                return res.status(200).send('Rol actualizado');
            }
        });
    }
}
const rolesController = new RolesController();
exports.default = rolesController;
