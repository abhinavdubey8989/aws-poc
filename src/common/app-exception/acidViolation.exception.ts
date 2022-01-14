import { $log } from "@tsed/common";
import { ClientSession } from "mongoose";


export class AcidViolationException {

  session: ClientSession;
  error: any


  constructor(session: ClientSession, error: any) {
    $log.info(`Inside AcidViolationException constructor ...`);
    this.session = session;
    this.error = error;
  }

}