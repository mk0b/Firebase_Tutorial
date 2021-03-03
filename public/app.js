//Auth SDK enable google authentication
const auth = firebase.auth();

//grabbing the html elements old school vanilla js
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');
const createThingBtn = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');
const thingsSection = document.getElementById('thingsSection');

console.log('Sign Out Button', signOutBtn);

//set variable to firebase auth google provider instance
const provider = new firebase.auth.GoogleAuthProvider();

//refence to firebase firestore sdk
const db = firebase.firestore();

let thingsRef;
let unsubscribe;

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
        userDetails.innerHTML = `<h3>Hello, ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
        thingsSection.hidden = false;
    } else {
        //not signed in
        console.log('Logged Out');
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        thingsSection.hidden = true;
    }
});

//listening to auth changes to the user being logged in for DB "permissions"
auth.onAuthStateChanged(user => {
    if (user) {
        //connecting thingsRef to the things collection in our DB
        thingsRef = db.collection('things');
        console.log('thingsRef: ', thingsRef);
        //click handler for when clicking the button
        createThingBtn.onclick = () => {
            console.log(this);
            //getting servert time stamp the most accurate.
            const { serverTimestamp } = firebase.firestore.FieldValue;

            // add creates new records in the db and auto assigns a new id.
            thingsRef.add({
                //reference to a specific user
                uid: user.uid,
                name: 'Fake Name',
                createdAt: serverTimestamp()
            });
        }

        console.log(thingsList);
        //listening to real time changes query
        //save as unsubscribe because queries will retur something that allows you to stop listneing
        unsubscribe = thingsRef
            .where('uid', '==', user.uid)
            //don't really understand what happens below
            .onSnapshot(querySnapshot => {
                
                const items = querySnapshot.docs.map(doc => {
                    
                    return `<li>${doc.data().name}</li>`;
                });
                console.log(items);
                
                thingsList.innerHTML = items.join('');
            }); 
    }
});