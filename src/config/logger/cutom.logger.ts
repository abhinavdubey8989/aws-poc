import { Logger } from "@tsed/logger";

export const myLogger = new Logger("myLogger");

myLogger.appenders
  .set("console-log", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "pattern",
      pattern: '[%d] [%p] [%x{user}] [%m]',
      tokens: {
        user: 'user-1'
      }
    }
  })
  .set("file-log", {
    type: 'file',
    filename: `${__dirname}/../../../logs/myfile.log`,
    pattern: '.yyyy-MM-dd', //filename format of compressed file
    layout: {
      type: "pattern",
      pattern: '[%d] [%X{respId}] [%p] [%x{user}] [%m] %n'
    },
    maxLogSize: 1,
    backups: 3,
    compress: true
  });




