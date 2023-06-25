import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize.js';
import { User } from './User.js';

const Agenda = sequelize.define('Agenda', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        }
    }
});

export { Agenda };