import { User } from '../models/User.js';
import { generatePasswordHash, checkPasswordHash } from '../utils/hash-password.js';
import { isEmail, isRange } from '../../public/js/utils/validator.js';

export class AuthService {
    async login(credentials) {
        const errors = [];
        const passwRange = [3, 20];

        if (!isEmail(credentials.email)) errors.push('E-mail Inválido')

        if (!isRange(credentials.password, passwRange)) {
            errors.push(`A senha precisa ter entre ${passwRange[0]} e ${passwRange[1]} caracteres`);
        }

        if (errors.length) return [null, errors];

        const user = await User.findOne({
            where: {
                email: credentials.email,
            }
        });

        if (!user) return [null, ['Usuário não existe']];

        const passwordIsValid = await checkPasswordHash(credentials.password,  user.password);

        if (!passwordIsValid) return [null, ['Senha Inválida']];

        return [user, []];
    }

    async registered(userData) {
        const errors = [];
        const passwRange = [3, 20];

        if (!userData.firstName) errors.push('Nome Obrigatório');

        if (!userData.lastName) errors.push('Sobrenome Obrigatório');

        if (!isEmail(userData.email)) errors.push('E-mail Inválido')

        if (!isRange(userData.password, passwRange)) {
            errors.push(`A senha precisa ter entre ${passwRange[0]} e ${passwRange[1]} caracteres`);
        }

        if (errors.length > 0) return [null, errors];

        const userFinded = await User.findOne({
            where: {
                email: userData.email,
            },
        });

        if (userFinded) return [null, ['Usuário já existe']];

        const passwordEncrypted = await generatePasswordHash(userData.password)

        const newUser = await User.create({
            ...userData,
            password: passwordEncrypted,
        });

        return [newUser, []];
    }
}