import { UserModel } from "../../schemas/user";

export default class UserService {
  public async handleSelfData(userId: string) {
    try {
      const user = await UserModel.findById(userId)
        .select("-__v -updatedAt")
        .lean();
      return user;
    } catch (error) {
      throw error;
    }
  }
}
