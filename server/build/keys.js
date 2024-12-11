"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const user = process.env.USERDB || 'root';
const pass = process.env.PASS || 'rot';
const host = process.env.HOST || 'name_host'; //or name docker
const db = process.env.DATABASE || 'db_name';
exports.default = {
    database: {
        host: host,
        user: user,
        password: pass,
        databse: db,
    }
};
