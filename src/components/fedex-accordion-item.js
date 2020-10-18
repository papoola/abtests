import globalCss from '../global';
import { css } from './fedex-accordion';

const template = document.createElement('template');
template.innerHTML = `
    <li class="fedex-accordion-item">
        <div class="fedex-accordion-item__title"><slot name="title"></slot></div>
        <div class="fedex-accordion-item__body"><div class="fedex-p-10"><slot name="body"></slot></div></div>
    </li>
`;

class FedexAccordionItem extends HTMLElement {

    constructor () {
        super();

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss, css];

        // Method binding
        this.onClicked = this.onClicked.bind(this);
    }

    connectedCallback () {

        // Click handler
        const li = this.shadowRoot.querySelector('li');
        li.onclick = this.onClicked;
    }

    onClicked () {
        this.parentElement.selectItem(this);
    }

    get selected () {
        return this.hasAttribute('selected');
    }

    set selected (isSelected) {
        this.toggleAttribute('selected', isSelected);
        const body = this.shadowRoot.querySelector('.fedex-accordion-item__body');
        if (isSelected) {
            body.style.maxHeight = body.scrollHeight + "px";
        } else {
            body.style.maxHeight = null;
        }
        // body.classList.toggle('fedex-p0', !isSelected);
    }

}

customElements.define('fedex-accordion-item', FedexAccordionItem);

export default FedexAccordionItem;