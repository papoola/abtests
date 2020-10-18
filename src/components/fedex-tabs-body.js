import globalCss from '../global';
import { css } from './fedex-tabs';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-tabs-body fedex-pt-20 fedex-hidden">
        <slot></slot>
    </div>
`;

class FedexTabsBody extends HTMLElement {

    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss, css];

        // Register tab body
        this.parentElement.parentElement.registerTab(this.id, 'body', this);
    }

    connectedCallback () {

        // Select tab on init
        if (this.selected) {
            this.parentElement.parentElement.selectTab(this.id);
        }
    }

    get id () {
        return this.getAttribute('id');
    }

    get selected () {
        return this.hasAttribute('selected');
    }

    set selected (isSelected) {
        this.toggleAttribute('selected', isSelected);
        const div = this.shadowRoot.querySelector('div');
        div.classList.toggle('fedex-hidden', !isSelected);
    }

}

customElements.define('fedex-tabs-body', FedexTabsBody);

export default FedexTabsBody;