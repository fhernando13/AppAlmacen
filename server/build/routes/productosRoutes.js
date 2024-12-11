"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = __importDefault(require("../controllers/productosController"));
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listaproductos', productosController_1.default.list);
        this.router.get('/producto/:id', productosController_1.default.getOne);
        this.router.get('/productosactivos/', productosController_1.default.getAll);
        this.router.get('/existencia/:id', productosController_1.default.get);
        this.router.post('/registrar', productosController_1.default.create);
        this.router.delete('/eliminar/:id', productosController_1.default.delete);
        this.router.put('/actualizar/:id', productosController_1.default.update);
    }
}
const productosRoutes = new UsuarioRoutes();
exports.default = productosRoutes.router;
