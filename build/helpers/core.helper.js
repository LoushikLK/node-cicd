"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOTP = void 0;
const createOTP = (length) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);
    return Math.floor(Math.random() * (max - min) + min);
};
exports.createOTP = createOTP;
