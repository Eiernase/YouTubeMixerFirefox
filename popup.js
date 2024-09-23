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
        document.getElementById('mymixbutton').innerHTML = chrome.i18n.getMessage('mymixoption');
        document.getElementById('vidmixbutton').innerHTML = chrome.i18n.getMessage('vidmixoption');
        document.getElementById('remlistbutton').innerHTML = chrome.i18n.getMessage('remlistoption');
    };
    showVersion();
    var mymixbutton = document.getElementById('mymixbutton');
    var vidmixbutton = document.getElementById('vidmixbutton');
    var remlistbutton = document.getElementById('remlistbutton');
    mymixbutton.addEventListener('click', function () {
        myMix();
    });
    vidmixbutton.addEventListener('click', function () {
        vidMix();
    });
    remlistbutton.addEventListener('click', function () {
        removeList();
    });
});

class currentVideo {
    constructor(id, url) {
        this.id = id;
        this.url = url;
    }
}

function queryLink(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        if (activeTab.url.includes('youtube.com/watch?') && activeTab.url.includes('v=')) {
            var idregex = /youtube\.com\/watch\?v=([\w-]{11})/; //match video id
            var urlregex = /(.+?(?=com\/))/;  //match url, in case it's m.youtube.com
            var id = activeTab.url.match(idregex)[1];
            var url = activeTab.url.match(urlregex)[1];
            callback(new currentVideo(id, url)); //returns the vid id and youtube url to calling function
        } else {
            throw new Error('No YouTube video detected!');
        };
    });

};

function myMix() {
    queryLink(function (result) {
        chrome.tabs.update({ url: result.url + 'com/watch?v=' + result.id + '&list=RDMM' + '&start_radio=1' }); //redirect to my mix from video
    });
};

function vidMix() {
    queryLink(function (result) {
        chrome.tabs.update({ url: result.url + 'com/watch?v=' + result.id + '&list=RD' + result.id + '&start_radio=1' }); //redirect to mix from video
    });
};

function removeList() {
    queryLink(function (result) {
        chrome.tabs.update({ url: result.url + 'com/watch?v=' + result.id });
    });
};