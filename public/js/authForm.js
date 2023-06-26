import { isEmail, isRange } from './utils/validator.js';
import { Form } from './form.js';

class AuthForm extends Form {
    constructor(formId) {
        super(formId);
    }

    validate(event) {
        const element = event.target;
        const emailInput = element.querySelector('input[name="email"]');
        const passwInput = element.querySelector('input[name="password"]');
        const fistNameInput = element.querySelector('input[name="firstName"]');
        const lastNameInput = element.querySelector('input[name="lastName"]');

        const passwRange = [3, 20];

        let error = false;

        this.verificaSmall();

        if (fistNameInput && !fistNameInput.value) {
            this.msg('Nome Obrigatório', fistNameInput);
            error = true;
        }

        if (lastNameInput && !lastNameInput.value) {
            this.msg('Sobrenome Obrigatório', lastNameInput);
            error = true;
        }

        if (emailInput && !isEmail(emailInput.value)) {
           this.msg('Email Inválido', emailInput);
           error = true;
        }

        if(passwInput && !isRange(passwInput.value, passwRange)) {
            this.msg(
                `Senha precisa ter entre ${passwRange[0]} e ${passwRange[1]} caracteres`, 
                passwInput
            );
            error = true;
        }

        if (!error) element.submit();
    }
}

const authForm = new AuthForm('form');
authForm.init();