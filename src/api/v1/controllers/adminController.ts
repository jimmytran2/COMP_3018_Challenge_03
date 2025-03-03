import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";

export const setCustomClaims = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { uid, claims } = req.body;

  try {
    await auth.setCustomUserClaims(uid, claims);
    res.status(200).send(`Custom claims set for user: ${uid}`);
  } catch (error: unknown) {
    next(error);
  }
};
