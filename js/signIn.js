  import { bootstrapAlert } from './alert.js';  
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import {getDatabase, ref, set, update, child, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCL58GYKI97YFdpJseNOnUmDpp4YPp1dCQ",
    authDomain: "fusion-360-cuisine.firebaseapp.com",
    projectId: "fusion-360-cuisine",
    storageBucket: "fusion-360-cuisine.appspot.com",
    messagingSenderId: "477691509900",
    appId: "1:477691509900:web:5aa146a0ab8f38cd484fa9",
    measurementId: "G-6MG2F9352K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Auth
  const auth = getAuth();

  // Initialize Database
  const db = getDatabase(app);



// ---------------- Register New Uswer --------------------------------//

document.getElementById('submitData').addEventListener("click", (e) => {
    e.preventDefault();
    // Get user input
    const name = document.getElementById('name').value; 
    const nameArr = name.split(" ");
    const firstName = nameArr[0];
    const lastName = nameArr.slice(1).join(' ');
    const email = document.getElementById('userEmail').value;
  
    // Firebase will require a password of at least 6 characters
    const password = document.getElementById('userPass').value;
    console.log(firstName, lastName, email, password);
    if(!validation(firstName, lastName, email, password)) {
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
  
      // Add user to database
      // 'Set' will overwrite any existing data at this location or create a new one
      // each new user will be placed in the 'users' collection
      set(ref(db, 'users/' + user.uid + '/accountInfo'), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: encryptPass(password),
        isAdmin: false
      }).then(() => {
        window.location.href = "index.html";
        bootstrapAlert("User created successfully", "success");
      }).catch((error) => {
        bootstrapAlert("Error creating user: " + error, "danger");
        console.log(error)
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      bootstrapAlert(errorMessage, "danger");
      // ..
    });
  
  });
  
  // --------------- Check for null, empty ("") or all spaces only ------------//
  function isEmptyorSpaces(str){
    return str === null || str.match(/^ *$/) !== null
  }
  
  // ---------------------- Validate Registration Da  ta -----------------------//
  
  function validation(firstName, lastName, email, password) {
    let fNameRegex = /^[a-zA-Z'!]+$/;
    let lNameRegex = /^[a-zA-Z\s'!]+$/;
    let emailRegex = /^([a-zA-Z0-9_\\-\\.]+)@((gmail.com)|(yahoo.com)|(outlook.com)|(hotmail.com))$/;
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  
    if (isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)) {
      bootstrapAlert("Please complete all fields.", "danger");
      return false;
    } else if (!firstName.match(fNameRegex) || !lastName.match(lNameRegex) || !email.match(emailRegex) || !password.match(passRegex)) {
      bootstrapAlert("Check your data and try again. First name is only capital and lowercase letters. Last name is only capital and lowercase letters. Email must be a valid gmail, yahoo, outlook, or hotmail address. Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number.", "danger");
      return false;
    }
  
    return true;
  }
  
  // --------------- Password Encryption -------------------------------------//
  
  function encryptPass(password) {
    let encrypted = CryptoJS.AES.encrypt(password, password);
    return encrypted.toString();
  }
  
  function decryptPass(password) {
    let decrypted = CryptoJS.AES.decrypt(password, password);
    return decrypted.toString();
  }


// ----------------- Login Existing User -----------------------------------//

// ---------------------- Sign-In User ---------------------------------------//

document.getElementById('signIn').addEventListener("click", (e) => {
    e.preventDefault();
    // Get user input
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log(email, password)
    // Use Firebase to sign in user
    existingLogin(auth, email, password);
});

const existingLogin = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    // Log sign-in date
    let logDate = new Date();
    update(ref(db, 'users/' + user.uid + "/accountInfo"), {
      lastLogin: logDate, 
    })
    .then(() => {

      // Get snapshot of user data
      get(child(ref(db), 'users/' + user.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          login(snapshot.val())
          if (snapshot.val()["accountInfo"].isAdmin) {
            window.location.href = "admin.html";
          } else {
            console.log("No data available");
          }
          window.location.href = "index.html";
        }})
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        bootstrapAlert("Update Error " + errorMessage + ". Please try again.", "danger")
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      bootstrapAlert("Sign In Error: " + errorMessage + ". Please try again.", "danger")
    });
  };
  
  // ---------------- Keep User Logged In ----------------------------------//
  
  function login(user) {
    let keepLoggedIn = document.getElementById('keepLoggedInSwitch').ariaChecked;
  
    // Session storage temporary (only active while browser is open)
    // Saved as a string
    // Session storage cleared with a signout function
  
    if (!keepLoggedIn) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.setItem("keepLoggedInSwitch", "yes");
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  document.getElementById('displayPassword').addEventListener("click", (e) => {
    
    toggleVisibility()
  });

  function toggleVisibility() {
    var x = document.getElementById("loginPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  document.getElementById('displayPassword2').addEventListener("click", (e) => {
    toggleVisibility2()
  });

  function toggleVisibility2() {
    var x = document.getElementById("userPass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }