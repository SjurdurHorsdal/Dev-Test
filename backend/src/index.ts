import App from './app';
import AuthController from './controllers/auth/auth.controller';
import OrganizationsController from './controllers/organizations/organizations.controller';
import RoomsController from './controllers/rooms/rooms.controller';
import UsersController from './controllers/users/users.controller';

const app = new App(
    [
        new OrganizationsController(),
        new RoomsController(),
        new AuthController(),
        new UsersController()
    ]
);

app.listen();
