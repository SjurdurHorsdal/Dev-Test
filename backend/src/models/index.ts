import * as dbConfig from '../config/sequelize';
import { Sequelize } from 'sequelize';

import Organizations from './organizations';
import Rooms from './rooms';
import Users from './users';

const sequelize = new Sequelize(dbConfig.database!, dbConfig.username!, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    storage: process.env.DB_STORAGE,
    logging: false
})

const modelInitialize = [
  Organizations,
  Rooms,
  Users
];

for(const model of modelInitialize) {
    model(sequelize);
}

const {
  organizations,
  rooms
} = sequelize.models;

organizations.hasMany(rooms, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

rooms.belongsTo(organizations, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

export default sequelize;