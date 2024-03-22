"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ssh2_1 = require("ssh2");
const sshpk_1 = __importDefault(require("sshpk"));
const sendCommand = ({ host, username = "root", privateKey, command, }) => {
    return new Promise((resolve, reject) => {
        try {
            const conn = new ssh2_1.Client();
            let stdout = "";
            conn
                .on("ready", () => {
                conn.shell((err, stream) => {
                    if (err)
                        throw err;
                    stream
                        .on("close", () => {
                        conn.end();
                        resolve(stdout);
                    })
                        .on("data", (data) => {
                        let output = data === null || data === void 0 ? void 0 : data.toString();
                        stdout += output;
                    });
                    stream.end(command + "\n" + "exit\n");
                });
            })
                .connect({
                host: host,
                port: 22,
                username,
                privateKey: sshpk_1.default
                    .parsePrivateKey(privateKey, "auto")
                    .toBuffer("pem", { passphrase: "" }),
            })
                .on("error", (err) => {
                reject(err);
            });
        }
        catch (error) {
            if (error instanceof Error) {
                resolve(error.message);
            }
            else {
                resolve("Something went wrong!");
            }
        }
    });
};
exports.default = sendCommand;
