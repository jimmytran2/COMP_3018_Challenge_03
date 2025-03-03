import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { UserRecord } from "firebase-admin/auth";

/**
 * Controller to get the user profile.
 * @param req - Incoming request object.
 * @param res - Response object to send the user profile response.
 * @param next - Next middleware function.
 */
export const getUserProfile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // You must implement setting `res.locals.uid`
  const userId: string = res.locals.uid;
  res.status(200).json({ message: `User profile for user ID: ${userId}` });
};

/**
 * Controller to delete a user (requires admin role).
 * @param req - Incoming request object.
 * @param res - Response object to confirm deletion.
 * @param next - Next middleware function.
 */
export const deleteUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId: string = req.params.id;
  res.status(200).json({ message: `User ${userId} deleted by admin` });
};


export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { uid } = req.params;

  try {
      const user: UserRecord = await auth.getUser(uid);

      res.status(200).json(user);
  } catch (error: unknown) {
      next(error);
  }
};