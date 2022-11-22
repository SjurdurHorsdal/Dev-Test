import { CreateRoomDto } from '../../interfaces/rooms.intreface';
import { ParamsDictionary } from 'express-serve-static-core';
import sequelize from '../../models';

class RoomsService {
    private roomsModel = sequelize.models.rooms;

    public getRooms = async () => {
        try {
            const rooms = await this.roomsModel.findAll();
            return rooms;
        } catch(e) {
            console.error(e);
            return null;
        }
    };

    public getRoomsByOrganization = async (query: any) => {
        try {
            const rooms = await this.roomsModel.findAll({
                where: {
                    organizationId: query.id
                }
            });
            return rooms;
        } catch(e) {
            console.error(e);
            return null;
        }
    };

    public createRoom = async (dto: CreateRoomDto) => {
        try {
            const createdRoom = await this.roomsModel.create({
                ...dto
            });
            return createdRoom;
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    public updateRoom = async (dto: any, params: ParamsDictionary) => {
        try {
            if(!params.id) {
                return 'id not provided';
            }

            const isRoomExist = await this.roomsModel.findByPk(params.id);

            if(!isRoomExist) {
                return 'room doesnot exists';
            }

            const updatedRoom = await this.roomsModel.update({...dto}, {
                where: {
                    id: params.id
                },
                returning: true
            });
            /**
             * return: true does not support sqlite
             */
            if(updatedRoom.length > 1) {
                return true;
            }
            return false;
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    public deleteRoom = async (params: ParamsDictionary) => {
        try {
            if(!params.id) {
                return 'id not provided';
            }

            const isRoomExist = await this.roomsModel.findByPk(params.id);

            if(!isRoomExist) {
                return 'org doesnot exists';
            };

            await this.roomsModel.destroy({
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

export default RoomsService;