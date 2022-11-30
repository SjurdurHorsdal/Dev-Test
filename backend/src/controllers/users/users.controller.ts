import { request, Request, Response, Router } from "express";

import Controller from "../../interfaces/controller.interface";
import UsersService from "./users.service";

class UsersController implements Controller {
    public path = '/user';
    public router = Router();
    public usersService: UsersService;

    constructor() {
        this.initializeRoutes();
        this.usersService = new UsersService();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/get-by-token`, this.getUserByToken);
    }

    getUserByToken = async (request: Request, response: Response) => {
        const token = request.headers['x-token'] as string;
        if(!token) {
            return response.status(400).send('token not provided');
        }
        const user = await this.usersService.getUserByToken(token);
        response.send(user);
    }
}

export default UsersController;