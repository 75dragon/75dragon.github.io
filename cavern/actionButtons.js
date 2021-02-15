var smallNum = 2;
var largeNum = 4;
var actionSearchCD = 1000;
var actionStokeCD = 2000;
var actionExploreCD = 3000;
var fireLocked = true;
var stokeLocket = true;

function actionSearch(idName)
{
  if (fireLocked)
  {
    fireLocked = false;
    addFire();
  }
  addItem("wood", Math.floor(Math.random() * smallNum) + 1)
  addItem("grass", Math.floor(Math.random() * largeNum) + 1)
  addItem("stick", Math.floor(Math.random() * largeNum) + 1)
  sendEvent("debree and scraps");
  document.getElementById(idName).disabled = "true";
  setTimeout(function() {
    document.getElementById(idName).disabled = false;
  }, actionSearchCD);
}

function actionStoke(idName)
{
  addItem("wood", Math.floor(Math.random() * smallNum) + 1)
  sendEvent("light in darkness");
  document.getElementById(idName).disabled = "true";
  setTimeout(function() {
    document.getElementById(idName).disabled = false;
  }, actionStokeCD);
}

function actionExplore(idName)
{
  addItem("stone",  Math.floor(Math.random() * largeNum) + 1)
  sendEvent("nothing but stone");
  document.getElementById(idName).disabled = "true";
  setTimeout(function() {
    document.getElementById(idName).disabled = false;
  }, actionExploreCD);
}
