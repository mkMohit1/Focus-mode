// The first event our service worker will listen for is runtime.onInstalled(). This method allows the extension to set an initial state or complete some tasks on installation.
const extensions='https://developer.chrome.com/docs/extensions';
'https://developer.chrome.com/docs/extensions';
chrome.runtime.onInstalled.addListener(()=>{
chrome.action.setBadgeText({
    text:"OFF",
});
});
chrome.action.onClicked.addListener(async(tab)=>{
    if(tab.url.startsWith(extensions) || tab.url.startsWith(webkitURL)){
        const prevState = await chrome.action.getBadgeText({tabId:tab.id});
        const nexState = prevState==='ON'?'OFF':'ON';
        chrome.action.setBadgeText({
            tabId:tab.id,
            text:nexState
        });
        if(nexState==='ON'){
            await chrome.scripting.insertCSS({
                fiels:["focus-mode.css"],
                target:{tabId:tab.id}
            });
        }else if(nexState==='OFF'){
            await chrome.scripting.removeCSS({
                fiels:["focus-mode.css"],
                target:{tabId:tab.id}
            });
        }
    }
});