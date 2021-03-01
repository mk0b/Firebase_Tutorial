//Auth SDK enable google authentication
const auth = firebase.auth();

//grabbing the html elements old school vanilla js
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');

//set variable to firebase auth google provider instance
const provider = new firebase.auth.GoogleAuthProvider();

//making event handlers for clicking sign in and sign out buttons.
signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();