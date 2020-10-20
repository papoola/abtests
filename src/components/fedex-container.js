import styles from './fedex-container.scss'

const css = new CSSStyleSheet();
css.replaceSync(styles.toString());

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-container">
        <slot></slot>
    </div>    
`;

/**
 * Root container element
 *
 * @class FedexContainer
 */
class FedexContainer extends HTMLElement {

    /**
     * @constructor
     */
    constructor() {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [css];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

}

customElements.define('fedex-container', FedexContainer);

export default FedexContainer;