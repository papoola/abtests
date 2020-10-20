import globalCss from '../global';
import { css } from './fedex-accordion';

const template = document.createElement('template');
template.innerHTML = `
    <li class="fedex-accordion-item">
        <div class="fedex-accordion-item__title"><slot name="title"></slot></div>
        <div class="fedex-accordion-item__body"><div class="fedex-py-20 fedex-px-40"><slot name="body"></slot></div></div>
    </li>
`;

/**
 * Represents an accordion item
 *
 * @class FedexAccordionItem
 */
class FedexAccordionItem extends HTMLElement {

    /**
     * Gets component tag
     *
     * @function get tag
     */
    static get tag() {
        return 'fedex-accordion-item';
    }

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

        // Attributes
        this.rootElement = this.shadowRoot.querySelector('li');

        // Method binding
        this.onClicked = this.onClicked.bind(this);
    }

    /**
     * @connectedCallback
     */
    connectedCallback () {

        // Click handler
        this.rootElement.onclick = this.onClicked;
    }

    /**
     * Collapse / Fold given accordion item
     *
     * @function onClicked
     * @param {Object} item - accordion item
     */
    onClicked () {
        this.parentElement.selectItem(this);
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
        this.rootElement.classList.toggle('fedex-accordion-item--selected', value);
        const body = this.shadowRoot.querySelector('.fedex-accordion-item__body');
        if (value) {
            body.style.maxHeight = body.scrollHeight + "px";
        } else {
            body.style.maxHeight = null;
        }
    }

}

customElements.define(FedexAccordionItem.tag, FedexAccordionItem);

export default FedexAccordionItem;