import React from "react";
import { Option } from "react-dropdown";
import { Button, Label, Input } from 'reactstrap';
import { useLocation } from "react-router-dom";

import { Organizations, Rooms } from "../../api/interfaces";
import PrimaryDropdown from "../../ui-components/Dropdown/PrimaryDropdown";
import useStore, { Store } from "../../store/store";
import Item from "./components/Item";
import styles from './Rooms.module.scss';

interface ISavePayload {
    name: string;
    organizationId: string;
}

interface IEditPayload {
    name: string;
}

export interface IToggleEdit {
    isEdit: boolean;
    id: string;
}


const RoomsPage: React.FC = () => {
    const location = useLocation();

    const rooms = useStore((state: Store) => state.rooms);
    const organizations = useStore((state: Store) => state.organizations);

    const clearRoomsData = useStore((state: Store) => state.clearRoomsData);

    const fetchRoomsByOrgId = useStore((state: Store) => state.fetchRoomsByOrgId);
    const fetchOrganizations = useStore((state: Store) => state.fetchOrganizations);

    const updateRoom = useStore((state: Store) => state.updateRoom);

    const saveRoom = useStore((state: Store) => state.saveRoom);
    const deleteRoom = useStore((state: Store) => state.deleteRoom);

    const isFetchActualRooms = useStore((state: Store) => state.fetchActualRooms);
    const isRefetch = useStore((state: Store) => state.isRefetch);

    const setFetchActualRooms = useStore((state: Store) => state.setFetchActualRooms);

    const [savePayload, setSavePayload] = React.useState<ISavePayload>({name: '', organizationId: ''});
    const [editPayload, setEditPayload] = React.useState<IEditPayload>({name: ''});
    const [isEdit, setIsEdit] = React.useState<IToggleEdit>({isEdit: false, id: ''});
    const [defaultDropdownValue, setDefaultDropdownValue] = React.useState<string>('');

    React.useEffect(() => {
        let orgId = '';
        let orgName = '';

        if(location.search) {
            orgId = location.search.split('&')[0].split('=')[1];
            orgName = location.search.split('&')[1].split('=')[1];
        }

        if(orgId && orgName) {
            setFetchActualRooms(orgId);
            setDefaultDropdownValue(orgName);
            setSavePayload({...savePayload, organizationId: orgId});
        } else {
            clearRoomsData();
            fetchOrganizations();
        }
    }, [])

    React.useEffect(() => {
        if(isFetchActualRooms) {
            fetchRoomsByOrgId(isFetchActualRooms);
        } else if(savePayload.organizationId) {
            fetchRoomsByOrgId(savePayload.organizationId);
        } 
    }, [isFetchActualRooms, isRefetch])

    const handleDropdownOnChange = (option: Option) => {
        setSavePayload({...savePayload, organizationId: option.value});
        setFetchActualRooms(option.value);
    };

    const handleOnSaveCreatedRoom = () => {
        saveRoom(savePayload);
        setSavePayload({...savePayload, name: ''});
    };

    const handleOnChangeCreateRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSavePayload({...savePayload, name: event.target.value});
    };

    const handleOnDelete = (id: string) => {
        deleteRoom(id);
    };

    const handleOnSave = (id: string, name: string) => {
        if(editPayload.name === '') {
            setEditPayload({name: name});
            updateRoom({name: name}, id);
            setIsEdit({isEdit: !isEdit.isEdit, id: id});
            return;
        } 
        setEditPayload({...editPayload});
        updateRoom({...editPayload}, id);
        setIsEdit({isEdit: !isEdit.isEdit, id: id});
    };

    const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditPayload({...editPayload, name: event.target.value});
    }

    const toggleEdit = (id: string) => {
        setIsEdit({isEdit: !isEdit.isEdit, id: id});
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}> 
                Rooms
            </div>
            <div className={styles.content}>
                <div className={styles['content--row']}>
                    <PrimaryDropdown 
                        options={organizations.map((org: Organizations) => {return {label: org.name, value: org.id}})}
                        value={defaultDropdownValue}
                        onChange={handleDropdownOnChange} 
                    />
                </div>
                <div className={styles['content-scrolled']} style={{
                        overflowY: rooms.length >= 4 ? 'scroll' : 'hidden'
                    }}>
                    {rooms ? 
                        rooms.map((room: Rooms) => {
                            return (
                                <div className={styles['content-scrolled--row']} key={room.id}>
                                    <Item 
                                        id={room.id}
                                        label={room.name}
                                        isEdit={isEdit}
                                        onSave={() => handleOnSave(room.id, room.name)}
                                        onChangeEdit={handleOnChangeEdit}
                                        onDelete={() => handleOnDelete(room.id)}
                                        toggleEdit={() => toggleEdit(room.id)}
                                    />
                                </div>
                            );
                        })    
                    : <></> }
                </div>
                <div className={styles['content--row']}>
                    <Label>Create New Room</Label>
                    <Input type="text" onChange={handleOnChangeCreateRoom} value={savePayload.name} />
                    <Button 
                        onClick={handleOnSaveCreatedRoom}
                        disabled={(savePayload.name && savePayload.organizationId) ? false : true}
                    >
                    Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RoomsPage;