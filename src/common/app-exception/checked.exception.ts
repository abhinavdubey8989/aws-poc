

export class CheckedException {

  error: any;
  code: number;


  constructor(error: any, code?: number) {
    this.error = error;
    this.code = (code) ? code : 400;
  }

}