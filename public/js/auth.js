import { isEmail, isRange } from './utils/validator.js';

class Auth {
    constructor(formId) {
        this.form = document.getElementById(formId);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.validate(event);
        });
    }

    verificaSmall() {
        const smalls = this.form.querySelectorAll('small[class="msg-text text-danger"]');
        if (smalls.length) {
            for(let small of smalls) {
                small.remove()
            }
        }
    }

    msg(msg, elemento) {
        const small = document.createElement('small');
        small.setAttribute('class', 'msg-text text-danger')
        small.innerHTML = msg 
        elemento.insertAdjacentElement('afterend', small)
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

const auth = new Auth('form');
auth.init();