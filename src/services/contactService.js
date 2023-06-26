import { Contact } from '../models/Contact.js';
import { isEmail, isPhone } from '../../public/js/utils/validator.js';

export class ContactService {
    async findById(contactId) {
        return Contact.findByPk(contactId, { raw: true });
    }

    async findByIdAndDelete(contactId) {
        const contact = await Contact.findByPk(contactId);
        if(!contact) return [null, ['Contato não encontrada']];

        await Contact.destroy({
            where: {
                id: contactId,
            }
        });

        return [null, []];
    }

    async findByIdAndUpdate(contactId, data) {
        const errors = [];

        this.validate(data, errors);

        if(errors.length) return [null, errors];

        const contact = Contact.findByPk(contactId);
        if(!contact) return [null, ['Contato não encontrado']];

        await Contact.update(data, {
            where: {
                id: contactId,
            },
        });

        return [null, []];
    }

    async register(contactData) {
        const errors = [];

        this.validate(contactData, errors);

        if(errors.length) return [null, errors];

        await Contact.create(contactData);
        return [null, []];
    }

    validate(data, errors) {
        if (!data.firstName) errors.push('Nome Obrigatório');

        if (!data.lastName) errors.push('Sobrenome Obrigatório');

        if (!data.address) errors.push('Endereço Obrigatório');

        if (!isEmail(data.email)) errors.push('E-mail Inválido');

        if (!isPhone(data.phone)) errors.push('Telefone Inválido');
    }
}