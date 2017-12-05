/*
  Based on answer provided by rsanchez at stackoverflow.
  [https://stackoverflow.com/a/20399910]
*/

function errorHandling() {
  window.addEventListener('error', function(e) {
    var error = {
      message: e.message,
      fileName: e.filename,
      lineNumber: e.lineno,
      stack: e.stack
    };
    document.dispatchEvent(new CustomEvent('ReportError', {detail:error}));
  });
}

function popUpHandling() {
  var data = {logType: "ALERT", gremlin: "", pos: ""};

  // ALERT
  window.alert = function(alert) {
    data.type = "ALERT";
    data.event = "ALERT";
    data.description = alert;
  }

  // PROMPT
  window.prompt = function(prompt) {
    data.type = "PROMPT";
    data.event = "PROMPT";
    data.description = prompt;
  }

  // CONFIRM
  window.confirm = function(confirm) {
    data.type = "CONFIRM";
    data.event = "CONFIRM";
    data.description = confirm;
  }

  sendDataToSheets(data);
}

document.addEventListener('ReportError', function(e) {
  data = {};
  data.logType = "ERROR";
  data.gremlin = "";
  data.type = "ERROR";
  data.event = "ERROR";
  data.pos = e.detail.fileName + " L" + e.detail.lineNumber;
  data.description = e.detail.message + " from " + e.detail.stack;
  sendDataToSheets(data);
});

var script = document.createElement('script');
script.textContent = '(' + errorHandling + '())';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
script = document.createElement('script');
script.textContent = '(' + popUpHandling + '())';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);