import { Context, Controller, Get, Inject, Post, Req } from "@tsed/common";
import { LogService } from "src/services/log.service";
import { ApiResponse } from "../api-models/apiResponse";


@Controller({
  path: "/",
})
export class HealthController {


  @Inject()
  private logService: LogService;



  @Get("/get")
  getMethod(
    @Req() req: Req,
    @Context() ctx: Context) {
    const name = "GET";
    this.logRequest(req, name, ctx);
    return new ApiResponse<any>(name, ctx);
  }



  @Post("/post")
  postMethod(
    @Req() req: Req,
    @Context() ctx: Context) {
    const name = "POST";
    this.logRequest(req, name, ctx);
    return new ApiResponse<any>(name, ctx);
  }



  @Get("/health")
  checkHealthGet(
    @Req() req: Req,
    @Context() ctx: Context) {
    const name = "HEALTH";
    this.logRequest(req, name, ctx);
    return new ApiResponse<any>(name, ctx);
  }



  private logRequest(req: Req, method: string, ctx: Context) {
    const { ip, socket } = req;
    const { remoteAddress = '' } = socket
    this.logService.info(ctx, `[method = ${method}] , [ip = ${ip}] , [remoteAddress = ${remoteAddress}]`);
  }





};