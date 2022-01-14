import { PlatformLoggerSettings, $log } from "@tsed/common";


//config for console logs
$log.appenders.set("stdout", {
  type: "stdout",
  levels: ["info", "warn", "error"],
  layout: {
    type: "pattern",
    pattern: '[%d] [%p] %m',
  }
});


//config for file logs
$log.appenders.set("file", {
  levels: ["error", "warn", "info"],
  type: "file",
  filename: `${__dirname}/../../../logs/app-logs.log`,
  pattern: '.yyyy-MM-dd', //filename format of compressed file ,  1 log file per day
  layout: {
    type: "pattern",
    pattern: '[%d] [%p] [%m]'
  },
  maxLogSize: 1,
  backups: 3,
  compress: true
});



export const loggerConfig: Partial<PlatformLoggerSettings> = {
  disableRoutesSummary: true
};
