// Thanks: https://github.com/thunfischtoast

// Save options to chrome.storage
function saveOptions() {
    const blocklist = document.getElementById('blocklist').value.split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const passlist = document.getElementById('passlist').value.split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    chrome.storage.sync.set({
        cblocklist: blocklist,
        cpasslist: passlist
    }, function() {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}

// Restore options from chrome.storage
function restoreOptions() {
    chrome.storage.sync.get({
        cblocklist: [],
        cpasslist: []
    }, function(items) {
        document.getElementById('blocklist').value = items.cblocklist.join('\n');
        document.getElementById('passlist').value = items.cpasslist.join('\n');
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);