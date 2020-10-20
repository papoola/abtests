import globalCss from '../global';
import { css } from './fedex-tabs';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-tabs-body fedex-pt-20 fedex-hidden">
        <slot></slot>
    </div>
`;

/**
 * Represents body of a tab item
 *
 * @class FedexTabsBody
 */
class FedexTabsBody extends HTMLElement {

    /**
     * @constructor
     */
    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss, css];

        // Register tab body
        this.parentElement.parentElement.registerTab(this.tabId, 'body', this);
    }

    /**
     * @connectedCallback
     */
    connectedCallback () {

        // Select tab on init
        if (this.selected) {
            this.parentElement.parentElement.selectTab(this.tabId);
        }
    }

    /**
     * Gets tab id
     *
     * @function get tabId
     */
    get tabId () {
        return this.getAttribute('tab-id');
    }

    /**
     * Gets selected status
     *
     * @function get selected
     */
    get selected () {
        return this.hasAttribute('selected');
    }

    /**
     * Sets selected status
     *
     * @function set selected
     * @param {boolean} value - selected status
     */
    set selected (value) {
        this.toggleAttribute('selected', value);
        const div = this.shadowRoot.querySelector('div');
        div.classList.toggle('fedex-hidden', !value);
    }

}

customElements.define('fedex-tabs-body', FedexTabsBody);

export default FedexTabsBody;