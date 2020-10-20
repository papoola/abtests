import globalCss from '../global';
import template_image from './fedex-ab-create-image';
import template_video from './fedex-ab-create-video';
import template_element from './fedex-ab-create-element';
import { fields } from './fedex-ab-info';

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-create">
        <label>Create a new A/B case:</label>
        <div class="fedex-flex fedex-flex-wrap fedex-flex-gap-15 fedex-mt-20">
            <div class="fedex-flex-1">
                <div>
                    <fedex-input id="name" required>Name</fedex-input>
                </div>
                <div class="fedex-mt-20">
                    <fedex-radio id="status">Status:</fedex-radio>
                </div>
            </div>
            <div class="fedex-flex-1">
                <div>
                    <fedex-select id="region" placeholder="choose the region to apply" required>Region</fedex-select>
                </div>
                <div class="fedex-mt-20">
                    <fedex-radio id="type" required>Choose the type:</fedex-radio>
                </div>
            </div>
        </div>
        <div class="fedex-ab-create__type fedex-pt-20"></div>
        <div class="fedex-flex fedex-justify-center fedex-mt-20">
            <fedex-button id="btn-save" cta>Save</fedex-button>
        </div>
        <fedex-modal id="modal">
            <h1>Summary of the case</h1>
            <div class="fedex-mt-20">
                <fedex-ab-info id="info"></fedex-ab-info>
            </div>            
            <div class="fedex-flex fedex-justify-around fedex-mt-20">
                <fedex-button id="btn-modify">Modify</fedex-button>
                <fedex-button id="btn-submit" cta>Submit</fedex-button>
            </div>
        </fedex-modal>
    </div>
