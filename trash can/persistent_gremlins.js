// VARIABLES
var count = 100; // TODO CHANGE # OF GREMLINS
var seed = 2;
var sheetsId = "https://sheetsu.com/apis/v1.0/4aa5887ad089"

function sendDataToSheets(data) {
	Sheetsu.write(sheetsId, data, {}, function (result) { console.log(result); });
}

function createLogger() {
  var data = {};
  var logger = {
    log:   function(p1, p2, p3, p4, p5, p6, p7) {
				data.gremlin = p1;
				data.type = p2.trim();
				if (p2.search("clicker") >= 0) {
					data.event = p3;
					data.pos = p5 + " " + p6;
					data.description = "";
				} else if (p2.search("toucher") >= 0) {
					data.event = p3;
					data.pos = p5 + " " + p6;
					data.description = JSON.stringify(p7);
				} else if (p2.search("formFiller") >= 0) {
					data.event = p3;
					data.pos = p6.outerHTML;
					data.description = p4;
				} else if (p2.search("scroller") >= 0) {
					data.event = p3;
					data.pos = p5 + " " + p6;
					data.description = "";
				} else if (p2.search("typer") >= 0) {
					data.type = "typer";
					data.event = "type";
					data.pos = p5 + " " + p6;
					data.description = p3;
				} else if (p2.search("fps") >= 0) {
					data.event = "";
					data.pos = "";
					data.description = p3;
				} else {
					console.log("LOG: " + p1 + " " + p2 + " " + p3 + " " + p4 + " " + p5 + " " + p6 + " " + p7)
				}

				sendDataToSheets(data);
			},
    warn:  function(p1, p2, p3, p4) {
				if (p2.search("alert") >= 0) {
					data.event = p4;
					data.pos = "";
					data.description = p3;
				} else if (p2.search("fps") >= 0) {
					data.event = "";
					data.pos = "";
					data.description = p3;
				} else if (p2.search("gizmo") >= 0) {
					data.event = "";
					data.pos = "";
					data.description = "stopped test execution after " + p4 + " errors";
				} else {
					console.log("WARN: " + p1 + " " + p2 + " " + p3 + " " + p4 + " " + p5 + " " + p6 + " " + p7)
				}

				sendDataToSheets(data);
			},
    error: function(p1, p2, p3) {
				if (p2.search("fps") >= 0) {
					data.description = p3;
				} else {
					console.log("ERROR: " + p1 + " " + p2 + " " + p3 + " " + p4 + " " + p5 + " " + p6 + " " + p7)
				}

				sendDataToSheets(data);
			}
  };

  return logger;
}

function createClicker() {
  var clicker = gremlins.species.clicker();
  return clicker;
}

function createToucher() {
  var toucher = gremlins.species.toucher();
  return toucher;
}

function createFormFiller() {
  var formFiller = gremlins.species.formFiller();
  return formFiller;
}

function createScroller() {
  var scroller = gremlins.species.scroller();
  return scroller;
}

function createTyper() {
  var typer = gremlins.species.typer();
  return typer;
}

function createAlert() {
  var alert = gremlins.mogwais.alert();
  return alert;
}

function createFps() {
  var fps = gremlins.mogwais.fps();
  return fps;
}

function createGizmo() {
  var gizmo = gremlins.mogwais.gizmo();
  gizmo.maxErrors(10));
  return gizmo;
}

function setDelay(delay) {
  return gremlins.strategies.distribution().delay(delay);
}

function setDistribution(click, touch, form, scroll, type) {
  return gremlins.strategies.distribution().distribution([click, touch, form, scroll, type]);
}

function setStrategy() {
  var delay = 1000;
  var distribution = [0.3, 0.1, 0.2, 0.1, 0.3]; // CLICKER, TOUCHER, FORM_FILLER, SCROLLER, TYPER

  return gremlins.strategies.distribution().delay(delay).distribution(distribution);
}

function configGremlins(horde) {
  horde.logger(createLogger());
  horde.gremlin(createClicker());
  horde.gremlin(createToucher());
  horde.gremlin(createFormFiller());
  horde.gremlin(createScroller());
  horde.gremlin(createTyper());
  horde.gremlin(createAlert());
  horde.gremlin(createFps());
  horde.gremlin(createGizmo());
  horde.strategy(setStrategy());
  horde.seed(seed);
  return horde;
}

function runGremlins() {
  var horde = gremlins.createHorde();
  horde = configGremlins(horde);
  horde.unleash({ nb: count });
}