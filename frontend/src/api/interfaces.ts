export interface AuthPayload {
    login: string;
    password: string;
}

export interface Organizations {
    id: string;
    name: string;
    rooms: Rooms[];
    createdAt?: string;
    updatedAt?: string;
}

export type Rooms = {
    id: string;
    name: string;
    organizationId: string;
}

export interface CreateRoomDto {
    name: string;
    organizationId: string;
};

export interface CreateOrganizationDto {
    name: string;
};

export interface UpdateRoomDto {
    name: string;
};

export interface UpdateOrganizationDto {
    name: string;
};