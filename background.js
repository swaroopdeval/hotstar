let defaultSpeed = 1;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ speed:  defaultSpeed});
    console.log(defaultSpeed);
});

//Add new tab open listener
//https://stackoverflow.com/questions/29067198/trigger-chrome-extension-on-new-tab-open
