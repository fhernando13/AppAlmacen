"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = __importDefault(require("../controllers/rolesController"));
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listaroles', rolesController_1.default.list);
        this.router.get('/:id', rolesController_1.default.getOne);
        this.router.post('/', rolesController_1.default.create);
        this.router.delete('/:id', rolesController_1.default.delete);
        this.router.put('/:id', rolesController_1.default.update);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
