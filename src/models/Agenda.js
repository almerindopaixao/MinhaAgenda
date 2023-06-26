import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize.js';
import { User } from './User.js';
import { Contact } from './Contact.js';

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
    description: {
        type: DataTypes.STRING,
        allowNull: true
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

Agenda.hasMany(Contact, { foreignKey: 'agendaId',  onDelete: 'cascade' });

export { Agenda };