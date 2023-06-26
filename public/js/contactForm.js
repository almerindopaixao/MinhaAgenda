import { Form } from './form.js';
import { isEmail, isPhone } from './utils/validator.js';

class ContactForm extends Form {
    constructor(formId) {
        super(formId);
    }

    events() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.validate(event);
        });

        const phoneElement = this.form.querySelector('input[name="phone"]');
        phoneElement.addEventListener('input', event => {
            const value = event.target.value;
            event.target.value = this.maskPhone(value)
        })
    }

    maskPhone(value) {
        // Verificar se excedeu o tamanho máximo para o campo telefone
        if (value.length > 15) {
            return value.substr(0, 15);
        }

        const formatedPhone =  value
            .replace(/\D/g, "") // Remove tudo o que não é dígito
            .replace(/^(\d{2})(\d)/g, "($1) $2") // Coloca parênteses em volta dos dois primeiros dígitos
            .replace(/(\d)(\d{4})$/, "$1-$2") // Coloca um hífen antes dos últimos quatro dígitos

    
        return formatedPhone
    }

    validate(event) {
        const element = event.target;
        const fistNameInput = element.querySelector('input[name="firstName"]');
        const lastNameInput = element.querySelector('input[name="lastName"]');
        const emailInput = element.querySelector('input[name="email"]');
        const phoneInput = element.querySelector('input[name="phone"]');
        const addressInput = element.querySelector('input[name="address"]');

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

        if (addressInput && !addressInput.value) {
            this.msg('Endreço Obrigatório', addressInput);
            error = true;
        }

        if (emailInput && !isEmail(emailInput.value)) {
           this.msg('Email Inválido', emailInput);
           error = true;
        }

        if (phoneInput && !isPhone(phoneInput.value)) {
            this.msg('Telefone Inválido', phoneInput);
            error = true;
         }


        if (!error) element.submit();
    }

}

const contactForm = new ContactForm('form');
contactForm.init();