/*
  Based on answer provided by Emrys Myrooin at stackoverflow.
  [https://stackoverflow.com/a/31807498]
  Based on answer provided by Paul Fourmel at stackoverflow.
  [https://stackoverflow.com/a/14739080]
*/

function off() {
  stopHorde();
}

function on() {
  runHorde();
}

function reset() {
  resetHorde();
}

chrome.storage.local.get("state", function(result) {
  if (result.state == 1) on();
  else off();
});

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (req.state == 1) on();
  else off();
});