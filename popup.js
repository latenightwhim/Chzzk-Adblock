window.onload = async function(){
    const fieldset = document.querySelector('fieldset');
    async function getSettings() {
        var data = await chrome.storage.sync.get(['settings']);
        if(Object.keys(data).length) return JSON.parse(data.settings);
        else{
            const settings = {
                block_video : true,
                block_popup : false,
            }
            chrome.storage.sync.set({'setting': JSON.stringify(settings)});
            return settings;
        }
    }
    var settings = await getSettings()
    if(settings.block_video) document.getElementById('block-video').checked = true;
    if(settings.block_popup) document.getElementById('block-popup').checked = true;
    
    fieldset.addEventListener('change', async () => {
        var new_settings = {
            block_video : document.getElementById('block-video').checked,
            block_popup : document.getElementById('block-popup').checked,
        }
        chrome.storage.sync.set({'settings': JSON.stringify(new_settings)});
    })
}