import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-select">
        <label><slot></slot></label>
        <select>
        </select>
    </div>
`;

/**
 * Displays a select dropdown
 *
 * @class FedexSelect
 */
class FedexSelect extends HTMLElement {

    /**
     * Gets component tag
     *
     * @function get tag
     */
    static get tag() {
        return 'fedex-select';
    }

    /**
     * @constructor
     */
    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attributes
        this.rootElement = this.shadowRoot.querySelector('.fedex-select');
        this.selectElement = this.shadowRoot.querySelector('select');

        // Set validation
        this.selectElement.toggleAttribute('required', this.hasAttribute('required'));

        // Method binding
        this.onChange = this.onChange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
    }

    /**
     * @connectedCallback
     */
    connectedCallback () {

        // Change handler
        this.selectElement.addEventListener('change', this.onChange);
    }

    /**
     * Gets selected value
     *
     * @function get value
     */
    get value () {
        return this.selectElement.value;
    }

    /**
     * Sets selected value
     *
     * @function get value
     * @param {string} value - selected value
     */
    set value (value) {
        this.selectElement.value = (value) ? value : '';
    }

    /**
     * Sets select items
     *
     * @function set items
     * @param {string[]} items - select items
     */
    set items (items) {

        // Clear options
        this.selectElement.innerHTML = '';

        // Add placeholder
        const placeholder = this.getAttribute('placeholder');
        if (placeholder) {
            const option = document.createElement('option');
            option.innerHTML = placeholder;
            option.setAttribute('value', '');
            this.selectElement.appendChild(option);
        }

        // Add items
        items.forEach(item => {
            const option = document.createElement('option');
            option.innerHTML = item;
            option.setAttribute('value', item);
            this.selectElement.appendChild(option);
        });
    }

    /**
     * Dispatches event on select change
     *
     * @function onChange
     */
    onChange () {
        const event = new Event('change');
        this.dispatchEvent(event);
    }

    /**
     * Checks if selection is valid, and reports the user in case of error
     *
     * @function checkValidity
     */
    checkValidity () {
        const valid = this.selectElement.checkValidity();
        this.rootElement.classList.toggle('fedex-select--invalid', !valid);
        this.selectElement.reportValidity();
        return valid;
    }

}

customElements.define(FedexSelect.tag, FedexSelect);

export default FedexSelect;