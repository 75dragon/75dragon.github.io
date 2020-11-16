// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD2D5Pf-pJ-81MAZMTpcXTlClhQcUdAzqw",
  authDomain: "web-hotdog.firebaseapp.com",
  databaseURL: "https://web-hotdog.firebaseio.com",
  projectId: "web-hotdog",
  storageBucket: "web-hotdog.appspot.com",
  messagingSenderId: "603244058028",
  appId: "1:603244058028:web:7f1ef64e32b1cdbad41609",
  measurementId: "G-X7VFS6913F"
};

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");
//
// // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
var highestScore = 0;
var playerUsername = "";

var firestore = firebase.firestore();
var nameSaved = false;

var docRef = null;
var outputHeader = document.querySelector("#highscoreOutput");
var inputTextField = document.querySelector("#enterUsername");
var saveButton = document.querySelector("#saveUsernameButton");
// const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function()
{
  var textToSave = inputTextField.value;
  nameSaved = true;
  if (textToSave != null && textToSave != "")
  {
    docRef = firestore.collection("TiltToTilt").doc("Users").collection(textToSave).doc("userInfo")
    console.log("infirsttrue")
    docRef.get().then(function(doc)
    {
      console.log(doc)
      console.log(doc.exists)
      if (doc && doc.exists)
      {
        console.log("this exists, in if")
        const myData = doc.data();
        console.log(doc.data());
        outputHeader.innerText = myData.username + "'s highest score: " + myData.highscore;
        playerUsername = myData.username;
        console.log(myData.username);
        highestScore = myData.highscore;
      }
      else
      {
        playerUsername = textToSave;
        console.log("no exists, in else")
        docRef = firestore.collection("TiltToTilt").doc("Users").collection(textToSave).doc("userInfo");
        console.log("saving" + textToSave);
        docRef.set(
        {
          username: textToSave,
          highscore: 0
        }).then(function()
        {
          console.log("added date");
        }).catch(function(error)
        {
          console.log("error adding" + error);
        });
        console.log("end");
        console.log("no exists")
      }
    }).catch(function(error)
    {
      console.log("got an error", error);
    })
  }
})

function saveHighScore(score)
{
  var globalRef = firestore.collection("TiltToTilt").doc("Global")
  globalRef.get().then(function(doc)
  {
    if (doc && doc.exists)
    {
      console.log(doc)
      console.log(doc.exists)
      const myData = doc.data();
      if (score > myData.HighScore)
      {
        globalRef.update({HighScore:score})
      }
    }
  }).catch(function(error)
  {
    console.log("got an error", error);
  })
}

function newScore(score)
{
  var docRef = firestore.collection("TiltToTilt").doc("Users").collection(playerUsername).doc("userInfo")
  console.log("saving" + score);
  if (score > highestScore)
  {
    saveHighScore(score)
    highestScore = score;
    outputHeader.innerText = playerUsername + "'s highest score: " + score;
    docRef.update(
    {
      highscore: score
    }).then(function()
    {
      console.log("added date");
    }).catch(function(error)
    {
      console.log("error adding" + error);
    });
  }
}

// loadButton.addEventListener("click", function()
// {
//   docRef.get().then(function(doc)
//   {
//     if (doc && doc.exists)
//     {
//       const myData = doc.data();
//       outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
//     }
//   }).catch(function(error)
//   {
//     console.log("got an error", error);
//   })
// })

// getRealtimeUpdates = function()
// {
//   docRef.onSnapshot(function(doc)
//   {
//     if (doc && doc.exists)
//     {
//       const myData = doc.data();
//       outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
//     }
//   })
// }
//
// getRealtimeUpdates()
