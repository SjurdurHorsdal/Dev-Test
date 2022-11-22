import { request, Request, Response, Router } from "express";

import Controller from "../../interfaces/controller.interface";
import AuthService from "./auth.service";

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();
    public authService: AuthService;

    constructor() {
        this.initializeRoutes();
        this.authService = new AuthService();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, this.signUp);
        this.router.post(`${this.path}/signin`, this.signIn);
        this.router.post(`${this.path}/verify`, this.verifyToken);
    }

    signUp = async (request: Request, response: Response) => {
        const isSuccess = await this.authService.signUp(request.body);
        if(!isSuccess) {
            response.status(500).send('Internal Error');
        } else if(typeof isSuccess === 'string') {
            response.status(404).send(isSuccess);
        } else {
            response.send(isSuccess);
        }
    }

    signIn = async (request: Request, response: Response) => {
        const isSuccess = await this.authService.signIn(request.body);
        if(isSuccess === null) {
            response.status(500).send('Internal Error');
        } else if(isSuccess === false){
            response.status(404).send('login or password incorrect');
        } else {
            response.send({token: isSuccess});
        }
    }

    verifyToken = async (request: Request, response: Response) => {
        response.send(await this.authService.verifyToken(request.body))
    }
}

export default AuthController;