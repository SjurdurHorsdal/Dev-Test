import { ParamsDictionary } from 'express-serve-static-core';
import { JwtDecodedPayload } from '../../interfaces/auth.interface';
import { CreateOrganizationDto } from '../../interfaces/organizations.interface';
import { decodeToken } from '../../utils/decode.utils';
import sequelize from '../../models';

class OrganizationsService {
    private organizationsModel = sequelize.models.organizations;
    private roomsModel = sequelize.models.rooms;
    private usersModel = sequelize.models.users;

    public getOrganizations = async (token: string) => {
        try {
            const tokenPayload = decodeToken(token) as JwtDecodedPayload;
            const user = await this.usersModel.findOne({
                where: {
                    login: tokenPayload.login
                },
                raw: true
            });

            const organizations = await this.organizationsModel.findAll({
                include: [
                    {
                        model: this.roomsModel,
                    }
                ],
                where: {
                    //@ts-ignore
                    userId: user.id
                }
            });
            return organizations;
        } catch(e) {
            console.error(e);
            return null;
        }
    };

    public createOrganization = async (dto: CreateOrganizationDto, token: string) => {
        try {
            const tokenPayload = decodeToken(token) as JwtDecodedPayload;
            const user = await this.usersModel.findOne({
                where: {
                    login: tokenPayload.login
                },
                raw: true
            });
            if(!user) {
                return 'user does not exists';
            }
            const createdOrganization = await this.organizationsModel.create({
                ...dto,
                //@ts-ignore
                userId: user.id
            })
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