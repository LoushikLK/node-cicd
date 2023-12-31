import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, param, query } from "express-validator";
import { formValidatorHelper } from "../../helpers/formValidation.helper";

export const createAwsAccount = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("instanceId")
        .optional()
        .isString()
        .withMessage("instanceId must be a string"),
      body("username")
        .notEmpty()
        .withMessage("username is required.")
        .isString()
        .withMessage("provide a valid username."),
      body("privateKey")
        .notEmpty()
        .withMessage("privateKey is required.")
        .isString()
        .withMessage("provide a valid privateKey."),
      body("publicIp")
        .notEmpty()
        .withMessage("publicIp is required.")
        .isIP()
        .withMessage("provide a valid publicIp."),
      body("awsRegion")
        .notEmpty()
        .withMessage("awsRegion is required.")
        .isString()
        .withMessage("provide a valid awsRegion."),
      body("isDefault")
        .optional()
        .isBoolean()
        .withMessage("enter a valid country code."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const updateAWsAccount = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("awsId")
        .notEmpty()
        .isMongoId()
        .withMessage("awsId is not a valid id"),
      body("instanceId")
        .optional()
        .isString()
        .withMessage("instanceId must be a string"),
      body("username")
        .optional()
        .isString()
        .withMessage("provide a valid username."),
      body("privateKey")
        .optional()
        .isString()
        .withMessage("provide a valid privateKey."),
      body("publicIp")
        .optional()
        .isIP()
        .withMessage("provide a valid publicIp."),
      body("awsRegion")
        .optional()
        .isString()
        .withMessage("provide a valid awsRegion."),
      body("isDefault")
        .optional()
        .isBoolean()
        .withMessage("enter a valid country code."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const getAwsAccount = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("awsId")
        .notEmpty()
        .isMongoId()
        .withMessage("awsId is not a valid id"),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const getAllAwsAccount = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      query("perPage")
        .optional()
        .isNumeric()
        .withMessage("perPage must be a number type")
        .toInt(),
      query("pageNo")
        .optional()
        .isNumeric()
        .withMessage("pageNo must be a number type")
        .toInt(),
      query("searchTitle")
        .optional()
        .isString()
        .withMessage("searchTitle must be a text"),
      query("awsRegion")
        .optional()
        .isString()
        .withMessage("awsRegion must be a text"),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
