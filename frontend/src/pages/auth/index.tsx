import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import useStore, { Store } from "../../store/store";
import styles from './Auth.module.scss';

type IAuthCredentials = {
    login: string;
    password: string;
}

const Auth: React.FC = () => {
    const signUp = useStore((state: Store) => state.signUp);
    const signIn = useStore((state: Store) => state.signIn);

    const [authCredentials, setAuthCredentials] = React.useState<IAuthCredentials>({login: '', password: ''});

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setAuthCredentials({...authCredentials, password: event.target.value });
    }

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setAuthCredentials({...authCredentials, login: event.target.value });
    }

    const handleOnSingUp = async () => {
        await signUp(authCredentials);
    }

    const handleOnSignIn = async () => {
        await signIn(authCredentials);
    }

    const isDisabledFields = () => {
        if(!authCredentials.login || !authCredentials.password) {
            return true;
        } 
        return false;
    }

    return(
        <div className={styles.container}>
            <Form>
                <FormGroup>
                    <Label>
                        Login
                    </Label>
                    <Input 
                        id="login"
                        name="login"
                        placeholder="type login"
                        type="text"
                        onChange={handleChangeLogin}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
                    </Label>
                    <Input 
                        id="password"
                        name="password"
                        placeholder="type password"
                        type="password"
                        onChange={handleChangePassword}
                    />
                </FormGroup>
            </Form>
            <div className={styles['container--buttons']}>
                <Button 
                    disabled={isDisabledFields()}
                    onClick={handleOnSignIn}
                >
                    Sign In
                </Button>
                <Button 
                    disabled={isDisabledFields()}
                    onClick={handleOnSingUp}
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default Auth;