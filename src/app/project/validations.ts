import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, param, query } from "express-validator";
import { formValidatorHelper } from "../../helpers/formValidation.helper";

export const createProject = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("githubId")
        .notEmpty()
        .isMongoId()
        .withMessage("githubId is not valid"),
      body("awsId").notEmpty().isMongoId().withMessage("awsId is not valid"),
      body("repositoryUrl")
        .notEmpty()
        .withMessage("repositoryUrl is required.")
        .isURL()
        .withMessage("provide a valid repositoryUrl."),
      body("repositoryId")
        .notEmpty()
        .withMessage("repositoryId is required.")
        .isString()
        .withMessage("provide a valid repositoryId."),
      body("deployBranch")
        .notEmpty()
        .withMessage("deployBranch is required.")
        .isString()
        .withMessage("provide a valid deployBranch."),
      body("defaultBranch")
        .notEmpty()
        .withMessage("defaultBranch is required.")
        .isString()
        .withMessage("provide a valid defaultBranch."),
      body("projectName")
        .notEmpty()
        .withMessage("projectName is required.")
        .isString()
        .withMessage("provide a valid projectName."),
      body("buildCommand")
        .notEmpty()
        .withMessage("buildCommand is required.")
        .isString()
        .withMessage("provide a valid buildCommand."),
      body("startCommand")
        .notEmpty()
        .withMessage("startCommand is required.")
        .isString()
        .withMessage("provide a valid startCommand."),
      body("rootDirectory")
        .optional()
        .isString()
        .withMessage("provide a valid rootDirectory."),
      body("autoDeploy")
        .optional()
        .isBoolean()
        .withMessage("enter a valid autoDeploy parameter."),
      body("notifyOnFailed")
        .optional()
        .isBoolean()
        .withMessage("enter a valid notifyOnFailed parameter."),
      body("latestCommit")
        .optional()
        .isString()
        .withMessage("enter a valid latestCommit."),
      body("deployCommit")
        .optional()
        .isString()
        .withMessage("enter a valid deployCommit."),
      body("availableBranch")
        .optional()
        .isString()
        .withMessage("enter a valid availableBranch."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const updateProject = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("projectId")
        .notEmpty()
        .isMongoId()
        .withMessage("projectId is not a valid id"),
      body("githubId")
        .optional()
        .isMongoId()
        .withMessage("githubId is not valid"),
      body("awsId").optional().isMongoId().withMessage("awsId is not valid"),
      body("repositoryUrl")
        .optional()
        .isURL()
        .withMessage("provide a valid repositoryUrl."),
      body("repositoryId")
        .optional()
        .isString()
        .withMessage("provide a valid repositoryId."),
      body("deployBranch")
        .optional()
        .isString()
        .withMessage("provide a valid deployBranch."),
      body("defaultBranch")
        .optional()
        .isString()
        .withMessage("provide a valid defaultBranch."),
      body("projectName")
        .optional()
        .isString()
        .withMessage("provide a valid projectName."),
      body("buildCommand")
        .optional()
        .isString()
        .withMessage("provide a valid buildCommand."),
      body("startCommand")
        .optional()
        .isString()
        .withMessage("provide a valid startCommand."),
      body("rootDirectory")
        .optional()
        .isString()
        .withMessage("provide a valid rootDirectory."),
      body("autoDeploy")
        .optional()
        .isBoolean()
        .withMessage("enter a valid autoDeploy parameter."),
      body("notifyOnFailed")
        .optional()
        .isBoolean()
        .withMessage("enter a valid notifyOnFailed parameter."),
      body("latestCommit")
        .optional()
        .isString()
        .withMessage("enter a valid latestCommit."),
      body("deployCommit")
        .optional()
        .isString()
        .withMessage("enter a valid deployCommit."),
      body("availableBranch")
        .optional()
        .isString()
        .withMessage("enter a valid availableBranch."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const getProject = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      param("projectId")
        .notEmpty()
        .isMongoId()
        .withMessage("projectId is not a valid id"),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
export const getAllProjectAccount = () => {
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
      query("githubId")
        .optional()
        .isMongoId()
        .withMessage("githubId id is invalid"),
      query("awsId").optional().isMongoId().withMessage("awsId id is invalid"),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
