import React from "react";
import styles from './Organizations.module.scss';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Item from "./components/Item";
import useStore, { Store } from "../../store/store";
import { Organizations } from "../../api/interfaces";
import { ExportToExcelUtil } from "../../utils/exportToExcel";

interface ISavePayload {
    name: string;
}

interface IEditPayload {
    name: string;
}

export interface IToggleEdit {
    isEdit: boolean;
    id: string;
}

const OrganizationsPage: React.FC = () => {
    const organizations = useStore((state: Store) => state.organizations);
    const fetchOrganizations = useStore((state: Store) => state.fetchOrganizations);

    const updateOrganization = useStore((state: Store) => state.updateOrganization);

    const saveOrganization = useStore((state: Store) => state.saveOrganization);
    const deleteOrganization = useStore((state: Store) => state.deleteOrganization);

    const isRefetch = useStore((state: Store) => state.isRefetch);

    const [savePayload, setSavePayload] = React.useState<ISavePayload>({name: ''});
    const [editPayload, setEditPayload] = React.useState<IEditPayload>({name: ''});
    const [isEdit, setIsEdit] = React.useState<IToggleEdit>({isEdit: false, id: ''});

    React.useEffect(() => {
        fetchOrganizations();
    }, [])

    React.useEffect(() => {
        fetchOrganizations();
    }, [isRefetch])

    const handleOnSaveCreatedOrg = () => {
        saveOrganization(savePayload);
    };

    const handleOnChangeCreateOrg  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSavePayload({...savePayload, name: event.target.value});
    };

    const handleOnDelete = (id: string) => {
        deleteOrganization(id);
    };

    const handleOnSave = (id: string) => {
        setEditPayload({...editPayload});
        updateOrganization({...editPayload}, id);
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
                Properties
            </div>
            <div className={styles.content}>
                <div className={styles['content-scrolled']}>
                    {
                    organizations ? 
                    organizations.map((org: Organizations) => {
                        return (
                            <div className={styles['content-scrolled--row']} id={org.id}>
                                <Item 
                                    id={org.id}
                                    label={org.name}
                                    isEdit={isEdit}
                                    onSave={() => handleOnSave(org.id)}
                                    onChangeEdit={handleOnChangeEdit}
                                    onDelete={() => handleOnDelete(org.id)}
                                    toggleEdit={() => toggleEdit(org.id)}
                                />
                            </div>
                        );
                    })
                     : <></>
                }
                </div>
                <div className={styles['content--row']}>
                    <Label>Create New Property</Label>
                    <Input type="text" onChange={handleOnChangeCreateOrg}/>
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