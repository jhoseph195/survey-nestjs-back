"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erroredResponse = exports.successResponse = void 0;
const successResponse = (status, message, data, count) => {
    const response = {
        response: true,
        status,
        message,
    };
    if (data) {
        response.data = data;
    }
    if (count) {
        response.count = count;
    }
    return response;
};
exports.successResponse = successResponse;
const erroredResponse = (status, exception, message = '') => {
    const response = {
        response: false,
        status,
        message: message,
        exception
    };
    if (exception === null || exception === void 0 ? void 0 : exception.errors) {
        for (const key in exception.errors) {
            if (key !== 'alive') {
                response.message = exception.errors[key].message;
                break;
            }
        }
    }
    else if (exception === null || exception === void 0 ? void 0 : exception.stack) {
        response.message = exception.stack.split(/\n/)[0];
    }
    return response;
};
exports.erroredResponse = erroredResponse;
//# sourceMappingURL=http-responses.interface.js.map