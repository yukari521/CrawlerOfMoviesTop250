"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = function (data, error, message) {
    if (error) {
        return {
            success: false,
            error: error,
            message: message,
            data: data,
        };
    }
    else {
        return {
            success: true,
            error: error,
            message: message,
            data: data,
        };
    }
};
exports.recursion = function () { };
