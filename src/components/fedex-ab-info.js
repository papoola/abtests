import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <table>
    </table>
`;

class FedexAbInfo extends HTMLElement {

    constructor() {
        super();

        // Attributes
        this.fields = {
            generic: ['name', 'region', 'status', 'type'],
            image: ['text', 'format', 'source', 'target'],
            video: ['text', 'format', 'source', 'target'],
            element: ['text', 'element', 'link', 'target'],
        };

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Method binding
        this.itemFieldsToRows = this.itemFieldsToRows.bind(this);
    }

    connectedCallback() {
    }

    itemFieldsToRows (item, fields) {
        const rows = fields.map(field => (`<tr><td class="fedex-capitalize">${field}:</td><td class="fedex-font-bold">${item[field]}</td></tr>`)).join('');
        return rows;
    }

    set item(value) {
        const table = this.shadowRoot.querySelector('table');
        table.innerHTML = `
            ${this.itemFieldsToRows(value, this.fields.generic)}                
            <tr><td colspan="2" class="fedex-pt-20 fedex-pb-20">Details of the selected type:</td>
            ${this.itemFieldsToRows(value, this.fields[value.type])}
        `;
    }

}

customElements.define('fedex-ab-info', FedexAbInfo);

export default FedexAbInfo;