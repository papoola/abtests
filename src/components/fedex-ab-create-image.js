const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-create__image fedex-hidden">
        <label>Image Case:</label>
        <div class="fedex-flex fedex-mt-20">
            <div class="fedex-flex-1 fedex-mr-20">
                <div>
                    <fedex-input id="image_text" required>Image text</fedex-input>
                </div>
                <div class="fedex-mt-20">
                    <fedex-input id="image_source" required title="Image source should end with selected image format.">Image source</fedex-input>
                </div>                
            </div>
            <div class="fedex-flex-1">
                <div>
                    <fedex-select id="image_format" placeholder="choose" required>Format (Image format)</fedex-select>
                </div>
                <div class="fedex-mt-20">                
                    <fedex-input id="image_target" required>Target element (CSS Class)</fedex-input>
                </div>      
            </div>
        </div>
    </div>    
`;

export default template;