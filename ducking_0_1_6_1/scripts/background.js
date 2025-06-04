chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveToken" && request.token) {
      chrome.storage.sync.set({ dataDucking: request.token }, () => {
        console.log("Token saved to chrome.storage.sync");
        sendResponse({ success: true });
      });
  
      // Penting: return true agar sendResponse berfungsi secara async
      return true;
    }
  });
  