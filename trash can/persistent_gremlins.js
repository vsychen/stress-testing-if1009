var horde = gremlins.createHorde();

function sendDataToSheets() {
  console.log("SEND DATA TO SHEETS");
}

function createLogger() {
  var logger = {
    log:   function(msg) { console.log("LOG: " + msg); },
    info:  function(msg) { console.log("INFO: " + msg); },
    warn:  function(msg) { console.log("WARN: " + msg); },
    error: function(msg) { console.log("ERROR: " + msg); }
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
  horde.mogwai(gremlins.mogwai.alert())
    .mogwai(gremlins.mogwai.fps())
    .mogwai(gremlins.mogwai.gizmo()
      .maxErrors(10));
}

function configGremlins() {
  createLogger();
  createClickerGremlins();
  createToucherGremlins();
  createFormFillerGremlins();
  createScrollerGremlins();
  createTyperGremlins();
  createMogwais();
}

function runGremlins() {
  horde.unleash({ nb: count });
}

configGremlins();
runGremlins();
console.log(count);