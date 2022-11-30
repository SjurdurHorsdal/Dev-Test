import client from "./client";
import { AuthPayload, CreateOrganizationDto, CreateRoomDto, UpdateOrganizationDto, UpdateRoomDto } from "./interfaces";

export class Api {
    signUp = async (dto: AuthPayload) => {
        const { data } = await client.post(`/auth/signup`, dto);
        return data;
    };

    signIn = async (dto: AuthPayload) => {
        const { data } = await client.post(`/auth/signin`, dto);
        return data;
    };

    verifyToken = async (token: string): Promise<boolean> => {
        const { data } = await client.post('/auth/verify', {
            token: token
        });
        return data; 
    };

    fetchOrganizations = async (token: string) => {
        const { data } = await client.get('/organizations', {
            headers: {
                'x-token': token
            }
        });
        return data;
    };

    fetchRooms = async () => {
        const { data } = await client.get('/rooms');
        return data;
    };

    fetchRoomsByOrgId = async (id: string) => {
        const { data } = await client.get('/rooms/get-by-organization', {
            params: {
                id: id
            }
        });
        return data;
    };

    createRoom = async (dto: CreateRoomDto) => {
        const { data } = await client.post('/rooms/create', {...dto}, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        return data;
    };

    createOrganization = async (dto: CreateOrganizationDto) => {
        const { data } = await client.post('/organizations/create', {...dto}, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        return data;
    };

    updateRoom = async (dto: UpdateRoomDto, id: string) => {
        const { data } = await client.patch(`/rooms/update/${id}`, {...dto}, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        return data;
    };

    updateOrganization = async (dto: UpdateOrganizationDto, id: string) => {
        const { data } = await client.patch(`/organizations/update/${id}`, {...dto}, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        return data;
    };

    deleteRoom = async (id: string) => {
        const { data } = await client.delete(`/rooms/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        return data;
    };

    deleteOrganization = async (id: string) => {
        const { data } = await client.delete(`/organizations/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        return data;
    };

    getUserByToken = async () => {
        const { data } = await client.get('/user/get-by-token', {
            headers: {
                'x-token': window.localStorage.getItem('token')
            }
        });
        return data;
    };
}