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
exports.validateResendVerificationCode = exports.validateForgotPasswordOTPVerify = exports.validateForgotPassword = exports.validateEmailVerify = exports.validateEmailRegistration = exports.validateEmailLogin = exports.validateChangePassword = void 0;
const express_validator_1 = require("express-validator");
const formValidation_helper_1 = require("../../helpers/formValidation.helper");
const validateEmailRegistration = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("email")
                .notEmpty()
                .withMessage("email is required.")
                .trim()
                .isEmail()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("displayName")
                .notEmpty()
                .withMessage("displayName is required.")
                .isString()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("gender")
                .optional()
                .isIn(["MALE", "FEMALE", "OTHER", "NONE"])
                .withMessage("gender value must be one of MALE,FEMALE,OTHER,NONE."),
            (0, express_validator_1.body)("phoneNumber")
                .optional()
                .isMobilePhone("en-IN")
                .withMessage("enter a valid mobile number."),
            (0, express_validator_1.body)("countryCode")
                .optional()
                .isNumeric()
                .withMessage("enter a valid country code."),
            (0, express_validator_1.body)("password")
                .notEmpty()
                .withMessage("password is required.")
                .isStrongPassword({
                minLength: 6,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minUppercase: 1,
            })
                .withMessage("Enter a strong password that contains a minimum 1 lowercase, 1 uppercase, 1 number, 1 symbol."),
            (0, express_validator_1.body)("confirmPassword")
                .notEmpty()
                .withMessage("confirmPassword is required.")
                .custom((value, { req }) => {
                var _a;
                if (value !== ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.password))
                    return false;
                return true;
            })
                .withMessage("Password and confirmPassword must match."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.validateEmailRegistration = validateEmailRegistration;
const validateEmailVerify = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("token")
                .notEmpty()
                .withMessage("token is required.")
                .trim()
                .isJWT()
                .withMessage("provide a valid token."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.validateEmailVerify = validateEmailVerify;
const validateResendVerificationCode = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("email")
                .optional()
                .trim()
                .isEmail()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("phoneNumber")
                .optional()
                .trim()
                .isMobilePhone("en-IN")
                .withMessage("provide a valid phoneNumber.")
                .custom((value, { req }) => {
                var _a;
                if (!value && !((_a = req.body) === null || _a === void 0 ? void 0 : _a.email))
                    return false;
                return true;
            })
                .withMessage("Email is required."),
            (0, express_validator_1.body)("isPhoneNumber")
                .optional()
                .isBoolean()
                .withMessage("provide a valid isPhoneNumber.")
                .toBoolean(),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.validateResendVerificationCode = validateResendVerificationCode;
const validateEmailLogin = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("email")
                .notEmpty()
                .withMessage("Provide a valid email.")
                .isEmail()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("password").notEmpty().withMessage("Provide a valid password."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.validateEmailLogin = validateEmailLogin;
const validateChangePassword = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("email")
                .notEmpty()
                .withMessage("Provide a valid email.")
                .isEmail()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("password").notEmpty().withMessage("Provide a valid password."),
            (0, express_validator_1.body)("newPassword")
                .notEmpty()
                .withMessage("Provide a valid newPassword.")
                .custom((value, { req }) => {
                var _a;
                if (value !== ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.password)) {
                    return false;
                }
                return true;
            })
                .withMessage("Password and newPassword must match."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.validateChangePassword = validateChangePassword;
const validateForgotPassword = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("email")
                .notEmpty()
                .withMessage("email is required.")
                .trim()
                .isEmail()
                .withMessage("provide a valid email."),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.validateForgotPassword = validateForgotPassword;
const validateForgotPasswordOTPVerify = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validations = [
            (0, express_validator_1.body)("email")
                .notEmpty()
                .withMessage("email is required.")
                .trim()
                .isEmail()
                .withMessage("provide a valid email."),
            (0, express_validator_1.body)("newPassword")
                .notEmpty()
                .withMessage("newPassword is required.")
                .isStrongPassword({
                minLength: 6,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minUppercase: 1,
            })
                .withMessage("Enter a strong password that contains a minimum 1 lowercase, 1 uppercase, 1 number, 1 symbol."),
            (0, express_validator_1.body)("confirmPassword")
                .notEmpty()
                .withMessage("confirmPassword is required.")
                .custom((value, { req }) => {
                var _a;
                if (value !== ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.newPassword))
                    return false;
                return true;
            })
                .withMessage("newPassword and confirmPassword must match."),
            (0, express_validator_1.body)("otp")
                .notEmpty()
                .withMessage("otp is required.")
                .isNumeric()
                .withMessage("otp is invalid.")
                .toInt(),
        ];
        yield (0, formValidation_helper_1.formValidatorHelper)(validations, req, res, next);
    });
};
exports.validateForgotPasswordOTPVerify = validateForgotPasswordOTPVerify;
