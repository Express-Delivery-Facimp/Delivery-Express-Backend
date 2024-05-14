import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/createUser", userController.createUser(Request, Response));
router.get("/getAll", userController.showAllUsers);
router.patch("/update", userController.updateUser);

export default router;
