import { ParamsDictionary } from 'express-serve-static-core';
import { CreateOrganizationDto } from '../../interfaces/organizations.interface';
import sequelize from '../../models';

class OrganizationsService {
    private organizationsModel = sequelize.models.organizations;
    private roomsModel = sequelize.models.rooms;

    public getOrganizations = async () => {
        try {
            const organizations = await this.organizationsModel.findAll({
                include: [{
                    model: this.roomsModel,
                }]
            });
            return organizations;
        } catch(e) {
            console.error(e);
            return null;
        }
    };

    public createOrganization = async (dto: CreateOrganizationDto) => {
        try {
            const createdOrganization = this.organizationsModel.create({
                ...dto
            });
            return createdOrganization;
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    public updateOrganization = async (dto: any, params: ParamsDictionary) => {
        try {
            if(!params.id) {
                return 'id not provided';
            }

            const isOrganizationExist = await this.organizationsModel.findByPk(params.id);

            if(!isOrganizationExist) {
                return 'org doesnot exists';
            }

            const updatedOrganization = await this.organizationsModel.update({...dto}, {
                where: {
                    id: params.id
                },
                returning: true
            });
            /**
             * return: true does not support sqlite
             */
            if(updatedOrganization.length > 1) {
                return true;
            }
            return false;
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    public deleteOrganization = async (params: ParamsDictionary) => {
        try {
            if(!params.id) {
                return 'id not provided';
            }

            const isOrganizationExist = await this.organizationsModel.findByPk(params.id);

            if(!isOrganizationExist) {
                return 'org doesnot exists';
            };

            await this.organizationsModel.destroy({
                where: {
                    id: params.id
                }
            });

            return true;
        } catch(e) {
            console.error(e);
            return null;
        }
    }
}   

export default OrganizationsService;