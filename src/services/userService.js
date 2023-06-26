import { User } from '../models/User.js';
import { isEmail } from '../../public/js/utils/validator.js';

export class UserService {
    async findByIdAndUpdate(userId, data) {
        const errors = [];

        this.validate(data, errors);

        if(errors.length) return [null, errors];

        const agenda = User.findByPk(userId);
        if(!agenda) return [null, ['Agenda não encontrada']];

        const [,[user]] = await User.update(data, {
            returning: true,
            raw: true,
            where: {
                id: userId,
            },
        });

        return [user, []];
    }

    validate(data, errors) {
        if (!data.firstName) errors.push('Nome Obrigatório');

        if (!data.lastName) errors.push('Sobrenome Obrigatório');

        if (!isEmail(data.email)) errors.push('E-mail Inválido');
    }
}