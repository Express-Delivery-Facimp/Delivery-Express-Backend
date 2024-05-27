import { Router } from "express";
import Factory from "../factory";
import { asyncHandler } from "../middlewares/async-handler";

const router = Router();
const userController = Factory.createUserController();

router.post("/", (Req, Res) => (userController.createUser)(Req, Res));
router.get("/getAll", (Req, Res) => userController.showAllUsers(Req, Res));
router.patch("/update:id", asyncHandler(userController.updateUser));
router.delete("/:id", asyncHandler(userController.delete));

export default router;
