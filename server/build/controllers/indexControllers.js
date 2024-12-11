"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ 'message': 'Api Almacen' });
    }
}
;
const indexController = new IndexController();
exports.default = indexController;
