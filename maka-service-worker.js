browser.runtime.onInstalled.addListener(async () => {
	browser.contextMenus.create({
	  id: "makaUndo",
	  title: "Undo the Kittens!",
	  type: 'normal',
	  contexts: ['page'],
	});
});

// send to relevant tab on menu click

browser.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "makaUndo") {
		browser.tabs.sendMessage(tab.id, { action: "makaUndo" });
	}
});