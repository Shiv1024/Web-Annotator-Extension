chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_ANNOTATION") {
      const annotation = message.annotation;
      const pageUrl = message.url;

      // Retrieve existing annotations for the URL, if any
      chrome.storage.sync.get([pageUrl], (result) => {
          if (chrome.runtime.lastError) {
              console.error("Error retrieving annotations:", chrome.runtime.lastError);
              return;
          }

          const annotations = result[pageUrl] || [];

          // Add the new annotation to the array
          annotations.push(annotation);
          console.log("Annotations after saving:", annotations);

          // Save the updated array back to storage
          chrome.storage.sync.set({ [pageUrl]: annotations }, () => {
              if (chrome.runtime.lastError) {
                  console.error("Error saving annotations:", chrome.runtime.lastError);
                  return;
              }
              console.log(`Annotations for ${pageUrl} saved:`, annotations);
          });
      });
  }
  
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId && changeInfo.status === "complete") {
      const pageUrl = tab.url; // Get the URL of the updated tab
      if (!pageUrl) return; // Ensure the URL is valid

      chrome.storage.sync.get([pageUrl], (result) => {
          const annotations = result[pageUrl] || [];
          console.log(annotations);
          if (annotations.length !== 0) {
              chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                  if (tabs[0]?.id) {
                      console.log("responsesend");
                      chrome.tabs.sendMessage(tabs[0].id, { type: "REAPPLY_ANNOTATIONS", annotations });
                  }
              });
          }
      });
  }
});

