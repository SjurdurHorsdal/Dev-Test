import { Request, Response, Router } from "express";
import Controller from "../../interfaces/controller.interface";
import { authJwt } from "../../middlewares/auth.middleware";
import OrganizationsService from "./organizations.service";

class OrganizationsController implements Controller{
    public path = '/organizations';
    public router = Router();
    private organizationsService: OrganizationsService;

    constructor() {
        this.initializeRoutes();
        this.organizationsService = new OrganizationsService();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getOrganizations);
        this.router.post(`${this.path}/create`, authJwt, this.createOrganization);
        this.router.patch(`${this.path}/update/:id`, authJwt, this.updateOrganization);
        this.router.delete(`${this.path}/delete/:id`, authJwt, this.deleteOrganization);
    }

    public getOrganizations = async (request: Request, response: Response) => {
        const organizations = await this.organizationsService.getOrganizations();
        response.send(organizations);
    }

    public createOrganization = async (request: Request, response: Response) => {
        const createdOrganization = await this.organizationsService.createOrganization(request.body);
        response.send(createdOrganization);
    }

    public updateOrganization = async (request: Request, response: Response) => { 
        const isUpdated = await this.organizationsService.updateOrganization(request.body, request.params);
        if(!isUpdated) {
            response.status(500).send('Internal error');
        } else if(typeof isUpdated === 'string') {
            response.status(404).send(isUpdated);
        } else {
            response.send('successfully updated');
        }
    }   

    public deleteOrganization = async (request: Request, response: Response) => {
        const isDeleted = await this.organizationsService.deleteOrganization(request.params);
        if(!isDeleted) {
            response.status(500).send('Internal error');
        } else if(typeof isDeleted === 'string') {
            response.status(404).send(isDeleted);
        } else {
            response.send('successfully deleted');
        }
    }
}

export default OrganizationsController;