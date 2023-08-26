import { NextFunction, Request, Response } from "express";
import { ValidationChain, param, query } from "express-validator";
import { formValidatorHelper } from "../../helpers/formValidation.helper";

export const getGithubAccount = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("githubId")
        .notEmpty()
        .isMongoId()
        .withMessage("githubId is not a valid id"),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const getGithubBranch = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("githubId")
        .notEmpty()
        .isMongoId()
        .withMessage("githubId is not a valid id"),
      param("repo").notEmpty().isString().withMessage("repo is not a string"),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const getAllGithubAccount = () => {
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
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
