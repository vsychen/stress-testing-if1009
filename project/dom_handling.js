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
/* TODO
function alertHandling() {
  window.addEventListener('alert', function(e) {
    var alert = {
	  
	}
  });
}*/

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