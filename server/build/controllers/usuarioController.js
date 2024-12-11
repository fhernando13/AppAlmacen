"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleBcrypt_1 = __importDefault(require("../helpers/handleBcrypt"));
const conexion_1 = __importDefault(require("../conexion"));
class UsuarioController {
    //lista de usuarios
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexion_1.default.query("SELECT * FROM almacen.Usuarios ", (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send(results);
            });
        });
    }
    //obtener usuario
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield conexion_1.default.query("SELECT * FROM almacen.Usuarios where Idusuario = ?", [id], (error, results, fields) => {
                if (error) {
                    console.log(error);
                }
                if (results == false) {
                    console.log('Usuario no existe!!');
                    return res.status(400).send('Usuario no existe!!');
                }
                return res.status(200).send(results);
            });
        });
    }
    //Usuarios por rol
    getall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexion_1.default.query("SELECT Idusuario, NombreUsuario, CorreoUsuario, EstatusUsuario, Rolusuario FROM almacen.Usuarios u INNER JOIN almacen.Roles r ON u.Rolid = r.Idrol ", (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send(results);
            });
        });
    }
    //obtener usuario por rol
    getOneByRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield conexion_1.default.query("SELECT Idusuario, NombreUsuario, CorreoUsuario, EstatusUsuario, RolUsuario FROM almacen.Usuarios u inner JOIN almacen.Roles r ON u.Rolid  = r.Idrol where Idusuario = ?", [id], (error, results, fields) => {
                if (error) {
                    console.log(error);
                }
                if (results == false) {
                    console.log('Usuario no existe!!');
                    return res.status(400).send('Usuario no existe!!');
                }
                return res.status(200).send(results);
            });
        });
    }
    //crear usuario
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { NombreUsuario, CorreoUsuario, PasswordUsuario, EstatusUsuario, RolId } = req.body;
            var paswordHash = yield handleBcrypt_1.default.encrypt(PasswordUsuario);
            const data = {
                NombreUsuario,
                CorreoUsuario,
                PasswordUsuario: paswordHash,
                EstatusUsuario,
                RolId
            };
            yield conexion_1.default.query("INSERT INTO almacen.Usuarios set ?", [data], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send('Usuario registrado');
            });
        });
    }
    //borrar usuario
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Usuarios where Idusuario = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }
            else {
                conexion_1.default.query("DELETE FROM almacen.Usuarios where Idusuario = ?", [id]);
                return res.status(200).send('Usuario borrado');
            }
        });
    }
    //actualizar usuario
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        conexion_1.default.query("SELECT * FROM almacen.Usuarios where Idusuario = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }
            else {
                const { NombreUsuario, CorreoUsuario, PasswordUsuario, EstatusUsuario, RolId } = req.body;
                conexion_1.default.query("UPDATE almacen.Usuarios SET ? WHERE Idusuario=?", [req.body, id]);
                return res.status(200).send('Usuario actualizado');
            }
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
