import { NextFunction, Request, Response } from "express";
import { ValidationChain, body } from "express-validator";
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
