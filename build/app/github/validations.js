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
exports.getAllGithubAccount = exports.getGithubBranch = exports.getGithubAccount = void 0;
const express_validator_1 = require("express-validator");
const formValidation_helper_1 = require("../../helpers/formValidation.helper");
const getGithubAccount = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.param)("githubId")
                .notEmpty()
                .isMongoId()
                .withMessage("githubId is not a valid id"),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.getGithubAccount = getGithubAccount;
const getGithubBranch = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.param)("githubId")
                .notEmpty()
                .isMongoId()
                .withMessage("githubId is not a valid id"),
            (0, express_validator_1.param)("repo").notEmpty().isString().withMessage("repo is not a string"),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.getGithubBranch = getGithubBranch;
const getAllGithubAccount = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.query)("perPage")
                .optional()
                .isNumeric()
                .withMessage("perPage must be a number type")
                .toInt(),
            (0, express_validator_1.query)("pageNo")
                .optional()
                .isNumeric()
                .withMessage("pageNo must be a number type")
                .toInt(),
            (0, express_validator_1.query)("searchTitle")
                .optional()
                .isString()
                .withMessage("searchTitle must be a text"),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.getAllGithubAccount = getAllGithubAccount;
