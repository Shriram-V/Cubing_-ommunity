//YOUR FIREBASE LINKS
//not working
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          likes: 0
    });

    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      //Start code
                      console.log(firebase_message_id);
                      console.log(message_data);
                      name_user = message_data['name'];
                      message = message_data['message'];
                      like = message_data['likes'];

                      name_tag = "<h4>" + name_user + "<img src='tick.png' class='user_tick'></h4>";
                      message_tag = "<h4 class='message_h4'>" + message + "</h4>";
                      like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value =" + like + " onclick='updateLike(this.id)'>";
                      span_tag = "<span class='glyphicon glyphicon-thumbs-up'> " + like + "</span></button><hr>";

                      row = name_tag + message_tag + like_button + span_tag;
                      document.getElementById("output").innerHTML += row;


                      //End code
                }
          });
    });
}
getData();

function updateLike(message_id) {
    console.log("you have clicked on button with Id- " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          likes: updated_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function back() {
    localStorage.removeItem("room_name");
    window.location = "chat_room.html";
}