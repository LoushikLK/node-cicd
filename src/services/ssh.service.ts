import { Client } from "ssh2";

export default class sshClientService {
  private sshClient: Client;
  constructor({
    host,
    username = "root",
    privateKey,
  }: {
    host: string;
    username?: string;
    privateKey: string;
  }) {
    this.sshClient = new Client();
    this.sshClient.connect({
      host: host,
      port: 22,
      username,
      privateKey,
    });
  }

  public async sendCommand(command: string) {
    try {
      this.sshClient.on("ready", () => {
        this.sshClient.exec(command, (err, stream) => {
          if (err) throw err;
          stream
            .on("close", () => {
              this.sshClient.end();
            })
            .on("data", (data: string) => {
              console.log({ data });
              return data;
            })
            .stderr.on("data", (data) => {
              console.log({ data });
              return data;
            });
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        return error?.message;
      } else {
        return "Something went wrong!";
      }
    }
  }
}
