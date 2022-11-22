import create from 'zustand';
import { Api } from '../api';
import { AuthPayload, CreateOrganizationDto, CreateRoomDto, Organizations, Rooms, UpdateOrganizationDto, UpdateRoomDto } from '../api/interfaces';

const apiClient = new Api();

export interface Store {
    token: string;
    isValidToken: boolean;
    isRefetch: boolean;
    signUp: (dto: AuthPayload) => Promise<void>;
    signIn: (dto: AuthPayload) => Promise<void>;
    verifyToken: (token: string) => Promise<void>;

    organizations: Organizations[];
    rooms: Rooms[];

    fetchOrganizations: () => Promise<void>;
    fetchRoomsByOrgId: (id: string) => Promise<void>;

    fetchActualRooms: string;
    fetchActualOrganizations: string;

    setFetchActualRooms: (id: string) => void;

    saveRoom: (dto: CreateRoomDto) => Promise<void>;
    saveOrganization: (dto: CreateOrganizationDto) => Promise<void>;

    deleteRoom: (id: string) => Promise<void>;
    deleteOrganization: (id: string) => Promise<void>;

    updateRoom: (dto: UpdateRoomDto, id: string) => Promise<void>;
    updateOrganization: (dto: UpdateOrganizationDto, id: string) => Promise<void>;
}

const useStore = create<Store>(set => ({
    token: '',
    isValidToken: true,
    isRefetch: false,

    organizations: [],
    rooms: [],

    fetchActualRooms: '',
    fetchActualOrganizations: '',

    setFetchActualRooms: (id: string) => set({fetchActualRooms: id}),

    signUp: async (dto: AuthPayload) => {
        const data = await apiClient.signUp(dto);
        window.localStorage.setItem('token', data.token);
        set({token: data.token});
    },
    signIn: async (dto: AuthPayload) => {
        const data = await apiClient.signIn(dto);
        window.localStorage.setItem('token', data.token);
        set({token: data.token});
    },
    verifyToken: async (token: string) => {
        const data = await apiClient.verifyToken(token);
        set({isValidToken: data})
    },

    fetchOrganizations: async () => {
        const data = await apiClient.fetchOrganizations();
        set({organizations: data});
    },
    fetchRoomsByOrgId: async (id: string) => {
        const data = await apiClient.fetchRoomsByOrgId(id);
        set({rooms: data});
    },
    
    saveRoom: async (dto: CreateRoomDto) => {
        const data = await apiClient.createRoom(dto);
        if(data) {
            set({fetchActualRooms: dto.organizationId});
            set((state) => ({isRefetch: !state.isRefetch}));
        } 
    },
    saveOrganization: async (dto: CreateOrganizationDto) => {
        const data = await apiClient.createOrganization(dto);
        if(data) {
            set((state) => ({isRefetch: !state.isRefetch}));
        } 
    },

    deleteRoom: async (id: string) => {
        const data = await apiClient.deleteRoom(id);
        if(data) {
            set((state) => ({isRefetch: !state.isRefetch}));
        }
    },
    deleteOrganization: async (id: string) => {
        const data = await apiClient.deleteOrganization(id);
        if(data) {
            set((state) => ({isRefetch: !state.isRefetch}));
        }
    },

    updateRoom: async (dto: UpdateRoomDto, id: string) => {
        const data = await apiClient.updateRoom(dto, id);
        if(data) {
            set((state) => ({isRefetch: !state.isRefetch}));
        }
    },
    updateOrganization: async (dto: UpdateOrganizationDto, id: string) => {
        const data = await apiClient.updateOrganization(dto, id);
        if(data) {
            set((state) => ({isRefetch: !state.isRefetch}));
        }
    },
}));

export default useStore;