import globalCss from '../global';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-saved">
        <fedex-accordion></fedex-accordion>
    </div>    
`;

class FedexAbSaved extends HTMLElement {

    constructor () {
        super();

        // Attributes
        this.items = [];

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Method binding
        this.load = this.load.bind(this);
        this.add = this.add.bind(this);
        this.render = this.render.bind(this);

        // load all saved items
        this.load();
    }

    connectedCallback () {
        console.log('FedexAbSaved connected');
    }

    async load () {
        const saved = await fetch('/saved.json');
        this.items = await saved.json();
        console.log('items', this.items);
        this.render();
    }

    add (item) {
        this.items.push(item);
    }

    render () {
        const accordion = this.shadowRoot.querySelector('fedex-accordion');
        accordion.innerHTML = '';
        this.items.forEach(item => {
            const element = document.createElement('fedex-accordion-item');
            element.innerHTML = `
                <span slot="title">A/B Case ${item.id}</span>
                <fedex-ab-info slot="body"></fedex-ab-info>
            `;
            element.querySelector('fedex-ab-info').item = item;
            accordion.appendChild(element);
        });
    }

}

customElements.define('fedex-ab-saved', FedexAbSaved);

export default FedexAbSaved;