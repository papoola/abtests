const template = document.createElement('template');
template.innerHTML = `
    <div class="fedex-ab-create__video fedex-hidden">
        <label>Video Case:</label>
        <div class="fedex-flex fedex-mt-20">
            <div class="fedex-flex-1 fedex-mr-20">
                <div>
                    <fedex-input id="video_text" required>Video text</fedex-input>
                </div>
                <div class="fedex-mt-20">
                    <fedex-input id="video_source" required title="Video source should end with selected video format.">Video source</fedex-input>
                </div>                
            </div>
            <div class="fedex-flex-1">
                <div>
                    <fedex-select id="video_format" placeholder="choose" required>Format (Video format)</fedex-select>
                </div>
                <div class="fedex-mt-20">                
                    <fedex-input id="video_target" required>Target element (CSS Class)</fedex-input>
                </div>      
            </div>
        </div>
    </div>    
`;

export default template;