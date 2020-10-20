import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-input">
        <label><slot></slot></label>
        <input type="text" />
    </div>
`;

/**
 * Displays an input box
 *
 * @class FedexInput
 */
class FedexInput extends HTMLElement {

    constructor() {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attributes
        this.rootElement = this.shadowRoot.querySelector('.fedex-input');
        this.inputElement = this.shadowRoot.querySelector('input');

        // Set validation and title
        this.inputElement.toggleAttribute('required', this.hasAttribute('required'));
        const title = this.getAttribute('title');
        if (title) {
            this.inputElement.setAttribute('title', title);
        }

        // Method binding
        this.checkValidity = this.checkValidity.bind(this);
    }

    connectedCallback() {
    }

    get value () {
        return this.inputElement.value;
    }

    set value (value) {
        this.inputElement.value = value;
    }

    set pattern (value) {
        this.inputElement.pattern = value;
    }

    checkValidity () {
        const valid = this.inputElement.checkValidity();
        this.rootElement.classList.toggle('fedex-input--invalid', !valid);
        this.inputElement.reportValidity();
        return valid;
    }

}

customElements.define('fedex-input', FedexInput);

export default FedexInput;