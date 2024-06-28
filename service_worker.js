//Random comments go here

chrome.runtime.onInstalled.addListener(() => {
    console.log(':^)');
    initialiseSettings();
});

chrome.runtime.onStartup.addListener(() => {
    initialiseSettings();
})

chrome.action.onClicked.addListener((tab) => {
    processClick();
});

async function initialiseSettings() {
    var popupsetting = await chrome.storage.local.get(['popupsetting']);
    if (Object.keys(popupsetting).length === 0) {     //check if key in storage is empty  
        popupsetting = 0;
        chrome.storage.local.set({ 'popupsetting': popupsetting });
    } else {
        popupsetting = popupsetting['popupsetting'];     //eine ebene raus nehmen
    }
    if (popupsetting === 0) {
        chrome.action.setPopup({ popup: 'popup.html' })
    } else {
        chrome.action.setPopup({ popup: '' })
    }
};

async function processClick() {
    var popupsetting = await chrome.storage.local.get(['popupsetting']);
    if (Object.keys(popupsetting).length === 0) {     //check if key in storage is empty  
        popupsetting = 0;
        chrome.storage.local.set({ 'popupsetting': popupsetting });
    } else {
        popupsetting = popupsetting['popupsetting'];     //eine ebene raus nehmen
    }
    switch (popupsetting) {
        case 1:
            myMix();
            break;
        case 2:
            vidMix();
            break;
    }
};

function myMix() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        if (activeTab.url.includes('youtube.com/watch?') && activeTab.url.includes('v=')) {
            var idregex = /youtube\.com\/watch\?v=([\w-]{11})/; //match video id
            var urlregex = /(.+?(?=com\/))/;  //match url, in case it's m.youtube.com
            var id = activeTab.url.match(idregex)[1];
            var url = activeTab.url.match(urlregex)[1];
            chrome.tabs.update({ url: url + 'com/watch?v=' + id + '&list=RDMM' + '&start_radio=1'}); //redirect to my mix from video
        };
    });
};

function vidMix() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        if (activeTab.url.includes('youtube.com/watch?') && activeTab.url.includes('v=')) {
            var idregex = /youtube\.com\/watch\?v=([\w-]{11})/; //match video id
            var urlregex = /(.+?(?=com\/))/;  //match url, in case it's m.youtube.com
            var id = activeTab.url.match(idregex)[1];
            var url = activeTab.url.match(urlregex)[1];
            chrome.tabs.update({ url: url + 'com/watch?v=' + id + '&list=RD' + id + '&start_radio=1'}); //redirect to mix from video
        };
    });
};