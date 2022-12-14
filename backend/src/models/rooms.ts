import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize';

class Rooms extends Model<InferAttributes<Rooms>, InferCreationAttributes<Rooms>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare organizationId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
    Rooms.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING
      },
      organizationId: {
        allowNull: null,
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: 'organizations'
        }
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, 
    {
      sequelize,
      modelName: 'rooms'
    }
  )
}