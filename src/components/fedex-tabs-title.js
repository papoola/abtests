import globalCss from '../global';
import { css } from './fedex-tabs';

const template = document.createElement('template');
template.innerHTML = `
    <li class="fedex-tabs-title">
        <slot></slot>
    </li>
`;

/**
 * Represents title of a tab item
 *
 * @class FedexTabsBody
 */
class FedexTabsTitle extends HTMLElement {

    /**
     * Gets component tag
     *
     * @function get tag
     */
    static get tag() {
        return 'fedex-tabs-title';
    }

    /**
     * @constructor
     */
    constructor() {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss, css];

        // Method binding
        this.onClicked = this.onClicked.bind(this);

        // Register tab title
        this.parentElement.parentElement.registerTab(this.tabId, 'title', this);
    }

    /**
     * @connectedCallback
     */
    connectedCallback () {

        // Click handler
        const li = this.shadowRoot.querySelector('li');
        li.onclick = this.onClicked;
    }

    onClicked () {
        this.parentElement.parentElement.selectTab(this.tabId);
    }

    get tabId() {
        return this.getAttribute('tab-id');
    }

    get selected () {
        return this.hasAttribute('selected');
    }

    set selected (isSelected) {
        this.toggleAttribute('selected', isSelected);
        const li = this.shadowRoot.querySelector('li');
        li.classList.toggle('fedex-tabs-title--selected', isSelected);
    }

}

customElements.define(FedexTabsTitle.tag, FedexTabsTitle);

export default FedexTabsTitle;