const getOptionId = (value: number) => `radio_speed_${value}`;

/**
 * Change speed of one hotstar tab
 * */
const changeVideoPlayerSpeed = () => {
    const videoPlayers = document.getElementsByTagName('video');
    if (videoPlayers.length !== 1) {
        return;
    }
    chrome.storage.sync.get("speed", ({ speed }) => {
        const speedInt = Number(speed);
        if (!isNaN(speedInt)) videoPlayers[0].playbackRate = speedInt;
    });
}

/**
 * Change speed of all open hotstar tabs
 **/
const changePlayBackSpeed = async () => {
    const tabs = await chrome.tabs.query({status: "complete", url: "https://www.hotstar.com/*"});
    tabs.map((tab) => {
        if (tab.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: changeVideoPlayerSpeed,
            });
        }
    });
};

export default  {
    getOptionId,
    changePlayBackSpeed,
    changeVideoPlayerSpeed,
}