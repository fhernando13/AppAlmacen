"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
class HandleBCrypt {
    encrypt(textpPlain) {
        const hash = bcrypt.hash(textpPlain, 10);
        return hash;
    }
    ;
    comparePass(plainPassword, hashPassword) {
        return bcrypt.compare(plainPassword, hashPassword);
    }
    ;
}
const handleBCrypt = new HandleBCrypt();
exports.default = handleBCrypt;
