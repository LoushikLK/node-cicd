// import { EventEmitter } from "events";
import { Client } from "ssh2";
import sshpk from "sshpk";

// export default class sshClientService extends EventEmitter {
//   private sshClient: Client;

//   constructor({
//     host,
//     username = "root",
//     privateKey,
//   }: {
//     host: string;
//     username?: string;
//     privateKey: string;
//   }) {
//     super();
//     this.sshClient = new Client();
//     this.connectToHost({ host, username, privateKey });
//   }

//   private connectToHost({
//     host,
//     username = "root",
//     privateKey,
//   }: {
//     host: string;
//     username?: string;
//     privateKey: string;
//   }) {
//     try {
//       this.sshClient.connect({
//         host: host,
//         port: 22,
//         username,
//         privateKey: sshpk
//           .parsePrivateKey(privateKey, "auto")
//           .toBuffer("pem", { passphrase: "" }),
//       });
//     } catch (error) {
//       console.log({ error });
//     }
//   }

//   public async sendCommand(command: string) {
//     return new Promise<string | Error>((resolve, reject) => {
//       try {
//         this.sshClient.on("ready", () => {
//           this.sshClient.exec(command, (err, stream) => {
//             if (err) {
//               this.sshClient.end();
//               if (err instanceof Error) {
//                 resolve(err.message);
//               } else {
//                 resolve("Something went wrong!");
//               }
//               return;
//             }

//             stream
//               .on("data", (data: Buffer) => {
//                 const chunk = data.toString();
//                 console.log("Received chunk:", chunk);
//                 this.emit("data", chunk); // Emit the chunk as an event
//               })
//               .stderr.on("data", (data: Buffer) => {
//                 const chunk = data.toString();
//                 this.emit("data", chunk);
//               });

//             stream.on("close", (code: number, signal: any) => {
//               this.sshClient.end();
//               if (code === 0) {
//                 resolve("Command executed successfully");
//               } else {
//                 resolve(
//                   `Command failed with code ${code} and signal ${signal}`
//                 );
//               }
//             });
//           });
//         });
//       } catch (error) {
//         if (error instanceof Error) {
//           resolve(error.message);
//         } else {
//           resolve("Something went wrong!");
//         }
//       }
//     });
//   }
// }

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
      let stdout = command + `\n`;
      conn
        .on("ready", () => {
          conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream
              .on("close", (code: string, signal: string) => {
                conn.end();
                resolve(stdout);
              })
              .on("data", (data: Buffer) => {
                let readableData = data?.toString();
                stdout = stdout + readableData;
              })
              .stderr.on("data", (data) => {
                let readableData = data?.toString();
                stdout = stdout + readableData;
              });
          });
        })
        .connect({
          host: host,
          port: 22,
          username,
          privateKey: sshpk
            .parsePrivateKey(privateKey, "auto")
            .toBuffer("pem", { passphrase: "" }),
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
