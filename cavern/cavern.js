items = new Map();

function changeItem(itemName, amount)
{
  i = 0
  while (i < itemName.lenght)
  {
    if (!items.has(itemName[i]) || items.get(itemName[i]) < amount[i])
    {
      return false
    }
    i += 1
  }
  i = 0
  while (i < itemName.length)
  {
    items.set(itemName[i], items.get(itemName[i]) + amount[i])
    i += 1
  }
}

function sendEvent(text)
{
  var div = document.createElement("div");
  color: "#AAAAAA";
  div.innerHTML = text;
  document.getElementById("content").appendChild(div);
}

function addItem(itemName, amount)
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
