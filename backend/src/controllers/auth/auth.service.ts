import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthDto } from '../../interfaces/auth.interface';

import sequelize from '../../models';

class AuthService {
    private usersModel = sequelize.models.users;

    public signUp = async (dto: AuthDto) => {
        try {     
            const user = await this.usersModel.findOne({
                where: {
                    login: dto.login
                }
            });

            if(user) {
                return 'user exists';
            };

            const hashPassword = await bcrypt.hash(dto.password, Number(process.env.SALT_ROUNDS));

            const token = jwt.sign({
                login: dto.login,
                password: hashPassword
            }, 
            process.env.SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE });

            const createdUser = await this.usersModel.create({...dto, password: hashPassword});

            return {...createdUser, token};
        } catch(e) {
            console.error(e);
            return null;
        }
    };

    public signIn = async (dto: AuthDto) => {
        try {
            const user = await this.usersModel.findOne({
                where: {
                    login: dto.login
                }
            });

            if(!user) {
                return false;
            };

            const isPasswordEquals = await bcrypt.compare(dto.password, user['dataValues'].password);

            if(isPasswordEquals) {
                const token = jwt.sign({
                    login: dto.login,
                    password: user['dataValues'].password
                }, 
                process.env.SECRET_KEY,
                { expiresIn: process.env.JWT_EXPIRE });
                return token;
            } else {
                return false;
            }
        } catch(e) {
            console.error(e);
            return null;
        }
    };

    public verifyToken = async (dto: {token: string}) => {
        try {
            const isValid = jwt.verify(dto.token, process.env.SECRET_KEY);
            if(isValid) {
                return true;
            } 
            return false;
        } catch(e) {
            console.error(e);
            return null;
        }
    }
}

export default AuthService;