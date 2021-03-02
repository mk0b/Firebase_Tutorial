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

//listening to auth changes and controlling what the user sees when they are signed in/signed out.
//using data from the user object that is stored when we logged in with google account
auth.onAuthStateChanged(user => {
    //seeing what is in user
    console.log("User Object: ", user);
    if (user) {
        //signed in
        console.log('Logged In');
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        //not signed in
        console.log('Logged Out');
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});