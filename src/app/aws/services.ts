import { BadRequest } from "http-errors";
import { FilterQuery } from "mongoose";
import paginationHelper from "../../helpers/pagination.helper";
import { AwsModel } from "../../schemas/aws";
import { IAws } from "../../types/aws";
export default class AwsServices {
  constructor() {}
  public async createAwsService({
    instanceId,
    username,
    privateKey,
    awsRegion,
    isDefault,
    publicIp,
    userId,
  }: {
    instanceId?: string;
    username: string;
    privateKey: string;
    awsRegion?: string;
    isDefault?: boolean;
    publicIp: string;
    userId: string;
  }) {
    const awsAccount = await AwsModel.create({
      instanceId,
      username,
      privateKey,
      awsRegion,
      isDefault,
      publicIp,
      userId,
    });

    if (!awsAccount) throw new BadRequest("AWS account create failed");

    return awsAccount._id;
  }
  public async updateAwsService({
    instanceId,
    username,
    privateKey,
    awsRegion,
    isDefault,
    publicIp,
    userId,
    awsId,
  }: {
    instanceId?: string;
    username: string;
    privateKey: string;
    awsRegion?: string;
    isDefault?: boolean;
    publicIp: string;
    userId: string;
    awsId: string;
  }) {
    const awsAccount = await AwsModel.findByIdAndUpdate(awsId, {
      instanceId,
      username,
      privateKey,
      awsRegion,
      isDefault,
      publicIp,
      userId,
    });

    if (!awsAccount) throw new BadRequest("AWS account not found");

    return awsAccount._id;
  }
  public async getAwsAccountByIdService(awsId: string) {
    const awsAccount = await AwsModel.findById(awsId);

    if (!awsAccount) throw new BadRequest("AWS account not found");

    return awsAccount;
  }
  public async getAllAwsAccount({
    awsRegion,
    searchTitle,
    pageNo,
    perPage,
    userId,
  }: {
    awsRegion?: string;
    searchTitle?: string;
    perPage?: string;
    pageNo?: string;
    userId?: string;
  }) {
    //create dynamic query

    let dynamicQuery: FilterQuery<IAws> = { userId: userId };

    if (searchTitle)
      dynamicQuery.$or = [
        {
          awsRegion: new RegExp(searchTitle, "i"),
        },
        {
          instanceId: new RegExp(searchTitle, "i"),
        },
        {
          username: new RegExp(searchTitle, "i"),
        },
        {
          publicIp: new RegExp(searchTitle, "i"),
        },
      ];

    if (awsRegion) dynamicQuery.awsRegion = awsRegion;

    const awsAccount = await paginationHelper({
      model: AwsModel,
      query: dynamicQuery,
      perPage,
      pageNo,
    });

    if (!awsAccount) throw new BadRequest("AWS accounts not found");

    return awsAccount;
  }
}
