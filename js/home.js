// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
  import { bootstrapAlert } from './alert.js';  

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import {getDatabase, ref, set, update, child, get, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// ---------------------// Get reference values -----------------------------

let signOutLink = document.getElementById("signOut");
let welcome_message = document.getElementById("welcome-message");
let orderLink = document.getElementById("orderLink");
let end = document.getElementById("end");
let currentUser = null;

// ----------------------- Get User's Name'Name ------------------------------

function getUsername() {
  // Get the user's name from storage
  let keepLoggedIn = localStorage.getItem("keepLoggedInSwitch");
  // If the user's name is not in storage, get it from session storage
  if (keepLoggedIn == "yes") {
    currentUser = JSON.parse(localStorage.getItem('user'))
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'))
  }

  if (currentUser != null) currentUser = currentUser.accountInfo;
}

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD

function signOutUser() {
  // Remove user info from local/session storage
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  // Sign-out from FRD
  auth.signOut().then(() => {
    // Sign-out successful.
    window.location.href = "index.html";
  }).catch((error) => {
    // An error happened.
    console.log(error);
})}

// when window loads

window.onload = window.addEventListener("load",navload(),false);

export function navload () {
  // get username 
  getUsername();

  // if user is null

  if (currentUser == null) {

    signOutLink.innerText = "Sign In To Order";
    signOutLink.href = "signIn.html";
    signOutLink.classList.add("strong");
    orderLink.remove();

  } 

  // if user is signed in
  
  else {
    console.log(currentUser);

    signOutLink.innerText = "Sign Out";
    signOutLink.classList.add("strong")
    signOutLink.addEventListener("click", (e) => {
      e.preventDefault();
      signOutUser();
    });
    
    let adminLink = document.createElement("a");
    adminLink.setAttribute("id", "adminLink");
    adminLink.classList.add("nav-link");
    adminLink.classList.add("hover-underline-animation");
    adminLink.classList.add("strong");

    end.appendChild(adminLink);
    
    // if user is admin

    if (currentUser.isAdmin) {
      adminLink.setAttribute("href", "admin.html");
      adminLink.innerText = "Admin Console";
    } else {
      adminLink.innerText = "My Account"
      adminLink.setAttribute("href", "myacc.html")
    }
    console.log(window.location.href)
    if (window.location.href.match("admin.html") != null) {
      adminLink.classList.add("active");
    } else if (window.location.href.match("myacc.html") != null) {
      adminLink.classList.add("active");
      welcome_message.innerHTML = "Welcome, " + currentUser.firstName + ".";
     
      
      end.classList.add("active");
    }
  }
};