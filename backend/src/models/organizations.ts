import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize';

class Organizations extends Model<InferAttributes<Organizations>, InferCreationAttributes<Organizations>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare userId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
    Organizations.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING
      },
      userId: {
        allowNull: null,
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: 'users'
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
      modelName: 'organizations'
    }
  )
}