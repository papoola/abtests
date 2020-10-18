import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <button class="fedex-button fedex-py-10 fedex-px-50 fedex-bg-orange fedex-text-white">
        <slot></slot>
    </button>
`;

class FedexButton extends HTMLElement {

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

}

customElements.define('fedex-button', FedexButton);

export default FedexButton;