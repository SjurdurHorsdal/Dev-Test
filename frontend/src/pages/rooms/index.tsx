import React from "react";
import { Option } from "react-dropdown";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Organizations, Rooms } from "../../api/interfaces";
import PrimaryDropdown from "../../components/Dropdown/PrimaryDropdown";
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
    const rooms = useStore((state: Store) => state.rooms);
    const organizations = useStore((state: Store) => state.organizations);

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

    React.useEffect(() => {
        fetchOrganizations();
    }, [])

    React.useEffect(() => {
        if(isFetchActualRooms) {
            fetchRoomsByOrgId(isFetchActualRooms);
        } else {
            fetchRoomsByOrgId(savePayload.organizationId);
        }
    }, [isFetchActualRooms, isRefetch])

    const handleDropdownOnChange = (option: Option) => {
        setSavePayload({...savePayload, organizationId: option.value});
        setFetchActualRooms(option.value);
        fetchRoomsByOrgId(option.value);
    };

    const handleOnSaveCreatedRoom = () => {
        saveRoom(savePayload);
    };

    const handleOnChangeCreateRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSavePayload({...savePayload, name: event.target.value});
    };

    const handleOnDelete = (id: string) => {
        deleteRoom(id);
    };

    const handleOnSave = (id: string) => {
        setEditPayload({...editPayload});
        updateRoom({...editPayload}, id);
        setIsEdit({isEdit: !isEdit.isEdit, id: id});
    };

    const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditPayload({...editPayload, name: event.target.value});
    }

    const toggleEdit = (id: string) => {
        setIsEdit({isEdit: !isEdit.isEdit, id: id});
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}> 
                Rooms
            </div>
            <div className={styles.content}>
                <div className={styles['content--row']}>
                    <PrimaryDropdown 
                        options={organizations.map((org: Organizations) => {return {label: org.name, value: org.id}})}
                        value={''}
                        onChange={handleDropdownOnChange} 
                    />
                </div>
                <div className={styles['content-scrolled']}>
                    {rooms ? 
                        rooms.map((room: Rooms) => {
                            return (
                                <div className={styles['content-scrolled--row']} id={room.id}>
                                    <Item 
                                        id={room.id}
                                        label={room.name}
                                        isEdit={isEdit}
                                        onSave={() => handleOnSave(room.id)}
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
                    <Button onClick={handleOnSaveCreatedRoom} disabled={savePayload.name ? false : true}>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default RoomsPage;