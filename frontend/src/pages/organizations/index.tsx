import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Organizations.module.scss';
import { Button, Label, Input } from 'reactstrap';
import Item from "./components/Item";
import useStore, { Store } from "../../store/store";
import { Organizations } from "../../api/interfaces";
import { ExportToExcelUtil } from "../../utils/exportToExcel";

interface ISavePayload {
    name: string;
}

export interface IEditPayload {
    name: string;
}

export interface IToggleEdit {
    isEdit: boolean;
    id: string;
}

const OrganizationsPage: React.FC = () => {
    const navigate = useNavigate();

    const organizations = useStore((state: Store) => state.organizations);
    const fetchOrganizations = useStore((state: Store) => state.fetchOrganizations);
    const getUserByToken = useStore((state: Store) => state.getUserByToken);

    const updateOrganization = useStore((state: Store) => state.updateOrganization);

    const saveOrganization = useStore((state: Store) => state.saveOrganization);
    const deleteOrganization = useStore((state: Store) => state.deleteOrganization);

    const isRefetch = useStore((state: Store) => state.isRefetch);

    const [savePayload, setSavePayload] = React.useState<ISavePayload>({name: ''});
    const [editPayload, setEditPayload] = React.useState<IEditPayload>({name: ''});
    const [isEdit, setIsEdit] = React.useState<IToggleEdit>({isEdit: false, id: ''});

    React.useEffect(() => {
        fetchOrganizations();
        getUserByToken();
    }, [])

    React.useEffect(() => {
        fetchOrganizations();
    }, [isRefetch])

    const handleOnSaveCreatedOrg = () => {
        saveOrganization(savePayload);
        setSavePayload({name: ''});
    };

    const handleOnChangeCreateOrg  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSavePayload({...savePayload, name: event.target.value});
    };

    const handleOnDelete = (id: string) => {
        deleteOrganization(id);
    };

    const handleOnSave = (id: string, name: string) => {
        if(editPayload.name === '') {
            setEditPayload({name: name});
            updateOrganization({name: name}, id);
            setIsEdit({isEdit: !isEdit.isEdit, id: id});
            return;
        } 
        setEditPayload({...editPayload});
        updateOrganization({...editPayload}, id);
        setIsEdit({isEdit: !isEdit.isEdit, id: id});
    };

    const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditPayload({...editPayload, name: event.target.value});
    }

    const toggleEdit = (id: string) => {
        setIsEdit({isEdit: !isEdit.isEdit, id: id});
    };

    const onLabelClick = (id: string, name: string) => {
        navigate(`/rooms?id=${id}&name=${name}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Properties
            </div>
            <div className={styles.content}>
                <div className={styles['content-scrolled']} style={{
                        overflowY: organizations.length >= 5 ? 'scroll' : 'hidden'
                    }}>
                    {
                    organizations ? 
                    organizations.map((org: Organizations) => {
                        return (
                            <div className={styles['content-scrolled--row']} key={org.id}>
                                <Item 
                                    id={org.id}
                                    label={org.name}
                                    isEdit={isEdit}
                                    onSave={() => handleOnSave(org.id, org.name)}
                                    onChangeEdit={handleOnChangeEdit}
                                    onDelete={() => handleOnDelete(org.id)}
                                    toggleEdit={() => toggleEdit(org.id)}
                                    onLabelClick={() => onLabelClick(org.id, org.name)}
                                />
                            </div>
                        );
                    })
                     : <></>
                }
                </div>
                <div className={styles['content--row']}>
                    <Label>Create New Property</Label>
                    <Input type="text" onChange={handleOnChangeCreateOrg} value={savePayload.name} />
                    <Button onClick={handleOnSaveCreatedOrg} disabled={savePayload.name ? false : true}>Save</Button>
                </div>
                <div className={styles['content--row']}>
                    <Label>Export list of Properties to Excel</Label>
                    <Button onClick={() => ExportToExcelUtil(organizations, 'properties_saved')}>Download</Button>
                </div>
            </div>
        </div>
    );
};

export default OrganizationsPage;