`;

/**
 * Shows form for creating a new A/B test
 *
 * @class FedexAbCreate
 */
class FedexAbCreate extends HTMLElement {

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

        // Render sub templates
        const typeContainer = this.shadowRoot.querySelector('.fedex-ab-create__type');
        typeContainer.appendChild(template_image.content.cloneNode(true));
        typeContainer.appendChild(template_video.content.cloneNode(true));
        typeContainer.appendChild(template_element.content.cloneNode(true));

        // Attributes
        this.input = {}
        fields.generic.forEach(field => {
            this.input[field] = this.shadowRoot.querySelector(`#${field}`);
        });
        fields.image.forEach(field => {
            this.input[`image_${field}`] = this.shadowRoot.querySelector(`#image_${field}`);
        });
        fields.video.forEach(field => {
            this.input[`video_${field}`] = this.shadowRoot.querySelector(`#video_${field}`);
        });
        fields.element.forEach(field => {
            this.input[`element_${field}`] = this.shadowRoot.querySelector(`#element_${field}`);
        });
        this.modal = this.shadowRoot.querySelector('#modal');
        this.info = this.shadowRoot.querySelector('#info');

        // Method binding
        this.loadRegions = this.loadRegions.bind(this);
        this.toggleTypeFields = this.toggleTypeFields.bind(this);
        this.toggleElementFields = this.toggleElementFields.bind(this);
        this.save = this.save.bind(this);
        this.modify = this.modify.bind(this);
        this.getFieldsForType = this.getFieldsForType.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
        this.collectInput = this.collectInput.bind(this);
        this.submit = this.submit.bind(this);

        // Radio and select options
        this.input.status.items = ['active', 'inactive'];
        this.input.status.value = 'active';
        this.input.type.items = ['image', 'video', 'element'];
        this.input.image_format.items = ['.png', '.jpg'];
        this.input.video_format.items = ['.mp4', '.mov'];
        this.input.element_element.items = ['link', 'button'];
        this.input.element_category.items = ['primary', 'secondary'];
        this.loadRegions();
    }

    /**
     * @connectedCallback
     */
    connectedCallback () {

        // Type handler
        this.input.type.addEventListener('change', this.toggleTypeFields);

        // Element handler
        this.input.element_element.addEventListener('change', this.toggleElementField);

        // Click handlers
        const btnSave = this.shadowRoot.querySelector('#btn-save');
        btnSave.onclick = this.save;
        const btnModify = this.shadowRoot.querySelector('#btn-modify');
        btnModify.onclick = this.modify;
        const btnSubmit = this.shadowRoot.querySelector('#btn-submit');
        btnSubmit.onclick = this.submit;
    }

    /**
     * Loads regions from JSON file
     *
     * @function loadRegions
     */
    async loadRegions () {
        const saved = await fetch('/regions.json');
        this.input.region.items = await saved.json();
    }

    /**
     * Toggles type specific fields based on selected type
     *
     * @function toggleTypeFields
     */
    toggleTypeFields () {
        const prevElement = this.shadowRoot.querySelector('.fedex-ab-create__type > div:not(.fedex-hidden)');
        if (prevElement) {
            prevElement.classList.add('fedex-hidden');
        }
        this.shadowRoot.querySelector(`.fedex-ab-create__type > div.fedex-ab-create__${this.input.type.value}`).classList.remove('fedex-hidden');
    }

    /**
     * Toggles element specific fields based on selected element
     *
     * @function toggleElementFields
     */
    toggleElementFields () {
        const element = this.input.element_element.value;
        this.input.element_link.classList.toggle('fedex-hidden', element !== 'link');
        this.input.element_category.classList.toggle('fedex-hidden', element !== 'button');
    }

    /**
     * Validates and shows the modal screen to ask for confirmation
     *
     * @function save
     */
    save () {

        // Validate
        if (this.checkValidity()) {

            // Collect input
            this.info.item = this.collectInput();

            // Show modal
            this.modal.show();
        }
    }

    /**
     * Cancels the confirmation modal screen, and gets user back to form
     *
     * @function modify
     */
    modify () {

        // Hide modal
        this.modal.hide();
    }

    /**
     * Cancels the confirmation modal screen
     *
     * @function modify
     */
    getFieldsForType (type) {

        // Use fields for type
        let useFields = (type) ? fields[type] : [];

        // Exclude category/link based on element
        if (type === 'element') {
            if (this.input.element_element.value === 'link') {
                useFields = useFields.filter(field => field !== 'category');
            } else {
                useFields = useFields.filter(field => field !== 'link');
            }
        }

        return useFields;
    }

    /**
     * Validates the input fields
     *
     * @function checkValidity
     */
    checkValidity () {

        // Validate generic fields
        let fields = this.getFieldsForType('generic');
        for (let i in fields) {
            const valid = this.input[fields[i]].checkValidity();
            if (!valid) return false;
        };

        // Adjust source validation based on selected format
        const type = this.input.type.value;
        if (type === 'image' || type === 'video') {
            const format = this.input[`${type}_format`].value;
            this.input[`${type}_source`].pattern = `^.+${format}$`;
        }

        // Validate type specific fields
        fields = this.getFieldsForType(type);
        for (let i in fields) {
            const valid = this.input[`${type}_${fields[i]}`].checkValidity();
            if (!valid) return false;
        };

        return true;
    }

    /**
     * Collects the input field values
     *
     * @function collectInput
     */
    collectInput () {
        const abtest = {};

        // Collect generic attributes
        let fields = this.getFieldsForType('generic');
        fields.forEach(field => {
            abtest[field] = this.input[field].value;
        });

        // Collect type specific attributes
        fields = this.getFieldsForType(abtest.type);
        fields.forEach(field => {
            abtest[field] = this.input[`${abtest.type}_${field}`].value;
        });

        return abtest;
    }

    /**
     * Adds the entered data to the list of the saved A/B tests
     *
     * @function submit
     */
    submit () {

        // Add to saved A/B tests
        const saved = document.querySelector('#saved');
        saved.add(this.info.item);
        saved.clearFilters();

        // Switch to tab saved
        const tabs = document.querySelector('#tabs');
        tabs.selectTab('saved');

        // Hide modal
        this.modal.hide();
    }

}

customElements.define('fedex-ab-create', FedexAbCreate);

export default FedexAbCreate;