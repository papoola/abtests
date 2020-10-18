import globalCss from '../global';
import template_image from './fedex-ab-create-image';
import template_video from './fedex-ab-create-video';
import template_element from './fedex-ab-create-element';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-create">
        <label>Create a new A/B case:</label>
        <div class="fedex-flex fedex-mt-20">
            <div class="fedex-flex-1 fedex-mr-20">
                <div>
                    <fedex-input id="name">Name</fedex-input>
                </div>
                <div class="fedex-mt-20">
                    <label>Status:</label>
                </div>
                <div class="fedex-flex fedex-mt-10">
                    <div class="fedex-mr-30">
                        <input type="radio" id="active" name="active" value="true" checked>
                        <label for="active">Active</label>
                    </div>
                    <div>
                        <input type="radio" id="inactive" name="active" value="false">
                        <label for="inactive">Inactive</label>
                    </div>
                </div>
            </div>
            <div class="fedex-flex-1">
                <div>
                    <fedex-select>Region</fedex-select>
                </div>
                <div class="fedex-mt-20">
                    <label>Choose the type:</label>
                </div>
                <div class="fedex-flex fedex-mt-10">
                    <div class="fedex-mr-30">
                        <input type="radio" id="type-image" name="type" value="image">
                        <label for="type-image">Image</label>
                    </div>
                    <div class="fedex-mr-30">
                        <input type="radio" id="type-video" name="type" value="video">
                        <label for="type-video">Video</label>
                    </div>
                    <div>
                        <input type="radio" id="type-element" name="type" value="element">
                        <label for="element">Element</label>
                    </div>                    
                </div>
            </div>
        </div>
        <div class="fedex-ab-create__type fedex-pt-20"></div>
        <div class="fedex-flex fedex-items-center fedex-mt-20">
            <fedex-button id="save">Save</fedex-button>
        </div>
        <fedex-modal>
            <h1>Summary of the case</h1>
            <div class="fedex-mt-20">
                <fedex-ab-info></fedex-ab-info>
            </div>            
            <div class="fedex-flex fedex-items-center fedex-mt-20">
                <fedex-button id="modify">Modify</fedex-button>
                <fedex-button id="save">Save</fedex-button>
            </div>
        </fedex-modal>
    </div>
`;

class FedexAbCreate extends HTMLElement {

    constructor () {
        super();

        // Attributes
        this.type = '';

        // Add a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Add CSS
        this.shadowRoot.adoptedStyleSheets = [globalCss];

        // Render the template in the shadow dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Render sub templates
        const typeContainer = this.shadowRoot.querySelector('.fedex-ab-create__type');
        typeContainer.appendChild(template_image.content.cloneNode(true));
        typeContainer.appendChild(template_video.content.cloneNode(true));
        typeContainer.appendChild(template_element.content.cloneNode(true));

        // Method binding
        this.toggleTypeElement = this.toggleTypeElement.bind(this);
        this.save = this.save.bind(this);
    }

    connectedCallback () {

        // Type handler
        var radios = this.shadowRoot.querySelectorAll('input[type=radio][name="type"]');
        const _this = this;
        Array.prototype.forEach.call(radios, function (radio) {
            radio.addEventListener('change', _this.toggleTypeElement);
        });

        // Click handler
        const button = this.shadowRoot.querySelector('#save');
        button.onclick = this.save;

        console.log('FedexAbCreate connected');
    }

    toggleTypeElement (event) {

        // Get type
        const radio = this.shadowRoot.querySelector('input[type=radio][name="type"]:checked');
        this.type = radio.value;

        // Toggle type element
        const prevElement = this.shadowRoot.querySelector('.fedex-ab-create__type > div:not(.fedex-hidden)');
        if (prevElement) {
            prevElement.classList.add('fedex-hidden');
        }
        this.shadowRoot.querySelector(`.fedex-ab-create__type > div.fedex-ab-create__${this.type}`).classList.remove('fedex-hidden');
    }

    save () {

        // Get values
        const name = this.shadowRoot.querySelector('#name');

        console.log('save', name.value);
    }

}

customElements.define('fedex-ab-create', FedexAbCreate);

export default FedexAbCreate;