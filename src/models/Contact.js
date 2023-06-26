import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(190),
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    agendaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Agendas',
          key: 'id',
        }
    }
});

export { Contact };