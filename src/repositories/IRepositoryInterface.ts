import {
  createUserDTO,
  updateUserDTO,
} from "../modules/users/entities/DTO/userDTO";
import User from "../modules/users/entities/user";

export default interface userRepositoryInterface {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, user: updateUserDTO): Promise<User>;
  create(userData: createUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}
