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
exports.getAllProjectAccount = exports.getProject = exports.updateProject = exports.createProject = void 0;
const express_validator_1 = require("express-validator");
const formValidation_helper_1 = require("../../helpers/formValidation.helper");
const createProject = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("githubId")
                .notEmpty()
                .isMongoId()
                .withMessage("githubId is not valid"),
            (0, express_validator_1.body)("repositoryUrl")
                .notEmpty()
                .withMessage("repositoryUrl is required.")
                .isURL()
                .withMessage("provide a valid repositoryUrl."),
            (0, express_validator_1.body)("repositoryId").notEmpty().withMessage("repositoryId is required."),
            (0, express_validator_1.body)("deployBranch")
                .notEmpty()
                .withMessage("deployBranch is required.")
                .isString()
                .withMessage("provide a valid deployBranch."),
            (0, express_validator_1.body)("defaultBranch")
                .notEmpty()
                .withMessage("defaultBranch is required.")
                .isString()
                .withMessage("provide a valid defaultBranch."),
            (0, express_validator_1.body)("projectName")
                .notEmpty()
                .withMessage("projectName is required.")
                .isString()
                .withMessage("provide a valid projectName."),
            (0, express_validator_1.body)("buildCommand")
                .notEmpty()
                .withMessage("buildCommand is required.")
                .isString()
                .withMessage("provide a valid buildCommand."),
            (0, express_validator_1.body)("startCommand")
                .notEmpty()
                .withMessage("startCommand is required.")
                .isString()
                .withMessage("provide a valid startCommand."),
            (0, express_validator_1.body)("rootDirectory")
                .optional()
                .isString()
                .withMessage("provide a valid rootDirectory."),
            (0, express_validator_1.body)("autoDeploy")
                .optional()
                .isBoolean()
                .withMessage("enter a valid autoDeploy parameter."),
            (0, express_validator_1.body)("notifyOnFailed")
                .optional()
                .isBoolean()
                .withMessage("enter a valid notifyOnFailed parameter."),
            (0, express_validator_1.body)("latestCommit")
                .optional()
                .isString()
                .withMessage("enter a valid latestCommit."),
            (0, express_validator_1.body)("deployCommit")
                .optional()
                .isString()
                .withMessage("enter a valid deployCommit."),
            (0, express_validator_1.body)("availableBranch*")
                .optional()
                .isString()
                .withMessage("enter a valid availableBranch."),
            (0, express_validator_1.body)("instanceId")
                .optional()
                .isString()
                .withMessage("instanceId must be a string"),
            (0, express_validator_1.body)("username")
                .notEmpty()
                .withMessage("username is required.")
                .isString()
                .withMessage("provide a valid username."),
            (0, express_validator_1.body)("privateKey")
                .notEmpty()
                .withMessage("privateKey is required.")
                .isString()
                .withMessage("provide a valid privateKey."),
            (0, express_validator_1.body)("publicIp")
                .notEmpty()
                .withMessage("publicIp is required.")
                .isIP()
                .withMessage("provide a valid publicIp."),
            (0, express_validator_1.body)("awsRegion")
                .notEmpty()
                .withMessage("awsRegion is required.")
                .isString()
                .withMessage("provide a valid awsRegion."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.createProject = createProject;
const updateProject = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.param)("projectId")
                .notEmpty()
                .isMongoId()
                .withMessage("projectId is not a valid id"),
            (0, express_validator_1.body)("githubId")
                .optional()
                .isMongoId()
                .withMessage("githubId is not valid"),
            (0, express_validator_1.body)("repositoryUrl")
                .optional()
                .isURL()
                .withMessage("provide a valid repositoryUrl."),
            (0, express_validator_1.body)("repositoryId")
                .optional()
                .isString()
                .withMessage("provide a valid repositoryId."),
            (0, express_validator_1.body)("deployBranch")
                .optional()
                .isString()
                .withMessage("provide a valid deployBranch."),
            (0, express_validator_1.body)("defaultBranch")
                .optional()
                .isString()
                .withMessage("provide a valid defaultBranch."),
            (0, express_validator_1.body)("projectName")
                .optional()
                .isString()
                .withMessage("provide a valid projectName."),
            (0, express_validator_1.body)("buildCommand")
                .optional()
                .isString()
                .withMessage("provide a valid buildCommand."),
            (0, express_validator_1.body)("startCommand")
                .optional()
                .isString()
                .withMessage("provide a valid startCommand."),
            (0, express_validator_1.body)("rootDirectory")
                .optional()
                .isString()
                .withMessage("provide a valid rootDirectory."),
            (0, express_validator_1.body)("autoDeploy")
                .optional()
                .isBoolean()
                .withMessage("enter a valid autoDeploy parameter."),
            (0, express_validator_1.body)("notifyOnFailed")
                .optional()
                .isBoolean()
                .withMessage("enter a valid notifyOnFailed parameter."),
            (0, express_validator_1.body)("latestCommit")
                .optional()
                .isString()
                .withMessage("enter a valid latestCommit."),
            (0, express_validator_1.body)("deployCommit")
                .optional()
                .isString()
                .withMessage("enter a valid deployCommit."),
            (0, express_validator_1.body)("availableBranch")
                .optional()
                .isString()
                .withMessage("enter a valid availableBranch."),
            (0, express_validator_1.body)("instanceId")
                .optional()
                .isString()
                .withMessage("instanceId must be a string"),
            (0, express_validator_1.body)("username")
                .optional()
                .isString()
                .withMessage("provide a valid username."),
            (0, express_validator_1.body)("privateKey")
                .optional()
                .isString()
                .withMessage("provide a valid privateKey."),
            (0, express_validator_1.body)("publicIp")
                .optional()
                .isIP()
                .withMessage("provide a valid publicIp."),
            (0, express_validator_1.body)("awsRegion")
                .optional()
                .isString()
                .withMessage("provide a valid awsRegion."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.updateProject = updateProject;
const getProject = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.param)("projectId")
                .notEmpty()
                .isMongoId()
                .withMessage("projectId is not a valid id"),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.getProject = getProject;
const getAllProjectAccount = () => {
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
            (0, express_validator_1.query)("githubId")
                .optional()
                .isMongoId()
                .withMessage("githubId id is invalid"),
            (0, express_validator_1.query)("awsId").optional().isMongoId().withMessage("awsId id is invalid"),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.getAllProjectAccount = getAllProjectAccount;
