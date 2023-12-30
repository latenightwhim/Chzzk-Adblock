console.log('[Chzzk Adblock] Chzzk Adblock activated!')
window.onload = async function(){   
    const sleep = delay => new Promise(r => setTimeout(r, delay))
    async function getSettings() {
        var data = await chrome.storage.sync.get(['settings']);
        if(Object.keys(data).length) return JSON.parse(data.settings);
        else{
            const settings = {
                block_video : true,
                block_popup : false,
            };
            chrome.storage.sync.set({'setting': JSON.stringify(settings)});
            return settings;
        }
    }
    var settings = await getSettings();
    
    // Block Video Ads
    if(settings.block_video){
        var select = async function(){
            var res = null;
            while(!res){
                await sleep(10)
                res = document.querySelector('div.link_btn_area > a');
            }
            return res;
        }
        var a = await select()
        var config = { attributes: true };
        var callback = function(mutationList, observer){
            if(!a.getAttribute('href')) return;
            document.querySelector('button.btn_skip').click()
            console.log('[Chzzk Adblock] Ad Skipped!');
        }
        var observer = new MutationObserver(callback);
        observer.observe(a, config);
    }

    // Block Popups
    if(settings.block_popup){
        for(var i = 0; i < 1000; i++){
            sleep(5);
            var popup = document.body.querySelector('div.loungehome_event_popup_container__cNrBw');
            if(popup){
                popup.querySelector('button.loungehome_event_popup_button_close__ftfLQ').click();
                console.log('[Chzzk Adblock] Popup Removed!');
            }
        }
    }
}