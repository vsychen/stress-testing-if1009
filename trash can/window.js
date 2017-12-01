function off()
{
    console.log("OFOFOFOFOFOFOF TA FALTANDO UM F NO FINAL DE CADA OF");
}

function on()
{
	console.log("ONONONONONON NÃO TA FALTANDO UM N NO FINAL DE CADA ON");
    runGremlins();
}

chrome.storage.local.get("state", function(result){
    if(result.state == null) off(); //Do what you want if the state is not yet initialised
    else if (result.state == 0) off(); //Do what you want
    else if (result.state == 1) on(); //Do what you want
})

chrome.storage.local.onChanged.addListener(function(changes, areaName) {
    if(areaName != "local" || changes.state == null) return;

    switch(changes.state) {
        case 0 : off(); break;
        case 1 : on(); break;
    }
})