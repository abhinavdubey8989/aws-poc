import { Catch, ExceptionFilterMethods, Inject, PlatformContext } from "@tsed/common";
import { LogService } from "src/services/log.service";
import { ApiResponse } from "../../api-models/apiResponse";
import { CheckedException } from "../app-exception/checked.exception";


@Catch(CheckedException)
export class CheckedExceptionHandler implements ExceptionFilterMethods {

  @Inject()
  private logService: LogService;

  // @Inject()
  // private slackService: SlackService;

  catch(checkedException: CheckedException, ctx: PlatformContext) {
    const { response } = ctx;
    const { error, code } = checkedException;
    const apiResp = new ApiResponse<any>(null, ctx, error, code);

    this.logService.error(ctx, error);


    // const sendToSlack = NON_SLACK_ERROR_LIST.includes(error) ? false : true;
    // if (sendToSlack) {
    //   this.slackService.notifyBackendChannel(ctx, 'n/a', error);
    // }

    response.status(code); //setting header status
    response.body(apiResp);
  }

}
