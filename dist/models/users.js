"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const db_config_1 = require("../config/db.config");
const bcrypt = __importStar(require("bcrypt"));
exports.Users = {
    create: (user, callback) => {
        const str = "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
        const salt = 10;
        const hash = bcrypt.hash(user.password, salt);
        db_config_1.db.query(str, [user.firstName, user.lastName, user.email, hash], (err, result) => {
            if (err)
                callback(err);
            const insertId = result.insertId;
            callback(null, insertId);
        });
    },
    findOne: (id, callback) => {
        const str = `SELECT * FROM users WHERE id=?`;
        db_config_1.db.query(str, id, (err, result) => {
            if (err)
                callback(err);
            const row = result[0];
            callback(null, row);
        });
    },
    findAll: (callback) => {
        const str = `SELECT FROM users`;
        db_config_1.db.query(str, (err, result) => {
            if (err)
                callback(err);
            const rows = result;
            callback(null, rows);
        });
    },
    update: (user, id, callback) => {
        const strQueryParam = Object.keys(user).join("=?,") + "=?,";
        const str = `UPDATE users SET ${strQueryParam} WHERE id=?`;
        const values = Object.values(user);
        values.push(id);
        db_config_1.db.query(str, values, (err, result) => {
            if (err)
                callback(err);
            callback(null);
        });
    },
    delete: (id, callback) => {
        const str = `DELETE FROM users WHERE id=?`;
        db_config_1.db.query(str, [id], (err, result) => {
            if (err)
                callback(err);
            callback(null);
        });
    }
};
