import React from "react"
import {useNavigate} from 'react-router-dom';

import useStore, { Store } from "../store/store";

export const useAuth = () => {
    const store = useStore((state: Store) => state);
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = React.useState<boolean>(false);

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentToken = window.localStorage.getItem('token');

                if(!currentToken) {
                    setIsAuth(false);
                    return;
                } 
                const isValidToken = await store.verifyToken(currentToken);
                if(isValidToken) {
                    navigate('/organizations')
                }
                setIsAuth(isValidToken);
            } catch(e) {

            }
        }
        checkAuth();
    }, [store.token])

    return (
        isAuth
    );
}