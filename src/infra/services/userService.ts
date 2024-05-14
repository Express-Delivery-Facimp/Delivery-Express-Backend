import User from "../../modules/users/entities/user";
import IRepositoryInterface from "../../repositories/IRepositoryInterface";
import {
  createUserDTO,
  updateUserDTO,
} from "../../modules/users/entities/DTO/userDTO";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private readonly userRepository: IRepositoryInterface) {}

  async getAllUsers() {
    return this.userRepository.getAll();
  }

  async getUserById(id: string) {
    return this.userRepository.getById(id);
  }
  async create(userData: createUserDTO): Promise<User> {
    // Verifica se o email já está cadastrado
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("this email is already in use");
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashPassword;

    // Criar o usuário
    const createdUser = await this.userRepository.create(userData);

    return createdUser;
  }

  async update(id: string, user: updateUserDTO): Promise<User> {
    const userExists = await this.userRepository.getById(id);

    if (!userExists) {
      throw new Error("User not found");
    }

    const userByEmail = await this.userRepository.findByEmail(user.email);

    if (userByEmail && userByEmail.id !== id) {
      throw new Error("this email is already in use");
    }

    return this.userRepository.update(id, user);
  }
  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
