import { Router } from "express";
import Factory from "../factory";

const router = Router();
const userController = Factory.createUserController();

router.post("/createUser", (Req, Res) => userController.createUser(Req, Res));
router.get("/getAll", (Req, Res) => userController.showAllUsers(Req, Res));
router.patch("/update:id", (Req, Res) => userController.updateUser(Req, Res));
router.delete("/:id", (Req, Res) => userController.delete(Req, Res));

export default router;
