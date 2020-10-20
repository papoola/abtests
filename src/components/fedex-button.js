import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <button class="fedex-button fedex-py-10 fedex-px-50">
        <slot></slot>
    </button>
`;

/**
 * Displays a button
 *
 * @class FedexButton
 */
class FedexButton extends HTMLElement {

    /**
     * Gets component tag
     *
     * @function get tag
     */
    static get tag() {
        return 'fedex-button';
    }

    /**
     * @constructor
     */
    constructor() {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Apply CTA / regular styling
        const button = this.shadowRoot.querySelector('.fedex-button');
        if (this.hasAttribute('cta')) {
            button.className += ' fedex-bg-orange fedex-text-white fedex-border-1 fedex-border-orange';
        } else {
            button.className += ' fedex-bg-white fedex-text-orange fedex-border-1 fedex-border-orange';
        }
    }

}

customElements.define(FedexButton.tag, FedexButton);

export default FedexButton;