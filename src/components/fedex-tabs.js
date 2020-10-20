import globalCss from '../global';
import styles from './fedex-tabs.scss';

export const css = new CSSStyleSheet();
css.replaceSync(styles.toString());

const template = document.createElement('template');
template.innerHTML = `
    <ul class="fedex-tabs fedex-flex fedex-justify-center">
        <slot name="title"></slot>
    </ul>
    <div class="fedex-tabs-content">
        <slot name="body"></slot>
    </div>
`;

/**
 * Displays tabs
 *
 * @class FedexTabs
 */
class FedexTabs extends HTMLElement {

    constructor () {
        super();

        // Attributes
        this.tabs = {};
        this.selectedTabId = null;

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss, css];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Method binding
        this.registerTab = this.registerTab.bind(this);
        this.selectTab = this.selectTab.bind(this);
    }

    connectedCallback () {
    }

    registerTab (id, type, element) {
        if (!this.tabs[id]) {
            this.tabs[id] = {}
        }
        this.tabs[id][type] = element;
    }

    selectTab (id) {

        // If tab is already selected, don't do anything
        if (id === this.selectedTabId) return;

        // Unselect previous tab
        if (this.selectedTabId) {
            this.tabs[this.selectedTabId].title.selected = false;
            this.tabs[this.selectedTabId].body.selected = false;
        }

        // Select new tab
        this.selectedTabId = id;
        this.tabs[this.selectedTabId].title.selected = true;
        this.tabs[this.selectedTabId].body.selected = true;
    }

}

customElements.define('fedex-tabs', FedexTabs);

export default FedexTabs;