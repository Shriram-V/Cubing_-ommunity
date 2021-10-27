// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
      apiKey: "AIzaSyAFG3C4pt46XsSYOVX1-w6fKZcdme1oHW0",
      authDomain: "cubing-community-550b1.firebaseapp.com",
      projectId: "cubing-community-550b1",
      storageBucket: "cubing-community-550b1.appspot.com",
      messagingSenderId: "900082987256",
      appId: "1:900082987256:web:eadf1487bb06635ae10b0d",
      measurementId: "G-DYWGJWD19X"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
      room_name = document.getElementById("room_name").value;
      console.log(room_name);

      firebase.database().ref("/").child(room_name).update({
            purpose: "add room"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "chat_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  room_names_firebase = childKey;
                  //Start code
                  console.log(room_names_firebase);
                  row = "<div class='room_name' id=" + room_names_firebase + " onclick='redirectToRoomName(this.id)'>" + room_names_firebase + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "chat_page.html";
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}