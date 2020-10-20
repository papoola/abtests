import styles from './fedex-modal.scss'

const css = new CSSStyleSheet();
css.replaceSync(styles.toString());

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-modal fedex-hidden">
        <div>
            <slot></slot>
        </div>
    </div>
`;

/**
 * Modal dialog
 *
 * @class FedexModal
 */
class FedexModal extends HTMLElement {

    /**
     * @constructor
     */
    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [css];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attributes
        this.rootElement = this.shadowRoot.querySelector('.fedex-modal');

        // Method binding
        this.show = this.show.bind(this);
    }

    /**
     * Shows modal dialog
     *
     * @function show
     */
    show () {
        this.rootElement.classList.remove('fedex-hidden');
    }

    /**
     * Hides modal dialog
     *
     * @function hide
     */
    hide () {
        this.rootElement.classList.add('fedex-hidden');
    }

}

customElements.define('fedex-modal', FedexModal);

export default FedexModal;