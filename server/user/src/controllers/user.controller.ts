import { Request, catchAsync } from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
