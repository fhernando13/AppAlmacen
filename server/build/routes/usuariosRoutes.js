"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listausuarios', usuarioController_1.default.list);
        this.router.get('/usuariosbyrol', usuarioController_1.default.getall);
        this.router.get('/usuario/:id', usuarioController_1.default.getOne);
        this.router.get('/usuariorol/:id', usuarioController_1.default.getOneByRol);
        this.router.post('/registrar', usuarioController_1.default.create);
        this.router.delete('/eliminar/:id', usuarioController_1.default.delete);
        this.router.put('/actualizar/:id', usuarioController_1.default.update);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
