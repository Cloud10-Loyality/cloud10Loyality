import { AnyZodObject, z } from "zod";
import { NextFunction, Response } from "express";
import { Request, catchAsync } from "@c10lms/common";

export const validateBody = (schema: AnyZodObject) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  });
