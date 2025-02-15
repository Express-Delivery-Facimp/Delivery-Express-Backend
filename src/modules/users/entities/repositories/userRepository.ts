import { PrismaClient, User as PrismaUser } from "@prisma/client";
import IRepositoryInterface from "../../../../repositories/IRepositoryInterface";
import User from "../../entities/user";
import { createUserDTO, updateUserDTO } from "../DTO/userDTO";

export default class UserRepository implements IRepositoryInterface {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAll(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany();

    return users;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
    });

    return user;
  }

  async update(id: string, user: updateUserDTO): Promise<User> {
    const updatedUser = await this.prismaClient.user.update({
      where: { id },
      data: {
        ...user,
      },
    });
    return updatedUser;
  }

  async create(userData: createUserDTO): Promise<User> {
      const user: PrismaUser = await this.prismaClient.user.create({
        data: {
          ...userData,
        },
      })
      return user
    }
      
  async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
