/*
  Based on answer provided by Emrys Myrooin at stackoverflow.
  [https://stackoverflow.com/a/31807498]
  Based on answer provided by Paul Fourmel at stackoverflow.
  [https://stackoverflow.com/a/14739080]
*/

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("toggle").addEventListener("click", toggleOnOff);
  loadPopUp();
});

function loadPopUp() {
  chrome.storage.local.get("state", function(result) {
    if (result.state == null) {
      result.state = 0;
      document.getElementById("toggle").innerHTML = "Start";
    } else if (result.state == 1) {
      document.getElementById("toggle").innerHTML = "Stop";
    } else {
      document.getElementById("toggle").innerHTML = "Start";
    }
  });  
}

function toggleOnOff() {
  chrome.storage.local.get("state", function(result) {
    if (result.state == 1) {
      result.state = 0;
      document.getElementById("toggle").innerHTML = "Start";
    } else {
      result.state = 1;
      document.getElementById("toggle").innerHTML = "Stop";
    }

    chrome.storage.local.set({state: result.state});
    sendMessage(result.state)
  });
}

function sendMessage(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {state: message}, null);
  });
}