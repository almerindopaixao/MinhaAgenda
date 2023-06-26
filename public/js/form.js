export class Form {
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

    validate(event) {}
}

const form = new Form('form');
form.init();