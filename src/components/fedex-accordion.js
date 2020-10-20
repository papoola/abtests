import globalCss from '../global';
import styles from './fedex-accordion.scss';

export const css = new CSSStyleSheet();
css.replaceSync(styles.toString());

const template = document.createElement('template');
template.innerHTML = `
    <ul class="fedex-accordion">
        <slot></slot>
    </ul>    
`;

/**
 * Displays an accordion
 *
 * @class FedexAccordion
 */
class FedexAccordion extends HTMLElement {

    constructor () {
        super();

        // Attributes
        this.selectedItem = null;

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss, css];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Method binding
        this.selectItem = this.selectItem.bind(this);
    }

    connectedCallback () {
    }

    selectItem (item) {

        // If item is already collapsed, fold it
        if (this.selectedItem === item) {
            this.selectedItem.selected = false;
            this.selectedItem = null;
            return;
        }

        // Unselect last selected item
        if (this.selectedItem) {
            this.selectedItem.selected = false;
        }

        // Select new tab
        item.selected = true;
        this.selectedItem = item;
    }

}

customElements.define('fedex-accordion', FedexAccordion);

export default FedexAccordion;