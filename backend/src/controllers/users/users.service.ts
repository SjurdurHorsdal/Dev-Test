import { JwtDecodedPayload } from '../../interfaces/auth.interface';
import { decodeToken } from '../../utils/decode.utils';

import sequelize from '../../models';

class UsersService {
    private usersModel = sequelize.models.users;

    public getUserByToken = async (token: string) => {
        try {   
            const tokenPayload = decodeToken(token) as JwtDecodedPayload;
            const user = await this.usersModel.findOne({
                where: {
                    login: tokenPayload.login
                },
                raw: true
            });
            if(!user) {
                return 'user doesnot exist';
            }
            return user;
        } catch(e) {
            console.error(e);
            return null;
        }
    }
}

export default UsersService;