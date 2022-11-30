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
  Users,
  Organizations,
  Rooms,
];

for(const model of modelInitialize) {
    model(sequelize);
}

const {
  users,
  organizations,
  rooms,
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

users.hasMany(organizations, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

organizations.belongsTo(users, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

export default sequelize;