import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-radio">
        <label><slot></slot></label>
        <div class="fedex-radio__items fedex-flex fedex-mt-10"></div>
    </div>
`;

/**
 * Displays a radio group
 *
 * @class FedexRadio
 */
class FedexRadio extends HTMLElement {

    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attributes
        this.rootElement = this.shadowRoot.querySelector('.fedex-radio');
        this.itemsElement = this.shadowRoot.querySelector('.fedex-radio__items');

        // Method binding
        this.onChange = this.onChange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
    }

    connectedCallback () {
    }

    get value () {
        const input = this.itemsElement.querySelector('input:checked');
        const value = (input) ? input.value : null;
        return value;
    }

    set value (value) {
        if (value) {
            const input = this.itemsElement.querySelector(`input[value="${value}"]`);
            if (input) {
                input.toggleAttribute('checked', true);
            }
        } else {
            const input = this.itemsElement.querySelector('input:checked');
            if (input) {
                input.checked = false;
            }
        }
    }

    set items (items) {
        this.itemsElement.innerHTML = '';
        items.forEach((item,i) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <input type="radio" id="radio_${i}" name="radio" value="${item}" required>
                <label for="radio_${i}" class="fedex-capitalize">${item}</label>
            `;
            div.classList.add('fedex-mr-30');
            this.itemsElement.appendChild(div);
            div.querySelector('input').addEventListener('change', this.onChange);
        });
    }

    onChange () {
        const event = new Event('change');
        this.dispatchEvent(event);
    }

    checkValidity () {
        const firstItem = this.itemsElement.querySelector('input');
        const valid = firstItem.checkValidity();
        this.rootElement.classList.toggle('fedex-radio--invalid', !valid);
        firstItem.reportValidity();
        return valid;
    }

}

customElements.define('fedex-radio', FedexRadio);

export default FedexRadio;