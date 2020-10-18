const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-create__video fedex-hidden">
        <label>Video Case:</label>
        <div class="fedex-flex fedex-mt-20">
            <div class="fedex-flex-1 fedex-mr-20">
                <div>
                    <fedex-input id="text">Image text</fedex-input>
                </div>
                <div class="fedex-mt-20">
                    <fedex-input id="source">Image source</fedex-input>
                </div>                
            </div>
            <div class="fedex-flex-1">
                <div>
                    <fedex-select id="format">Format (Image format)</fedex-select>
                </div>
                <div class="fedex-mt-20">                
                    <fedex-input id="target">Image source</fedex-input>
                </div>      
            </div>
        </div>
    </div>    
`;

export default template;