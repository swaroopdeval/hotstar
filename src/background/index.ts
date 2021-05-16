import Constants  from '../constants';
import Utils from '../utils';
const onTabLoadComplete = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    if (
        tab.status == 'complete'
        && tab.url
        && new URL(tab.url).hostname === Constants.HOST_NAME
    ) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: Utils.changeVideoPlayerSpeed,
        });
        // Utils.changeVideoPlayerSpeed();
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ speed:  Constants.DEFAULT_SPEED});
});

chrome.tabs.onUpdated.addListener(onTabLoadComplete)
