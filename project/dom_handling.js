/*
  Based on answer provided by rsanchez at stackoverflow.
  [https://stackoverflow.com/a/20399910]
  Based on answer provided by Daniel Möller at stackoverflow.
  [https://stackoverflow.com/a/42052406]
*/

function errorHandler() {
  window.addEventListener('error', function(e) {
    var report = {logType: "ERROR", type: "ERROR", event: "ERROR"};
    report.pos = ((e.filename != null) ? e.filename + " L" + e.lineno : "");
    report.description = e.message + ((e.stack != null) ? " from " + e.stack : "");
    document.dispatchEvent(new CustomEvent('ReportError', {detail:report}));
  });
}

function alertHandler() {
  window.alert = function(msg) {
    var report = {logType: "ALERT", type: "ALERT", event: "ALERT", description: msg};
    document.dispatchEvent(new CustomEvent('ReportAlert', {detail:report}));
  }
  
  window.prompt = function(msg) {
    var report = {logType: "ALERT", type: "PROMPT", event: "PROMPT", description: msg};
    document.dispatchEvent(new CustomEvent('ReportAlert', {detail:report}));
    return (Math.floor(Math.random() * 2) > 1) ? true : false;
  }
  
  window.confirm = function(msg) {
    var report = {logType: "ALERT", type: "CONFIRM", event: "CONFIRM", description: msg};
    document.dispatchEvent(new CustomEvent('ReportAlert', {detail:report}));
    return (Math.floor(Math.random() * 2) > 1) ? true : false;
  }
}

document.addEventListener('ReportError', function(e) {
  sendDataToSheets(e.detail);
});

document.addEventListener('ReportAlert', function(e) {
  sendDataToSheets(e.detail);
});

var script = document.createElement('script');
script.textContent = '(' + errorHandler + '())';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

script = document.createElement('script');
script.textContent = '(' + alertHandler + '())';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);