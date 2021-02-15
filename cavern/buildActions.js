function buildFire( idName )
{
  if (items.get("wood") >= 10 && items.get("grass") >= 5 && items.get("stick") >= 5 && items.get("stone") >= 10)
  {
    sendEvent("flames flicker");
    var div = document.getElementById( idName );
    div.remove();
  }
  else
  {
    sendEvent("never enough supplies");
  }
}

function addFire()
{
  var div = document.createElement("button");
  div.id = "fireButton";
  div.innerHTML = "build fire";
  div.class = "buttons";
  div.addEventListener ("click", function() {
    buildFire("fireButton");
  });
  div.style="width: 80px;"
  document.getElementById("eventButtons").appendChild(div);
}
