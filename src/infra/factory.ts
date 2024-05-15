import UserController from "../infra/controllers/userController";
import UserRepository from "../../src/modules/users/entities/repositories/userRepository";
import { UserService } from "../../src/infra/services/userService";
import { prismaClient } from "../../src/infra/database/prismaClient";

export default class Factory {
  static createUserController(): UserController {
    const userRepository = new UserRepository(prismaClient);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return userController;
  }
}
