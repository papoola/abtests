import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-select">
        <label><slot></slot></label>
        <select>
            <option>option A</option>
            <option>option B</option>
            <option>option C</option>   
        </select>
    </div>
`;

class FedexSelect extends HTMLElement {

    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
    }

    get value () {
        const input = this.shadowRoot.querySelector('input');
        return input.value;
    }

}

customElements.define('fedex-select', FedexSelect);

export default FedexSelect;