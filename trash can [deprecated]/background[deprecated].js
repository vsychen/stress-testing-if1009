/*
  Based on answer provided by shanomurphy at stackoverflow.
  [https://stackoverflow.com/a/31807498]
*/
/*
TO WORK WITH THIS CODE, ADD THIS TO MANIFEST.JSON


  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
*/

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.storage.local.get("state", function(result) {
    if(result.state == null) {
      result.state = 0;
    } else if (result.state == 0) {
      result.state = 1;
    } else {
      result.state = 0;
    }

    chrome.storage.set({state: result.state});
  }
});