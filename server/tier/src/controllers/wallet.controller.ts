import { NextFunction, Request, Response } from "express";
import { Lucid } from "lucid-cardano";
import Wallet from "../models/walletModel";
import { ObjectId } from "mongodb";

const lucid = await Lucid.new(undefined, "Preview");

export const getWallets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Wallet.find().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    next(error);
  }
};

export const getWalletById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Wallet.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

export const createWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  // Check if the email or phone already exist in the database
  const existingWallet = await Wallet.findOne({
    $or: [{ email }, { phone }],
  });
  if (existingWallet) {
    return res
      .status(400)
      .json({ message: "An account with this email or phone already exists." });
  }

  const privateKey = lucid.utils.generatePrivateKey();
  const address = await lucid
    .selectWalletFromPrivateKey(privateKey)
    .wallet.address();

  try {
    const result = await Wallet.create({
      name,
      email,
      phone,
      privateKey,
      address,
    });
    res.status(201).json({
      status: "success",
      error: false,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updates = req.body;
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    const updatedWallet = await Wallet.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.status(200).json(updatedWallet);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) {
      return res.status(404).json({
        message: "id not found",
      });
    }
    await Wallet.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Wallet deleted",
    });
  } catch (error) {}
};
