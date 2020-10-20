/**
 * Sub Template for A/B create screen > Element
 */

const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-create__element fedex-hidden">
        <label>Element Case:</label>
        <div class="fedex-flex fedex-flex-wrap fedex-flex-gap-15 fedex-mt-20">
            <div class="fedex-flex-1">
                <div>
                    <fedex-input id="element_text" required>Element text</fedex-input>
                </div>
                <div class="fedex-mt-20">
                    <fedex-input id="element_link" class="fedex-hidden" required>Link action (HREF)</fedex-input>
                    <fedex-select id="element_category" class="fedex-hidden" placeholder="choose" required>Button category (primary or secondary)</fedex-select>
                </div>                
            </div>
            <div class="fedex-flex-1">
                <div>
                    <fedex-select id="element_element" placeholder="choose" required>Element (button or link)</fedex-select>
                </div>
                <div class="fedex-mt-20">                
                    <fedex-input id="element_target" required>Target element (CSS Class)</fedex-input>
                </div>      
            </div>
        </div>
    </div>    
`;

export default template;