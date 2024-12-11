"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movimientosController_1 = __importDefault(require("../controllers/movimientosController"));
class MovimientosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listamovimientos', movimientosController_1.default.list);
        this.router.get('/:id', movimientosController_1.default.getOne);
        this.router.post('/', movimientosController_1.default.create);
        this.router.delete('/:id', movimientosController_1.default.delete);
        this.router.put('/:id', movimientosController_1.default.update);
    }
}
const movimientosRoutes = new MovimientosRoutes();
exports.default = movimientosRoutes.router;
