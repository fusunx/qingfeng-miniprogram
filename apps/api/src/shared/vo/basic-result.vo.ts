import { RequestStatusCode } from "@qinfeng/types";

export class BasicResult {
  public success: boolean;
  public message: string;
  public code: number;
  public data: any;
  constructor(
    success: boolean,
    message: string,
    code: number = RequestStatusCode.success,
    data: any = null,
  ) {
    this.success = success;
    this.message = message;
    this.code = code;
    this.data = data;
  }

  static success<T>(message: string, data?: T) {
    return new BasicResult(true, message, RequestStatusCode.success, data);
  }
  static fail(message: string) {
    return new BasicResult(false, message, RequestStatusCode.fail);
  }
}
