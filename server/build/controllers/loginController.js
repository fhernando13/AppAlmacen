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
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY || 'secrete_key';
class LoginController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var email = req.body.CorreoUsuario;
            var pass = req.body.PasswordUsuario;
            conexion_1.default.query("Select * from almacen.Usuarios where CorreoUsuario = ?", [email], (error, results) => __awaiter(this, void 0, void 0, function* () {
                if (results.length <= 0) {
                    console.log(error);
                    return res.status(400).send('Usuario no existe');
                }
                else {
                    var rol = '';
                    results.forEach((element) => rol = element.RolId);
                    if (yield handleBcrypt_1.default.comparePass(pass, results[0].PasswordUsuario)) {
                        const token = jwt.sign({ unique_name: email, role: rol.toString() }, secretKey, { expiresIn: "1h" });
                        return res.status(200).json({ token });
                    }
                    else {
                        return res.status(401).send('pass incorrecto');
                    }
                }
            }));
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
