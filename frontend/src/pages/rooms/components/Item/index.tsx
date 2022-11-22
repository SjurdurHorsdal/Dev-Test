import React from "react";
import { Button, Input, Label } from 'reactstrap';
import { IToggleEdit } from "../..";
import styles from './Item.module.scss';

interface Props {
    id: string;
    label: string;
    isEdit: IToggleEdit;
    toggleEdit: () => void;
    onChangeEdit: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onDelete: () => void;
}

const Item: React.FC<Props> = ({
    id,
    label,
    isEdit,
    onChangeEdit,
    onSave,
    onDelete,
    toggleEdit
}) => {

    return (
        <>
            <div className={styles.container}>
                {(!isEdit.isEdit && isEdit.id === id) ?
                    <Label 
                        style={{marginBottom: 0, width: 250}}
                    >
                        {label}
                    </Label> : !isEdit.isEdit ? 
                    <Label 
                        style={{marginBottom: 0, width: 250}}
                    >
                        {label}
                    </Label> : (isEdit.isEdit && isEdit.id === id) ?
                    <Input type="text" onChange={onChangeEdit} placeholder={label} /> :
                    <Label 
                        style={{marginBottom: 0, width: 250}}
                    >
                        {label}
                    </Label>
                }
            </div>
            <div className={styles['container--buttons']}>
                <Button onClick={toggleEdit}>
                    Edit
                </Button>
                <Button onClick={onSave} disabled={!isEdit.isEdit}>
                    Save
                </Button>
                <Button onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </>
    );
}

export default Item;