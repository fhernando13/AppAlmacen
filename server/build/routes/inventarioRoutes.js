"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventarioController_1 = __importDefault(require("../controllers/inventarioController"));
class InventariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/historicocompleto', inventarioController_1.default.getall);
        this.router.post('/entrada', inventarioController_1.default.create);
    }
}
const inventariosRoutes = new InventariosRoutes();
exports.default = inventariosRoutes.router;
