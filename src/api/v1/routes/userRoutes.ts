import express, { Router } from "express";
import { getUserProfile, deleteUser } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { getUserDetails } from "../controllers/userController";

const router: Router = express.Router();

/** Route to get the user's profile. */
router.get(
  "/profile",
  authenticate,
  isAuthorized({ hasRole: ["admin", "Teacher", "Student"] }),
  getUserProfile
);

/** Route to delete a user (students to implement authorization). */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "Teacher"] }),
  deleteUser
);

router.get(
    "/:uid",
    authenticate,
    isAuthorized({ hasRole: ["admin", "Teacher"], allowSameUser: true }),
    getUserDetails
);
export default router;
