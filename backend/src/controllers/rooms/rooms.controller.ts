import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import Controller from "../../interfaces/controller.interface";
import { authJwt } from "../../middlewares/auth.middleware";
import RoomsService from "./rooms.service";

class RoomsController implements Controller{
    public path = '/rooms';
    public router = Router();
    private roomsService: RoomsService;

    constructor() {
        this.initializeRoutes();
        this.roomsService = new RoomsService();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getRooms);
        this.router.get(`${this.path}/get-by-organization`, this.getRoomsByOrganization);
        this.router.post(
            `${this.path}/create`,
            authJwt,
            body('name').notEmpty().withMessage('name cannot be empty'),
            body('organizationId').notEmpty().withMessage('organizationId cannot be empty'),
            this.createRoom
        );
        this.router.patch(`${this.path}/update/:id`, authJwt, this.updateRoom);
        this.router.delete(`${this.path}/delete/:id`, authJwt, this.deleteRoom);
    }

    public getRooms = async (request: Request, response: Response) => {
        const Rooms = await this.roomsService.getRooms();
        response.send(Rooms);
    }

    public getRoomsByOrganization = async (request: Request, response: Response) => {
        const Rooms = await this.roomsService.getRoomsByOrganization(request.query);
        response.send(Rooms);
    }

    public createRoom = async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const isCreated = await this.roomsService.createRoom(request.body);
        response.send(isCreated);
    }

    public updateRoom = async (request: Request, response: Response) => { 
        const isUpdated = await this.roomsService.updateRoom(request.body, request.params);
        if(!isUpdated) {
            response.status(500).send('Internal error');
        } else if(typeof isUpdated === 'string') {
            response.status(404).send(isUpdated);
        } else {
            response.send('successfully updated');
        }
    }   

    public deleteRoom = async (request: Request, response: Response) => {
        const isDeleted = await this.roomsService.deleteRoom(request.params);
        if(!isDeleted) {
            response.status(500).send('Internal error');
        } else if(typeof isDeleted === 'string') {
            response.status(404).send(isDeleted);
        } else {
            response.send('successfully deleted');
        }
    }
}

export default RoomsController;