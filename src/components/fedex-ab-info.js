import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <table>
    </table>
`;

export const fields = {
    generic: ['name', 'region', 'status', 'type'],
    image: ['text', 'format', 'source', 'target'],
    video: ['text', 'format', 'source', 'target'],
    element: ['text', 'element', 'link', 'category', 'target'],
};

/**
 * Shows details of an A/B test
 *
 * @class FedexAbInfo
 */
class FedexAbInfo extends HTMLElement {

    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attributes
        this._item = null;

        // Method binding
        this.itemFieldsToRows = this.itemFieldsToRows.bind(this);
    }

    connectedCallback () {
    }

    itemFieldsToRows (item, type) {

        // Use fields for type
        let useFields = fields[type];

        // Exclude category/link based on element
        if (type === 'element') {
            if (item.element === 'link') {
                useFields = useFields.filter(field => field !== 'category');
            } else {
                useFields = useFields.filter(field => field !== 'link');
            }
        }

        // Generate rows
        const rows = useFields.map(field => (`<tr><td class="fedex-capitalize">${field}:</td><td class="fedex-font-bold">${item[field]}</td></tr>`)).join('');
        return rows;
    }

    get item () {
        return this._item;
    }

    set item (value) {
        this._item = value;
        const table = this.shadowRoot.querySelector('table');
        table.innerHTML = `
            ${this.itemFieldsToRows(value, 'generic')}                
            <tr><td colspan="2" class="fedex-pt-20 fedex-pb-20">Details of the selected type:</td>
            ${this.itemFieldsToRows(value, value.type)}
        `;
    }

}

customElements.define('fedex-ab-info', FedexAbInfo);

export default FedexAbInfo;