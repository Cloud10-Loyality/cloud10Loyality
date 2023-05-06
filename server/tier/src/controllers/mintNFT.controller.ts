import { Request, Response, NextFunction } from "express";
import { mintNFT } from "../services/mintNFT";
import { burnNFT } from "../services/burnNFT";

export const createNFT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log(req.body, "-----------------")
  try {
    const name = req.body.name;
    const txHash = await mintNFT(name);
    res.status(200).json({
      status: "success",
      error: false,
      data: {
        txHash,
      },
    });
    res.send({ txHash });
  } catch (err) {
    next(err);
  }
};

export const useNFT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    const txHash = await burnNFT(name);
    res.status(200).json({
      status: "success",
      error: false,
      data: {
        txHash,
      },
    });
  } catch (err) {
    next(err);
  }
};
