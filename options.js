// load and save options for MAKA

// Saves options to chrome.storage
function save_options() {
  chrome.storage.local.set({
    blockPence: document.getElementById('blockpence').checked,
    blockFarage: document.getElementById('blockfarage').checked,
    blockLePen: document.getElementById('blocklepen').checked,
    blockWilders: document.getElementById('blockwilders').checked,
    blockBannon: document.getElementById('blockbannon').checked,
    blockBoris: document.getElementById('blockboris').checked,
    customBlock: document.getElementById('customblock').value
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value 
  chrome.storage.local.get({
    blockPence: false,
    blockFarage: false,
    blockLePen: false,
    blockWilders: false,
    blockBannon: false,
    blockBoris: false,
    customBlock: false
  }, function(items) {
    document.getElementById('blockpence').checked = items.blockPence;
    document.getElementById('blockfarage').checked = items.blockFarage;
    document.getElementById('blocklepen').checked = items.blockLePen;
    document.getElementById('blockwilders').checked = items.blockWilders;
    document.getElementById('blockbannon').checked = items.blockBannon;
    document.getElementById('blockboris').checked = items.blockBoris;
    if (items.customBlock != false){
	    document.getElementById('customblock').value = items.customBlock;
    };
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',function(event){
  event.preventDefault();
  save_options();
});

