import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import React from 'react';
import styles from './PrimaryDropdown.module.scss';

interface Props {
    value: string;
    onChange: (option: Option) => void;
    options: string[] | Option[];
}

const PrimaryDropdown: React.FC<Props> = ({
    value,
    onChange,
    options
}) => {

    return (
        <div>
            <Dropdown options={options} value={decodeURIComponent(value)} onChange={onChange} className={styles.dropdown} />
        </div>
    );
} 

export default PrimaryDropdown;