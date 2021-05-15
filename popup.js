// Initialize button with user's preferred color

chrome.storage.sync.get("speed", ({ speed }) => {
    const inputId = "radio_speed_" + (Number(speed) * 100);
    document.getElementById(inputId).checked = true;
});

const changeVideoPlayerSpeed = () => {
    const videoPlayers = document.getElementsByTagName('video');
    if (videoPlayers.length !== 1) {
        return;
    }
    chrome.storage.sync.get("speed", ({ speed }) => {
        const speedInt = Number(speed);
        if (speedInt !== NaN) videoPlayers[0].playbackRate = speedInt;
    });
}

const changePlayBackSpeed = async () => {
    const tabs = await chrome.tabs.query({status: "complete", url: "https://www.hotstar.com/*"});
    tabs.map((tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: changeVideoPlayerSpeed,
        });
    });
};

const speedChangeHandler = (radio) => async () => {
    const speed = Number(radio.value);
    chrome.storage.sync.set({ speed });
    //check if hotstar tab open, how many? change speed in all
    await changePlayBackSpeed();
}

const radios = document.querySelectorAll('input[type=radio][name="speed"]');
radios.forEach(radio => radio.addEventListener('change', speedChangeHandler(radio)));