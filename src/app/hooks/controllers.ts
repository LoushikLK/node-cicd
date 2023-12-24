import { NextFunction, Request, Response } from "express";
import HookService from "./services";

export default class HookController {
  private service: HookService;
  constructor() {
    this.service = new HookService();
  }

  /**
   * handleHooks
   *
   */

  public async handleHooks(req: Request, res: Response, next: NextFunction) {
    try {
      // handle hooks for different event

      switch (req?.headers["x-github-event"]) {
        case "push":
          await this.service.handlePushEvent(req.body);
          break;
        case "installation":
          if (req.body?.action === "create") {
            await this.service.handleInstallationCreateEvent(req.body);
          } else if (req.body?.action === "delete") {
            await this.service.handleInstallationDeleteEvent(req.body);
          }
          break;

        default:
          break;
      }

      await this.service.handlePushEvent(req.body);

      //send response to client
      res.json({
        msg: "Success",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
