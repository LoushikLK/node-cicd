"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formValidatorHelper = void 0;
const express_validator_1 = require("express-validator");
const formValidatorHelper = (validations, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //run all the validation
    yield Promise.all(validations.map((validation) => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    //if error is not empty response from here
    if (!errors.isEmpty()) {
        return res.status(406).json({
            success: false,
            msg: errors.array().map((errors) => {
                if ((errors === null || errors === void 0 ? void 0 : errors.type) === "field") {
                    return {
                        key: errors.path,
                        msg: errors.msg,
                    };
                }
                else {
                    return {
                        key: errors.type,
                        msg: errors.msg,
                    };
                }
            }),
        });
    }
    //if no error go to the next function
    next();
});
exports.formValidatorHelper = formValidatorHelper;
