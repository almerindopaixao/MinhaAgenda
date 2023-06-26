import { Sequelize } from 'sequelize';
import { Agenda } from '../models/Agenda.js';
import { Contact } from '../models/Contact.js';

export class AgendaService {
    async findAllWithContactsCountByUserId(userId) {
        return Agenda.findAll({
            raw: true,
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("Contacts.id")), "contactsCount"]] 
            },
            include: [{
                model: Contact,
                attributes: [],
            }],
            where: {
                userId
            },
            group: ['Agenda.id']
        });
    }

    async findAllWithContactstByAgendaId(agendaId) {
        const agenda = await Agenda.findByPk(agendaId, { raw: true });

        if (!agenda) return null;

        const contacts = await Contact.findAll({
            raw: true,
            where: {
                agendaId: agenda.id
            }
        })

        return {
            ...agenda,
            contacts,
        };
    }

    async findById(agendaId) {
        return Agenda.findByPk(agendaId, { raw: true });
    }

    async findByIdAndUpdate(agendaId, data) {
        const errors = [];

        this.validate(data, errors);

        if(errors.length) return [null, errors];

        const agenda = Agenda.findByPk(agendaId);
        if(!agenda) return [null, ['Agenda não encontrada']];

        await Agenda.update(data, {
            where: {
                id: agendaId,
            },
        });

        return [null, []];
    }

    async findByIdAndDelete(agendaId) {
        const agenda = await Agenda.findByPk(agendaId);
        if(!agenda) return [null, ['Agenda não encontrada']];

        await Agenda.destroy({
            where: {
                id: agendaId,
            }
        });

        return [null, []];
    }
    
    async register(agendaData) {
        const errors = [];

        this.validate(agendaData, errors);

        if(errors.length) return [null, errors];

        await Agenda.create(agendaData);
        return [null, []];
    }

    validate(data, errors) {
        if (!data.title) errors.push('Título Obrigatório');
    }
}