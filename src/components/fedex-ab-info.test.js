import TestUtils from '../lib/test-utils.js';
import FedexAbInfo from './fedex-ab-info.js';

describe('fedex-ab-info', () => {

    const item = {
        'id': '1',
        'name': 'My first AB Test',
        'region': 'Region A',
        'status': 'active',
        'type': 'image',
        'text': 'This is a very beautiful picture.',
        'format': 'png',
        'source': 'https://some/url/to/file.png',
        'target': '#element-a'
    };

    it('shows a/b test info', async () => {
        const component = await TestUtils.render(FedexAbInfo.tag);
        component.item = item;
        const value = component.shadowRoot.innerHTML.replace(/>\s+</g,'><').includes('<table><tbody><tr><td class="fedex-capitalize">name:</td><td class="fedex-font-bold">My first AB Test</td></tr><tr><td class="fedex-capitalize">region:</td><td class="fedex-font-bold">Region A</td></tr><tr><td class="fedex-capitalize">status:</td><td class="fedex-font-bold">active</td></tr><tr><td class="fedex-capitalize">type:</td><td class="fedex-font-bold">image</td></tr><tr><td colspan="2" class="fedex-pt-20 fedex-pb-20">Details of the selected type:</td></tr><tr><td class="fedex-capitalize">text:</td><td class="fedex-font-bold">This is a very beautiful picture.</td></tr><tr><td class="fedex-capitalize">format:</td><td class="fedex-font-bold">png</td></tr><tr><td class="fedex-capitalize">source:</td><td class="fedex-font-bold">https://some/url/to/file.png</td></tr><tr><td class="fedex-capitalize">target:</td><td class="fedex-font-bold">#element-a</td></tr></tbody></table>');
        expect(value).toBeTruthy();
    });

});