import { Client } from "ssh2";
import sshpk from "sshpk";

const sendCommand = ({
  host,
  username = "root",
  privateKey,
  command,
}: {
  host: string;
  username?: string;
  privateKey: string;
  command: string;
}) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const conn = new Client();
      let stdout = "";
      conn
        .on("ready", () => {
          conn.shell((err, stream) => {
            if (err) throw err;
            stream
              .on("close", () => {
                conn.end();
                resolve(stdout);
              })
              .on("data", (data: string) => {
                let output = data?.toString();

                stdout += output;
              });

            stream.end(command + "\n" + "exit\n");
          });
        })
        .connect({
          host: host,
          port: 22,
          username,
          privateKey: sshpk
            .parsePrivateKey(privateKey, "auto")
            .toBuffer("pem", { passphrase: "" }),
        })
        .on("error", (err) => {
          reject(err);
        });
    } catch (error) {
      if (error instanceof Error) {
        resolve(error.message);
      } else {
        resolve("Something went wrong!");
      }
    }
  });
};

export default sendCommand;
