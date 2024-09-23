document.addEventListener('DOMContentLoaded', function () {
    if (chrome.i18n.getUILanguage().includes('de')) {
        document.getElementById('header').innerHTML = chrome.i18n.getMessage('header');
        document.getElementById('title').innerHTML = chrome.i18n.getMessage('title');
        document.getElementById('dropdownlabel').innerHTML = chrome.i18n.getMessage('dropdownlabel');
        document.getElementById('popupoption').innerHTML = chrome.i18n.getMessage('popupoption');
        document.getElementById('mymixoption').innerHTML = chrome.i18n.getMessage('mymixoption');
        document.getElementById('vidmixoption').innerHTML = chrome.i18n.getMessage('vidmixoption');
        document.getElementById('remlistoption').innerHTML = chrome.i18n.getMessage('remlistoption');
    };
    document.getElementById('defaultactiondropdown').addEventListener('input', function () {
        optionSelect();
    });
    loadDisplaySaved();
});

async function loadDisplaySaved() {
    var option = await chrome.storage.local.get(['popupsetting']);
    if (!(Object.keys(option).length === 0)) {
        document.getElementById('defaultactiondropdown').selectedIndex = option['popupsetting'];
    };
}

function optionSelect() {
    var dropdown = document.getElementById('defaultactiondropdown').selectedIndex;
    if (dropdown === 0) {
        chrome.action.setPopup({ popup: 'popup.html'})
    } else {
        chrome.action.setPopup({ popup: ''});
    }
    chrome.storage.local.set({ 'popupsetting': dropdown});
}