// setmakamenu.js - part of make america kittens again
// v1.1.3
// by Tom Royal 
// tomroyal.com

// sets up a menu item to invoke the de-kittening

function DeMakaMenuClick(info, tab) {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "undoMAKA"
        });
    });
}
/*
function ReMakaMenuClick(info, tab) {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "redoMAKA"
        });
    });
}
*/

var setMAKAmenu1 = chrome.contextMenus.create({"title": "Make Kittens Trump Again :(", "contexts":["page"], "onclick": DeMakaMenuClick});
// var setMAKAmenu2 = chrome.contextMenus.create({"title": "MORE KITTENS", "contexts":["page"], "onclick": ReMakaMenuClick});