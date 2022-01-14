import { Catch, ExceptionFilterMethods, Inject, MongooseErrorFilter, PlatformContext } from "@tsed/common";
import { Exception } from "@tsed/exceptions";
import { LogService } from "src/services/log.service";
import { ApiResponse } from "../../api-models/apiResponse";


/**
 * 
 * this class will catch all inbuild exceptions of Ts.Ed, 
 * instead of giving ts.ed internal error
 * we will provide response in our custom format
 * 
 */

@Catch(Error, Exception, MongooseErrorFilter)
export class UncheckedExceptionHandler implements ExceptionFilterMethods {


  @Inject()
  private logService: LogService;




  catch(uncheckedException: Exception, ctx: PlatformContext) {
    const { response } = ctx;
    const errMsg = (uncheckedException && uncheckedException.message) ? uncheckedException.message : "test-error";

    //below 4 lines added to track resource not found error
    const { request } = ctx;
    const { headers = {} } = request;
    const { host = '', location = '', origin = '', etag = '', from = '', } = headers;

    const slackErrorMsg = `Unchecked exception : [error = ${errMsg}]`;
    const logErrorMsg = `${slackErrorMsg} ${host ? `[host = ${host}]` : ``} , ${from ? `[from = ${from}]` : ``} , ${location ? `[location = ${location}]` : ``}  ${origin ? `[origin = ${origin}]` : ``}`;


    const apiResp = new ApiResponse<any>(null, ctx, errMsg, 400);

    response.status(400); //setting header status
    response.body(apiResp);
  }

}
