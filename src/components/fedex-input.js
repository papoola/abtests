import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-input">
        <label><slot></slot></label>
        <input type="text" />
    </div>
`;

class FedexInput extends HTMLElement {

    constructor() {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
    }

    get value() {
        const input = this.shadowRoot.querySelector('input');
        return input.value;
    }

}

customElements.define('fedex-input', FedexInput);

export default FedexInput;