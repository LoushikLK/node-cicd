import { BadRequest } from "http-errors";
import { AwsModel } from "../../schemas/aws";
export default class AwsServices {
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
}
