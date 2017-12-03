function off() {
  console.log("OFOFOFOFOFOFOF TA FALTANDO UM F NO FINAL DE CADA OF");
}

function on() {
  console.log("ONONONONONON NÃO TA FALTANDO UM N NO FINAL DE CADA ON");
  runGremlins();
}

chrome.storage.local.get("state", function(result) {
  if (result.state == 1) on();
  else off();
});

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (req.state == 1) on();
  else off();
});