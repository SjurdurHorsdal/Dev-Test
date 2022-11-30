import React from "react";
import { Button, Input, Label } from 'reactstrap';
import { IToggleEdit } from "../..";
import styles from './Item.module.scss';
import closeSvg from '../../../../assets/cancel.svg';

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

    const EditComponent = () => {
        return (
            <div className={styles['edit-wrapper']}>
                <Input type="text" onChange={onChangeEdit} defaultValue={label} />
                <img src={closeSvg} onClick={toggleEdit} />
            </div>
        )
    }

    const LabelComponent = (label: string) => {
        const style = {
            marginBottom: 0,
            width: 250,
            cursor: 'pointer'
        }
        return (
            <Label 
                style={style}
            >
                {label}
            </Label>
        )
    }

    return (
        <>
            <div className={styles.container}>
            {(!isEdit.isEdit && isEdit.id === id) ?
                    LabelComponent(label) : !isEdit.isEdit ? 
                    LabelComponent(label) : (isEdit.isEdit && isEdit.id === id) ?
                    EditComponent() :
                    LabelComponent(label)
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