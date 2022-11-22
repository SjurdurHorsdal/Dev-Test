import App from './app';
import AuthController from './controllers/auth/auth.controller';
import OrganizationsController from './controllers/organizations/organizations.controller';
import RoomsController from './controllers/rooms/rooms.controller';

const app = new App(
    [
        new OrganizationsController(),
        new RoomsController(),
        new AuthController()
    ]
);

app.listen();
