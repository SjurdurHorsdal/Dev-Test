import { NavigateFunction, useNavigate } from 'react-router-dom';
import create from 'zustand';
import { Api } from '../api';
import { AuthPayload, CreateOrganizationDto, CreateRoomDto, Organizations, Rooms, UpdateOrganizationDto, UpdateRoomDto, UserInfo } from '../api/interfaces';

const apiClient = new Api();

export interface Store {
    token: string;
    isValidToken: boolean;
    isRefetch: boolean;
    signUp: (dto: AuthPayload) => Promise<void>;
    signIn: (dto: AuthPayload) => Promise<void>;
    verifyToken: (token: string) => Promise<boolean>;

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
    clearRoomsData: () => void;

    userInfo: UserInfo;

    getUserByToken: () => Promise<void>;
    logout: (navigate: NavigateFunction) => void;
}

const useStore = create<Store>(set => ({
    token: '',
    isValidToken: true,
    isRefetch: false,

    organizations: [],
    rooms: [],

    fetchActualRooms: '',
    fetchActualOrganizations: '',

    userInfo: {} as UserInfo,

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
        set({isValidToken: data});
        return data;
    },

    fetchOrganizations: async () => {
        const token = window.localStorage.getItem('token');
        if(!token) {
            return;
        }
        const data = await apiClient.fetchOrganizations(token);
        set({organizations: data});
        set((state) => (state.fetchActualRooms ? {fetchActualRooms: ''} : {fetchActualRooms: state.fetchActualRooms}));
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

    clearRoomsData: () => {
        set({rooms: [], fetchActualRooms: ''});
    },

    getUserByToken: async () => {
        const data = await apiClient.getUserByToken();
        if(data) {
            set({userInfo: data})
        }
    },

    logout: (navigate) => {
        window.localStorage.removeItem('token');
        set({userInfo: {} as UserInfo});
        navigate('/');
    }
}));

export default useStore;