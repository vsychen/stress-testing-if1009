var horde = gremlins.createHorde();
var c = 0;

function sendDataToSheets(data) {
	console.log(data);
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
				console.log(c++);
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
				console.log(c++);
				sendDataToSheets(data);
			},
    error: function(p1, p2, p3) {
				if (p2.search("fps") >= 0) {
					data.description = p3;
				} else {
					console.log("ERROR: " + p1 + " " + p2 + " " + p3 + " " + p4 + " " + p5 + " " + p6 + " " + p7)
				}
				console.log(c++);
				sendDataToSheets(data);
			}
  };

  horde.logger(logger);
}

function createClickerGremlins() {
  horde.gremlin(gremlins.species.clicker());
}

function createToucherGremlins() {
  horde.gremlin(gremlins.species.toucher());
}

function createFormFillerGremlins() {
  horde.gremlin(gremlins.species.formFiller());
}

function createScrollerGremlins() {
  horde.gremlin(gremlins.species.scroller());
}

function createTyperGremlins() {
  horde.gremlin(gremlins.species.typer());
}

function createMogwais() {
  horde.mogwai(gremlins.mogwais.alert())
    .mogwai(gremlins.mogwais.fps())
    .mogwai(gremlins.mogwais.gizmo()
      .maxErrors(10));
}

function setDistribution(click, touch, form, scroll, type) {
  horde.strategy(gremlins.strategies.distribution().distribution([click, touch, form, scroll, type]));
}

function setSeed(n) {
  horde.seed(n);
}

function configGremlins() {
  createLogger();
  createClickerGremlins();
  createToucherGremlins();
  createFormFillerGremlins();
  createScrollerGremlins();
  createTyperGremlins();
  createMogwais();
  setDistribution(0.3,0.1,0.2,0.1,0.3);
  setSeed(2);
}

function runGremlins() {
  horde.unleash({ nb: count });
}

configGremlins();
runGremlins();
console.log(count);