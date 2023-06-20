import {
  Request as BaseRequest,
  NextFunction,
  Response,
} from "express-serve-static-core";
import {
  ParamsDictionary,
  RequestHandlerParams,
  RequestParamHandler,
} from "express-serve-static-core";

import { Request } from "@cloud10lms/shared";

type CatchAsyncFN<Manager, Role, User> = (
  req: Request<Manager, Role, User>,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export const catchAsync = <Manager, Role, User>(
  fn: CatchAsyncFN<Manager, Role, User>
) => {
  return (
    req: Request<Manager, Role, User>,
    res: Response,
    next: NextFunction
  ) => {
    fn(req, res, next).catch(next);
  };
};
