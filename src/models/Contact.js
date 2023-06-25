import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize.js';
import { Agenda } from './Agenda.js';

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(190),
        allowNull: true,
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    agendaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Agenda,
          key: 'id',
        }
    }
});

export { Contact };