import globalCss from '../global';
import {fields} from "./fedex-ab-info";

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-saved">
        <div class="fedex-flex fedex-flex-wrap fedex-flex-gap-15">
            <div class="fedex-flex-1">
                <div>
                    <fedex-select id="region" placeholder="choose the region to apply">Region</fedex-select>
                </div>
                <div class="fedex-mt-20">
                    <fedex-radio id="type" checkbox>Choose the type:</fedex-radio>                    
                </div>
            </div>
            <div class="fedex-flex-1">
                <div>
                    <fedex-radio id="status" checkbox>Status:</fedex-radio>
                </div>
                <div class="fedex-mt-20">
                    <div>&nbsp;</div>                    
                    <fedex-button id="btn-filter" cta>
                        Filter
                    </fedex-button>
                    <fedex-button id="btn-clear-filters">Clear filters</fedex-button>
                </div>
            </div>
        </div>
        <h1 class="fedex-mt-40 fedex-font-normal fedex-text-gray-dark">Summary of filtered/saved A/B cases:</h1>
        <p id="caption"></p>
        <div class="fedex-mt-20">
            <fedex-accordion id="accordion"></fedex-accordion>
        </div>        
    </div>    
`;

/**
 * Shows list of all saved A/B tests
 *
 * @class FedexAbSaved
 */
class FedexAbSaved extends HTMLElement {

    /**
     * Gets component tag
     *
     * @function get tag
     */
    static get tag() {
        return 'fedex-ab-saved';
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
        this.items = [];
        this.filter = {
            region: this.shadowRoot.querySelector('#region'),
            type: this.shadowRoot.querySelector('#type'),
            status: this.shadowRoot.querySelector('#status'),
        };
        this.caption = this.shadowRoot.querySelector('#caption');
        this.accordion = this.shadowRoot.querySelector('#accordion');

        // Method binding
        this.loadRegions = this.loadRegions.bind(this);
        this.loadTests = this.loadTests.bind(this);
        this.add = this.add.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.render = this.render.bind(this);

        // Radio and select options
        this.filter.status.items = ['active', 'inactive'];
        this.filter.type.items = ['image', 'video', 'element'];
        this.loadRegions();

        // Load all saved tests
        this.loadTests();
    }

    /**
     * @connectedCallback
     */
    connectedCallback () {

        // Click handlers
        const btnFilter = this.shadowRoot.querySelector('#btn-filter');
        btnFilter.onclick = this.render;
        const btnClearFilters = this.shadowRoot.querySelector('#btn-clear-filters');
        btnClearFilters.onclick = this.clearFilters;
    }

    /**
     * Loads regions from JSON file
     *
     * @function loadRegions
     */
    async loadRegions () {
        const saved = await fetch('/regions.json');
        this.filter.region.items = await saved.json();
    }

    /**
     * Loads tests from JSON file
     *
     * @function loadTests
     */
    async loadTests () {
        const saved = await fetch('/saved.json');
        this.items = await saved.json();
        this.render();
    }

    /**
     * Adds A/B test to the list
     *
     * @function add
     * @param {Object} item - A/B test object
     */
    add (item) {

        // Generate ID
        item.id = this.items.length + 1;

        // Add to list of items
        this.items.push(item);
    }

    /**
     * Clears all selected filters
     *
     * @function clearFilters
     */
    clearFilters () {
        this.filter.region.value = null;
        this.filter.type.value = null;
        this.filter.status.value = null;
        this.render();
    }

    /**
     * Gets filter values as an object
     *
     * @function getFilters
     */
    getFilters () {
        const filters = {
            region: this.filter.region.value,
            type: this.filter.type.value,
            status: this.filter.status.value,
        };
        return filters;
    }

    /**
     * Sets caption text based on filter values
     *
     * @function setCaption
     * @param {Object} filters - filter values object
     */
    setCaption (filters) {
        let caption = '';
        if (filters.region || filters.type || filters.status) {
            caption = 'Below are the cases';
            if (filters.status) {
                caption += ` which are ${filters.status}`;
            }
            if (filters.region) {
                caption += ` for ${filters.region}`;
            }
            if (filters.type) {
                caption += ` and of type ${filters.type}`;
            }
            caption += '.';
        }
        this.caption.innerHTML = caption;
    }

    /**
     * Renders A/B test items based on the current filters
     *
     * @function render
     */
    render () {

        // Get filter values
        const filters = this.getFilters();

        // Set caption
        this.setCaption(filters);

        // Clear accordion
        this.accordion.innerHTML = '';

        // Filter items based on the current filters
        this.items.filter(item => (
            (!filters.region || item.region === filters.region) &&
            (!filters.type || item.type === filters.type) &&
            (!filters.status || item.status === filters.status)
        )).

        // Populate accordion
        forEach(item => {
            const element = document.createElement('fedex-accordion-item');
            element.innerHTML = `
                <span slot="title">A/B Case ${item.id}</span>
                <fedex-ab-info slot="body"></fedex-ab-info>
            `;
            element.querySelector('fedex-ab-info').item = item;
            this.accordion.appendChild(element);
        });
    }

}

customElements.define(FedexAbSaved.tag, FedexAbSaved);

export default FedexAbSaved;