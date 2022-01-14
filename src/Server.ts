import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/mongoose";
import { config, rootDir } from "./config";
import { AppConfig } from "./config/app";



@Configuration({
  ...config,
  // ajv: {
  //   errorFormatter: (error) => `Value '${error.data}' of '${error.dataPath}' is incorrect`,
  //   verbose: false,
  //   // formats : 
  // },
  acceptMimes: ["application/json"],
  logger: {
    debug: false,
    logRequest: false,
    requestFields: []
  },
  httpPort: AppConfig.port,
  httpsPort: false, // CHANGE
  mount: {
    "/api/v1": [
      `${rootDir}/controllers/**/*.ts`
    ],
    "/": [
      `${rootDir}/controllers/health/**/*.ts` //this is for ELB health check
    ]
  },
  componentsScan: [
    `${rootDir}/services/**/*.ts`,
    `${rootDir}/dao/**/*.ts`,
    `${rootDir}/protocols/**/*.ts`,
    `${rootDir}/middlewares/**/*.ts`,
    `${rootDir}/common/app-exception-handlers/**/*.ts`
  ],


  //swagger is not shown in PROD
  swagger: AppConfig.getSwaggerList,
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors({
        origin: "*"
      }))
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
