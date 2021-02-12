items = new Map();

function sendEvent(text)
{
  var div = document.createElement("div");
  color: "#AAAAAA";
  div.innerHTML = text;
  document.getElementById("content").appendChild(div);
}

function search( eventButtonName, eventText, cooldownTime )
{
  if (eventButtonName == 'searchButton')
  {
    addItem("rock", Math.floor(Math.random() * 5))
    addItem("wood", Math.floor(Math.random() * 3))
    addItem("grass", Math.floor(Math.random() * 5))
    addItem("stick", Math.floor(Math.random() * 5))
  }
  if (eventButtonName == 'stokeButton')
  {
    addItem("wood", 1)
  }
  if (eventButtonName == 'exploreButton')
  {
    addItem("stone", 1)
  }
  sendEvent(eventText);
  console.log("ready? " + cooldownTime);
  document.getElementById(eventButtonName).disabled = "true";
  setTimeout(function() {
    document.getElementById(eventButtonName).disabled = false;
    console.log("finished? " + cooldownTime);
  }, cooldownTime);
}

function addItem( itemName, amount )
{
  if (items.has(itemName))
  {
    items.set(itemName, items.get(itemName) + amount);
    var div = document.getElementById(itemName);
    div.innerHTML = itemName + ": " + items.get(itemName);
  }
  else
  {
    items.set(itemName, amount)
    var div = document.createElement("div");
    color: "#AAAAAA";
    div.id = itemName
    div.innerHTML = itemName + ": " + items.get(itemName);
    document.getElementById("itemList").appendChild(div);
  }
}

//var myVar = setInterval(myTimer, 3000);

// function myTimer() {
//   sendEvent("hello")
// }
