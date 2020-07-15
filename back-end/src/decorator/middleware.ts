import { RequestHandler } from "express";

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    const originMiddleware =
      Reflect.getMetadata("middleware", target, key) || [];
    originMiddleware.push(middleware);
    Reflect.defineMetadata("middlewares", originMiddleware, target, key);
  };
}
