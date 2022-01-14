import { Context, Inject, Logger, Service } from "@tsed/common";


@Service()
export class LogService {

  @Inject()
  private logger: Logger;

  private getLogData(ctx: Context, msg: any) {
    const log = {
      id: ctx.id,
      data: msg
    }
    return JSON.stringify(log);
  }



  info(ctx: Context, msg: any) {
    this.logger.info(this.getLogData(ctx, msg));
  }

  error(ctx: Context, msg: any) {
    this.logger.error(this.getLogData(ctx, msg));
  }


  // warn(ctx: Context, msg: any) {
  //   this.logger.warn(this.getLogData(ctx, msg));
  // }


  // debug(ctx: Context, msg: any) {
  //   this.logger.debug(this.getLogData(ctx, msg));
  // }


  // fatal(ctx: Context, msg: any) {
  //   this.logger.fatal(this.getLogData(ctx, msg));
  // }











}