import { Form } from './form.js';

class AgendaForm extends Form {
    constructor(formId) {
        super(formId);
    }

    validate(event) {
        const element = event.target;
        const titleInput = element.querySelector('input[name="title"]');

        let error = false;

        this.verificaSmall();

        if (!titleInput.value) {
            this.msg('Título Obrigatório', titleInput);
            error = true;
        }

        if (!error) element.submit();
    }
}

const agendaForm = new AgendaForm('form');
agendaForm.init();