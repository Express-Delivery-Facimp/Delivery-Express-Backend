import { Request, Response } from "express";
import { z } from "zod";
import { UserService } from "../services/userService";

export default class userController {
    constructor(private userService: UserService) {}
    async createUser(Request: Request, Response: Response) {
      const bodyUserSchema = z.object({
        id: z.string(),
        name: z.string(),
        cpf: z.string(),
        email: z.string(),
        password: z.string().min(8, "A senha deve ter no minimo 8 caracteres"),
        phone: z.string(),
        confirmPassword: z.string(),
      });

      const passwordForm = z
			.object({ password: z.string(), confirm: z.string() })
			.refine((data) => data.password === data.confirm, {
				message: 'Passwords don\'t match',
				path: ['confirm'],
			});
		try {
			const { confirmPassword, ...userData } = bodyUserSchema.parse(
				Request.body,
			);

			passwordForm.parse({
				password: userData.password,
				confirm: confirmPassword,
			});

			const createdUser = await this.userService.create(userData);

			return Response.status(201).json(createdUser);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return Response.status(400).json({ error });
			}
		}
	}
    async index(Request: Request, Response: Response): Promise<Response> {
		const users = await this.userService.getAllUsers();

		return Response.json(users);
	}
    async showAllUsers(Request: Request, Response: Response): Promise<Response> {
        const users = await this.userService.getAllUsers();
    
        return Response.json(users);
      }

      async updateUser(Request: Request, Response: Response) {
        try {
          const userParams = z.object({
            id: z.string().uuid(),
          });
    
          const bodyUserSchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string().min(8, "A senha deve ter no minimo 8 caracteres"),
            phone: z.string(),
            confirmPassword: z.string(),
          });
    
          const { id } = userParams.parse(Request.params);
          const userData = bodyUserSchema.parse(Request.body);