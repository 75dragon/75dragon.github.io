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

firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();
var nameSaved = false;

function pageVisit()
{
  var docRef = firestore.collection("webpage").doc("statistics")
  docRef.get().then(function(doc)
  {
    if (doc && doc.exists)
    {
      const myData = doc.data();
      docRef.update({visits:myData.visits + 1})
    }
  }).catch(function(error)
  {
    console.log("got an error", error);
  })
}
