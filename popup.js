function showVersion() {
    fetch('./manifest.json')
        .then((response) => response.json())
        .then((json) => {
            document.getElementById('version').innerHTML = 'v' + json['version'];
        });
};

document.addEventListener('DOMContentLoaded', function () {
    if (chrome.i18n.getUILanguage().includes('de')) {
        document.getElementById('info').innerHTML = chrome.i18n.getMessage('info');
    };
    showVersion();
    var mymixbutton = document.getElementById('mymixbutton');
    var vidmixbutton = document.getElementById('vidmixbutton');
    mymixbutton.addEventListener('click', function () {
        myMix();
    });
    vidmixbutton.addEventListener('click', function () {
        vidMix();
    });
});

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