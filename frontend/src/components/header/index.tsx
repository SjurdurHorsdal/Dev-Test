import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';

import useStore, { Store } from "../../store/store";

import styles from './Header.module.scss';

const Header: React.FC = () => {
    const userInfo = useStore((state: Store) => state.userInfo);
    const logout = useStore((state: Store) => state.logout);
    const navigate = useNavigate();

    const handleOnLogout = () => {
        logout(navigate);
    }

    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles['header--item']}><Link to="/organizations">Properties</Link></div>
                <div className={styles['header--item']}><Link to="/rooms">Rooms</Link></div>
            </div>
            {userInfo.login ? (
                <div className={styles['header-userinfo']}>
                    <div>Signed in as <strong>{userInfo.login}</strong></div>
                    <Button onClick={handleOnLogout}>Logout</Button>
                </div>
            ) : <></>
            }
        </div>
    );
};

export default Header;